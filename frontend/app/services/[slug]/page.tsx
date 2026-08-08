import { Metadata } from "next";
import ServiceDetailClient from "./ServiceDetailClient";
import { BreadcrumbJsonLd } from "next-seo";

const SERVICE_META: Record<string, { title: string; description: string; keywords: string[] }> = {
  "web-development": {
    title: "Enterprise Web Systems",
    description: "Architecting high-availability, low-latency web platforms that serve as the backbone of modern enterprise operations.",
    keywords: [
      "enterprise web systems",
      "web development company",
      "custom web platform development",
      "high availability web systems",
      "web application development services",
      "web portal development",
      "scalable web applications",
      "web app development company",
      "enterprise web application development",
      "custom website development services",
    ],
  },
  "ai-integration": {
    title: "AI Integration",
    description: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows for maximum efficiency.",
    keywords: [
      "AI integration services",
      "AI automation for business",
      "ChatGPT integration services",
      "AI chatbot development",
      "generative AI solutions",
      "machine learning integration",
      "AI consulting",
      "artificial intelligence company",
      "AI solutions for business",
      "business automation AI",
    ],
  },
  "ui-ux-design": {
    title: "UI/UX Product Design",
    description: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design.",
    keywords: [
      "UI UX design services",
      "product design agency",
      "mobile app design",
      "web design company",
      "user interface design",
      "Figma design services",
      "UX research",
      "app UI design",
      "website UI UX design",
      "conversion focused design",
    ],
  },
  "cloud-solutions": {
    title: "Cloud Infrastructure",
    description: "Secure, highly-available infrastructure setup on AWS, Azure, and GCP with full CI/CD automation and global sync.",
    keywords: [
      "cloud computing services",
      "AWS cloud services",
      "Azure migration",
      "GCP solutions",
      "CI/CD automation",
      "DevOps services",
      "cloud infrastructure management",
      "cloud migration services",
      "cloud hosting solutions",
      "DevOps consulting",
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Data-driven SEO, performance marketing, and targeted campaigns to drastically scale your online presence and revenue.",
    keywords: [
      "digital marketing agency",
      "SEO services",
      "Google Ads management",
      "social media marketing",
      "content marketing",
      "performance marketing agency",
      "brand growth",
      "SEO services Pakistan",
      "online marketing services",
      "digital marketing company",
    ],
  },
  "cybersecurity": {
    title: "Cybersecurity Defense",
    description: "Enterprise-grade security audits and implementation to protect your digital assets and ensure global compliance.",
    keywords: [
      "cybersecurity services",
      "penetration testing services",
      "security audit",
      "compliance services",
      "data protection",
      "network security solutions",
      "cybersecurity consulting",
      "vulnerability assessment",
      "application security",
      "cyber defense services",
    ],
  },
  "software-licensing": {
    title: "Software Licensing",
    description: "Comprehensive licensing for all types of software — from enterprise operating systems to specialized SaaS tools.",
    keywords: [
      "software licensing services",
      "SaaS licensing",
      "license management",
      "enterprise licensing",
      "software compliance",
      "software licensing solutions",
      "license key management",
      "software monetization",
      "SaaS subscription management",
      "enterprise software licensing",
    ],
  },
  "graphic-design": {
    title: "Graphic Design",
    description: "Professional brand identity, modern logos, and custom marketing materials to visually elevate your brand.",
    keywords: [
      "graphic design services",
      "logo design agency",
      "brand identity design",
      "marketing design",
      "creative design studio",
      "professional logo design",
      "branding services",
      "graphic designer for hire",
      "corporate identity design",
      "print design services",
    ],
  },
  "erp-solutions": {
    title: "ERP Solutions",
    description: "Centralized systems that connect finance, operations, and people in one high-performance source of truth.",
    keywords: [
      "ERP solutions",
      "ERP implementation services",
      "custom ERP development",
      "business management software",
      "enterprise resource planning",
      "ERP software company",
      "ERP consulting",
      "ERP integration services",
      "operations management software",
      "ERP for small business",
    ],
  },
  "crm-solutions": {
    title: "CRM Solutions",
    description: "Custom workflows that turn customer data into relationships and accelerated revenue growth.",
    keywords: [
      "CRM solutions",
      "custom CRM development",
      "CRM implementation",
      "sales management software",
      "customer relationship management",
      "CRM software company",
      "CRM development services",
      "CRM consulting",
      "customer data platform",
      "sales automation software",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICE_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_META[slug];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Our Services`,
    description: service.description,
    keywords: [
      "SysHub365 services",
      service.title.toLowerCase(),
      "software development",
      "enterprise solutions",
      "digital transformation",
      ...service.keywords,
    ],
    alternates: {
      canonical: `/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} | SysHub365`,
      description: service.description,
      type: "website",
      images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | SysHub365 Services`,
      description: service.description,
      images: ["/images/logo.png"],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICE_META[slug];

  return (
    <>
      <BreadcrumbJsonLd
        scriptKey="service-breadcrumb"
        items={[
          { name: "Home", item: "https://www.syshub365.com" },
          { name: "Services", item: "https://www.syshub365.com/services" },
          { name: service?.title || slug, item: `https://www.syshub365.com/services/${slug}` },
        ]}
      />
      <ServiceDetailClient />
    </>
  );
}
