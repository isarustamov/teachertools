import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleLessons, sampleQuiz } from "@/data/curriculum";

export default function LearnPage() {
  const lesson = sampleLessons[0];
  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <p className="font-bold text-indigo-600">6-cı sinif · {lesson.topic}</p>
      <h1 className="mt-2 text-4xl font-black">{lesson.title}</h1>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <Card><h2 className="text-2xl font-black">İzah</h2><p className="mt-4 text-lg leading-8 text-slate-700">{lesson.explanation}</p><div className="mt-6 rounded-3xl bg-indigo-50 p-6 text-center text-3xl font-black text-indigo-700">{lesson.example}</div><p className="mt-5 text-slate-600">AI tutor əvvəlcə ortaq məxrəc ideyasını xatırladır, sonra şagirdin növbəti addımı özü tapmasına kömək edir.</p></Card>
        <Card><h2 className="text-2xl font-black">Praktika</h2><p className="mt-4 font-semibold">{sampleQuiz[0].question}</p><div className="mt-4 grid gap-3">{sampleQuiz[0].options.map((option) => <button key={option} className="rounded-2xl border border-slate-200 p-4 text-left font-bold hover:border-indigo-400 hover:bg-indigo-50">{option}</button>)}</div><Button className="mt-5 w-full">AI ipucu al</Button></Card>
      </section>
      <Card className="mt-6"><h2 className="text-2xl font-black">Mini quiz</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{sampleQuiz.map((q) => <div key={q.question} className="rounded-2xl bg-slate-50 p-4"><p className="font-bold">{q.question}</p><p className="mt-2 text-sm text-slate-500">Timer və instant nəticə ilə.</p></div>)}</div></Card>
    </main>
  );
}
