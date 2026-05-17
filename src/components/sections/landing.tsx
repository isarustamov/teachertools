import { ArrowRight, BarChart3, BookOpen, Bot, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { AnimatedPreview } from "@/components/animated-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { grades, topicMap } from "@/data/curriculum";
import { azCurrency } from "@/lib/utils";

const features = [
  { icon: Bot, title: "Azərbaycan dilində AI tutor", text: "Cavabı gizlədərək ipucu verir, səhvləri izah edir və düşünmə vərdişi yaradır." },
  { icon: BookOpen, title: "1–11-ci sinif kurikulumu", text: "Hesab, kəsrlər, həndəsə, cəbr, funksiyalar, ehtimal, triqonometriya və olimpiada mövzuları." },
  { icon: ShieldCheck, title: "Təhlükəsiz imtahan rejimi", text: "Unikal kod, bir dəfə giriş, timer, qarışdırılmış suallar və anti-cheat siqnalları." },
  { icon: BarChart3, title: "Müəllim və valideyn analitikası", text: "Zəif mövzular, dəqiqlik, inkişaf xətti, PDF hesabatlar və fərdi planlar." }
];

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3 text-lg font-black"><span className="rounded-2xl bg-indigo-600 p-2 text-white">∑</span> MathMind AI Azerbaijan</Link>
        <div className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/learn">Dərslər</Link><Link href="/teacher">Müəllim</Link><Link href="/pricing">Qiymətlər</Link><Link href="/exam">İmtahan kodu</Link>
        </div>
        <Link href="/dashboard"><Button>Başla</Button></Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Badge><Sparkles className="mr-2 h-3.5 w-3.5" /> Azərbaycan məktəbləri üçün investor-grade EdTech</Badge>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Riyaziyyatı oyun, AI və dərin anlayışla öyrən.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">MathMind AI Azerbaijan Duolingo motivasiyasını, Khan Academy izahlarını, Quizizz yarışlarını və Brilliant interaktivliyini Azərbaycan kurikulumuna uyğun vahid platformada birləşdirir.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard"><Button className="w-full sm:w-auto">Pulsuz sına <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/teacher"><Button variant="secondary" className="w-full sm:w-auto">Müəllim panelinə bax</Button></Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {["11 sinif", "12+ mövzu", "AI tutor"].map((item) => <div key={item} className="rounded-2xl bg-white/80 p-4 font-black shadow-sm">{item}</div>)}
          </div>
        </div>
        <AnimatedPreview />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          {features.map((feature) => <Card key={feature.title}><feature.icon className="h-8 w-8 text-indigo-600" /><h3 className="mt-4 text-xl font-black">{feature.title}</h3><p className="mt-3 text-slate-600">{feature.text}</p></Card>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2">
        <Card className="bg-indigo-600 text-white">
          <GraduationCap className="h-10 w-10" /><h2 className="mt-4 text-3xl font-black">Dinamik kurikulum strukturu</h2>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">{grades.map((grade) => <span key={grade.id} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-bold">{grade.label}</span>)}</div>
        </Card>
        <Card>
          <h2 className="text-3xl font-black">Mövzular bazası</h2>
          <div className="mt-6 flex flex-wrap gap-2">{topicMap.map((topic) => <span key={topic} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{topic}</span>)}</div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {["Şagird", "Premium", "Məktəb"].map((plan, index) => <Card key={plan} className={index === 1 ? "border-indigo-300 shadow-glow" : ""}><Badge>{plan}</Badge><p className="mt-5 text-4xl font-black">{index === 0 ? "Pulsuz" : azCurrency(index === 1 ? 9 : 99)}<span className="text-sm font-semibold text-slate-500"> / ay</span></p><ul className="mt-6 space-y-3 text-sm text-slate-600">{["Adaptiv dərslər", "Mini testlər", "XP və rozetlər", index ? "Limitsiz AI tutor" : "Gündəlik AI limiti", index === 2 ? "Məktəb analitikası" : "Fərdi analitika"].map((x) => <li key={x} className="flex gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" />{x}</li>)}</ul></Card>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Card className="grid items-center gap-8 bg-slate-950 p-8 text-white lg:grid-cols-[1fr_auto]">
          <div><Users className="h-9 w-9 text-emerald-300" /><h2 className="mt-4 text-4xl font-black">Sinifinizi bu gün AI ilə gücləndirin.</h2><p className="mt-3 text-slate-300">Müəllimlər tapşırıq, imtahan, iş vərəqi və olimpiada suallarını dəqiq nəzarətlə yaradır.</p></div>
          <Link href="/teacher"><Button className="bg-emerald-500 hover:bg-emerald-400">Demo panel</Button></Link>
        </Card>
      </section>
    </main>
  );
}
