import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | SysHub365",
  description: "Get in touch with SysHub365. Ready to start your next project? Whether you need a full development squad or a technical consultation, we are here to help.",
  openGraph: {
    title: "Contact SysHub365 - Let's Build Something Great",
    description: "Get in touch with SysHub365. Ready to start your next project?",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
