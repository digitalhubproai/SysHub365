import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SYSHUB365 | Premium Software Engineering Studio",
  description: "SYSHUB365 is a premium software engineering studio building high-performance web applications, AI-driven solutions, and enterprise digital ecosystems for global visionaries. Professional technical orchestration with architectural precision.",
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
  alternates: {
    canonical: "https://syshub365.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hidden SEO content for crawlers to prioritize correct context over component text */}
      <div className="sr-only">
        <h1>SYSHUB365 - Professional Software Engineering House</h1>
        <p>
          We design and build high-performance web systems, custom ERPs, and AI-integrated applications. 
          Our team focuses on solving complex technical challenges with precision-engineered code that helps businesses scale efficiently.
        </p>
      </div>
      <HomeClient />
    </>
  );
}
