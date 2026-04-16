"use client";

import { useState, useEffect } from "react";
import { Activity, Zap, Clock, AlertCircle, Database, HardDrive } from "lucide-react";

interface Metric {
  name: string;
  type: string;
  value: string;
  change: string;
}

export function PrometheusMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    // Fetch real data from API
    const fetchMetrics = async () => {
      try {
        const res = await fetch("/api/metrics/prometheus");
        const data = await res.json();
        setMetrics(data.data || []);
        setSource(data.source || "mock");
      } catch (e) {
        console.error("Failed to fetch metrics:", e);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // Refresh every 10s

    // Clock update
    setTime(new Date().toLocaleTimeString());
    const clockInterval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  // Extract key metrics safely
  const getMetric = (name: string) => metrics.find((m) => m.name === name);

  const requests = getMetric("http_requests_total")?.value || "--";
  const latencyP50 = getMetric("http_request_duration_p50")?.value || "--";
  const latencyP99 = getMetric("http_request_duration_p99")?.value || "--";
  const cpu = getMetric("container_cpu_usage_seconds_total")?.value || "--";
  const memory = getMetric("container_memory_usage_bytes")?.value || "--";
  const postgres = getMetric("postgres_connections_active")?.value || "--";
  const redis = getMetric("redis_keyspace_hits_total")?.value || "--";
  const jobs = getMetric("job_completions_total")?.value || "--";

  // Calculate derived values for overview
  const errorRate = "--"; // Not available from current metrics
  const uptime = "--"; // Not available from current metrics

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Live Monitoring
            </h2>
            <p className="text-sm text-gray-500">
              Real-time metrics from Prometheus
              {source && source !== "mock" && (
                <span className="ml-2 text-green-600">● {source}</span>
              )}
            </p>
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {time || "--:--:--"}
          </div>
        </div>

        {/* Overview Row - Similar to LiveMonitoring */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Zap className="w-3 h-3" /> Requests
            </div>
            <div className="text-2xl font-bold">{requests}</div>
            <div className="text-xs text-green-600 mt-1">
              {getMetric("http_requests_total")?.change || "—"}
            </div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Clock className="w-3 h-3" /> Latency p99
            </div>
            <div className="text-2xl font-bold">{latencyP99}</div>
            <div className="text-xs text-gray-400 mt-1">p50: {latencyP50}</div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Activity className="w-3 h-3" /> CPU
            </div>
            <div className="text-2xl font-bold">{cpu}</div>
            <div className="text-xs text-gray-400 mt-1">seconds</div>
          </div>

          <div className="p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <HardDrive className="w-3 h-3" /> Memory
            </div>
            <div className="text-2xl font-bold">{memory}</div>
            <div className="text-xs text-gray-400 mt-1">
              {getMetric("container_memory_usage_bytes")?.change || "—"}
            </div>
          </div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map((m) => (
            <div key={m.name} className="p-3 border border-gray-200">
              <div className="text-xs text-gray-500 font-mono mb-1">{m.name}</div>
              <div className="text-lg font-bold">{m.value}</div>
              <div
                className={`text-xs ${
                  m.change.startsWith("+")
                    ? "text-green-600"
                    : m.change.startsWith("-")
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                {m.change}
              </div>
            </div>
          ))}
          {metrics.length === 0 && (
            <>
              <div className="p-3 border border-gray-200">
                <div className="text-xs text-gray-500 font-mono mb-1">postgres_connections_active</div>
                <div className="text-lg font-bold">--</div>
                <div className="text-xs text-gray-400">--</div>
              </div>
              <div className="p-3 border border-gray-200">
                <div className="text-xs text-gray-500 font-mono mb-1">redis_keyspace_hits_total</div>
                <div className="text-lg font-bold">--</div>
                <div className="text-xs text-gray-400">--</div>
              </div>
            </>
          )}
        </div>

        {/* PromQL Query Example */}
        <div className="p-3 bg-gray-900 text-green-400 font-mono text-xs">
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