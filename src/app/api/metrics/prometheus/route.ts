import { NextResponse } from "next/server";
import config from "@/data/config.json";

const metricQueries = [
  { key: "http_requests_total", query: "rate(http_requests_total[5m])" },
  { key: "http_request_duration_p50", query: "http_request_duration_p50" },
  { key: "http_request_duration_p99", query: "http_request_duration_p99" },
  { key: "container_cpu_usage_seconds_total", query: "container_cpu_usage_seconds_total" },
  { key: "container_memory_usage_bytes", query: "container_memory_usage_bytes" },
  { key: "postgres_connections_active", query: "pg_stat_activity_count" },
  { key: "redis_keyspace_hits_total", query: "redis_keyspace_hits_total" },
  { key: "job_completions_total", query: "job_completions_total" },
];

function formatValue(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return (value / 1000).toFixed(1) + "K";
  if (value < 1) return (value * 1000).toFixed(0) + "ms";
  return value.toFixed(0);
}

export async function GET() {
  const prometheusEnabled = process.env.PROMETHEUS_ENABLED === "true" || config.prometheus?.enabled;
  const prometheusUrl = process.env.PROMETHEUS_URL || config.prometheus?.url;

  if (prometheusEnabled && prometheusUrl) {
    try {
      const results = [];
      for (const m of metricQueries) {
        try {
          const response = await fetch(`${prometheusUrl}/api/v1/query?query=${encodeURIComponent(m.query)}`);
          const data = await response.json();
          if (data.status === "success" && data.data.result.length > 0) {
            const value = parseFloat(data.data.result[0].value[1]);
            results.push({
              name: m.key,
              type: m.key.includes("duration") ? "gauge" : "counter",
              value: formatValue(value),
              change: "0%"
            });
          }
        } catch (e) {
          console.error(`Failed to fetch metric ${m.key}`);
        }
      }

      return NextResponse.json({
        source: "prometheus",
        data: results
      });
    } catch (error) {
      console.error("Prometheus fetch error:", error);
    }
  }

  return NextResponse.json({
    source: "empty",
    data: []
  });
}
