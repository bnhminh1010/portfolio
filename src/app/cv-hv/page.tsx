'use client';

import { Mail, Phone, MapPin, Github, Globe } from 'lucide-react';

export default function CVPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Times+New+Roman&display=swap');

        body {
          font-family: 'Times New Roman', Times, serif !important;
        }

        body * {
          font-family: 'Times New Roman', Times, serif !important;
        }

        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .print-header,
          .print-footer {
            display: none !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#fafafa] py-8 px-4 font-serif">
        <div className="max-w-[850px] mx-auto bg-white shadow-sm border border-black p-8 md:p-12">
          <header className="mb-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-0.5">
              Binh Minh
            </h1>
            <p className="text-sm text-gray-700 font-medium mb-2">
              Backend &amp; DevOps Engineer
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 text-xs text-gray-600">
              <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1 hover:underline">
                <Mail size={12} />
                pata10102004@gmail.com
              </a>
              <span className="flex items-center gap-1">
                <Phone size={12} />
                037 206 4929
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                Ho Chi Minh City, Vietnam
              </span>
              <a href="https://github.com/bnhminh1010" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <Github size={12} />
                github.com/bnhminh1010
              </a>
              <a href="https://portfolio-binhminh.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <Globe size={12} />
                portfolio-binhminh.vercel.app
              </a>
            </div>
          </header>

          <hr className="border-gray-400 mb-4" />

          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Education
            </h2>
            <div className="flex justify-between items-baseline gap-4">
              <div>
                <p className="font-bold text-sm text-gray-900">
                  Ho Chi Minh City University of Technology (HUTECH)
                </p>
                <p className="text-sm text-gray-700">
                  Engineer in Software Engineering
                </p>
              </div>
              <p className="text-xs text-gray-600 whitespace-nowrap">
                Sep 2022 – Jun 2026
              </p>
            </div>
            <ul className="mt-1.5 text-xs text-gray-700 ml-4 list-disc space-y-0.5">
              <li>GPA: 3.19 / 4.0</li>
              <li>Semi-Finalist, IT Got Talent 2025</li>
              <li>Relevant Coursework: Data Structures &amp; Algorithms, System Design, Database Management, Software Engineering, Operating Systems</li>
              <li>English: TOEIC Target 650</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Technical Skills
            </h2>
            <div className="text-xs text-gray-700 space-y-1.5">
              <p>
                <span className="font-semibold text-gray-900">Backend:</span>{' '}
                Node.js, NestJS, Spring Boot, .NET, Neo4j, PostgreSQL
              </p>
              <p>
                <span className="font-semibold text-gray-900">DevOps:</span>{' '}
                Docker, GitOps, Linux, CI/CD (GitHub Actions), DevSecOps
              </p>
              <p>
                <span className="font-semibold text-gray-900">AI-Powered Development:</span>{' '}
                Claude Code, OpenCode, Cursor, Antigravity
              </p>
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Experience &amp; Projects
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <div>
                    <span className="font-bold text-sm text-gray-900">Enterprise Knowledge Graph</span>
                    <span className="text-gray-500 text-xs ml-1">— Personal Project</span>
                  </div>
                  <p className="text-xs text-gray-600 whitespace-nowrap">2025</p>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">
                  React · NestJS · Neo4j · Docker
                </p>
                <ul className="text-xs text-gray-700 ml-4 list-disc space-y-0.5">
                  <li>Designed and architected an internal search and knowledge visualization tool using Neo4j, mapping relationships among 80+ employees and their skill sets</li>
                  <li>Implemented multi-layer caching to enable instant retrieval of 300+ graph nodes, reducing query latency by over 70%</li>
                  <li>Containerized the full-stack application using Docker multi-stage builds, cutting image size by 60%</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <div>
                    <span className="font-bold text-sm text-gray-900">ThinkAI E-Learning Platform</span>
                    <span className="text-gray-500 text-xs ml-1">— Team Project</span>
                  </div>
                  <p className="text-xs text-gray-600 whitespace-nowrap">2024</p>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">
                  Spring Boot · PostgreSQL · Next.js · GitHub Actions · SAST
                </p>
                <ul className="text-xs text-gray-700 ml-4 list-disc space-y-0.5">
                  <li>Built a monolithic core system managing the full lifecycle of online courses and user subscriptions</li>
                  <li>Optimized complex database queries to support 1,000+ concurrent mock-test sessions, improving throughput by 40%</li>
                  <li>Designed automated CI/CD pipelines with GitHub Actions, integrating DevSecOps practices (SAST scanning)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Additional
            </h2>
            <p className="text-xs text-gray-700">
              Passionate about clean architecture, scalable system design, and automating development workflows. Committed to writing maintainable, well-tested code and continuously improving engineering practices.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
