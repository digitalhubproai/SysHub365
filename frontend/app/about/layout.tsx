import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SysHub365",
  description: "Learn about SysHub365, a premier software engineering house. We are digital architects building high-integrity systems for the next era of global infrastructure.",
  keywords: [
    "about SysHub365",
    "software engineering company",
    "digital architecture",
    "technology studio",
    "engineering team",
    "SysHub365 team",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About SysHub365 - Engineering The Next Standard",
    description: "Learn about SysHub365, a premier software engineering house building high-integrity systems.",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
