import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights - Software Engineering Blog",
  description: "Read the latest software engineering, AI, and web development insights from SYSHUB365, a software house in Karachi, Pakistan.",
  keywords: [
    "software engineering blog",
    "tech insights",
    "architectural patterns",
    "AI trends",
    "web development articles",
    "SysHub365 blog",
    "software development blog",
    "web development tips",
    "AI trends 2026",
    "technology insights",
    "software architecture articles",
    "developer blog",
    "tech news",
    "programming articles",
    "engineering best practices",
    "digital transformation blog"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Software Engineering Blog | SYSHUB365",
    description: "AI, web development, and software engineering insights from SYSHUB365, Karachi, Pakistan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering Blog | SYSHUB365",
    description: "AI, web development, and software engineering insights from SYSHUB365, Karachi, Pakistan.",
    images: ["/images/logo.png"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
