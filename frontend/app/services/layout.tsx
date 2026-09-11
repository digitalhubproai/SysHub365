import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Software Development Services in Karachi",
  description: "End-to-end software development services in Karachi, Pakistan: web apps, AI integration, mobile apps, cloud, UI/UX design, ERP, CRM, and enterprise software from SYSHUB365.",
  keywords: [
    "software development services",
    "software development services in Karachi",
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
    title: "Software Development Services in Karachi | SYSHUB365",
    description: "End-to-end software development and AI integration services in Karachi, Pakistan.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development Services in Karachi | SYSHUB365",
    description: "End-to-end software development and AI integration services in Karachi, Pakistan.",
    images: ["/images/logo.png"],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
