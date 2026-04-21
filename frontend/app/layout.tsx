import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Chatbot } from "@/components/Chatbot";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYSHUB365",
  description: "Architecting high-performance digital ecosystems for global visionaries. Professional software engineering with architectural precision.",
  keywords: ["software orchestration", "technical excellence", "AI intelligence", "enterprise systems", "Obsidian design"],
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "SYSHUB365 - High-Performance Engineering",
    description: "The elite standard for technical orchestration and digital product delivery.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-transparent text-slate-400 antialiased min-h-screen flex flex-col relative z-0">
        <div className="dynamic-bg" />
        <Cursor />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
