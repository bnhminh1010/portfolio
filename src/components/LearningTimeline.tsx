"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BookOpen, Code, Database, Server, Shield, Cloud, GitBranch, Container } from "lucide-react";

const timelineData = [
  {
    year: "2022",
    title: "Foundation",
    titleVi: "Nền tảng",
    items: [
      { label: "Java / OOP", icon: Code, desc: "Core Java, OOP concepts" },
      { label: "Data Structures", icon: Server, desc: "Algorithms, Big O" },
      { label: "Git", icon: GitBranch, desc: "Version control basics" },
    ],
  },
  {
    year: "2023",
    title: "Backend Basics",
    titleVi: "Backend Cơ bản",
    items: [
      { label: "Spring Boot", icon: Code, desc: "REST APIs, JWT Auth" },
      { label: "MySQL", icon: Database, desc: "Relational databases" },
      { label: "HTTP/REST", icon: Server, desc: "API design patterns" },
    ],
  },
  {
    year: "2024",
    title: "DevOps Intro",
    titleVi: "DevOps Cơ bản",
    items: [
      { label: "Docker", icon: Container, desc: "Containerization" },
      { label: "Redis", icon: Server, desc: "Caching strategies" },
      { label: "Linux", icon: Server, desc: "System administration" },
    ],
  },
  {
    year: "2025",
    title: "Advanced",
    titleVi: "Nâng cao",
    items: [
      { label: "Neo4j", icon: Database, desc: "Graph databases" },
      { label: "CI/CD", icon: GitBranch, desc: "GitHub Actions" },
      { label: "Grafana", icon: Server, desc: "Monitoring & Observability" },
    ],
  },
  {
    year: "2026",
    title: "Cloud & Security",
    titleVi: "Cloud & Bảo mật",
    items: [
      { label: "AWS Basics", icon: Cloud, desc: "EC2, RDS, S3, CloudFront" },
      { label: "DevSecOps", icon: Shield, desc: "Security scanning (Trivy)" },
      { label: "Terraform", icon: Cloud, desc: "Infrastructure as Code" },
    ],
  },
];

export function LearningTimeline() {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>("2026");

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Learning Timeline
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Hành trình học tập từ cơ bản đến nâng cao"
              : "Learning journey from foundation to advanced"}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[60px] top-0 bottom-0 w-px bg-gray-200" />

          {/* Items */}
          <div className="space-y-0">
            {timelineData.map((era) => (
              <div key={era.year} className="relative pl-20 py-4">
                {/* Year badge */}
                <button
                  onClick={() => setExpanded(expanded === era.year ? null : era.year)}
                  className={`absolute left-0 top-4 w-[50px] text-center ${
                    expanded === era.year ? "font-bold" : "font-medium text-gray-400"
                  }`}
                >
                  <div
                    className={`text-lg ${
                      expanded === era.year ? "text-black" : "text-gray-400"
                    }`}
                  >
                    {era.year}
                  </div>
                </button>

                {/* Icon dot */}
                <div
                  className={`absolute left-[52px] top-5 w-4 h-4 rounded-full border-2 transition-colors ${
                    expanded === era.year
                      ? "bg-black border-black"
                      : "bg-white border-gray-300"
                  }`}
                />

                {/* Content */}
                <button
                  onClick={() => setExpanded(expanded === era.year ? null : era.year)}
                  className="w-full text-left"
                >
                  <h3
                    className={`text-lg font-medium ${
                      expanded === era.year ? "" : "text-gray-400"
                    }`}
                  >
                    {language === "vi" ? era.titleVi : era.title}
                  </h3>
                </button>

                {/* Expanded items */}
                {expanded === era.year && (
                  <div className="mt-3 space-y-2">
                    {era.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-start gap-3 p-3 bg-white border border-gray-200"
                      >
                        <item.icon className="w-4 h-4 mt-0.5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 flex flex-wrap gap-4 text-xs text-gray-500">
          <div>5 years</div>
          <div>•</div>
          <div>15+ technologies</div>
          <div>•</div>
          <div>Self-taught focus</div>
        </div>
      </div>
    </section>
  );
}