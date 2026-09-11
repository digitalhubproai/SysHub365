import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Hire Software Developers in Karachi, Pakistan",
  description: "Contact SYSHUB365 to hire software developers in Karachi, Pakistan. Get a free consultation for web development, AI solutions, mobile apps, and enterprise software projects.",
  keywords: [
    "contact SysHub365",
    "hire software developers in Karachi",
    "hire software engineers",
    "software consultation",
    "web development quote",
    "tech project inquiry",
    "get in touch",
    "contact us",
    "contact software company",
    "hire development team",
    "get web development quote",
    "software project consultation",
    "free consultation",
    "request a quote",
    "talk to software engineers",
    "start a software project",
    "software company contact number",
    "software house Pakistan contact",
    "outsource development project"
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact SYSHUB365 - Hire Software Developers in Karachi",
    description: "Contact SYSHUB365 to hire software developers in Karachi, Pakistan for your next project.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SYSHUB365 - Hire Software Developers in Karachi",
    description: "Contact SYSHUB365 to hire software developers in Karachi, Pakistan for your next project.",
    images: ["/images/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
