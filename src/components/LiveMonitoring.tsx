"use client";

import { useState, useEffect } from "react";
import { Activity, Zap, Clock, AlertCircle } from "lucide-react";

export function LiveMonitoring() {
  const [metrics, setMetrics] = useState({
    requests: 1247,
    latency: 45,
    errorRate: 0.02,
    uptime: 99.95,
    cpu: 42,
    memory: 58,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        requests: prev.requests + Math.floor(Math.random() * 50 - 20),
        latency: Math.max(20, Math.min(150, prev.latency + (Math.random() * 30 - 15))),
        errorRate: Math.max(0, Math.min(1, prev.errorRate + (Math.random() * 0.02 - 0.01))),
        uptime: 99.95 + Math.random() * 0.04,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() * 20 - 10))),
        memory: Math.max(30, Math.min(80, prev.memory + (Math.random() * 10 - 5))),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Live Monitoring
          </h2>
          <p className="text-sm text-gray-500 mt-1">Real-time system metrics</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Zap className="w-3 h-3" /> Requests/s
            </div>
            <div className="text-2xl font-bold">{metrics.requests.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">+12% vs 1h ago</div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3" /> Latency p99
            </div>
            <div className="text-2xl font-bold">{Math.round(metrics.latency)}ms</div>
            <div className="text-xs text-gray-400 mt-1">p50: 28ms</div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <AlertCircle className="w-3 h-3" /> Error Rate
            </div>
            <div className="text-2xl font-bold">{metrics.errorRate.toFixed(2)}%</div>
            <div className="text-xs text-green-600 mt-1">SLA OK</div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Activity className="w-3 h-3" /> Uptime (30d)
            </div>
            <div className="text-2xl font-bold">{metrics.uptime.toFixed(2)}%</div>
            <div className="text-xs text-gray-400 mt-1">42h downtime</div>
          </div>
        </div>

        {/* Resource Bars */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>CPU</span>
              <span className="text-gray-500">{metrics.cpu}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${metrics.cpu}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Memory</span>
              <span className="text-gray-500">{metrics.memory}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-400 transition-all duration-500"
                style={{ width: `${metrics.memory}%` }}
              />
            </div>
          </div>
        </div>

        {/* SLA Badge */}
        <div className="mt-6 flex items-center gap-4">
          <div className="text-xs text-gray-500">SLA Target: 99.9%</div>
          <div
            className={`text-xs px-2 py-1 ${
              metrics.uptime >= 99.9
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {metrics.uptime >= 99.9 ? "Met" : "At Risk"}
          </div>
        </div>
      </div>
    </section>
  );
}