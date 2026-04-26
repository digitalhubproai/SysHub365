import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuCircleCheck } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

// Generates static params for all known projects (optional but good for performance)
export async function generateStaticParams() {
  return PROJECTS.map((proj) => ({
    slug: proj.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  // Find project by matching slug
  const project = PROJECTS.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-black min-h-screen pt-32 pb-20">
      <div className="max-w-[75rem] mx-auto px-6 md:px-12">
        <Link href="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
           <LuArrowLeft size={20} />
           <span className="font-medium tracking-wide">Back to Projects</span>
        </Link>
        
        <div className="flex flex-col gap-6 mb-16">
          <span className="text-electric-blue font-bold uppercase tracking-[0.2em]">{project.category}</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">{project.title}</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mt-4">{project.desc || (project as any).description}</p>
        </div>

        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mb-20 bg-[var(--obsidian-deep)]">
          <Image 
            src={project.img}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
           <div className="md:col-span-2 flex flex-col gap-8 text-slate-300 leading-relaxed text-lg">
             <h2 className="text-3xl font-bold text-white mb-4">Project Overview</h2>
             <p>This project was built to deliver a highly scalable, secure, and modern digital experience. Leveraging cutting-edge technologies, we ensured that the architecture is future-proof and meets enterprise-grade standards.</p>
             <p>Our team focused on reducing latency, improving the user interface, and integrating automated workflows to increase overall business efficiency. The result is a seamless, robust platform that drives measurable growth.</p>
             
             <h2 className="text-3xl font-bold text-white mt-8 mb-4">Key Features</h2>
             <ul className="flex flex-col gap-4">
                {["High performance and seamless scalability", "Enterprise-grade security and compliance", "Robust third-party API integrations", "Intuitive and responsive user experience"].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <LuCircleCheck className="text-electric-blue mt-1 flex-shrink-0" size={24} />
                    <span>{feature}</span>
                  </li>
                ))}
             </ul>
           </div>

           <div className="md:col-span-1">
             <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-md sticky top-32">
               <h3 className="text-xl font-bold text-white mb-6">Technologies Used</h3>
               <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-full bg-black/40 border border-white/10 text-white text-xs font-medium tracking-wide">
                      {tag}
                    </span>
                  )) || (
                    <span className="text-slate-500 text-sm">Technology stack not specified.</span>
                  )}
               </div>

               <h3 className="text-xl font-bold text-white mb-4">Ready to build something similar?</h3>
               <p className="text-slate-400 text-sm mb-6">Let's discuss how we can create a tailored solution for your business.</p>
               <Button href="/contact" className="w-full justify-center">Start a Project</Button>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
