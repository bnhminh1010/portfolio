"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GitBranch, ShieldCheck, CheckCircle2, Package, UploadCloud, Rocket } from "lucide-react";

type Stage = {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
};

const pipelineStages: Stage[] = [
  { id: "source", icon: GitBranch, titleKey: "source", descKey: "sourceDesc" },
  { id: "sast", icon: ShieldCheck, titleKey: "sast", descKey: "sastDesc" },
  { id: "test", icon: CheckCircle2, titleKey: "test", descKey: "testDesc" },
  { id: "build", icon: Package, titleKey: "build", descKey: "buildDesc" },
  { id: "registry", icon: UploadCloud, titleKey: "registry", descKey: "registryDesc" },
  { id: "deploy", icon: Rocket, titleKey: "deploy", descKey: "deployDesc" },
];

export function PipelineFlow() {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState<string | null>(null);

  return (
    <section id="pipeline" className="border-b border-black bg-[#f0f0f0] z-20 relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black/20">
            {t("pipeline", "title")}
          </h2>
          <p className="mt-2 text-sm font-medium text-black/60 max-w-2xl">
            {/* Hardcoded subtitle explaining interactivity */}
            Interactive flow diagram. Hover or tap on any stage to see the system design decisions and DevOps mindset behind it.
          </p>
        </div>

        <div className="relative mt-12 pb-32 lg:pb-40">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full relative z-10 gap-y-12 lg:gap-y-0">
            {/* Draw lines between nodes */}
            <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-black z-0"></div>

            {pipelineStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;

              return (
                <div
                  key={stage.id}
                  className="flex flex-col items-center relative group w-full lg:w-auto"
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                  onClick={() => setActiveStage(stage.id === activeStage ? null : stage.id)}
                >
                  {/* Vertical connecting line for mobile */}
                  {index > 0 && (
                    <div className="lg:hidden w-1 h-12 bg-black absolute -top-12"></div>
                  )}

                  {/* Node */}
                  <div className={`
                    w-14 h-14 bg-white border-4 border-black flex items-center justify-center z-10 cursor-pointer
                    transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-[4px_4px_0_0_#000]
                    ${isActive ? "bg-black text-white shadow-[4px_4px_0_0_#0f0] border-black scale-110" : "text-black"}
                  `}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Node Label */}
                  <div className="mt-4 font-bold text-sm tracking-tight text-center whitespace-nowrap lg:whitespace-normal px-2">
                    {t("pipeline", stage.titleKey)}
                  </div>

                  {/* Tooltip / Popup Card */}
                  <div className={`
                    absolute top-full mt-4 lg:mt-8 w-[280px] bg-white border-2 border-black p-4 shadow-[8px_8px_0_0_#000]
                    transition-all duration-300 z-50 text-left
                    ${isActive ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}
                    lg:left-1/2 lg:-translate-x-1/2
                  `}>
                    <div className="flex items-center gap-2 mb-2 border-b-2 border-black/10 pb-2">
                      <Icon className="h-4 w-4 shrink-0" />
                      <h4 className="font-black text-sm uppercase">{t("pipeline", stage.titleKey)}</h4>
                    </div>
                    <p className="text-xs font-medium leading-relaxed">
                      {t("pipeline", stage.descKey)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
