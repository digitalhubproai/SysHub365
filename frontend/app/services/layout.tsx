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
    "web development services",
    "website development",
    "custom web application development",
    "AI automation agency",
    "ChatGPT integration",
    "chatbot development services",
    "UI UX design agency",
    "product design services",
    "cloud migration services",
    "AWS services",
    "Azure cloud services",
    "GCP solutions",
    "digital marketing agency",
    "SEO services",
    "performance marketing",
    "cybersecurity services",
    "penetration testing",
    "software licensing services",
    "SaaS licensing",
    "graphic design services",
    "logo design agency",
    "ERP solutions",
    "ERP implementation",
    "CRM development",
    "custom CRM",
    "full stack development services",
    "ecommerce development services",
    "software services company",
    "IT services Pakistan"
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
