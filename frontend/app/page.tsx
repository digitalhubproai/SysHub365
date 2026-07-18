import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SYSHUB365 | Premium Software Engineering Studio",
  description: "SYSHUB365 is a premium software engineering studio building high-performance web apps, AI solutions, and enterprise digital ecosystems for global visionaries.",
  keywords: [
    "software engineering studio",
    "web development agency",
    "AI solutions",
    "enterprise software",
    "custom web applications",
    "digital transformation",
    "full-stack development",
    "SysHub365",
  ],
  openGraph: {
    title: "SYSHUB365 | Premium Software Engineering Studio",
    description: "SYSHUB365 is a premium software engineering studio building high-performance web apps, AI solutions, and enterprise digital ecosystems for global visionaries.",
    url: "https://syshub365.com",
    siteName: "SYSHUB365",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "SYSHUB365 Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://syshub365.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-24 bg-[var(--obsidian-deep)] border-t border-white/5">
        <div className="max-w-[75rem] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            SYSHUB365 — A Premium Software Engineering Studio
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-3xl">
            We design and build high-performance web systems, custom ERPs, and AI-integrated applications.
            As a full-stack software engineering studio, our team solves complex technical challenges with precision-engineered code that helps businesses scale efficiently. From web development and enterprise software to digital transformation, we deliver measurable results.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Our Services</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-10">
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Enterprise Web Development:</span> We architect high-availability, low-latency web platforms using Next.js, React, Node.js, and Python. Our systems serve as the backbone of modern enterprise operations with guaranteed 99.9% uptime.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">AI Integration:</span> Embed intelligent automation, custom chatbots, and generative AI into your existing business workflows. We leverage OpenAI, LangChain, and vector databases to build context-aware AI systems that reduce operational costs by up to 40%.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">UI/UX Product Design:</span> Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design principles, rapid prototyping, and usability testing.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Cloud Infrastructure:</span> Secure, highly-available infrastructure setup on AWS and GCP with full CI/CD automation, containerization with Docker and Kubernetes, and global content delivery.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Cybersecurity Defense:</span> Enterprise-grade security audits, penetration testing, and compliance implementation to protect your digital assets and ensure regulatory compliance across GDPR, SOC 2, and ISO 27001 standards.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Digital Marketing:</span> Data-driven SEO optimization, performance marketing campaigns, and targeted advertising strategies to drastically scale your online presence and revenue generation.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Software Licensing:</span> Comprehensive licensing solutions for all types of software from enterprise operating systems to specialized SaaS tools, ensuring legal compliance and optimal cost management.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Graphic Design:</span> Professional brand identity development, modern logo design, and custom marketing materials to visually elevate your brand and communicate your core message effectively.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">ERP Solutions:</span> End-to-end enterprise resource planning systems that streamline operations, automate workflows, unify business data, and provide real-time analytics dashboards for informed decision-making.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">CRM Solutions:</span> Custom customer relationship management platforms engineered to track leads, automate sales processes, deepen client engagement, and provide actionable insights into your sales pipeline.</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Why Choose SYSHUB365</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-3xl">
            With over 8 years of experience and 150+ projects delivered across 24 countries, SYSHUB365 brings architectural precision and technical excellence to every engagement. Our team of elite software engineers, UI/UX designers, and AI specialists has delivered solutions across Fintech, Healthcare, E-Commerce, and SaaS industries. We believe in transparent communication, rapid agile delivery, and uncompromising quality standards. No hidden costs. No technical jargon. Just results-driven engineering that scales your business.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Our Process</h2>
          <div className="grid gap-4 md:grid-cols-2 mb-10">
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Discovery and Strategy:</span> We integrate deeply with your business to understand your goals, target audience, and market challenges before writing a single line of code. Our architects design a comprehensive technical roadmap aligned with your business objectives.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Design and Prototyping:</span> Our UI/UX team creates high-fidelity prototypes in Figma for your approval. We iterate rapidly on design feedback to ensure the final product matches your vision perfectly before development begins.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Development and Testing:</span> Our engineers build your solution using modern frameworks and best practices. Every component undergoes automated testing, code review, and quality assurance checks to maintain the highest standards of code quality.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Deployment and Scaling:</span> We deploy your solution to production with full CI/CD automation, monitoring, and alerting. Our team provides ongoing support and optimization to ensure your system scales seamlessly as your business grows.</p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">Industries We Serve</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Fintech:</span> Secure, compliant financial platforms with real-time transaction processing, fraud detection, and regulatory reporting capabilities.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">Healthcare:</span> HIPAA-compliant health information systems, telemedicine platforms, and patient management solutions with robust data protection.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">E-Commerce:</span> Scalable online storefronts, inventory management systems, payment gateway integrations, and personalized shopping experiences that drive conversions.</p>
            <p className="text-slate-300 leading-relaxed"><span className="text-white font-semibold">SaaS:</span> Multi-tenant cloud applications with subscription management, usage analytics, and enterprise-grade security built from the ground up.</p>
          </div>
        </div>
      </section>
    </>
  );
}
