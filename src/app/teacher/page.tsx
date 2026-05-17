import { FileText, LineChart, School, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TeacherPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="text-4xl font-black">Müəllim idarəetmə paneli</h1><p className="mt-3 max-w-3xl text-slate-600">Siniflər, AI tapşırıqlar, kodlu imtahanlar, zəif sahə analitikası və PDF hesabat ixracı üçün vahid mərkəz.</p>
      <section className="mt-8 grid gap-5 md:grid-cols-4">{[{icon:School,t:"Siniflər",v:"6"},{icon:Wand2,t:"AI generasiya",v:"128"},{icon:LineChart,t:"Orta nəticə",v:"82%"},{icon:FileText,t:"PDF hesabat",v:"Hazır"}].map((x)=><Card key={x.t}><x.icon className="h-7 w-7 text-indigo-600"/><p className="mt-4 text-sm text-slate-500">{x.t}</p><p className="text-3xl font-black">{x.v}</p></Card>)}</section>
      <section className="mt-8 grid gap-6 lg:grid-cols-2"><Card><h2 className="text-2xl font-black">Yeni imtahan kodu</h2><p className="mt-3 text-slate-600">Unikal kod, bir dəfə giriş, sual randomizasiyası və avtomatik submit.</p><div className="mt-5 rounded-2xl bg-slate-950 p-5 text-center text-3xl font-black tracking-[.35em] text-emerald-300">AZM-4821</div><Button className="mt-5 w-full">Kod yarat</Button></Card><Card><h2 className="text-2xl font-black">AI iş vərəqi generatoru</h2><textarea className="mt-4 min-h-36 w-full rounded-2xl border border-slate-200 p-4" placeholder="Məsələn: 7-ci sinif üçün xətti tənliklərdən 12 sual, orta çətinlik..."/><Button className="mt-4">Generasiya et</Button></Card></section>
    </main>
  );
}
