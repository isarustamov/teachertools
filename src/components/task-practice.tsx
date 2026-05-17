"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Award, BookOpen, CheckCircle2, Flame, GraduationCap, RotateCcw, Sparkles, Target, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { grades } from "@/data/curriculum";
import { getTaskCountForGrade, getTopicsForGrade, type MathTask, type TopicPack } from "@/data/task-bank";
import { cn } from "@/lib/utils";

type Answers = Record<string, string>;

function resultMessage(percent: number) {
  if (percent >= 90) return { title: "Möhtəşəm nəticə!", text: "Sən artıq bu mövzuda lider səviyyəsindəsən. Çətin tapşırıqlara keçə bilərsən.", badge: "Qızıl Beyin" };
  if (percent >= 70) return { title: "Çox yaxşı irəliləyiş!", text: "Əsas anlayışlar oturub. Bir neçə zəif bacarığı təkrar etsən nəticə mükəmməl olacaq.", badge: "Sabit Usta" };
  if (percent >= 50) return { title: "Yaxşı başlanğıcdır!", text: "Səhvlərə bax, izahları oxu və eyni mövzunu bir dəfə də həll et.", badge: "Cəsur Öyrənən" };
  return { title: "Dayanma, yenidən yoxla!", text: "Bu mövzu üçün izah hissəsini oxu, sonra tapşırıqları addım-addım həll et.", badge: "Yeni Başlanğıc" };
}

