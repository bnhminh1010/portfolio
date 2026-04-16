"use client";

import { useState, useCallback } from "react";
import { Server, ZapOff, Cpu, HardDrive, Clock } from "lucide-react";

type PodStatus = "running" | "terminating" | "creating";

type Pod = {
  id: string;
  status: PodStatus;
  cpu: number;
  memory: number;
};

const events = [
  { time: "10:23:45", type: "Normal", msg: "Pulling image thinkai/backend:latest" },
  { time: "10:23:46", type: "Normal", msg: "Successfully pulled image" },
  { time: "10:23:48", type: "Normal", msg: "Created container" },
  { time: "10:23:49", type: "Normal", msg: "Started container" },
  { time: "10:24:01", type: "Warning", msg: "Liveness probe failed" },
  { time: "10:24:05", type: "Normal", msg: "Container ready" },
];

export function KubeVisualizer() {
  const [pods, setPods] = useState<Pod[]>([
    { id: "backend-a", status: "running", cpu: 45, memory: 128 },
    { id: "backend-b", status: "running", cpu: 32, memory: 96 },
    { id: "backend-c", status: "running", cpu: 28, memory: 112 },
  ]);

  const killPod = useCallback((idToKill: string) => {
    setPods(current =>
      current.map(p => p.id === idToKill ? { ...p, status: "terminating" } : p)
    );

    setTimeout(() => {
      setPods(current => {
        const filtered = current.filter(p => p.id !== idToKill);
        return [...filtered, { id: `backend-${Math.random().toString(36).substring(2, 5)}`, status: "creating", cpu: 0, memory: 0 }];
      });

      setTimeout(() => {
        setPods(current =>
          current.map(p => p.status === "creating" ? { ...p, status: "running", cpu: Math.random() * 50 + 20, memory: 100 } : p)
        );
      }, 500);
    }, 800);
  }, []);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Server className="w-5 h-5" />
            Kubernetes
          </h2>
          <p className="text-sm text-gray-500">Pod management (click to terminate)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pods - compact */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase">Pods ({pods.length})</div>
            {pods.map((pod) => (
              <div
                key={pod.id}
                className="flex items-center justify-between p-2 border border-gray-200 text-sm"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => pod.status === "running" && killPod(pod.id)}
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      pod.status === "running" ? "bg-green-500" :
                      pod.status === "terminating" ? "bg-red-500" : "bg-yellow-500 animate-pulse"
                    }`}
                  />
                  <span className="truncate">{pod.id}</span>
                </div>
                <div className="flex gap-3 text-xs text-gray-500 shrink-0">
                  <span>{pod.status === "running" ? `${pod.cpu}%` : "-"}</span>
                  <span>{pod.status === "running" ? `${pod.memory}MB` : "-"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Events - compact */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
              <Clock className="w-3 h-3" /> Recent Events
            </div>
            <div className="text-xs space-y-0.5 max-h-32 overflow-y-auto">
              {events.slice(0, 5).map((e, i) => (
                <div key={i} className="flex gap-2 text-gray-500">
                  <span className="shrink-0 w-12">{e.time}</span>
                  <span className={`shrink-0 w-14 ${e.type === "Warning" ? "text-yellow-600" : ""}`}>
                    {e.type}
                  </span>
                  <span className="truncate">{e.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}