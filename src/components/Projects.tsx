"use client";

import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { dictionaries } from "@/i18n/dictionaries";

export function Projects() {
  const { language, t } = useLanguage();
  const projects = dictionaries[language].projects.items;

  // Icons are mapped by index since the order is the same across translations
  const ctas = [
    {
      href: "https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph",
      variant: "outline" as const,
      Icon: Github,
    },
    {
      href: "https://github.com/ThinkAI-team/thinkai-backend",
      variant: "solid" as const,
      Icon: ExternalLink,
    },
  ];

  return (
    <section id="projects" className="bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("projects", "title")}
        </h2>

        <div className="mt-10 space-y-6">
          {projects.map((p, idx) => {
            const cta = ctas[idx];
            return (
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
                  <a href={cta.href} target="_blank" rel="noreferrer">
                    <Button variant={cta.variant} className="h-10 px-4">
                      <cta.Icon className="h-4 w-4" aria-hidden="true" />
                      {t("projects", "viewSource")}
                    </Button>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

