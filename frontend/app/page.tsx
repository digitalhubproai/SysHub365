import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SYSHUB365 | Premium Software Engineering Studio",
  description: "SYSHUB365 is a premium software engineering studio building high-performance web apps, AI solutions, and enterprise digital ecosystems for global visionaries.",
  keywords: [
    "software engineering studio",
    "web development agency",
    "AI solutions",
    "enterprise software",
    "custom web applications",
    "digital transformation",
    "full-stack development",
    "software company",
    "web development company",
    "software development services",
    "website development",
    "app development company",
    "hire software developers",
    "custom software development company",
    "software development company in Pakistan",
    "web development company in Karachi",
    "AI integration services",
    "mobile app development",
    "ecommerce website development",
    "SaaS development company",
    "cloud solutions provider",
    "UI UX design company",
    "tech solutions company",
    "top software house Pakistan",
    "SysHub365"
  ],
  openGraph: {
    title: "SYSHUB365 | Premium Software Engineering Studio",
    description: "SYSHUB365 is a premium software engineering studio building high-performance web apps, AI solutions, and enterprise digital ecosystems for global visionaries.",
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
  alternates: {
    canonical: "https://www.syshub365.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
    </>
  );
}
