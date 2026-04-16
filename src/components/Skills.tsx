"use client";

import { useState, useEffect } from "react";
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
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ServerCog,
  Boxes,
  Container,
  GitBranch,
  Hammer,
  LaptopMinimal,
};

type Skill = {
  id: string;
  label: string;
  category: string;
  inverted: boolean;
};

export function Skills() {
  const { t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="skills" className="bg-white scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {t("skills", "title")}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square border border-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {t("skills", "title")}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {skills.map(({ label, id, category }, idx) => {
            // Use category to pick icon, fallback to ServerCog
            const Icon = category === "backend" ? ServerCog : category === "devops" ? Container : ServerCog;
            const isInverted = skills[idx]?.inverted || false;
            
            // Brutalist card base
            const cardBase = "group relative aspect-square border border-black flex flex-col items-center justify-center p-4 transition-colors duration-300 overflow-hidden cursor-crosshair";
            
            // Inverted vs Normal Colors
            const cardColors = isInverted
              ? "bg-black text-white hover:bg-white hover:text-black hover:border-black"
              : "bg-white text-black hover:bg-black hover:text-white hover:border-black";

            return (
              <article
                key={id}
                className={`${cardBase} ${cardColors}`}
                aria-label={label}
              >
                {/* Default State (Icon + Label) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                  <Icon className="h-10 w-10" aria-hidden="true" />
                  <p className="text-sm font-bold tracking-tight text-center uppercase">
                    {label}
                  </p>
                </div>

                {/* Hover State (Description) */}
                <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="text-xs font-black uppercase mb-2 opacity-50">{label}</h3>
                  <p className="text-[12px] sm:text-[13px] font-medium leading-tight">
                    {/* @ts-ignore */}
                    {t("skillsDesc", id)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

