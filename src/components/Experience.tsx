"use client";

import { useLanguage } from "@/context/LanguageContext";
import { dictionaries } from "@/i18n/dictionaries";

export function Experience() {
  const { language, t } = useLanguage();
  const roles = dictionaries[language].experience.jobs;

  return (
    <section id="experience" className="bg-black text-white scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("experience", "title")}
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

