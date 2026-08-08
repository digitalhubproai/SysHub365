import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Read the latest technical observations, architectural patterns, and strategic engineering updates from the SysHub365 experts.",
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
    title: "Blog & Insights | SysHub365",
    description: "Read the latest technical observations, architectural patterns, and strategic engineering updates from the SysHub365 experts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | SysHub365",
    description: "Read the latest technical observations, architectural patterns, and strategic engineering updates from the SysHub365 experts.",
    images: ["/images/logo.png"],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
