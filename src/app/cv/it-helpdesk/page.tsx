"use client";

import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function CVITHelpdeskPage() {
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
            IT Helpdesk & System Administrator
          </h2>

          <div className="flex flex-wrap justify-center gap-4 text-sm print:text-xs font-semibold mt-2 mb-6 print:mb-2 text-black">
            <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1.5 hover:underline"><Mail className="w-4 h-4 print:w-3 print:h-3" /> pata10102004@gmail.com</a>
            <a href="tel:0372064929" className="flex items-center gap-1.5 hover:underline"><Phone className="w-4 h-4 print:w-3 print:h-3" /> 037 206 4929</a>
            <span className="flex items-center gap-1.5">10/10/2004</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 print:w-3 print:h-3" /> Ho Chi Minh City, Vietnam</span>
            <a href="https://portfolio-binhminh.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="w-4 h-4 print:w-3 print:h-3" /> Portfolio</a>
          </div>

          <section className="max-w-2xl mx-auto">
            <p className="text-sm print:text-xs font-medium leading-relaxed">
              A 4th-year student with hands-on experience in IT support, system administration, and technical troubleshooting. Skilled in maintaining network infrastructure, managing user accounts, and providing efficient technical assistance to end-users.
            </p>
          </section>
        </header>

        <div className="flex flex-col gap-10 print:gap-8">

          <section>
            <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Career Objectives</h3>
            <div className="space-y-2 text-sm print:text-xs">
              <div>
                <span className="font-bold">Short-term:</span> Secure an IT Support position to provide efficient technical assistance, contribute to team success, and grow in a professional environment.
              </div>
              <div>
                <span className="font-bold">Long-term:</span> Become a System Administrator or IT Manager capable of managing enterprise infrastructure, networks, and leading IT teams.
              </div>
            </div>
          </section>

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
              
              <div className="space-y-2 text-sm print:text-xs">
                <div><span className="font-bold">Operating Systems:</span> <span className="inline-flex flex-wrap gap-1"><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Windows 10/11</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Windows Server</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Linux (Ubuntu)</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">macOS</span></span></div>
                <div><span className="font-bold">Networking:</span> <span className="inline-flex flex-wrap gap-1"><span className="bg-black text-white px-1.5 py-0.5 text-xs font-bold">TCP/IP</span><span className="bg-black text-white px-1.5 py-0.5 text-xs font-bold">DNS</span><span className="bg-black text-white px-1.5 py-0.5 text-xs font-bold">DHCP</span><span className="bg-black text-white px-1.5 py-0.5 text-xs font-bold">VPN</span><span className="bg-black text-white px-1.5 py-0.5 text-xs font-bold">Firewall</span></span></div>
                <div><span className="font-bold">Tools:</span> <span className="inline-flex flex-wrap gap-1"><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Active Directory</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Office 365</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">Remote Desktop</span><span className="border border-black px-1.5 py-0.5 text-xs font-bold">ITIL</span></span></div>
              </div>
            </section>
          </div>

          <section>
            <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-5 print:mb-4">Experience & Projects</h3>

            <div className="border-2 border-black p-5 print:p-4 mt-2 print:mt-1 relative">
              <div className="absolute -top-4 left-4 bg-white px-2 print:-top-3">
                <h4 className="font-black text-lg print:text-base uppercase">IT Support & Administration</h4>
              </div>
              
              <p className="text-sm print:text-xs font-bold opacity-70 mb-5 print:mb-4 mt-2">Course Projects & Research | 2024 - Present</p>
              
              <div className="flex flex-col gap-8 print:gap-8">
                <div>
                  <a href="https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">Enterprise Knowledge Graph</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: ExpressJS, Neo4j, Redis, Docker, JWT</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Designed Neo4j database schema mapping 80+ employees, skills, and project relationships.</li>
                    <li>Implemented Redis caching layer for chat history via Docker, reducing database load by 60%.</li>
                    <li>Built Chain-of-Thought agent system to optimize user queries before LLM processing.</li>
                    <li>Developed auto model routing service that selects optimal LLM (Ollama/Gemini) based on query complexity.</li>
                  </ul>
                </div>

                <div>
                  <a href="https://github.com/ThinkAI-team/thinkai-backend" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">ThinkAI E-Learning Platform</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Tech: Spring Boot, Aiven MySQL, CI/CD, Railway</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Implemented JWT authentication with role-based access control (Admin/Teacher/Student).</li>
                    <li>Deployed backend on Railway and database on Aiven MySQL with connection pooling optimization.</li>
                    <li>Built CI/CD pipelines with GitHub Actions integrating DevSecOps practices (SAST scanning).</li>
                    <li>Managed production infrastructure supporting 1,000+ concurrent mock-test sessions.</li>
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
