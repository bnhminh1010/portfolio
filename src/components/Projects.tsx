"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github, Code, Server, Database, Cloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Project = {
  id: string;
  name: string;
  nameVi: string;
  year: string;
  tech: string[];
  github: string;
  highlights: string[];
};

const getTechIcon = (tech: string) => {
  if (tech.includes("JS") || tech.includes("Boot") || tech.includes("Next")) return Code;
  if (tech.includes("MySQL") || tech.includes("Neo4j") || tech.includes("Redis") || tech.includes("Mongo")) return Database;
  if (tech.includes("Docker") || tech.includes("Cloud") || tech.includes("Railway")) return Cloud;
  return Server;
};

export function Projects() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        if (data.length > 0) setActiveProject(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !activeProject) {
    return (
      <section id="projects" className="border-b border-gray-200 bg-gray-50 scroll-mt-20">
        <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Projects</h2>
          </div>
          <div className="h-64 bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="border-b border-gray-200 bg-gray-50 scroll-mt-20">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi" ? "Featured projects & achievements" : "Featured projects & achievements"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Project List */}
          <div className="lg:col-span-1 space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                  activeProject.id === project.id
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {language === "vi" ? project.nameVi : project.name}
              </button>
            ))}
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2 bg-white border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">
                {language === "vi" ? activeProject.nameVi : activeProject.name}
              </h3>
              <span className="text-xs text-gray-500">{activeProject.year}</span>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject.tech.map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span key={tech} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs">
                    <Icon className="w-3 h-3" />
                    {tech}
                  </span>
                );
              })}
            </div>

            {/* Highlights */}
            <div className="space-y-2 mb-4">
              {activeProject.highlights.map((hl, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  {hl}
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

