"use client";

import { useState, useEffect } from "react";
import { Activity, Database, HardDrive, Zap } from "lucide-react";

const metrics = [
  { name: "http_requests_total", type: "counter", value: "1.2M", change: "+12%" },
  { name: "http_request_duration_p50", type: "gauge", value: "45ms", change: "-5%" },
  { name: "http_request_duration_p99", type: "gauge", value: "180ms", change: "+2%" },
  { name: "container_cpu_usage_seconds_total", type: "counter", value: "842", change: "+8%" },
  { name: "container_memory_usage_bytes", type: "gauge", value: "1.2GB", change: "+3%" },
  { name: "postgres_connections_active", type: "gauge", value: "24", change: "0%" },
  { name: "redis_keyspace_hits_total", type: "counter", value: "89K", change: "+15%" },
  { name: "job_completions_total", type: "counter", value: "1,247", change: "+5%" },
];

export function PrometheusMetrics() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Prometheus
            </h2>
            <p className="text-sm text-gray-500">Real-time metrics</p>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {time || "--:--:--"}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div key={m.name} className="p-3 border border-gray-200">
              <div className="text-xs text-gray-500 font-mono mb-1">{m.name}</div>
              <div className="text-lg font-bold">{m.value}</div>
              <div className={`text-xs ${m.change.startsWith("+") ? "text-green-600" : m.change.startsWith("-") ? "text-red-600" : "text-gray-400"}`}>
                {m.change}
              </div>
            </div>
          ))}
        </div>

        {/* Query Example */}
        <div className="mt-4 p-3 bg-gray-900 text-green-400 font-mono text-xs">
          <span className="text-purple-400">rate</span>
          <span className="text-white">(</span>
          <span className="text-yellow-300">http_requests_total</span>
          <span className="text-white">[5m]</span>
          <span className="text-white">)</span>
        </div>
      </div>
    </section>
  );
}