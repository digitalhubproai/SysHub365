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
  metadataBase: new URL("https://syshub365.com"),
  title: {
    default: "SYSHUB365 | Premium Software Engineering Studio",
    template: "%s | SYSHUB365"
  },
  description: "SYSHUB365 is a premium software engineering studio building high-performance web applications, AI-driven solutions, and enterprise digital ecosystems for global visionaries.",
  keywords: [
    "software engineering", 
    "web development studio", 
    "AI integration", 
    "enterprise systems", 
    "custom software development",
    "digital transformation",
    "scalable web apps",
    "technical orchestration"
  ],
  authors: [{ name: "SYSHUB365 Team" }],
  creator: "SYSHUB365",
  publisher: "SYSHUB365",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "SYSHUB365 | Premium Software Engineering Studio",
    description: "Architecting high-performance digital ecosystems for global visionaries. Professional software engineering with architectural precision.",
    url: "https://syshub365.com",
    siteName: "SYSHUB365",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "SYSHUB365 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SYSHUB365 | Premium Software Engineering Studio",
    description: "Architecting high-performance digital ecosystems for global visionaries.",
    images: ["/images/logo.png"],
  },
  verification: {
    google: "958484ae40003b1f",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SYSHUB365",
    "url": "https://syshub365.com",
    "logo": "https://syshub365.com/images/logo.png",
    "description": "SYSHUB365 is a premium software engineering studio specializing in high-performance web systems and AI integration."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a typical project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Project timelines vary widely. A basic MVP can take 4-6 weeks, while a full-scale enterprise platform might take 3-6 months."
        }
      },
      {
        "@type": "Question",
        "name": "Do you design the product as well as build it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We offer end-to-end services. Our UI/UX team will create high-fidelity prototypes in Figma for your approval."
        }
      }
    ]
  };

  return (
    <html lang="en" className={cn("scroll-smooth", sora.variable, inter.variable, "font-sans")}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
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
