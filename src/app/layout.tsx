import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MathMind AI Azerbaijan — Azərbaycan üçün AI Riyaziyyat Platforması",
  description: "1–11-ci siniflər üçün Azərbaycan dilində adaptiv riyaziyyat dərsləri, AI tutor, imtahan rejimi və müəllim analitikası.",
  keywords: ["riyaziyyat", "Azərbaycan", "AI tutor", "imtahan", "müəllim paneli", "şagird"],
  openGraph: { title: "MathMind AI Azerbaijan", description: "Premium Azərbaycan EdTech riyaziyyat ekosistemi", locale: "az_AZ", type: "website" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