function TopicSelector({ grade, onSelect }: { grade: number; onSelect: (topic: TopicPack) => void }) {
  const topics = getTopicsForGrade(grade);
  return (
    <section className="mt-8 grid gap-4 md:grid-cols-2">
      {topics.map((topic) => (
        <button key={topic.slug} onClick={() => onSelect(topic)} className="group rounded-3xl border border-slate-200 bg-white/90 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-glow">
          <div className="flex items-center justify-between gap-3">
            <BookOpen className="h-7 w-7 text-indigo-600" />
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{topic.tasks.length} real tapşırıq</span>
          </div>
          <h3 className="mt-5 text-2xl font-black text-slate-950">{topic.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{topic.description}</p>
          <div className="mt-5 flex items-center justify-between text-sm font-bold text-indigo-600">
            <span>{topic.xp} XP</span>
            <span className="group-hover:translate-x-1 transition">Başla →</span>
          </div>
        </button>
      ))}
    </section>
  );
}

function Results({ topic, tasks, answers, onReset }: { topic: TopicPack; tasks: MathTask[]; answers: Answers; onReset: () => void }) {
  const correct = tasks.filter((task) => answers[task.id] === task.answer);
  const percent = Math.round((correct.length / tasks.length) * 100);
  const wrongSkills = tasks.filter((task) => answers[task.id] !== task.answer).map((task) => task.skill);
  const message = resultMessage(percent);

  return (
    <Card className="mt-8 overflow-hidden border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-emerald-50 p-0">
      <div className="grid gap-0 lg:grid-cols-[.85fr_1.15fr]">
        <div className="bg-slate-950 p-8 text-white">
          <Award className="h-12 w-12 text-emerald-300" />
          <p className="mt-6 text-sm font-bold uppercase tracking-[.25em] text-emerald-200">Nəticə paneli</p>
          <h2 className="mt-3 text-4xl font-black">{message.title}</h2>
          <p className="mt-4 leading-7 text-slate-300">{message.text}</p>
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black">{percent}%</p><p className="text-xs text-slate-300">Dəqiqlik</p></div>
            <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black">+{Math.round(topic.xp * percent / 100)}</p><p className="text-xs text-slate-300">XP</p></div>
            <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black">{correct.length}/{tasks.length}</p><p className="text-xs text-slate-300">Doğru</p></div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-black text-white"><Sparkles className="mr-2 inline h-4 w-4" />{message.badge}</span>
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-800"><Flame className="mr-2 inline h-4 w-4" />Seriya qorundu</span>
          </div>
          {topic.grade <= 4 && (
            <div className="mt-6 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50 p-5 text-center shadow-sm">
              <p className="text-xs font-black uppercase tracking-[.25em] text-amber-700">Sertifikat</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">Kiçik Riyaziyyatçı Sertifikatı</h3>
              <p className="mt-2 text-sm font-semibold text-slate-700">{topic.grade}-ci sinif üzrə {topic.title} mövzusunda çalışdığın üçün təbriklər! Sən hər cəhdlə daha ağıllı, daha diqqətli və daha inamlı olursan.</p>
              <p className="mt-3 text-sm font-black text-emerald-700">Ulduzunu qoru: səhvlər öyrənməyin ən güclü yoludur ⭐</p>
            </div>
          )}
          <h3 className="mt-7 text-2xl font-black">Zəif bacarıqlar</h3>
          {wrongSkills.length ? <div className="mt-4 flex flex-wrap gap-2">{wrongSkills.map((skill) => <span key={skill} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm">{skill}</span>)}</div> : <p className="mt-4 rounded-2xl bg-white p-4 font-bold text-emerald-700">Zəif bacarıq yoxdur — bütün cavablar doğrudur.</p>}
          <h3 className="mt-7 text-2xl font-black">Səhvlərdən öyrən</h3>
          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  {answers[task.id] === task.answer ? <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" /> : <XCircle className="mt-1 h-5 w-5 shrink-0 text-rose-500" />}
                  <div>
                    <p className="font-bold">{task.question}</p>
                    <p className="mt-1 text-sm text-slate-600">Sənin cavabın: <b>{answers[task.id] ?? "boş"}</b> · Doğru cavab: <b>{task.answer}</b></p>
                    <p className="mt-2 text-sm text-slate-500">{task.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={onReset} className="mt-6"><RotateCcw className="mr-2 h-4 w-4" />Yenidən başla</Button>
        </div>
      </div>
    </Card>
  );
}

function sessionTasks(topic: TopicPack | null, seed: number) {
  if (!topic) return [];
  return [...topic.tasks]
    .sort((a, b) => {
      const hashA = a.id.length * 13 + a.question.length * 7 + seed * (a.skill.length + 3);
      const hashB = b.id.length * 13 + b.question.length * 7 + seed * (b.skill.length + 3);
      return (hashA % 97) - (hashB % 97);
    })
    .slice(0, 10);
}

export function TaskPractice() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicPack | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [refreshSeed, setRefreshSeed] = useState(1);
  const activeTasks = useMemo(() => sessionTasks(selectedTopic, refreshSeed), [selectedTopic, refreshSeed]);

  const completed = selectedTopic ? activeTasks.every((task) => answers[task.id]) : false;
  const answeredCount = selectedTopic ? activeTasks.filter((task) => answers[task.id]).length : 0;
  const progress = selectedTopic ? Math.round((answeredCount / activeTasks.length) * 100) : 0;

  const headline = useMemo(() => {
    if (!selectedGrade) return "Əvvəl sinfini seç";
    if (!selectedTopic) return `${selectedGrade}-ci sinif üçün mövzu seç`;
    return selectedTopic.title;
  }, [selectedGrade, selectedTopic]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="font-bold text-indigo-600">İşlək tapşırıq bazası · 1–11-ci sinif</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{headline}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Sinif → mövzu → real tapşırıqlar → instant izah → nəticə. Hər sinifdə 200+ tapşırıq var; hər nəticədən sonra set yenilənir və yeni suallar gəlir.</p>
        </div>
        {selectedGrade && <Button variant="secondary" onClick={() => { setSelectedGrade(null); setSelectedTopic(null); setAnswers({}); setRefreshSeed((seed) => seed + 1); }}><ArrowLeft className="mr-2 h-4 w-4" />Sinfi dəyiş</Button>}
      </div>

      {!selectedGrade && (
        <section className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {grades.map((grade) => (
            <button key={grade.id} onClick={() => setSelectedGrade(grade.id)} className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-glow">
              <GraduationCap className="h-7 w-7 text-indigo-600" />
              <p className="mt-4 text-2xl font-black">{grade.label}</p>
              <p className="mt-1 text-sm text-slate-500">{getTaskCountForGrade(grade.id)} tapşırıq</p>
            </button>
          ))}
        </section>
      )}

      {selectedGrade && !selectedTopic && <TopicSelector grade={selectedGrade} onSelect={(topic) => { setSelectedTopic(topic); setAnswers({}); setRefreshSeed((seed) => seed + 1); }} />}

      {selectedTopic && (
        <>
          <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Button variant="ghost" onClick={() => { setSelectedTopic(null); setAnswers({}); setRefreshSeed((seed) => seed + 1); }}><ArrowLeft className="mr-2 h-4 w-4" />Mövzulara qayıt</Button>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-black shadow-sm"><Target className="mr-2 inline h-4 w-4 text-indigo-600" />{answeredCount}/{activeTasks.length} tamamlandı · {progress}%</div>
          </div>

          <section className="mt-6 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <Card className="h-fit bg-indigo-600 text-white">
              <p className="text-sm font-black uppercase tracking-[.2em] text-indigo-100">Qısa dərs</p>
              <h2 className="mt-3 text-3xl font-black">{selectedTopic.title}</h2>
              <p className="mt-4 leading-8 text-indigo-50">{selectedTopic.lesson}</p>
              <div className="mt-6 rounded-3xl bg-white/15 p-5 text-center text-2xl font-black">{selectedTopic.example}</div>
            </Card>
            <div className="space-y-5">
              {activeTasks.map((task, index) => {
                const selected = answers[task.id];
                const isCorrect = selected === task.answer;
                return (
                  <Card key={task.id} className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">#{index + 1}</span>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">{task.difficulty}</span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{task.sourceStyle}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-black leading-8">{task.question}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {task.options.map((option) => (
                        <button key={option} disabled={Boolean(selected)} onClick={() => setAnswers((current) => current[task.id] ? current : ({ ...current, [task.id]: option }))} className={cn("rounded-2xl border p-4 text-left font-bold transition disabled:cursor-not-allowed", selected === option ? option === task.answer ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-800" : selected ? "border-slate-200 bg-slate-50 text-slate-400" : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50")}>
                          {option}
                        </button>
                      ))}
                    </div>
                    {selected && (
                      <div className={cn("mt-4 rounded-2xl p-4 text-sm", isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800")}>
                        <b>{isCorrect ? "Doğrudur!" : "Bir daha düşün."}</b> {task.explanation}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>

          {completed && <Results topic={selectedTopic} tasks={activeTasks} answers={answers} onReset={() => { setAnswers({}); setRefreshSeed((seed) => seed + 1); }} />}
        </>
      )}
    </main>
  );
}
