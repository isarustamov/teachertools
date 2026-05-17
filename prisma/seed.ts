import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { grades } from "../src/data/curriculum";
import { taskBank } from "../src/data/task-bank";

const prisma = new PrismaClient();

function difficultyScore(difficulty: string) {
  if (difficulty === "Çətin") return 3;
  if (difficulty === "Orta") return 2;
  return 1;
}

async function main() {
  const passwordHash = await bcrypt.hash("MathMind123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@mathmind.az" },
    update: {},
    create: { email: "admin@mathmind.az", name: "MathMind Admin", passwordHash, role: "ADMIN", approved: true }
  });

  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.grade.deleteMany();

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { level: grade.id },
      update: { titleAz: grade.label },
      create: { level: grade.id, titleAz: grade.label }
    });
  }

  for (const [order, pack] of taskBank.entries()) {
    const dbGrade = await prisma.grade.findUniqueOrThrow({ where: { level: pack.grade } });
    const topic = await prisma.topic.upsert({
      where: { slug: `sinif-${pack.grade}-${pack.slug}` },
      update: { titleAz: pack.title, description: pack.description, order },
      create: { gradeId: dbGrade.id, titleAz: pack.title, slug: `sinif-${pack.grade}-${pack.slug}`, description: pack.description, order }
    });

    const lesson = await prisma.lesson.create({
      data: {
        topicId: topic.id,
        titleAz: `${pack.title}: qısa izah`,
        bodyAz: pack.lesson,
        exampleAz: pack.example,
        difficulty: Math.max(...pack.tasks.map((item) => difficultyScore(item.difficulty))),
        estimatedMin: 12
      }
    });

    await prisma.quiz.create({
      data: {
        topicId: topic.id,
        titleAz: `${pack.title} üzrə işlək test bazası`,
        timedSec: 900,
        questions: {
          create: pack.tasks.map((item) => ({
            promptAz: item.question,
            options: item.options,
            answer: item.answer,
            explanationAz: item.explanation,
            difficulty: difficultyScore(item.difficulty),
            lesson: { connect: { id: lesson.id } }
          }))
        }
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
