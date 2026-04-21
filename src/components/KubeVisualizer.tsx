"use client";

import { useState, useEffect } from "react";
import { Server, Clock } from "lucide-react";

type PodStatus = "running" | "terminating" | "creating" | "pending" | "succeeded" | "failed";

type Pod = {
  id: string;
  status: PodStatus;
  cpu: number;
  memory: number;
};

export function KubeVisualizer() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPods = async () => {
      try {
        const res = await fetch("/api/monitoring/live"); // Reusing the live API which we will update or create a new one
        const json = await res.json();

        // Let's create a specific API route for pods in portfolio-web
        const podRes = await fetch("/api/monitoring/pods");
        const podData = await podRes.json();

        if (podData.source !== "empty") {
          setPods(podData.data);
        }
      } catch (e) {
        console.error("Failed to fetch pods", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPods();
    const interval = setInterval(fetchPods, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Server className="w-5 h-5" />
            Kubernetes (Live)
          </h2>
          <p className="text-sm text-gray-500">Real-time k3s pod status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase">
              Pods {pods.length > 0 ? `(${pods.length})` : ""}
            </div>
            {loading && pods.length === 0 ? (
              <div className="text-xs text-gray-400 animate-pulse">Scanning cluster...</div>
            ) : pods.length === 0 ? (
              <div className="text-xs text-gray-400">No pods found in namespace 'thinkai'</div>
            ) : (
              pods.map((pod) => (
                <div
                  key={pod.id}
                  className="flex items-center justify-between p-2 border border-gray-200 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        pod.status === "running" ? "bg-green-500" :
                        pod.status === "failed" ? "bg-red-500" : "bg-yellow-500 animate-pulse"
                      }`}
                    />
                    <span className="truncate font-mono text-[10px]">{pod.id}</span>
                  </div>
                  <div className="flex gap-3 text-[10px] text-gray-500 shrink-0 uppercase font-medium">
                    <span>{pod.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-500 uppercase flex items-center gap-1">
              <Clock className="w-3 h-3" /> System Logs
            </div>
            <div className="text-[10px] font-mono text-gray-400 bg-gray-50 p-2 border border-gray-100 h-32 overflow-y-auto">
              {"> "} kubectl get pods -n thinkai<br/>
              {pods.length > 0 ? pods.map(p => (
                <div key={p.id}>{p.id.padEnd(30)} {p.status.toUpperCase()}</div>
              )) : "No active pods found."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
