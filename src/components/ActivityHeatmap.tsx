"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Flame } from "lucide-react";

// Static mock data - no random
const staticActivity: number[][] = [
  [0,1,2,1,0,2,1], [1,0,0,2,1,0,1], [2,1,1,0,0,1,2], [0,0,1,2,1,1,0],
  [1,2,0,1,0,0,1], [0,1,1,0,2,1,0], [1,0,0,1,0,1,2], [2,1,1,0,1,0,0],
  [0,0,2,1,0,1,1], [1,1,0,0,1,2,0], [0,1,1,2,1,0,1], [1,0,0,1,0,1,0],
  [2,1,1,0,1,0,1], [0,2,0,1,0,0,2], [1,0,1,1,2,1,0], [0,1,0,0,1,2,1],
  [1,0,2,1,0,1,0], [0,0,1,2,1,0,1], [1,1,0,0,1,1,2], [2,0,1,0,0,1,1],
  [0,1,1,2,1,0,0], [1,0,0,1,0,2,1], [0,2,1,0,1,0,1], [1,0,1,1,0,0,2],
  [2,1,0,0,1,1,0], [0,0,2,1,0,1,1], [1,1,0,1,2,0,0], [0,1,1,0,0,1,2],
  [1,0,0,1,1,0,1], [2,1,1,0,0,1,0], [0,0,1,2,1,1,0], [1,2,0,0,1,0,1],
  [0,1,1,1,0,2,0], [1,0,0,2,1,0,1], [2,1,1,0,0,1,1], [0,0,1,1,2,0,0],
  [1,1,0,0,1,1,2], [0,2,1,1,0,0,1], [1,0,0,2,1,1,0], [0,1,1,0,1,0,1],
  [2,0,1,0,0,2,1], [1,1,0,1,1,0,0], [0,0,2,1,0,1,1], [1,2,0,0,1,0,1],
  [0,1,1,2,1,1,0], [1,0,0,1,0,2,1], [2,1,1,0,0,0,2], [0,1,0,1,1,1,0],
  [1,0,2,0,1,0,1], [0,2,1,1,0,1,0], [1,0,0,2,1,0,1], [2,1,1,0,0,1,1],
  [0,0,1,1,2,0,0], [1,1,0,0,1,2,1],
];

export function ActivityHeatmap() {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<{ w: number; d: number } | null>(null);
  const activity = staticActivity;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getColor = (val: number) => {
    if (val === 0) return "bg-gray-100";
    if (val === 1) return "bg-gray-300";
    if (val === 2) return "bg-gray-500";
    if (val >= 3) return "bg-gray-700";
    return "bg-gray-100";
  };

  const total = activity.reduce((sum, week) => sum + week.reduce((a, b) => a + b, 0), 0);
  const maxStreak = 7; // mock streak

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="w-6 h-6" />
            Activity
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Hoạt động code hàng tuần (tương tự GitHub)"
              : "Weekly coding activity (GitHub-style)"}
          </p>
        </div>

        <div className="overflow-x-auto">
          {/* Month labels */}
          <div className="flex text-xs text-gray-400 mb-1 ml-8">
            {months.map((m, i) => (
              <div key={i} className="w-[13px]" />
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col text-[10px] text-gray-400 gap-[2px] mr-1">
              <div className="h-[13px]" />
              {days.map((d, i) => (
                <div key={i} className="h-[11px] flex items-center">
                  {i % 2 === 1 ? d : ""}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-[2px]">
              {activity.map((week, w) => (
                <div key={w} className="flex flex-col gap-[2px]">
                  {week.map((val, d) => (
                    <div
                      key={d}
                      onClick={() => setSelected({ w, d })}
                      className={`w-3 h-3 ${getColor(val)} cursor-pointer hover:ring-2 hover:ring-black hover:ring-offset-1 transition-all ${selected?.w === w && selected?.d === d ? "ring-2 ring-black ring-offset-1" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="font-bold">{total}</span>
            <span className="text-gray-500 ml-1">contributions</span>
          </div>
          <div>
            <span className="font-bold">{maxStreak}</span>
            <span className="text-gray-500 ml-1">day streak</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-[2px]">
            <div className="w-3 h-3 bg-gray-100" />
            <div className="w-3 h-3 bg-gray-300" />
            <div className="w-3 h-3 bg-gray-500" />
            <div className="w-3 h-3 bg-gray-700" />
            <div className="w-3 h-3 bg-black" />
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}