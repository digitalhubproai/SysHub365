import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Software House in Pakistan | SYSHUB365",
  description: "SYSHUB365 is a leading software house in Karachi, Pakistan and offshore software development company delivering enterprise software, AI solutions, and custom web apps for global clients.",
  keywords: [
    "about SysHub365",
    "software house in Pakistan",
    "software development company in Karachi",
    "offshore software development company",
    "software engineering company",
    "digital architecture",
    "technology studio",
    "engineering team",
    "SysHub365 team",
    "about us",
    "our company",
    "why choose SysHub365",
    "experienced software developers",
    "software development experts",
    "software house Karachi",
    "software engineering house Pakistan",
    "trusted software company",
    "software engineers for hire",
    "technology partners"
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SYSHUB365 - Software House in Pakistan",
    description: "Learn about SYSHUB365, a leading software house in Karachi, Pakistan building high-integrity systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SYSHUB365 - Software House in Pakistan",
    description: "Learn about SYSHUB365, a leading software house in Karachi, Pakistan building high-integrity systems.",
    images: ["/images/logo.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
