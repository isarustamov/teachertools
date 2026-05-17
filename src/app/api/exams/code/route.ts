import { NextResponse } from "next/server";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await readSession();
  if (!session || !["TEACHER", "ADMIN"].includes(session.role)) return NextResponse.json({ error: "İcazə yoxdur." }, { status: 403 });
  const code = `AZM-${Math.floor(1000 + Math.random() * 9000)}`;
  const exam = await prisma.exam.create({ data: { titleAz: "Yeni imtahan", code, teacherId: session.userId, status: "DRAFT" } });
  return NextResponse.json({ code: exam.code, examId: exam.id });
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const exam = await prisma.exam.findUnique({ where: { code }, include: { questions: true } });
  if (!exam || exam.status === "ARCHIVED") return NextResponse.json({ error: "Kod tapılmadı." }, { status: 404 });
  return NextResponse.json({ exam: { id: exam.id, titleAz: exam.titleAz, durationMin: exam.durationMin, questionCount: exam.questions.length } });
}
