"use client";

import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";

const projects = [
  {
    title: "Enterprise Knowledge Graph (EKG)",
    description:
      "Enterprise Knowledge Graph built with Neo4j, NestJS, and Next.js. Integrates 3-tier routing AI Chat (Neo4j direct / Ollama RAG / Gemini) and Redis caching for conversation history.",
    cta: {
      label: "View Source",
      href: "https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph",
      variant: "outline" as const,
    },
    Icon: Github,
    meta: "Neo4j • NestJS • Next.js • Redis • Ollama • Gemini",
  },
  {
    title: "ThinkAI Backend",
    description:
      "Spring Boot backend API for the ThinkAI e-learning platform. Utilizes MySQL and JPA/Hibernate, packaged with Docker for quick local environment setup via docker-compose.",
    cta: {
      label: "View Source",
      href: "https://github.com/ThinkAI-team/thinkai-backend",
      variant: "solid" as const,
    },
    Icon: ExternalLink,
    meta: "Java (Spring Boot) • MySQL • JPA/Hibernate • Docker • Maven",
  },
] as const;

export function Projects() {
  return (
    <section id="projects" className="bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Projects
        </h2>

        <div className="mt-10 space-y-6">
          {projects.map((p) => (
            <article
              key={p.title}
              className="border border-black p-6 sm:p-7"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                <p className="text-sm text-black/70">2026</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-black/80">
                {p.description}
              </p>
              <p className="mt-3 text-xs font-medium tracking-tight text-black/70">
                {p.meta}
              </p>

              <div className="mt-6">
                <a href={p.cta.href} target="_blank" rel="noreferrer">
                  <Button variant={p.cta.variant} className="h-10 px-4">
                    <p.Icon className="h-4 w-4" aria-hidden="true" />
                    {p.cta.label}
                  </Button>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

