"use client";

import { motion } from "framer-motion";
import { Brain, Flame, Lock, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AnimatedPreview() {
  const items = [
    { icon: Brain, label: "AI tutor", value: "Addım-addım ipucu" },
    { icon: Flame, label: "Seriya", value: "14 gün" },
    { icon: Trophy, label: "XP", value: "+840" },
    { icon: Lock, label: "İmtahan", value: "Təhlükəsiz rejim" }
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
      <Card className="math-grid relative overflow-hidden p-4 shadow-glow">
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-bold">6-cı sinif · Kəsrlər</span>
            <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">Canlı dərs</span>
          </div>
          <div className="rounded-2xl bg-white p-5 text-slate-900">
            <p className="text-sm text-slate-500">Sual</p>
            <p className="mt-1 text-2xl font-black">1/4 + 2/4 = ?</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["3/8", "3/4", "2/8", "1/2"].map((answer) => (
                <button key={answer} className={answer === "3/4" ? "rounded-xl bg-emerald-500 p-3 font-bold text-white" : "rounded-xl bg-slate-100 p-3 font-bold"}>{answer}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {items.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }} className="rounded-2xl bg-white/90 p-4 shadow-sm">
              <item.icon className="h-5 w-5 text-indigo-600" />
              <p className="mt-2 text-xs text-slate-500">{item.label}</p>
              <p className="font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
