"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Briefcase, Calendar, MapPin } from "lucide-react";

type Experience = {
  id: string;
  role: string;
  roleVi: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
};

export function Experience() {
  const { language } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Experience | null>(null);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        if (data.length > 0) setSelected(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !selected) {
    return (
      <section id="experience" className="border-b border-gray-200 bg-white scroll-mt-20">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Experience
            </h2>
          </div>
          <div className="h-64 bg-gray-100 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="border-b border-gray-200 bg-white scroll-mt-20">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Experience
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi" ? "Kinh nghiệm làm việc & dự án" : "Work experience & projects"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Experience List */}
          <div className="lg:col-span-1 space-y-1">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelected(exp)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  selected.id === exp.id
                    ? "bg-black text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="font-medium">{exp.company}</div>
                <div className={`text-xs ${selected.id === exp.id ? "text-gray-300" : "text-gray-400"}`}>
                  {language === "vi" ? exp.roleVi : exp.role}
                </div>
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="lg:col-span-2 border border-gray-200 p-6">
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {selected.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selected.location}
              </span>
              <span className={`px-2 py-0.5 ${selected.type === "team" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                {selected.type === "team" ? "Team" : "Personal"}
              </span>
            </div>

            <h3 className="text-lg font-bold mb-4">
              {language === "vi" ? selected.roleVi : selected.role} @ {selected.company}
            </h3>

            <div className="space-y-3">
              {selected.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 shrink-0" />
                  <span className="text-gray-600">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

