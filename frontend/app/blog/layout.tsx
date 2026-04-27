import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | SysHub365",
  description: "Read the latest technical observations, architectural patterns, and strategic engineering updates from the SysHub365 experts.",
  openGraph: {
    title: "Blog & Insights | SysHub365",
    description: "Read the latest technical observations, architectural patterns, and strategic engineering updates from the SysHub365 experts.",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
