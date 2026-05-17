import { NextResponse } from "next/server";
import { z } from "zod";
import { generateAzeriTutorHint } from "@/lib/ai";
import { readSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({ grade: z.number().int().min(1).max(11), topic: z.string().min(2), question: z.string().min(3), studentAnswer: z.string().optional() });

export async function POST(request: Request) {
  const session = await readSession();
  if (!session) return NextResponse.json({ error: "Giriş tələb olunur." }, { status: 401 });
  const limited = rateLimit(`ai:${session.userId}`, 30, 60_000);
  if (!limited.ok) return NextResponse.json({ error: "AI tutor limiti bitdi." }, { status: 429 });
  const payload = schema.parse(await request.json());
  const hint = await generateAzeriTutorHint(payload);
  return NextResponse.json({ hint, policy: "Cavab birbaşa verilmir; şagird növbəti addıma yönləndirilir." });
}
