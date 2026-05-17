import { Card } from "@/components/ui/card";

export default function AdminPage() {
  return <main className="mx-auto max-w-7xl px-6 py-8"><h1 className="text-4xl font-black">Admin panel</h1><div className="mt-8 grid gap-5 md:grid-cols-3">{["İstifadəçilər", "Müəllim təsdiqi", "AI kontent moderasiyası", "Abunəliklər", "İmtahan nəzarəti", "Platform analitikası"].map((x)=><Card key={x}><h2 className="text-xl font-black">{x}</h2><p className="mt-2 text-slate-600">Rol əsaslı icazə və audit üçün nəzərdə tutulub.</p></Card>)}</div></main>;
}
