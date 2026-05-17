import { NextResponse } from "next/server";
import { authSchema, createSession, hashPassword, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(`register:${request.headers.get("x-forwarded-for") ?? "local"}`, 8);
  if (!limited.ok) return NextResponse.json({ error: "Çox cəhd edildi. Bir az sonra yenidən yoxlayın." }, { status: 429 });

  const payload = authSchema.parse(await request.json());
  const user = await prisma.user.create({
    data: { email: payload.email.toLowerCase(), name: payload.name ?? "MathMind istifadəçisi", role: payload.role, passwordHash: await hashPassword(payload.password), approved: payload.role !== "TEACHER" }
  });
  const token = await createSession({ userId: user.id, role: user.role });
  await setSessionCookie(token);
  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
}
