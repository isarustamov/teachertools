import { PrismaClient } from "@prisma/client";
import { grades, sampleLessons, sampleQuiz, topicMap } from "../src/data/curriculum";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashPassword("MathMind123!");
  await prisma.user.upsert({
    where: { email: "admin@mathmind.az" },
    update: {},
    create: { email: "admin@mathmind.az", name: "MathMind Admin", passwordHash, role: "ADMIN", approved: true }
  });

  for (const grade of grades) {
    const dbGrade = await prisma.grade.upsert({
      where: { level: grade.id },
      update: { titleAz: grade.label },
      create: { level: grade.id, titleAz: grade.label }
    });
    for (const [order, topic] of topicMap.entries()) {
      await prisma.topic.upsert({
        where: { slug: `sinif-${grade.id}-${topic.toLowerCase().replaceAll(" ", "-")}` },
        update: {},
        create: { gradeId: dbGrade.id, titleAz: topic, slug: `sinif-${grade.id}-${topic.toLowerCase().replaceAll(" ", "-")}`, description: `${grade.label} üçün ${topic} mövzusu`, order }
      });
    }
  }

  const topic = await prisma.topic.findFirstOrThrow({ where: { titleAz: "Kəsrlər və onluq ədədlər", grade: { level: 6 } } });
  const lesson = await prisma.lesson.create({
    data: { topicId: topic.id, titleAz: sampleLessons[0].title, bodyAz: sampleLessons[0].explanation, exampleAz: sampleLessons[0].example }
  });
  await prisma.quiz.create({
    data: {
      topicId: topic.id,
      titleAz: "Kəsrlər üzrə mini test",
      questions: { create: sampleQuiz.map((q) => ({ promptAz: q.question, options: q.options, answer: q.answer, explanationAz: "Doğru yanaşma: verilənləri oxu, uyğun əməliyyatı seç və nəticəni yoxla.", lessonId: lesson.id })) }
    }
  });
}

main().finally(async () => prisma.$disconnect());
