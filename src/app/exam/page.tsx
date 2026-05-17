import { LockKeyhole } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExamPage() { return <main className="mx-auto grid min-h-screen max-w-3xl place-items-center px-6 py-8"><Card className="w-full text-center"><LockKeyhole className="mx-auto h-12 w-12 text-indigo-600"/><h1 className="mt-4 text-4xl font-black">Təhlükəsiz imtahan girişi</h1><p className="mt-3 text-slate-600">Müəllimin verdiyi imtahan kodunu daxil edin. Sistem vaxtı, giriş sayını və pozuntu siqnallarını izləyir.</p><input className="mt-6 w-full rounded-2xl border border-slate-200 p-4 text-center text-2xl font-black tracking-[.3em]" placeholder="AZM-0000"/><Button className="mt-4 w-full">İmtahana başla</Button></Card></main>; }
