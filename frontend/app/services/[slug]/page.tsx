import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";

const SERVICE_META: Record<string, { title: string; description: string }> = {
  "web-development": {
    title: "Enterprise Web Systems",
    description: "Architecting high-availability, low-latency web platforms that serve as the backbone of modern enterprise operations.",
  },
  "ai-integration": {
    title: "AI Integration",
    description: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows for maximum efficiency.",
  },
  "ui-ux-design": {
    title: "UI/UX Product Design",
    description: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design.",
  },
  "cloud-solutions": {
    title: "Cloud Infrastructure",
    description: "Secure, highly-available infrastructure setup on AWS, Azure, and GCP with full CI/CD automation and global sync.",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Data-driven SEO, performance marketing, and targeted campaigns to drastically scale your online presence and revenue.",
  },
  "cybersecurity": {
    title: "Cybersecurity Defense",
    description: "Enterprise-grade security audits and implementation to protect your digital assets and ensure global compliance.",
  },
  "software-licensing": {
    title: "Software Licensing",
    description: "Comprehensive licensing for all types of software — from enterprise operating systems to specialized SaaS tools.",
  },
  "graphic-design": {
    title: "Graphic Design",
    description: "Professional brand identity, modern logos, and custom marketing materials to visually elevate your brand.",
  },
  "erp-solutions": {
    title: "ERP Solutions",
    description: "Centralized systems that connect finance, operations, and people in one high-performance source of truth.",
  },
  "crm-solutions": {
    title: "CRM Solutions",
    description: "Custom workflows that turn customer data into relationships and accelerated revenue growth.",
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICE_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_META[slug];

  if (!service) return { title: "Service Not Found | SysHub365" };

  return {
    title: `${service.title} | SysHub365 Services`,
    description: service.description,
    keywords: [
      "SysHub365 services",
      service.title.toLowerCase(),
      "software development",
      "enterprise solutions",
      "digital transformation",
    ],
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | SysHub365`,
      description: service.description,
      type: "website",
    },
  };
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
