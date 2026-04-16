"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GitCompare } from "lucide-react";

const beforeCode = `// Portfolio v0.1 - Simple single page
// Problems: no components, repeated code

function Portfolio() {
  return (
    <div>
      <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </nav>

      <section id="about">
        <h1>Hi, I'm Binh Minh</h1>
        <p>Backend Developer</p>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul>
          <li>NodeJS</li>
          <li>Docker</li>
          <li>PostgreSQL</li>
        </ul>
      </section>

      <footer>
        <p>Contact: email@example.com</p>
      </footer>
    </div>
  );
}
// Issues:
// - Massive single component
// - No reusable components
// - Hard to maintain
// - No animations
// - Poor SEO
// - No dark mode
// - No i18n`;

const afterCode = `// Portfolio v2.0 - Component-based
// Benefits: reusable, maintainable

// Components (20+):
// - Header, Hero, Skills
// - PipelineFlow, KubeVisualizer
// - GrafanaDashboard, SecurityScan
// - IaCShowcase, NetworkTopology
// - IncidentDemo, CostBreakdown
// - LearningTimeline, SkillRadar
// - Terminal, CustomCursor
// - LiveMonitoring, ActivityHeatmap
// - ProjectTimeline, ScrollFadeIn

function Home() {
  return (
    <div className="app">
      <Header />
      <FloatingParticles /> // Cool BG
      <ScrollFadeIn><Hero /></ScrollFadeIn>
      <ScrollFadeIn><Skills /></ScrollFadeIn>
      <ScrollFadeIn><SkillRadar /></ScrollFadeIn>
      <ScrollFadeIn><LearningTimeline /></ScrollFadeIn>
      <ScrollFadeIn><ActivityHeatmap /></ScrollFadeIn>
      <ScrollFadeIn><ProjectTimeline /></ScrollFadeIn>
      <ScrollFadeIn><IaCShowcase /></ScrollFadeIn>
      <ScrollFadeIn><SecurityScan /></ScrollFadeIn>
      <ScrollFadeIn><LiveMonitoring /></ScrollFadeIn>
      <ScrollFadeIn><NetworkTopology /></ScrollFadeIn>
      <ScrollFadeIn><IncidentDemo /></ScrollFadeIn>
      <ScrollFadeIn><CostBreakdown /></ScrollFadeIn>
      <ScrollFadeIn><PipelineFlow /></ScrollFadeIn>
      <GitOpsStatus />
      <Terminal />
      <Footer />
    </div>
  );
}
// Benefits:
// ✓ Reusable components
// ✓ Scroll animations
// ✓ Interactive terminal
// ✓ DevOps visualizations
// ✓ Real-time monitoring
// ✓ i18n support
// ✓ Mobile responsive`;

export function CodeComparison() {
  const { language } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(10, Math.min(90, x)));
  };

  return (
    <section className="border-b border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <GitCompare className="w-6 h-6" />
            Code Comparison
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "So sánh cấu trúc code trước và sau"
              : "Before/after code structure"}
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative h-[400px] select-none cursor-ew-resize overflow-hidden border border-gray-300"
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          {/* AFTER (Right side - full width, clipped) */}
          <div
            className="absolute inset-0 overflow-hidden bg-[#1e1e1e]"
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
          >
            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1">
              After
            </div>
            <pre className="p-4 text-xs font-mono text-green-400 h-full overflow-auto">
              <code>{afterCode}</code>
            </pre>
          </div>

          {/* BEFORE (Left side) */}
          <div
            className="absolute inset-0 overflow-hidden bg-[#2d2d2d]"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1">
              Before
            </div>
            <pre className="p-4 text-xs font-mono text-red-300 h-full overflow-auto">
              <code>{beforeCode}</code>
            </pre>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-2 text-sm">
          <div className="text-red-600 font-medium">Before: Simple, limited</div>
          <div className="text-green-600 font-medium">After: Component-based, scalable</div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white border">
            <div className="text-2xl font-bold">20+</div>
            <div className="text-xs text-gray-500">Components</div>
          </div>
          <div className="p-3 bg-white border">
            <div className="text-2xl font-bold">15+</div>
            <div className="text-xs text-gray-500">DevOps Features</div>
          </div>
          <div className="p-3 bg-white border">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-xs text-gray-500">Reusable</div>
          </div>
        </div>
      </div>
    </section>
  );
}