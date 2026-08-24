export type ServiceApproachStep = {
  step: string;
  title: string;
  desc: string;
};

export type ServiceDetail = {
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  approach: ServiceApproachStep[];
  technologies: string[];
  benefits: { title: string; desc: string }[];
  gradient: string;
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
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
    description: "Comprehensive licensing for all types of software, from enterprise operating systems to specialized SaaS tools.",
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
  },
  "erp-solutions": {
    title: "ERP Solutions",
    description: "Centralized systems that connect finance, operations, and people in one high-performance source of truth.",
    longDescription: "Legacy enterprises are often crippled by fragmented data and disconnected tools. We engineer custom Enterprise Resource Planning (ERP) systems that unify your entire operational lifecycle. By consolidating finance, supply chain, human resources, and customer data into a single, high-availability source of truth, we empower your leadership with real-time visibility and automated decision-making capabilities.",
    features: [
      "Custom Financial Management",
      "Supply Chain Orchestration",
      "Human Capital Management (HCM)",
      "Inventory & Warehouse Automation",
      "Business Intelligence Dashboards"
    ],
    approach: [
      { step: "01", title: "Business Audit", desc: "Identifying friction points in your current operations and mapping out a unified data flow." },
      { step: "02", title: "Architecture Design", desc: "Developing a scalable microservices structure to handle complex enterprise modules." },
      { step: "03", title: "Data Migration", desc: "Executing a secure, zero-loss transition of your legacy data into the new ecosystem." },
      { step: "04", title: "Deployment & Training", desc: "Launching your centralized hub and ensuring your team is fully empowered to use it." }
    ],
    technologies: ["PostgreSQL", "React", "Next.js", "Python", "FastAPI", "Docker", "AWS", "SAP Integration"],
    benefits: [
      { title: "Global Visibility", desc: "Real-time access to operational data from anywhere in the world on any device." },
      { title: "Automated Compliance", desc: "Built-in audit trails and reporting to ensure global regulatory standards are met." },
      { title: "Scalable Operations", desc: "Modular architecture that grows seamlessly as your business expands into new markets." }
    ],
    gradient: "from-[#3b82f6] to-[#8b5cf6]",
  },
  "crm-solutions": {
    title: "CRM Solutions",
    description: "Custom workflows that turn customer data into relationships and accelerated revenue growth.",
    longDescription: "A generic CRM is just a database; a SysHub365 CRM is a revenue engine. We design and build bespoke Customer Relationship Management platforms that mirror your unique sales and support workflows. By integrating predictive AI, automated lead scoring, and seamless communication pipelines, we help your team close deals faster while providing a world-class experience to every customer across their entire lifecycle.",
    features: [
      "Predictive Lead Scoring",
      "Automated Sales Pipelines",
      "Omnichannel Communication Sync",
      "Customer Sentiment Analysis",
      "Advanced Reporting & Analytics"
    ],
    approach: [
      { step: "01", title: "Workflow Mapping", desc: "Analyzing your sales and support cycles to design a CRM that follows your human processes." },
      { step: "02", title: "UX Prototyping", desc: "Crafting intuitive interfaces that maximize team adoption and data entry speed." },
      { step: "03", title: "Integration", desc: "Syncing your CRM with existing email, social, and financial tools for a unified view." },
      { step: "04", title: "Optimization", desc: "Using AI to identify deal-closing patterns and continuously refining your sales funnel." }
    ],
    technologies: ["Node.js", "Redis", "Elasticsearch", "React", "Next.js", "Salesforce API", "HubSpot Sync"],
    benefits: [
      { title: "Accelerated Deal Velocity", desc: "AI-driven automation that reduces the time from initial lead to final closing." },
      { title: "Deep Customer Insights", desc: "Uncover hidden behavioral patterns to provide hyper-personalized service." },
      { title: "Reduced Manual Overhead", desc: "Automate repetitive data entry so your sales team can focus on relationships." }
    ],
    gradient: "from-[#d946ef] to-[#f43f5e]",
  },
  "mobile-apps": {
    title: "Mobile App Development",
    description: "Native iOS & Android and cross-platform apps engineered for blazing performance, offline resilience, and store-scale reach.",
    longDescription: "The majority of your users are on mobile. We design and build premium native (Swift, Kotlin) and cross-platform (React Native, Flutter) applications that feel fast, work offline, and scale from MVP to millions of downloads. From app-store strategy to release and growth, we own the entire mobile lifecycle, so every screen your customers touch is effortless and on-brand.",
    features: [
      "Native iOS & Android Development",
      "Cross-Platform (React Native / Flutter)",
      "Offline-First & Sync Architecture",
      "Push Notifications & Deep Linking",
      "App Store Submission & Optimization"
    ],
    approach: [
      { step: "01", title: "Product Discovery", desc: "Defining the mobile roadmap, feature set, and platform priorities that match your product goals." },
      { step: "02", title: "UI/UX & Prototyping", desc: "Crafting touch-first interfaces and interactive prototypes that your users will love to navigate." },
      { step: "03", title: "Agile Build & Test", desc: "Shipping in tight sprints with automated device-lab testing across real iOS and Android hardware." },
      { step: "04", title: "Release & Growth", desc: "Store submission, analytics integration, and iterative feature shipping for sustained traction." }
    ],
    technologies: ["Swift", "Kotlin", "React Native", "Flutter", "Firebase", "GraphQL", "Expo"],
    benefits: [
      { title: "Reach Users Everywhere", desc: "Meet customers exactly where they are: in your pocket, in the app store, on the go." },
      { title: "Offline-First Reliability", desc: "Resilient syncing that keeps the experience smooth even with a patchy connection." },
      { title: "App-Store Scale", desc: "Performance-tuned listings and snappy builds for discoverability and retention." }
    ],
    gradient: "from-[#06b6d4] to-[#6366f1]",
  },
  "ecommerce-development": {
    title: "E-Commerce Development",
    description: "High-converting storefronts and marketplaces, from headless commerce and Shopify to custom carts with seamless payments.",
    longDescription: "Your storefront should be a revenue engine, not just a catalog. We build high-converting e-commerce platforms, from headless and Shopify to fully custom, with blazing page speed, a frictionless checkout, secure payments, and integrated logistics. We obsess over average order value, cart abandonment, and peak-season traffic so your store sells more with less friction.",
    features: [
      "Headless & Shopify Storefronts",
      "Custom Shopping Carts & Checkout",
      "Payment Gateway & FX Integration",
      "Inventory & Logistics Sync",
      "Personalized Search & Recommendations"
    ],
    approach: [
      { step: "01", title: "Commerce Audit", desc: "Analyzing your funnel, platform fit, and the exact blockers hurting conversion today." },
      { step: "02", title: "Storefront Design", desc: "Designing a conversion-first UX with a checkout your customers actually finish." },
      { step: "03", title: "Build & Integrate", desc: "Headless build wired into payments, ERP, and shipping endpoints end-to-end." },
      { step: "04", title: "Optimize & Scale", desc: "A/B testing, performance tuning, and load-testing to stay fast during spikes." }
    ],
    technologies: ["Next.js", "Shopify Storefront API", "Stripe", "Medusa", "Headless CMS", "Vercel", "Sanity"],
    benefits: [
      { title: "Higher Conversion Rates", desc: "A fast, frictionless checkout engineered to sell rather than abandon." },
      { title: "Seamless Integrations", desc: "Payments, ERP, warehouse, and shipping all talking to each other." },
      { title: "Peak-Ready Scale", desc: "A headless architecture that stays fast during flash sales and holidays." }
    ],
    gradient: "from-[#f97316] to-[#ec4899]",
  },
  "data-analytics": {
    title: "Data & Analytics",
    description: "Turn raw data into decisions with modern data pipelines, warehouses, and business-intelligence dashboards your team uses.",
    longDescription: "Data is only valuable when it becomes decisions. We build modern data platforms, including pipelines, warehouses, marts, and self-serve BI dashboards, that consolidate scattered sources into one trusted source of truth. With embedded analytics, executives and teams get insights directly in their workflow, so decisions are grounded in evidence rather than intuition.",
    features: [
      "Data Pipeline & ETL Engineering",
      "Cloud Data Warehousing",
      "BI Dashboards & Reporting",
      "Embedded Analytics",
      "Data Governance & Quality"
    ],
    approach: [
      { step: "01", title: "Data Discovery", desc: "Mapping your sources, KPIs, and the decision questions leadership actually asks." },
      { step: "02", title: "Model & Warehouse", desc: "Designing a clean, documented semantic layer your whole organization can trust." },
      { step: "03", title: "Build Dashboards", desc: "Self-serve BI your teams adopt, no data scientist required." },
      { step: "04", title: "Embed & Automate", desc: "Surfacing analytics in-app with natural-language querying for instant answers." }
    ],
    technologies: ["Snowflake", "BigQuery", "Airflow", "dbt", "Looker", "Metabase", "Python"],
    benefits: [
      { title: "Single Source of Truth", desc: "End scattered tools and conflicting numbers once and for all." },
      { title: "Faster Decisions", desc: "Self-serve BI means no more waiting days on report requests." },
      { title: "Data-Driven Culture", desc: "Put analytics exactly where the work happens, in your own product." }
    ],
    gradient: "from-[#0891b2] to-[#10b981]",
  },
  "product-strategy": {
    title: "Product Strategy & MVP",
    description: "Validate fast and build right through product audits, MVP sprints, and roadmaps that de-risk your idea before you over-invest.",
    longDescription: "Most products fail before a line of code, from building the wrong thing, or too slowly. We run structured product discovery and MVP sprints that distill a bold vision down to its core value proposition and ship a production-ready MVP in weeks. We de-risk your roadmap with market validation, lean design, and metrics that prove real traction before heavy investment.",
    features: [
      "Product Discovery & Research",
      "MVP Design Sprints (6-8 weeks)",
      "Technical Architecture & Roadmaps",
      "Market & Feasibility Validation",
      "Agile Product Ownership"
    ],
    approach: [
      { step: "01", title: "Discover & Validate", desc: "Researching the market, your users, and your real competitive edge." },
      { step: "02", title: "Scope the MVP", desc: "Cutting to the smallest, most valuable, lovable core worth shipping." },
      { step: "03", title: "Design Sprint", desc: "Wireframes, prototypes, and measurable hypotheses before you commit budget." },
      { step: "04", title: "Ship & Learn", desc: "Launch, instrument, and iterate on real user data rather than guesswork." }
    ],
    technologies: ["Next.js", "Supabase", "Firebase", "Figma", "TypeScript", "Postgres", "Analytics"],
    benefits: [
      { title: "De-risked Investment", desc: "Validate the idea before you commit a heavy engineering budget." },
      { title: "Weeks, Not Months", desc: "Ship a usable MVP in 6-8 weeks instead of a year of hidden work." },
      { title: "Production-Ready From Day One", desc: "No throwaway prototypes, just a clean, typed foundation you can scale." }
    ],
    gradient: "from-[#6366f1] to-[#a855f7]",
  },
  "managed-services": {
    title: "Managed IT & Support",
    description: "Ongoing 24/7 monitoring, maintenance, and technical support to keep apps, infrastructure, and security running smoothly.",
    longDescription: "Your software shouldn't be a maintenance burden. We take over the day-to-day, including 24/7 monitoring, proactive maintenance, security patching, and expert support, as a managed service. With clear SLAs, monthly reporting, and uptime guarantees, your systems stay healthy, compliant, and secure while your team focuses on the business, not the infrastructure.",
    features: [
      "24/7 Monitoring & Incident Response",
      "Proactive Maintenance & Patching",
      "SLA-Backed Support Desk",
      "Security & Compliance Management",
      "Cost & Performance Optimization"
    ],
    approach: [
      { step: "01", title: "Onboarding & Discovery", desc: "Auditing your stack, SLA targets, and the risk profile we're protecting." },
      { step: "02", title: "Move to Management", desc: "Taking over monitoring, backups, and runbooks for a seamless handover." },
      { step: "03", title: "Continual Improvement", desc: "Patching, hardening, and performance tuning as your product evolves." },
      { step: "04", title: "Review & Report", desc: "Monthly SLA reporting and proactive growth planning with your team." }
    ],
    technologies: ["Datadog", "New Relic", "Cloudflare", "Kubernetes", "Terraform", "Grafana", "Prometheus"],
    benefits: [
      { title: "Guaranteed Uptime", desc: "SLA-backed availability watched 24/7 by specialists, not hope." },
      { title: "Lower Total Cost", desc: "Ongoing proactive care beats expensive, reactive firefighting." },
      { title: "Focus on the Core", desc: "Offload infrastructure to experts and keep your team on the product." }
    ],
    gradient: "from-[#64748b] to-[#3b82f6]",
  }
};
