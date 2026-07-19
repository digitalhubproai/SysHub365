import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | SysHub365",
  description: "End-to-end software development, from conceptual design and prototyping to enterprise-grade deployment, AI integration, and global scaling.",
  keywords: [
    "software development services",
    "AI integration services",
    "web app development",
    "enterprise software",
    "UI/UX design",
    "prototyping",
    "cloud deployment",
    "digital strategy",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | SysHub365",
    description: "End-to-end software development and AI integration services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | SysHub365",
    description: "End-to-end software development and AI integration services.",
    images: ["/images/logo.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
