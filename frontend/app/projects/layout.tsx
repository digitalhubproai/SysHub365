import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | SYSHUB365",
  description: "View SYSHUB365's software development portfolio: AI platforms, web apps, fintech, healthcare software, and mobile apps built by our software house in Karachi, Pakistan.",
  keywords: [
    "SysHub365 portfolio",
    "software case studies",
    "software development portfolio",
    "web development projects",
    "AI platform examples",
    "fintech architecture",
    "healthcare software",
    "digital product showcase",
    "our work",
    "software portfolio",
    "web development case studies",
    "successful software projects",
    "SaaS examples",
    "AI project showcase",
    "fintech software examples",
    "healthcare software solutions",
    "client success stories",
    "previous work software company",
    "custom projects portfolio"
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Software Development Portfolio | SYSHUB365",
    description: "AI platforms, web apps, and enterprise software built by our software house in Karachi, Pakistan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Portfolio | SYSHUB365",
    description: "AI platforms, web apps, and enterprise software built by our software house in Karachi, Pakistan.",
    images: ["/images/logo.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
