import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | SysHub365",
  description: "End-to-end software development, from conceptual design and prototyping to enterprise-grade deployment, AI integration, and global scaling.",
  openGraph: {
    title: "Our Services | SysHub365",
    description: "End-to-end software development and AI integration services.",
    type: "website",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
