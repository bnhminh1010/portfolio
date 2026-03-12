"use client";

import {
  Boxes,
  Bug,
  Container,
  GitBranch,
  Hammer,
  Kanban,
  LaptopMinimal,
  ServerCog,
} from "lucide-react";

const skills = [
  // Backend
  { label: "NestJS", Icon: ServerCog },
  { label: "Spring Boot", Icon: ServerCog },
  { label: "Neo4j", Icon: Boxes },
  { label: "PostgreSQL", Icon: Boxes },
  // DevOps
  { label: "Docker", Icon: Container },
  { label: "Linux", Icon: LaptopMinimal },
  { label: "Git", Icon: GitBranch },
  { label: "CI/CD", Icon: Hammer },
] as const;

const inverted = new Set([1, 3, 6]);

export function Skills() {
  return (
    <section id="skills" className="bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          My Tech Stack
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {skills.map(({ label, Icon }, idx) => {
            const isInverted = inverted.has(idx);
            const cardBase =
              "aspect-square border border-black flex flex-col items-center justify-center gap-3 p-4 transition-colors duration-200";
            const cardColors = isInverted
              ? "bg-black text-white"
              : "bg-white text-black";
            return (
              <article
                key={label}
                className={`${cardBase} ${cardColors}`}
                aria-label={label}
              >
                <Icon className="h-10 w-10" aria-hidden="true" />
                <p className="text-sm font-medium tracking-tight text-center">
                  {label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

