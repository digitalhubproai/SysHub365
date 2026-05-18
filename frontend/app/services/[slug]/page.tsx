"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowLeft, LuCheck, LuArrowRight, LuLayers, LuCpu, LuShield } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import PremiumCard from "@/components/PremiumCard";

const SERVICE_DETAILS: Record<string, any> = {
  "web-development": {
    title: "Enterprise Web Systems",
    description: "Architecting high-availability, low-latency web platforms that serve as the backbone of modern enterprise operations.",
    longDescription: "In today's digital landscape, a generic website is no longer sufficient. We engineer enterprise-grade web applications designed for maximum scalability, ironclad security, and unparalleled performance. Our team of senior architects leverages modern frameworks alongside robust cloud infrastructure to deliver platforms capable of handling millions of concurrent users.",
    features: [
      "Custom Web Application Development",
      "Progressive Web Apps (PWA)",
      "API Development & Integration",
      "E-commerce Platforms",
      "Legacy System Modernization"
    ],
    approach: [
      { step: "01", title: "Discovery & Architecture", desc: "We analyze your business logic, defining the optimal tech stack and mapping out a robust system architecture." },
      { step: "02", title: "Agile Development", desc: "Our engineers build your platform in iterative sprints, ensuring complete visibility over the product roadmap." },
      { step: "03", title: "Quality Assurance", desc: "Rigorous automated and manual testing guarantees a highly performant experience across all devices." },
      { step: "04", title: "Deployment & Scaling", desc: "We deploy using modern CI/CD pipelines, ensuring zero-downtime updates and seamless global scaling." }
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    benefits: [
      { title: "Lightning Fast Performance", desc: "Sub-second load times that significantly boost user retention and SEO rankings." },
      { title: "Enterprise Security", desc: "Bank-level encryption and security protocols to protect your sensitive business data." },
      { title: "Seamless Scalability", desc: "Microservices architecture designed to effortlessly scale with your highest demands." }
    ],
    gradient: "from-[#06b6d4] to-[#2563eb]",
  },
  "ai-integration": {
    title: "AI Integration",
    description: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows for maximum efficiency.",
    longDescription: "Artificial Intelligence is no longer just a buzzword; it's a critical competitive advantage. We help businesses integrate cutting-edge machine learning models, natural language processing, and predictive analytics into their core operations. From automating repetitive tasks to uncovering deep insights from your data, our AI solutions are designed to drive tangible ROI and propel your business into the future.",
    features: [
      "Custom AI Models & Fine-Tuning",
      "Intelligent Chatbots & Virtual Assistants",
      "Process Automation Workflow",
      "Predictive Analytics & Forecasting",
      "Generative AI Content Systems"
    ],
    approach: [
      { step: "01", title: "Data Assessment", desc: "We evaluate your existing data infrastructure and identify high-impact areas for AI implementation." },
      { step: "02", title: "Model Selection", desc: "Choosing and customizing the right machine learning models specifically tailored to your use case." },
      { step: "03", title: "Integration & Training", desc: "Seamlessly integrating AI into your current systems and continuously training models for accuracy." },
      { step: "04", title: "Monitoring & Optimization", desc: "Ongoing performance tracking to ensure your AI systems adapt and improve over time." }
    ],
    technologies: ["OpenAI API", "TensorFlow", "PyTorch", "Python", "Hugging Face", "LangChain", "Vector Databases"],
    benefits: [
      { title: "Unprecedented Efficiency", desc: "Automate complex, time-consuming tasks to free up your team for strategic initiatives." },
      { title: "Data-Driven Decisions", desc: "Leverage predictive analytics to forecast trends and make smarter, faster business decisions." },
      { title: "Enhanced Customer Experience", desc: "Provide 24/7 intelligent support and personalized interactions at scale." }
    ],
    gradient: "from-[#8b5cf6] to-[#d946ef]",
  },
  "ui-ux-design": {
    title: "UI/UX Product Design",
    description: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design.",
    longDescription: "Design is not just how it looks; it's how it works. Our UI/UX philosophy blends aesthetic brilliance with psychological principles to create frictionless digital experiences. We conduct deep user research to understand your audience, crafting interfaces that are not only visually stunning but intuitively guide users toward your business objectives, minimizing drop-off and maximizing conversion rates.",
    features: [
      "User Research & Journey Mapping",
      "Wireframing & Interactive Prototyping",
      "High-Fidelity UI Design & Systems",
      "Micro-interactions & Animations",
      "Usability Testing & Conversion Optimization"
    ],
    approach: [
      { step: "01", title: "Empathy & Research", desc: "Deep diving into your target audience's behaviors, pain points, and desires." },
      { step: "02", title: "Wireframing & Logic", desc: "Structuring the information architecture to ensure intuitive navigation and flow." },
      { step: "03", title: "Visual Design", desc: "Applying your brand identity to create a pixel-perfect, premium aesthetic." },
      { step: "04", title: "Testing & Iteration", desc: "Validating designs with real users and refining based on actionable feedback." }
    ],
    technologies: ["Figma", "Framer", "Adobe Creative Suite", "Protopie", "Spline", "Tailwind CSS"],
    benefits: [
      { title: "Higher Conversion Rates", desc: "Scientifically designed flows that reduce friction and guide users to action." },
      { title: "Brand Elevation", desc: "A premium, professional aesthetic that builds immediate trust and credibility." },
      { title: "Reduced Support Costs", desc: "Intuitive interfaces that empower users to find what they need without assistance." }
    ],
    gradient: "from-[#f43f5e] to-[#fb923c]",
  },
  "cloud-solutions": {
    title: "Cloud Infrastructure",
    description: "Secure, highly-available infrastructure setup on AWS, Azure, and GCP with full CI/CD automation and global sync.",
    longDescription: "Modern applications require a foundation that is resilient, secure, and infinitely scalable. Our cloud architects design and deploy sophisticated infrastructure environments tailored to your specific performance and compliance requirements. By leveraging Infrastructure as Code (IaC) and serverless technologies, we ensure your digital assets remain online, fast, and secure, no matter the traffic spike.",
    features: [
      "Cloud Architecture & Strategy",
      "CI/CD Pipeline Automation",
      "Serverless Deployments",
      "Cloud Security & Compliance Audits",
      "Database Migration & Disaster Recovery"
    ],
    approach: [
      { step: "01", title: "Infrastructure Audit", desc: "Assessing your current setup to identify bottlenecks, security gaps, and cost inefficiencies." },
      { step: "02", title: "Architecture Design", desc: "Drafting a highly-available, scalable blueprint utilizing the best cloud-native services." },
      { step: "03", title: "Migration & Provisioning", desc: "Executing a zero-downtime migration and setting up automated provisioning via IaC." },
      { step: "04", title: "Continuous Monitoring", desc: "Implementing 24/7 observability and automated alerting for proactive issue resolution." }
    ],
    technologies: ["AWS", "Google Cloud", "Microsoft Azure", "Terraform", "Docker", "Kubernetes", "Linux"],
    benefits: [
      { title: "99.99% Uptime Guarantee", desc: "Multi-region deployments ensuring your services are always available." },
      { title: "Cost Optimization", desc: "Auto-scaling infrastructure that ensures you only pay for the resources you actually use." },
      { title: "Disaster Resilience", desc: "Automated backups and failovers to protect against catastrophic data loss." }
    ],
    gradient: "from-[#3b82f6] to-[#06b6d4]",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Data-driven SEO, performance marketing, and targeted campaigns to drastically scale your online presence and revenue.",
    longDescription: "Building a great product is only half the battle; getting it in front of the right audience is where we excel. Our digital marketing strategies are completely data-driven, focusing heavily on ROI and aggressive growth. From deep technical SEO to high-converting PPC campaigns and viral social strategies, we create a holistic marketing engine that consistently drives qualified leads and revenue to your business.",
    features: [
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) Campaigns",
      "Social Media Management & Strategy",
      "Content Strategy & Creation",
      "Conversion Rate Optimization (CRO)"
    ],
    approach: [
      { step: "01", title: "Market Analysis", desc: "Deep competitive research to identify untapped opportunities and optimal acquisition channels." },
      { step: "02", title: "Strategy Formulation", desc: "Developing a comprehensive, multi-channel marketing roadmap aligned with your revenue goals." },
      { step: "03", title: "Campaign Execution", desc: "Launching targeted campaigns with compelling ad copy and highly optimized landing pages." },
      { step: "04", title: "Analytics & Scaling", desc: "Relentless A/B testing and budget reallocation to scale the most profitable campaigns." }
    ],
    technologies: ["Google Analytics 4", "SEMrush", "Ahrefs", "Meta Ads", "Google Ads", "HubSpot", "Mailchimp"],
    benefits: [
      { title: "Exponential Growth", desc: "Strategies designed to aggressively scale your user base and market share." },
      { title: "Measurable ROI", desc: "Transparent reporting so you know exactly how every marketing dollar is performing." },
      { title: "Brand Authority", desc: "Establishing your business as the definitive thought leader in your industry." }
    ],
    gradient: "from-[#10b981] to-[#3b82f6]",
  },
  "cybersecurity": {
    title: "Cybersecurity Defense",
    description: "Enterprise-grade security audits and implementation to protect your digital assets and ensure global compliance.",
    longDescription: "In an era of sophisticated digital threats, absolute security is non-negotiable. We provide comprehensive cybersecurity services that protect your most critical assets from internal and external vulnerabilities. Our certified security experts conduct exhaustive penetration tests, implement zero-trust architectures, and ensure your organization strictly adheres to global compliance standards like GDPR, HIPAA, and SOC2.",
    features: [
      "Vulnerability Assessments",
      "Advanced Penetration Testing",
      "Security Architecture Design",
      "Data Encryption Strategies",
      "Incident Response & Forensics"
    ],
    approach: [
      { step: "01", title: "Threat Modeling", desc: "Identifying the most likely attack vectors specific to your industry and tech stack." },
      { step: "02", title: "Vulnerability Auditing", desc: "Conducting rigorous automated and manual tests to expose critical security flaws." },
      { step: "03", title: "Remediation & Hardening", desc: "Patching vulnerabilities and implementing robust security layers across your infrastructure." },
      { step: "04", title: "Active Defense", desc: "Setting up real-time intrusion detection systems and continuous security monitoring." }
    ],
    technologies: ["Kali Linux", "Metasploit", "Burp Suite", "Nessus", "CrowdStrike", "Cloudflare", "AWS Shield"],
    benefits: [
      { title: "Risk Mitigation", desc: "Proactively eliminate vulnerabilities before they can be exploited by malicious actors." },
      { title: "Regulatory Compliance", desc: "Avoid massive fines by ensuring your systems meet strict international data laws." },
      { title: "Client Trust", desc: "Demonstrate to your customers that their sensitive data is protected by military-grade security." }
    ],
    gradient: "from-[#ef4444] to-[#8b5cf6]",
  },
  "software-licensing": {
    title: "Software Licensing",
    description: "Comprehensive licensing for all types of software — from enterprise operating systems to specialized SaaS tools.",
    longDescription: "Navigating the complex landscape of enterprise software licensing can be a legal and financial minefield. We simplify this process by managing your entire software portfolio. From negotiating volume discounts with major vendors to ensuring absolute legal compliance and performing regular audits, we optimize your software expenditure so you only pay for exactly what you need.",
    features: [
      "Microsoft 365 & Azure Enterprise Agreements",
      "Enterprise SaaS Solutions (Salesforce, Adobe, etc.)",
      "Cybersecurity & Antivirus Volume Licensing",
      "Database & Cloud Server Licensing",
      "Creative & Design Suite Licensing",
      "License Audits & Spend Optimization",
      "Volume Licensing Agreements (VLA)",
      "Compliance & IT Asset Management"
    ],
    approach: [
      { step: "01", title: "Inventory Audit", desc: "Cataloging all currently utilized software and identifying redundant or unused licenses." },
      { step: "02", title: "Needs Assessment", desc: "Aligning your software stack with actual business requirements and future growth plans." },
      { step: "03", title: "Vendor Negotiation", desc: "Leveraging our partnerships to secure enterprise-level discounts and favorable terms." },
      { step: "04", title: "Centralized Management", desc: "Providing a unified portal to track renewals, compliance, and deployment." }
    ],
    technologies: [
      "Microsoft 365",
      "Microsoft Azure",
      "Amazon Web Services (AWS)",
      "IBM Enterprise Software",
      "Google Workspace",
      "Oracle Database",
      "Salesforce CRM"
    ],
    benefits: [
      { title: "Massive Cost Savings", desc: "Eliminate wasted spend on dormant licenses and secure better enterprise rates." },
      { title: "Legal Protection", desc: "Ensure 100% compliance to avoid devastating vendor audits and legal penalties." },
      { title: "Operational Efficiency", desc: "Streamline the onboarding process with centralized license provisioning for new hires." }
    ],
    gradient: "from-[#fb923c] to-[#f43f5e]",
  },
  "graphic-design": {
    title: "Graphic Design",
    description: "Professional brand identity, modern logos, and custom marketing materials to visually elevate your brand.",
    longDescription: "Your brand is the visual voice of your business. We craft compelling, high-end graphic designs that capture attention and communicate your core message instantly. Whether you need a complete corporate rebranding, striking marketing collateral, or dynamic motion graphics, our creative team ensures every visual asset is perfectly aligned with your strategic objectives and resonates powerfully with your target demographic.",
    features: [
      "Brand Identity & Logo Design",
      "Digital Marketing Collateral",
      "Social Media Graphic Packages",
      "Print & Packaging Design",
      "Motion Graphics & Animation"
    ],
    approach: [
      { step: "01", title: "Brand Discovery", desc: "Understanding your company's ethos, target audience, and long-term vision." },
      { step: "02", title: "Concept Generation", desc: "Developing diverse visual directions and mood boards for your approval." },
      { step: "03", title: "Design Refinement", desc: "Iterating on the chosen concepts to create polished, high-impact final assets." },
      { step: "04", title: "Asset Delivery", desc: "Providing comprehensive brand guidelines and all necessary file formats." }
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "After Effects", "Cinema 4D", "Figma", "InDesign"],
    benefits: [
      { title: "Instant Recognition", desc: "A unique, memorable visual identity that stands out in a crowded marketplace." },
      { title: "Brand Consistency", desc: "Unified design language across all touchpoints, building profound consumer trust." },
      { title: "Emotional Connection", desc: "Visuals crafted specifically to evoke the right psychological response from your audience." }
    ],
    gradient: "from-[#eab308] to-[#f97316]",
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = SERVICE_DETAILS[slug];

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--obsidian-base)] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-slate-400 mb-8">The service you are looking for does not exist or has been removed.</p>
          <Link href="/services" className="text-electric-blue font-semibold hover:text-white transition-colors">
            &larr; Return to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden pt-32 pb-32 min-h-screen relative">
      <div className="noise-overlay" />

      {/* Cybernetic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
        <div className="absolute top-[-10%] w-[800px] h-[800px] rounded-full opacity-[0.15] blur-[120px]" style={{ background: `radial-gradient(circle, var(--tw-gradient-from) 0%, transparent 70%)` }} />
      </div>

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-16 font-medium group">
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to All Services
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit`}>
               <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} animate-pulse`} />
               <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} uppercase tracking-widest text-xs font-bold`}>
                 Specialized Capability
               </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2">
                {service.title.split(' ')[0]}
              </span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                {service.title.substring(service.title.indexOf(' ') + 1)}
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mt-4 font-light border-l-2 border-white/10 pl-6">
              {service.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button href="/contact" variant="primary" size="lg">
                Consult With An Expert
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative Premium Box */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} opacity-30 blur-[100px] rounded-full animate-pulse`} style={{ animationDuration: '4s' }} />
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 group hover:border-white/20 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <LuLayers size={28} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white">Core Features</h3>
              </div>
              <ul className="flex flex-col gap-6">
                {service.features.map((feature: string, idx: number) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                    key={idx} className="flex items-start gap-4 text-slate-300 group/item"
                  >
                    <div className={`mt-1 bg-gradient-to-br ${service.gradient} p-[1px] rounded-full shrink-0 shadow-lg`}>
                      <div className="bg-[#0f1115] p-1.5 rounded-full flex items-center justify-center group-hover/item:bg-transparent transition-colors duration-300">
                         <LuCheck className="text-white w-3 h-3" />
                      </div>
                    </div>
                    <span className="text-lg font-medium group-hover/item:text-white transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Approach Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center max-w-4xl mx-auto mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-electric-blue opacity-[0.03] blur-[100px] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Our Proven <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>Approach</span></h2>
            <p className="text-slate-400 text-xl font-light">A systematic, transparent methodology designed to deliver exceptional results with zero friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.approach.map((step: any, idx: number) => (
              <PremiumCard key={idx} className="p-8 h-full relative group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                
                {/* Hollow Text Numbering */}
                <div className="text-7xl font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.03)] absolute -top-2 -right-2 group-hover:scale-110 group-hover:[-webkit-text-stroke:2px_rgba(255,255,255,0.1)] transition-all duration-700 select-none">
                  {step.step}
                </div>
                
                <div className="relative z-10 flex flex-col gap-5 mt-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] text-white font-bold group-hover:border-white/30 transition-colors`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{step.desc}</p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        {/* Benefits & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 h-full"
          >
            <PremiumCard className="p-10 md:p-14 h-full relative overflow-hidden group">
              <div className={`absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex items-center gap-5 mb-12 border-b border-white/5 pb-8 relative z-10">
                <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg`}>
                   <LuShield size={36} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">Why Choose Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                {service.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <span className={`w-8 h-1 rounded-full bg-gradient-to-r ${service.gradient}`} />
                       <h4 className="text-2xl font-bold text-white">{benefit.title}</h4>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full"
          >
            <PremiumCard className="p-10 md:p-14 h-full flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0" />
              <div className="flex items-center gap-5 mb-12 border-b border-white/5 pb-8 relative z-10">
                <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg`}>
                   <LuCpu size={36} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {service.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="px-5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-slate-300 font-semibold hover:border-white/30 hover:text-white hover:bg-white/[0.05] transition-all cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <PremiumCard className="relative overflow-hidden border border-white/10 rounded-[2.5rem] p-10 md:p-14 lg:p-20">
            {/* Animated Glow Elements */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${service.gradient} opacity-10 blur-[100px] pointer-events-none`} />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr ${service.gradient} rounded-full blur-[150px] opacity-20 pointer-events-none`}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex flex-col items-start gap-6 max-w-3xl text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to transform your business with our <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>expertise?</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                  Get in touch with our specialists today to discuss your project requirements and receive a detailed consultation.
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <Button href="/contact" variant="primary" size="xl" className="w-full md:w-auto">
                  Start Your Project <LuArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </PremiumCard>
        </motion.section>
      </div>
    </main>
  );
}
