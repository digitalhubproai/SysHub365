import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClientComponentsProvider } from "@/components/ClientComponentsProvider";
import { cn } from "@/lib/utils";

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
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
  openGraph: {
    title: "SYSHUB365",
    description: "The elite standard for technical orchestration and digital product delivery.",
    type: "website",
  },
  verification: {
    google: "958484ae40003b1f",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("scroll-smooth", sora.variable, inter.variable, "font-sans")}>
      <body className="bg-transparent antialiased min-h-screen flex flex-col relative z-0">

        <div className="dynamic-bg" />
        <ClientComponentsProvider />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}



