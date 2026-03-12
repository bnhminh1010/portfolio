"use client";

const roles = [
  {
    title: "Fullstack Developer @ Enterprise Knowledge Graph (EKG System)",
    period: "Oct 2025 – Present",
    bullets: [
      "Architected an enterprise knowledge graph using Neo4j, modeling 80+ employees, 6 departments, and over 300 relationships.",
      "Integrated graph algorithms to analyze personnel relationships within the organization.",
      "In charge of backend architecture design, data modeling, and collaborating directly with a 3-member team.",
    ],
  },
  {
    title: "Backend Developer @ ZenDo – Focus & Productivity App",
    period: "Sep 2025 – Oct 2025",
    bullets: [
      "Developed backend features for a time management mobile application using Supabase.",
      "Built authentication flows (login, signup, session) and real-time task synchronization.",
      "Designed database schema for tasks, focus sessions, statistics, and user progress.",
      "Optimized database queries and implemented structured error handling to improve API reliability.",
    ],
  },
  {
    title: "Backend Developer & DevOps @ ThinkAI",
    period: "2026",
    bullets: [
      "Developed Spring Boot backend API for the ThinkAI e-learning platform using MySQL and JPA/Hibernate.",
      "Containerized the system using Docker and set up a fast local development environment via docker-compose.",
      "Managed the software development lifecycle, ensuring optimal backend stability and easy deployment.",
    ],
  },
] as const;

export function Experience() {
  return (
    <section id="experience" className="bg-black text-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Experience
        </h2>

        <div className="mt-10 space-y-6">
          {roles.map((role) => (
            <article
              key={role.title}
              className="border border-white p-6 sm:p-7"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-bold tracking-tight">
                  {role.title}
                </h3>
                <p className="text-sm text-white/80">{role.period}</p>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/90">
                {role.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

