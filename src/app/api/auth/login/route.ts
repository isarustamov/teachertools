import { NextResponse } from "next/server";
import { z } from "zod";
import { createSession, setSessionCookie, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function POST(request: Request) {
  const limited = rateLimit(`login:${request.headers.get("x-forwarded-for") ?? "local"}`, 12);
  if (!limited.ok) return NextResponse.json({ error: "Təhlükəsizlik limiti keçildi." }, { status: 429 });

  const payload = schema.parse(await request.json());
  const user = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } });
  if (!user || !(await verifyPassword(payload.password, user.passwordHash))) return NextResponse.json({ error: "Email və ya şifrə yanlışdır." }, { status: 401 });
  const token = await createSession({ userId: user.id, role: user.role });
  await setSessionCookie(token);
  return NextResponse.json({ user: { id: user.id, email: user.email, role: user.role } });
}
