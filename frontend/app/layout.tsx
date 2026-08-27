import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ClientComponentsProvider } from "@/components/ClientComponentsProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { cn } from "@/lib/utils";
import { OrganizationJsonLd, LocalBusinessJsonLd, FAQJsonLd } from "next-seo";

const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer));
const CookieConsentLazy = dynamic(() => import("@/components/CookieConsent").then((mod) => mod.CookieConsent));

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
  metadataBase: new URL("https://www.syshub365.com"),
  title: {
    default: "Software Development Company in Karachi, Pakistan | SYSHUB365",
    template: "%s | SYSHUB365"
  },
  description: "SYSHUB365 is a software development company in Karachi, Pakistan building high-performance web apps, AI solutions, mobile apps, and enterprise software for global clients.",
  keywords: [
    "software company",
    "web development",
    "software development",
    "app development",
    "web development agency",
    "software development company",
    "custom software development",
    "custom web development",
    "hire software developers",
    "hire software engineers",
    "website development company",
    "software house",
    "software house in Pakistan",
    "software development agency Pakistan",
    "software development company Karachi",
    "web development company Karachi",
    "offshore software development",
    "software outsourcing company",
    "full stack development",
    "front end development",
    "back end development",
    "AI development services",
    "AI integration",
    "AI solutions company",
    "machine learning solutions",
    "AI chatbot development",
    "enterprise software development",
    "enterprise systems",
    "SaaS development",
    "e-commerce website development",
    "MVP development services",
    "UI UX design services",
    "web design and development",
    "cloud computing services",
    "digital transformation",
    "digital agency",
    "IT solutions company",
    "tech startup development",
    "scalable web apps",
    "best software company",
    "SysHub365"
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
    languages: {
      "en": "/",
    },
  },
  icons: {
    icon: "/images/favicon.svg",
    shortcut: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Software Development Company in Karachi, Pakistan | SYSHUB365",
    description: "SYSHUB365 is a software development company in Karachi, Pakistan. We build high-performance web apps, AI solutions, and enterprise software for global visionaries.",
    url: "https://www.syshub365.com",
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
    title: "Software Development Company in Karachi, Pakistan | SYSHUB365",
    description: "SYSHUB365 is a software development company in Karachi, Pakistan building high-performance web apps, AI solutions, and enterprise software.",
    images: ["/images/logo.png"],
  },
  verification: {
    google: "958484ae40003b1f",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("scroll-smooth", sora.variable, inter.variable, "font-sans")}>
      <body className={cn("bg-transparent antialiased min-h-screen flex flex-col relative z-0")}>
        <AnalyticsProvider />
        <div className="dynamic-bg" />
        <ClientComponentsProvider />
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
        <CookieConsentLazy />
        <OrganizationJsonLd
          scriptKey="organization"
          name="SYSHUB365"
          url="https://www.syshub365.com"
          logo="https://www.syshub365.com/images/logo.png"
          description="SYSHUB365 is a premium software engineering studio specializing in high-performance web systems and AI integration."
          email="hello@syshub365.com"
          telephone="+923356660365"
          address={{
            "@type": "PostalAddress",
            streetAddress: "A-407, Maymar Tower, Sector X-2, Gulshan-e-Maymar",
            addressLocality: "Karachi",
            addressCountry: "PK",
          }}
          sameAs={[
            "https://www.linkedin.com/company/syshub365/",
            "https://web.facebook.com/profile.php?id=61588992526864",
            "https://www.x.com/syshub365",
            "https://www.instagram.com/syshub365/",
          ]}
        />
        <LocalBusinessJsonLd
          scriptKey="local-business"
          type="ProfessionalService"
          name="SYSHUB365"
          description="Premium software engineering studio building high-performance web apps, AI solutions, and enterprise digital ecosystems."
          url="https://www.syshub365.com"
          telephone="+923356660365"
          email="hello@syshub365.com"
          address={{
            "@type": "PostalAddress",
            streetAddress: "A-407, Maymar Tower, Sector X-2, Gulshan-e-Maymar",
            addressLocality: "Karachi",
            addressCountry: "PK",
          }}
          sameAs={[
            "https://www.linkedin.com/company/syshub365/",
            "https://web.facebook.com/profile.php?id=61588992526864",
            "https://www.x.com/syshub365",
            "https://www.instagram.com/syshub365/",
          ]}
        />
        <FAQJsonLd
          scriptKey="faq"
          questions={[
            {
              question: "How long does a typical project take?",
              answer: "Project timelines vary widely. A basic MVP can take 4-6 weeks, while a full-scale enterprise platform might take 3-6 months.",
            },
            {
              question: "Do you design the product as well as build it?",
              answer: "Yes. We offer end-to-end services. Our UI/UX team will create high-fidelity prototypes in Figma for your approval.",
            },
          ]}
        />
      </body>
    </html>
  );
}
