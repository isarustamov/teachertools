import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-3xl border border-slate-200/80 bg-white/85 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70", className)} {...props} />;
}
