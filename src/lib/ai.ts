import OpenAI from "openai";

const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

export async function generateAzeriTutorHint(input: { grade: number; topic: string; question: string; studentAnswer?: string }) {
  if (!client) {
    return "Gəlin addım-addım düşünək: əvvəl verilənləri ayır, sonra uyğun düsturu seç və yalnız növbəti kiçik hesablamanı apar.";
  }

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: "Sən Azərbaycan dilində danışan riyaziyyat müəllimisən. Cavabı dərhal açıqlama; ipucu ver, şagirdi düşünməyə yönləndir, motivasiya et."
      },
      {
        role: "user",
        content: `${input.grade}-ci sinif, mövzu: ${input.topic}. Sual: ${input.question}. Şagird cavabı: ${input.studentAnswer ?? "yoxdur"}`
      }
    ]
  });

  return response.output_text;
}
