"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const skills = [
  { id: "backend", name: "Backend Dev", nameVi: "Backend", value: 85 },
  { id: "devops", name: "DevOps", nameVi: "DevOps", value: 80 },
  { id: "database", name: "Database", nameVi: "Database", value: 75 },
  { id: "cloud", name: "Cloud", nameVi: "Cloud", value: 70 },
  { id: "security", name: "Security", nameVi: "Bảo mật", value: 65 },
  { id: "system", name: "System Design", nameVi: "Thiết kế HT", value: 70 },
];

export function SkillRadar() {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);

  const size = 280;
  const center = size / 2;
  const maxRadius = size / 2 - 50;
  const levels = 5;

  // Calculate polygon points
  const getPoints = (skillValues: number[]) => {
    const angleStep = (Math.PI * 2) / skillValues.length;
    return skillValues
      .map((val, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const radius = (val / 100) * maxRadius;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Skill Radar</h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Tổng quan kỹ năng Backend/DevOps"
              : "Backend/DevOps skill overview"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Radar Chart */}
          <div className="relative">
            <svg width={size} height={size} className="overflow-visible">
              {/* Background circles */}
              {Array.from({ length: levels }, (_, i) => (
                <circle
                  key={i}
                  cx={center}
                  cy={center}
                  r={maxRadius - (i * maxRadius) / (levels - 1)}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              ))}

              {/* Axis lines */}
              {skills.map((_, i) => {
                const angle = (i * Math.PI * 2) / skills.length - Math.PI / 2;
                const x = center + maxRadius * Math.cos(angle);
                const y = center + maxRadius * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Skill polygon */}
              <polygon
                points={getPoints(skills.map((s) => s.value))}
                fill="rgba(0, 0, 0, 0.1)"
                stroke="black"
                strokeWidth="2"
              />

              {/* Data points */}
              {skills.map((skill, i) => {
                const angle = (i * Math.PI * 2) / skills.length - Math.PI / 2;
                const radius = (skill.value / 100) * maxRadius;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                return (
                  <g key={skill.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill={hovered === skill.id ? "black" : "white"}
                      stroke="black"
                      strokeWidth="2"
                      className="cursor-pointer transition-all"
                    />
                    {/* Label */}
                    <text
                      x={x}
                      y={y + (y > center ? 20 : -12)}
                      textAnchor="middle"
                      className="text-xs font-medium"
                      fill={hovered === skill.id ? "black" : "#6b7280"}
                    >
                      {language === "vi" ? skill.nameVi : skill.name}
                    </text>
                  </g>
                );
              })}

              {/* Axis labels */}
              {skills.map((skill, i) => {
                const angle = (i * Math.PI * 2) / skills.length - Math.PI / 2;
                const labelRadius = maxRadius + 30;
                const x = center + labelRadius * Math.cos(angle);
                const y = center + labelRadius * Math.sin(angle);
                return (
                  <text
                    key={skill.id}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[10px] fill-gray-400"
                    onMouseEnter={() => setHovered(skill.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {skill.value}%
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend / Details */}
          <div className="space-y-3 w-full max-w-xs">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`transition-colors ${
                  hovered === skill.id ? "bg-gray-50" : ""
                }`}
                onMouseEnter={() => setHovered(skill.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">
                    {language === "vi" ? skill.nameVi : skill.name}
                  </span>
                  <span className="text-gray-500">{skill.value}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}