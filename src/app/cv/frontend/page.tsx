"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CVFrontendPage() {
  return (
    <main className="min-h-screen bg-gray-200 py-10 px-4 flex justify-center print:bg-white print:p-0 print:min-h-0">
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="w-full max-w-[210mm] bg-white border-4 border-black shadow-[16px_16px_0_0_#000] print:border-0 print:shadow-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:max-w-none text-black p-8 sm:p-12 print:p-6 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-32 h-32 bg-black -translate-y-16 translate-x-16 rotate-45 print:hidden"></div>

        <header className="border-b-4 border-black pb-8 print:pb-4 mb-8 print:mb-4 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl print:text-5xl font-black uppercase tracking-tighter leading-none mb-2 print:mb-1">
            Binh Minh
          </h1>
          <h2 className="text-xl md:text-2xl print:text-lg font-bold uppercase tracking-widest bg-black text-white print:bg-transparent print:text-black inline-block px-3 py-1 print:px-0 print:py-0 mb-4 print:mb-2">
            Frontend Developer
          </h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm print:text-xs font-semibold mt-2 mb-6 print:mb-2 text-black">
            <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1.5 hover:underline"><Mail className="w-4 h-4 print:w-3 print:h-3" /> pata10102004@gmail.com</a>
            <a href="tel:0372064929" className="flex items-center gap-1.5 hover:underline"><Phone className="w-4 h-4 print:w-3 print:h-3" /> 037 206 4929</a>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 print:w-3 print:h-3" /> Ho Chi Minh City, Vietnam</span>
            <a href="https://portfolio-binhminh.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="w-4 h-4 print:w-3 print:h-3" /> portfolio-binhminh.vercel.app</a>
          </div>

          <section className="max-w-2xl mx-auto">
            <p className="text-sm print:text-xs font-medium leading-relaxed">
              A 4th-year student passionate about creating beautiful, responsive, and user-friendly web interfaces. Focused on modern frontend technologies, accessibility, and delivering exceptional user experiences.
            </p>
          </section>
        </header>

        <div className="flex flex-col gap-10 print:gap-8">

          <div className="grid grid-cols-1 md:grid-cols-2 print:grid print:grid-cols-2 gap-8 print:gap-6">
            
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

            <section>
              <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Skills</h3>
              
              <div className="mb-4 print:mb-3">
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">Frontend</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "SASS/SCSS"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold border-2 border-black px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4 print:mb-3">
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">Tools</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["Figma", "Git", "Vite", "Webpack"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold bg-black text-white px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">AI Tools</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["ClaudeCode", "OpenCode", "Cursor", "Antigravity"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold border-2 border-black px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-5 print:mb-4">Experience & Projects</h3>

            <div className="border-2 border-black p-5 print:p-4 mt-2 print:mt-1 relative">
              <div className="absolute -top-4 left-4 bg-white px-2 print:-top-3">
                <h4 className="font-black text-lg print:text-base uppercase">Frontend Development</h4>
              </div>
              
              <p className="text-sm print:text-xs font-bold opacity-70 mb-5 print:mb-4 mt-2">Course Projects & Research | 2024 - Present</p>
              
              <div className="flex flex-col gap-8 print:gap-8">
                <div>
                  <a href="https://github.com/ThinkAI-team/thinkai-frontend" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">ThinkAI E-Learning Platform</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: Next.js 15, React 19, TypeScript, CSS Modules</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Developed Student workspace with dashboard, course pages, exam system, and AI Tutor.</li>
                    <li>Built Teacher workspace for managing courses, question banks, and exams.</li>
                    <li>Implemented JWT authentication supporting 3 user roles with API integration.</li>
                  </ul>
                </div>

                <div>
                  <a href="https://github.com/bnhminh1010/flow9-frontend" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">Flow9 Personal Life OS</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: Next.js 14, TypeScript, Tailwind CSS, Recharts</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Built dashboard with financial statistics and charts using Recharts.</li>
                    <li>Developed natural language transaction input feature.</li>
                    <li>Implemented 6-digit PIN authentication for local data protection.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>

        <div className="mt-12 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-black text-white font-black uppercase px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0_0_#000] transition-all cursor-crosshair"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </main>
  );
}
