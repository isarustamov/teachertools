import { NextResponse } from "next/server";
import { z } from "zod";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { computeViolationRisk } from "@/lib/exam-security";

const schema = z.object({ examId: z.string(), answers: z.record(z.string(), z.string()), violations: z.number().int().min(0).default(0) });

export async function POST(request: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Giriş tələb olunur." }, { status: 401 });
  const payload = schema.parse(await request.json());
  const exam = await prisma.exam.findUniqueOrThrow({ where: { id: payload.examId }, include: { questions: true } });
  const correct = exam.questions.filter((q) => payload.answers[q.id] === q.answer).length;
  const score = exam.questions.length ? (correct / exam.questions.length) * 100 : 0;
  const attempt = await prisma.examAttempt.upsert({
    where: { examId_studentId: { examId: exam.id, studentId: session.userId } },
    update: { answers: payload.answers, score, violations: payload.violations, submittedAt: new Date() },
    create: { examId: exam.id, studentId: session.userId, answers: payload.answers, score, violations: payload.violations, submittedAt: new Date() }
  });
  return NextResponse.json({ attemptId: attempt.id, score, correct, total: exam.questions.length, integrityRisk: computeViolationRisk(payload.violations, false) });
}
