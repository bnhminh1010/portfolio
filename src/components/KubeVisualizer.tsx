"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Server, ZapOff } from "lucide-react";

type PodStatus = "running" | "terminating" | "creating";

type Pod = {
  id: string;
  status: PodStatus;
};

export function KubeVisualizer() {
  const { t } = useLanguage();
  
  const generatePodId = () => Math.random().toString(36).substring(2, 7);

  const [pods, setPods] = useState<Pod[]>([
    { id: "pod-a", status: "running" },
    { id: "pod-b", status: "running" },
    { id: "pod-c", status: "running" },
  ]);

  const killPod = useCallback((idToKill: string) => {
    // 1. Mark as terminating
    setPods(current => 
      current.map(p => p.id === idToKill ? { ...p, status: "terminating" } : p)
    );

    // 2. Remove after anim and spawn a new one (ReplicaSet simulation)
    setTimeout(() => {
      setPods(current => {
        const filtered = current.filter(p => p.id !== idToKill);
        return [...filtered, { id: `pod-${generatePodId()}`, status: "creating" }];
      });
      
      // 3. Mark the new one as running
      setTimeout(() => {
        setPods(current => 
          current.map(p => p.status === "creating" ? { ...p, status: "running" } : p)
        );
      }, 500);

    }, 800);
  }, []);

  return (
    <div className="flex flex-col gap-3 p-4 border border-black dark:border-white bg-[#f9f9f9] h-full transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase flex items-center gap-2">
          <Server className="h-4 w-4" />
          {t("devops", "kubernetes")}
        </h3>
        <span className="text-[10px] bg-black text-[#0f0] px-2 py-0.5 rounded font-mono">
          DESIRED: 3 | CURRENT: {pods.filter(p => p.status === "running").length}
        </span>
      </div>
      
      <p className="text-xs text-black/60">{t("devops", "killPod")}</p>

      <div className="flex gap-2 mx-auto mt-2 h-[60px] items-center">
        {pods.map((pod) => (
          <div 
            key={pod.id}
            className={`
              relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
              ${pod.status === "running" ? "bg-green-100 border-green-500 scale-100 opacity-100" : ""}
              ${pod.status === "terminating" ? "bg-red-100 border-red-500 scale-75 opacity-50" : ""}
              ${pod.status === "creating" ? "bg-yellow-100 border-yellow-500 scale-50 opacity-0 animate-pulse" : ""}
            `}
            style={pod.status === "creating" ? { animation: "emerge 0.5s forwards" } : {}}
          >
            <span className="text-[8px] font-mono absolute -bottom-5 text-gray-500">{pod.id}</span>
            {pod.status === "running" && (
              <button 
                onClick={() => killPod(pod.id)}
                className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-red-500/80 rounded-full text-white transition-opacity"
                title="Kill Pod"
              >
                <ZapOff className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes emerge {
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}} />
    </div>
  );
}
