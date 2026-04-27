import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | SysHub365",
  description: "A curated showcase of our most complex deployments, from AI-driven healthcare platforms to high-performance fintech architectures.",
  openGraph: {
    title: "Portfolio & Case Studies | SysHub365",
    description: "A curated showcase of our most complex deployments.",
    type: "website",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
