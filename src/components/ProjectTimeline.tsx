"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FolderKanban } from "lucide-react";

const projects = [
  {
    name: "Portfolio Website",
    nameVi: "Website Portfolio",
    start: 2024,
    end: 2026,
    status: "active",
    color: "bg-black",
  },
  {
    name: "EKG Chatbot",
    nameVi: "Chatbot EKG",
    start: 2025,
    end: 2026,
    status: "completed",
    color: "bg-gray-600",
  },
  {
    name: "ThinkAI Backend",
    nameVi: "ThinkAI Backend",
    start: 2025,
    end: 2026,
    status: "active",
    color: "bg-gray-400",
  },
  {
    name: "Docker Setup",
    nameVi: "Cấu hình Docker",
    start: 2024,
    end: 2025,
    status: "completed",
    color: "bg-gray-300",
  },
];

const yearStart = 2024;
const yearEnd = 2026;
const totalYears = yearEnd - yearStart + 1;
const years = Array.from({ length: totalYears }, (_, i) => yearStart + i);

export function ProjectTimeline() {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);

  const getPosition = (start: number, end: number) => {
    const cellWidth = 100 / totalYears;
    const startOffset = (start - yearStart) * cellWidth;
    const duration = (end - start + 1) * cellWidth;
    return { left: `${startOffset}%`, width: `${duration}%` };
  };

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FolderKanban className="w-6 h-6" />
            Project Timeline
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Dự án theo thời gian (dạng Gantt)"
              : "Project timeline (Gantt-style)"}
          </p>
        </div>

        {/* Timeline header */}
        <div className="flex border-b border-gray-200 mb-4">
          <div className="w-32" />
          <div className="flex-1 flex">
            {years.map((year) => (
              <div key={year} className="flex-1 text-xs text-gray-500 text-center py-2">
                {year}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex items-center"
              onMouseEnter={() => setHovered(project.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-32 text-sm font-medium truncate pr-4">
                {language === "vi" ? project.nameVi : project.name}
              </div>
              <div className="flex-1 relative h-8">
                {/* Background grid */}
                <div className="absolute inset-0 flex">
                  {years.map((year) => (
                    <div
                      key={year}
                      className="flex-1 border-l border-gray-200"
                    />
                  ))}
                </div>

                {/* Project bar */}
                <div
                  className={`absolute top-1 h-6 ${project.color} ${
                    hovered === project.name ? "opacity-80" : "opacity-90"
                  } transition-opacity cursor-pointer flex items-center px-2`}
                  style={getPosition(project.start, project.end)}
                >
                  <span className="text-xs text-white truncate">
                    {project.status === "active" ? "●" : "✓"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-black opacity-90" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 opacity-90" />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </section>
  );
}