"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";

export default function CVPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4 flex justify-center print:bg-white print:p-0">
      {/* Hide browser print headers/footers and force color */}
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* A4 Size Paper Wrapper */}
      <div className="w-full max-w-[210mm] bg-white border-4 border-black shadow-[16px_16px_0_0_#000] print:border-0 print:shadow-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:max-w-none text-black p-8 sm:p-12 print:p-6 relative overflow-hidden">

        {/* Decorative Brutalist Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-black -translate-y-16 translate-x-16 rotate-45 print:hidden"></div>

        {/* HEADER & ABOUT ME (CENTERED) */}
        <header className="border-b-4 border-black pb-8 print:pb-4 mb-8 print:mb-4 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl print:text-5xl font-black uppercase tracking-tighter leading-none mb-2 print:mb-1">
            Binh Minh
          </h1>
          <h2 className="text-xl md:text-2xl print:text-lg font-bold uppercase tracking-widest bg-black text-white print:bg-transparent print:text-black inline-block px-3 py-1 print:px-0 print:py-0 mb-4 print:mb-2">
            Backend & DevOps Engineer
          </h2>

          {/* PERSONAL INFO */}
          <div className="flex flex-wrap justify-center gap-4 text-sm print:text-xs font-semibold mt-2 mb-6 print:mb-2 text-black">
            <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1.5 hover:underline"><Mail className="w-4 h-4 print:w-3 print:h-3" /> pata10102004@gmail.com</a>
            <a href="tel:0372064929" className="flex items-center gap-1.5 hover:underline"><Phone className="w-4 h-4 print:w-3 print:h-3" /> 037 206 4929</a>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 print:w-3 print:h-3" /> Ho Chi Minh City, Vietnam</span>
            <a href="https://portfolio-binhminh.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="w-4 h-4 print:w-3 print:h-3" /> portfolio-binhminh.vercel.app</a>
          </div>

          {/* ABOUT ME (MOVED TO HEADER FOR CENTERING) */}
          <section className="max-w-2xl mx-auto">
            <p className="text-sm print:text-xs font-medium leading-relaxed">
              A 4th-year student passionate about System Architecture, Backend Development, and DevOps. Obsessed with clean code, scalable deployments, and automating everything from CI/CD pipelines to infrastructure.
            </p>
          </section>
        </header>

        {/* MAIN CONTENT BLOCK */}
        <div className="flex flex-col gap-10 print:gap-8">

          {/* ROW 1: EDUCATION & SKILLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid print:grid-cols-2 gap-8 print:gap-6">
            
            {/* EDUCATION */}
            <section>
              <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Education</h3>
              <div>
                <h4 className="font-black text-base print:text-sm uppercase">Engineer in Software Eng.</h4>
                <p className="text-sm print:text-xs font-bold leading-tight mt-1 opacity-80">Ho Chi Minh City University of Technology (HUTECH)</p>
                <div className="flex justify-between items-center mt-3 print:mt-2">
                  <p className="text-sm print:text-[11px] font-bold text-black/60">2022 - 2026</p>
                  <p className="text-sm print:text-[11px] font-black bg-black text-white px-3 py-1 print:px-2 print:py-0.5">GPA: 3.19</p>
                </div>
              </div>
              <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 mt-4 print:mt-3 space-y-1">
                <li><span className="font-bold opacity-80">Awards:</span> Semi-Finalist IT Got Talent 2025</li>
                <li><span className="font-bold opacity-80">English:</span> Studying TOEIC (Target 650)</li>
              </ul>
            </section>

            {/* SKILLS */}
            <section>
              <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Skills</h3>
              
              <div className="mb-4 print:mb-3">
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">Backend</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["NodeJS", "Spring Boot", ".NET", "Neo4j", "PostgreSQL", "Redis"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold border-2 border-black px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">DevOps</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["Docker", "Kubernetes", "GitOps", "Linux", "CI/CD"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold bg-black text-white px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ROW 2: EXPERIENCE & PROJECTS */}
          <section>
            <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-5 print:mb-4">Experience & Projects</h3>

            <div className="border-2 border-black p-5 print:p-4 mt-2 print:mt-1 relative">
              <div className="absolute -top-4 left-4 bg-white px-2 print:-top-3">
                <h4 className="font-black text-lg print:text-base uppercase">Backend/DevOps Intern</h4>
              </div>
              
              <p className="text-sm print:text-xs font-bold opacity-70 mb-5 print:mb-4 mt-2">Course Projects & Research | 2024 - Present</p>
              
              <div className="flex flex-col gap-8 print:gap-8">
                {/* PROJECT 1 */}
                <div>
                  <a href="https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">Enterprise Knowledge Graph</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: React, NestJS, Neo4j, Docker</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Architected an internal search tool visualizing relationships between 80+ employees and their skill sets using Neo4j graph databases.</li>
                    <li>Implemented caching layers to map 300+ nodes instantly for rapid querying.</li>
                    <li>Containerized the full stack with custom Docker multi-stage builds, reducing image sizes drastically.</li>
                  </ul>
                </div>

                {/* PROJECT 2 */}
                <div>
                  <a href="https://github.com/ThinkAI-team/thinkai-backend" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">ThinkAI E-Learning Platform</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: Spring Boot, PostgreSQL, CI/CD, Next.js</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Developed a monolithic core system handling course lifecycle and user subscriptions.</li>
                    <li>Scaled complex database queries to successfully process logic for over 1000 concurrent mock-test sessions.</li>
                    <li>Automated deployments and testing via GitHub Actions, integrating DevSecOps (SAST).</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* PRINT BUTTON */}
        <div className="mt-12 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-black text-white font-black uppercase px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0_0_#000] transition-all cursor-crosshair"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
