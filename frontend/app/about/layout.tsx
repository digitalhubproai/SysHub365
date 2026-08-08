import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SysHub365, a premier software engineering house. We are digital architects building high-integrity systems for the next era of global infrastructure.",
  keywords: [
    "about SysHub365",
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
    title: "About SysHub365 - Engineering The Next Standard",
    description: "Learn about SysHub365, a premier software engineering house building high-integrity systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SysHub365 - Engineering The Next Standard",
    description: "Learn about SysHub365, a premier software engineering house building high-integrity systems.",
    images: ["/images/logo.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
