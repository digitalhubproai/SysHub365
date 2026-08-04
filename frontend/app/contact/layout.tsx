import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SysHub365",
  description: "Get in touch with SysHub365. Ready to start your next project? Whether you need a full development squad or a technical consultation, we are here to help.",
  keywords: [
    "contact SysHub365",
    "software consultation",
    "hire software engineers",
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
    title: "Contact SysHub365 - Let's Build Something Great",
    description: "Get in touch with SysHub365. Ready to start your next project?",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact SysHub365 - Let's Build Something Great",
    description: "Get in touch with SysHub365. Ready to start your next project?",
    images: ["/images/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
