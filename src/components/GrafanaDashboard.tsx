"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Activity } from "lucide-react";

export function GrafanaDashboard() {
  const { t } = useLanguage();
  const [cpuPoints, setCpuPoints] = useState<number[]>(Array(20).fill(30));
  const [memPoints, setMemPoints] = useState<number[]>(Array(20).fill(45));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuPoints(prev => {
        const next = [...prev.slice(1)];
        // Random fluctuation between 20-50 for CPU
        const newVal = Math.max(10, Math.min(80, prev[prev.length - 1] + (Math.random() * 20 - 10)));
        next.push(newVal);
        return next;
      });

      setMemPoints(prev => {
        const next = [...prev.slice(1)];
        // Membrane is more stable, steady creeping up or down
        const newVal = Math.max(30, Math.min(70, prev[prev.length - 1] + (Math.random() * 10 - 5)));
        next.push(newVal);
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const createPath = (points: number[]) => {
    if (points.length === 0) return "";
    const w = 100 / (points.length - 1);
    const h = 100;
    
    // Convert 0-100 values to SVG coordinates (inverted Y axis)
    const pts = points.map((p, i) => `${i * w},${h - p}`).join(" L ");
    return `M 0,${h} L 0,${h - points[0]} L ${pts} L 100,${h} Z`;
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-[#181B1F] border border-black/20 h-full font-mono text-[#D8D9DA] w-full">
      <div className="flex items-center justify-between pb-2 border-b border-[#2C3235]">
        <h3 className="text-sm font-bold flex items-center gap-2 text-[#F2F2F2]">
          <Activity className="h-4 w-4 text-[#FF9830]" />
          {t("devops", "grafana")}
        </h3>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] text-green-500">Live</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* CPU Chart */}
        <div className="relative flex flex-col bg-[#22252B] border border-[#2C3235] p-2 rounded-sm overflow-hidden">
          <div className="flex justify-between items-center mb-1 z-10 relative">
            <span className="text-[10px] font-bold text-[#8FA3B6]">{t("devops", "cpu")}</span>
            <span className="text-xs font-bold text-[#73BF69]">{cpuPoints[cpuPoints.length - 1].toFixed(1)}%</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 w-full opacity-60">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d={createPath(cpuPoints)} 
                fill="url(#cpuGradient)" 
                stroke="#73BF69" 
                strokeWidth="2"
                vectorEffect="non-scaling-stroke" 
                className="transition-all duration-500 ease-linear"
              />
              <defs>
                <linearGradient id="cpuGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#73BF69" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#73BF69" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Memory Chart */}
        <div className="relative flex flex-col bg-[#22252B] border border-[#2C3235] p-2 rounded-sm overflow-hidden">
          <div className="flex justify-between items-center mb-1 z-10 relative">
            <span className="text-[10px] font-bold text-[#8FA3B6]">{t("devops", "mem")}</span>
            <span className="text-xs font-bold text-[#8AB8FF]">{memPoints[memPoints.length - 1].toFixed(1)}%</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 w-full opacity-60">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d={createPath(memPoints)} 
                fill="url(#memGradient)" 
                stroke="#8AB8FF" 
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500 ease-linear"
              />
              <defs>
                <linearGradient id="memGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8AB8FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8AB8FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
