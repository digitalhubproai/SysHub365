import type { IconType } from "react-icons";
import {
  LuCode,
  LuBrainCog,
  LuPalette,
  LuCloud,
  LuMegaphone,
  LuShieldCheck,
  LuKey,
  LuPenTool,
  LuDatabase,
  LuUsers,
  LuSmartphone,
  LuShoppingCart,
  LuChartColumn,
  LuCompass,
  LuServer,
} from "react-icons/lu";

export type ServiceEntry = {
  icon: IconType;
  title: string;
  slug: string;
  desc: string;
  gradient: [string, string];
  id: string;
};

export const SERVICES: ServiceEntry[] = [
  {
    icon: LuCode,
    title: "Enterprise Web Systems",
    slug: "web-development",
    desc: "Architecting high-availability, low-latency web platforms that serve as the backbone of modern enterprise operations.",
    gradient: ["#06b6d4", "#2563eb"],
    id: "grad-web",
  },
  {
    icon: LuBrainCog,
    title: "AI Integration",
    slug: "ai-integration",
    desc: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows for maximum efficiency.",
    gradient: ["#8b5cf6", "#d946ef"],
    id: "grad-ai",
  },
  {
    icon: LuPalette,
    title: "UI/UX Product Design",
    slug: "ui-ux-design",
    desc: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design.",
    gradient: ["#f43f5e", "#fb923c"],
    id: "grad-design",
  },
  {
    icon: LuCloud,
    title: "Cloud Infrastructure",
    slug: "cloud-solutions",
    desc: "Secure, highly-available infrastructure setup on AWS, Azure, and GCP with full CI/CD automation and global sync.",
    gradient: ["#3b82f6", "#06b6d4"],
    id: "grad-cloud",
  },
  {
    icon: LuMegaphone,
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "Data-driven SEO, performance marketing, and targeted campaigns to drastically scale your online presence and revenue.",
    gradient: ["#10b981", "#3b82f6"],
    id: "grad-marketing",
  },
  {
    icon: LuShieldCheck,
    title: "Cybersecurity Defense",
    slug: "cybersecurity",
    desc: "Enterprise-grade security audits and implementation to protect your digital assets and ensure global compliance.",
    gradient: ["#ef4444", "#8b5cf6"],
    id: "grad-security",
  },
  {
    icon: LuKey,
    title: "Software Licensing",
    slug: "software-licensing",
    desc: "Comprehensive licensing for all types of software, from enterprise operating systems to specialized SaaS tools.",
    gradient: ["#fb923c", "#f43f5e"],
    id: "grad-license",
  },
  {
    icon: LuPenTool,
    title: "Graphic Design",
    slug: "graphic-design",
    desc: "Professional brand identity, modern logos, and custom marketing materials to visually elevate your brand.",
    gradient: ["#eab308", "#f97316"],
    id: "grad-graphic",
  },
  {
    icon: LuDatabase,
    title: "ERP Solutions",
    slug: "erp-solutions",
    desc: "Centralized systems that connect finance, operations, and people in one high-performance source of truth.",
    gradient: ["#06b6d4", "#10b981"],
    id: "grad-erp",
  },
  {
    icon: LuUsers,
    title: "CRM Solutions",
    slug: "crm-solutions",
    desc: "Custom workflows that turn customer data into relationships and accelerated revenue growth.",
    gradient: ["#3b82f6", "#8b5cf6"],
    id: "grad-crm",
  },
  {
    icon: LuSmartphone,
    title: "Mobile App Development",
    slug: "mobile-apps",
    desc: "Native iOS & Android and cross-platform apps engineered for blazing performance, offline resilience, and store-scale reach.",
    gradient: ["#06b6d4", "#6366f1"],
    id: "grad-mobile",
  },
  {
    icon: LuShoppingCart,
    title: "E-Commerce Development",
    slug: "ecommerce-development",
    desc: "High-converting storefronts and marketplaces, from headless commerce and Shopify to custom carts with seamless payments.",
    gradient: ["#f97316", "#ec4899"],
    id: "grad-ecom",
  },
  {
    icon: LuChartColumn,
    title: "Data & Analytics",
    slug: "data-analytics",
    desc: "Turn raw data into decisions with modern data pipelines, warehouses, and business-intelligence dashboards your team uses.",
    gradient: ["#0891b2", "#10b981"],
    id: "grad-data",
  },
  {
    icon: LuCompass,
    title: "Product Strategy & MVP",
    slug: "product-strategy",
    desc: "Validate fast and build right through product audits, MVP sprints, and roadmaps that de-risk your idea before you over-invest.",
    gradient: ["#6366f1", "#a855f7"],
    id: "grad-strategy",
  },
  {
    icon: LuServer,
    title: "Managed IT & Support",
    slug: "managed-services",
    desc: "Ongoing 24/7 monitoring, maintenance, and technical support to keep apps, infrastructure, and security running smoothly.",
    gradient: ["#64748b", "#3b82f6"],
    id: "grad-managed",
  },
];
