"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "about", label: "About", labelVi: "Giới thiệu" },
  { id: "skills", label: "Skills", labelVi: "Kỹ năng" },
  { id: "skill-radar", label: "Skill Radar", labelVi: "Radar Kỹ năng" },
  { id: "timeline", label: "Learning Timeline", labelVi: "Timeline Học tập" },
  { id: "activity", label: "Activity", labelVi: "Hoạt động" },
  { id: "projects-timeline", label: "Projects", labelVi: "Dự án" },
  { id: "comparison", label: "Code Compare", labelVi: "So sánh Code" },
  { id: "iac", label: "IaC Showcase", labelVi: "IaC" },
  { id: "security", label: "Security", labelVi: "Bảo mật" },
  { id: "monitoring", label: "Monitoring", labelVi: "Giám sát" },
  { id: "pipeline", label: "CI/CD Pipeline", labelVi: "CI/CD" },
  { id: "network", label: "Network", labelVi: "Mạng" },
  { id: "incidents", label: "Incidents", labelVi: "Sự cố" },
  { id: "cost", label: "Cost", labelVi: "Chi phí" },
  { id: "experience", label: "Experience", labelVi: "Kinh nghiệm" },
  { id: "projects", label: "Projects", labelVi: "Dự án" },
];

export function FloatingTOC() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-20 z-50 p-3 bg-white border border-black shadow-lg hover:bg-black hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* TOC Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-white border-l border-gray-200 shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="pt-20 pb-4 overflow-y-auto h-full">
          <div className="px-4 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-sm">Components</h3>
            <p className="text-xs text-gray-500">
              {language === "vi" ? `${sections.length} features` : `${sections.length} features`}
            </p>
          </div>

          <nav className="px-2 py-2 space-y-0.5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  activeSection === section.id
                    ? "bg-black text-white font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {language === "vi" ? section.labelVi : section.label}
              </button>
            ))}
          </nav>

          {/* Stats */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <div className="text-xs text-gray-500 text-center">
              <span className="font-bold text-black">{sections.length}</span> components
            </div>
          </div>
        </div>
      </div>
    </>
  );
}