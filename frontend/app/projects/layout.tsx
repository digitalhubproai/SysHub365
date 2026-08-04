import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | SysHub365",
  description: "A curated showcase of our most complex deployments, from AI-driven healthcare platforms to high-performance fintech architectures.",
  keywords: [
    "SysHub365 portfolio",
    "software case studies",
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
    title: "Portfolio & Case Studies | SysHub365",
    description: "A curated showcase of our most complex deployments.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio & Case Studies | SysHub365",
    description: "A curated showcase of our most complex deployments.",
    images: ["/images/logo.png"],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
