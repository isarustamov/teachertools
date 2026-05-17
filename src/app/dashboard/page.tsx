import { Brain, Flame, Target, Trophy } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const weakTopics = ["Kəsrlərin müqayisəsi", "Tənlik qurma", "Həndəsi sübut"];
const recommended = ["Kəsrlərin toplanması", "Mətnli məsələlər", "Koordinat müstəvisi"];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div><p className="font-bold text-indigo-600">Salam, Aylin 👋</p><h1 className="text-4xl font-black">Bugünkü riyaziyyat yolçuluğun hazırdır</h1></div>
        <Link href="/learn"><Button>Dərsə davam et</Button></Link>
      </div>
      <section className="mt-8 grid gap-5 md:grid-cols-4">
        {[{ icon: Flame, k: "Seriya", v: "14 gün" }, { icon: Target, k: "Dəqiqlik", v: "87%" }, { icon: Brain, k: "AI tövsiyə", v: "Kəsrlər" }, { icon: Trophy, k: "XP", v: "12 480" }].map((stat) => <Card key={stat.k}><stat.icon className="h-7 w-7 text-indigo-600" /><p className="mt-4 text-sm text-slate-500">{stat.k}</p><p className="text-3xl font-black">{stat.v}</p></Card>)}
      </section>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <Card><h2 className="text-2xl font-black">Tövsiyə olunan dərslər</h2><div className="mt-5 space-y-3">{recommended.map((x, i) => <div key={x} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-bold">{x}</p><p className="text-sm text-slate-500">{10 + i * 4} dəq · adaptiv praktika</p></div><Button variant="secondary">Başla</Button></div>)}</div></Card>
        <Card><h2 className="text-2xl font-black">Zəif mövzular</h2><div className="mt-5 space-y-3">{weakTopics.map((x) => <div key={x}><div className="flex justify-between text-sm font-semibold"><span>{x}</span><span>təkrar lazımdır</span></div><div className="mt-2 h-3 rounded-full bg-slate-100"><div className="h-3 w-2/5 rounded-full bg-emerald-500" /></div></div>)}</div></Card>
      </section>
    </main>
  );
}
