"use client";

import { useState, useEffect } from "react";
import { Activity, Clock, RefreshCw, Settings, Maximize2 } from "lucide-react";

const dashboards = [
  { id: "cpu", name: "CPU Usage", value: 42, target: 80 },
  { id: "memory", name: "Memory", value: 58, target: 85 },
  { id: "requests", name: "Requests/s", value: 1247, target: 2000 },
  { id: "latency", name: "Latency p99", value: 180, target: 200 },
  { id: "errors", name: "Error Rate", value: 0.02, target: 1 },
  { id: "saturation", name: "Saturation", value: 62, target: 80 },
];

export function GrafanaDashboard() {
  const [metrics, setMetrics] = useState(dashboards.map(d => ({ ...d })));
  const [timeRange, setTimeRange] = useState("5m");

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: m.id === "requests"
          ? Math.floor(m.value + (Math.random() * 200 - 100))
          : m.id === "latency"
          ? Math.max(50, Math.min(300, m.value + (Math.random() * 40 - 20)))
          : Math.max(0, Math.min(100, m.value + (Math.random() * 10 - 5)))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Grafana
            </h2>
            <p className="text-sm text-gray-500">Metrics dashboard</p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-xs border border-gray-200 px-2 py-1"
            >
              <option value="1m">Last 1m</option>
              <option value="5m">Last 5m</option>
              <option value="15m">Last 15m</option>
              <option value="1h">Last 1h</option>
            </select>
            <button className="p-1 border border-gray-200">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-1 border border-gray-200">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {metrics.map((m) => (
            <div key={m.id} className="p-3 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">{m.name}</span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timeRange}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">
                  {typeof m.value === "number" && m.value < 10 ? m.value.toFixed(2) : Math.round(m.value)}
                  <span className="text-xs font-normal text-gray-500 ml-1">
                    {m.id === "requests" ? "req/s" : m.id === "errors" ? "%" : m.id === "latency" ? "ms" : "%"}
                  </span>
                </span>
                <div className="w-12 h-8 flex items-end">
                  <div
                    className={`w-full ${m.value > m.target ? "bg-red-500" : "bg-black"}`}
                    style={{ height: `${Math.min(100, (m.value / (m.target * 1.5)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}