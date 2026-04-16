'use client';

import { Mail, Phone, MapPin, Github, Globe, GraduationCap, Briefcase, Code, Server } from 'lucide-react';

export default function CVBackendDevopsPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center print:bg-white print:p-0">
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      <div className="w-full max-w-[210mm] bg-white shadow-2xl print:shadow-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:max-w-none text-slate-800 p-8 sm:p-10 print:p-6">
        {/* Header */}
        <header className="border-b-2 border-slate-800 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-1">Nguyen Binh Minh</h1>
          <h2 className="text-lg font-semibold text-slate-600 mb-4">Backend/DevOps Developer</h2>

          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <a href="tel:0372064929" className="flex items-center gap-1.5 hover:text-slate-900">
              <Phone className="w-4 h-4" /> 0372064929
            </a>
            <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1.5 hover:text-slate-900">
              <Mail className="w-4 h-4" /> pata10102004@gmail.com
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Thu Duc, TP. HCM
            </span>
            <a href="https://binhminh.thinkai.id.vn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-900">
              <Globe className="w-4 h-4" /> binhminh.thinkai.id.vn
            </a>
            <a href="https://github.com/bnhminh1010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-slate-900">
              <Github className="w-4 h-4" /> github.com/bnhminh1010
            </a>
          </div>
        </header>

        {/* Objectives */}
        <section className="mb-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Career Objectives
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0 w-20">Short-term:</span>
              <span className="text-slate-600">Secure a Backend/DevOps position to apply knowledge in real-world systems, contribute to team success, and grow in a professional environment.</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0 w-20">Long-term:</span>
              <span className="text-slate-600">Become a system architect capable of designing scalable, resilient distributed systems. Master DevOps practices to build robust CI/CD pipelines and infrastructure.</span>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Education
          </h3>
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-slate-900">Ho Chi Minh City University of Technology</h4>
                <p className="text-sm text-slate-600">Engineer in Software Engineering</p>
              </div>
              <span className="text-sm font-semibold text-slate-700 bg-slate-200 px-2 py-1 rounded">2022 - 2026</span>
            </div>
            <ul className="text-sm text-slate-600 flex flex-wrap gap-4">
              <li><strong>GPA:</strong> 3.19/4.0</li>
              <li><strong>Awards:</strong> Semifinalist IT Got Talent 2025</li>
              <li><strong>English:</strong> Studying TOEIC (Target 650)</li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <Code className="w-4 h-4" /> Skills
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Language:</span>
              <span className="text-slate-600">C#, JAVA, NodeJS</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Framework:</span>
              <span className="text-slate-600">Spring Boot, .NET, Express</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Database:</span>
              <span className="text-slate-600">MongoDB, MySQL, Neo4j</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">DevOps:</span>
              <span className="text-slate-600">Docker, GitOps, Linux, CI/CD</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Tools:</span>
              <span className="text-slate-600">Bruno, Git, Docker compose</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold text-slate-700 shrink-0">AI Tools:</span>
              <span className="text-slate-600">ClaudeCode, Cursor</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h3 className="text-base font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <Server className="w-4 h-4" /> Projects
          </h3>

          <div className="space-y-4">
            {/* Project 1 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900">Enterprise Knowledge Graph (EKG System)</h4>
                  <p className="text-xs text-slate-500">Backend/DevOps</p>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">Oct 2025 - Jan 2026</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">Tech: ExpressJS, Neo4j, Redis, Docker, JWT</p>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                <li>Designed Neo4j database schema mapping 80+ employees, skills, and project relationships.</li>
                <li>Implemented Redis caching layer for chat history via Docker, reducing database load by 60%.</li>
                <li>Built Chain-of-Thought agent system to optimize user queries before LLM processing.</li>
                <li>Developed auto model routing service that selects optimal LLM (Ollama/Gemini) based on query complexity.</li>
              </ul>
              <a href="https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
                <Github className="w-3 h-3" /> github.com/bnhminh1010
              </a>
            </div>

            {/* Project 2 */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900">ThinkAI E-Learning Platform</h4>
                  <p className="text-xs text-slate-500">Backend/DevOps</p>
                </div>
                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">2026 - Present</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">Tech: Spring Boot 3, Aiven MySQL, Docker, CI/CD, Railway</p>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                <li>Implemented JWT authentication with role-based access control (Admin/Teacher/Student).</li>
                <li>Deployed backend on Railway and database on Aiven MySQL with connection pooling optimization.</li>
                <li>Built CI/CD pipelines with GitHub Actions integrating DevSecOps practices (SAST scanning).</li>
                <li>Optimized database queries supporting 100+ concurrent mock-test sessions with 40% improved throughput.</li>
                <li>Developed RESTful APIs handling course lifecycle, subscriptions, and exam system.</li>
              </ul>
              <a href="https://github.com/ThinkAI-team/thinkai-backend" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-2 inline-flex items-center gap-1">
                <Github className="w-3 h-3" /> github.com/ThinkAI-team
              </a>
            </div>
          </div>
        </section>

        {/* Print button */}
        <div className="text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-slate-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Print / Save as PDF
          </button>
        </div>
      </div>
    </main>
  );
}