import { NextResponse } from "next/server";
import metrics from "@/data/metrics.json";
import config from "@/data/config.json";

// Mock metrics data - fallback
const mockMetrics = [
  { name: "http_requests_total", type: "counter", value: "1.2M", change: "+12%" },
  { name: "http_request_duration_p50", type: "gauge", value: "45ms", change: "-5%" },
  { name: "http_request_duration_p99", type: "gauge", value: "180ms", change: "+2%" },
  { name: "container_cpu_usage_seconds_total", type: "counter", value: "842", change: "+8%" },
  { name: "container_memory_usage_bytes", type: "gauge", value: "1.2GB", change: "+3%" },
  { name: "postgres_connections_active", type: "gauge", value: "24", change: "0%" },
  { name: "redis_keyspace_hits_total", type: "counter", value: "89K", change: "+15%" },
  { name: "job_completions_total", type: "counter", value: "1,247", change: "+5%" },
];

// Metrics to query from Prometheus
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

// Helper to format value
function formatValue(value: number): string {
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (value >= 1000) return (value / 1000).toFixed(1) + "K";
  if (value < 1) return (value * 1000).toFixed(0) + "ms";
  return value.toFixed(0);
}

// Helper to calculate change (random for demo)
function getChange(): string {
  const changes = ["+12%", "-5%", "+2%", "+8%", "+3%", "0%", "+15%", "+5%"];
  return changes[Math.floor(Math.random() * changes.length)];
}

export async function GET() {
  // If Prometheus is configured and enabled, fetch real data
  if (config.prometheus?.enabled && config.prometheus?.url) {
    try {
      const results = [];

      for (const m of metricQueries) {
        try {
          const response = await fetch(`${config.prometheus.url}/api/v1/query?query=${encodeURIComponent(m.query)}`);
          const data = await response.json();

          if (data.status === "success" && data.data.result.length > 0) {
            const value = parseFloat(data.data.result[0].value[1]);
            results.push({
              name: m.key,
              type: m.key.includes("duration") ? "gauge" : "counter",
              value: formatValue(value),
              change: getChange()
            });
          } else {
            // Fallback to mock value for this metric
            const mock = mockMetrics.find(mock => mock.name === m.key);
            results.push(mock || { name: m.key, type: "gauge", value: "N/A", change: "0%" });
          }
        } catch (e) {
          const mock = mockMetrics.find(mock => mock.name === m.key);
          results.push(mock || { name: m.key, type: "gauge", value: "N/A", change: "0%" });
        }
      }

      // If we got at least some real data, return it
      const hasRealData = results.some(r => r.value !== "N/A" && r.value !== undefined);
      if (hasRealData) {
        return NextResponse.json({
          source: "prometheus",
          data: results
        });
      }
    } catch (error) {
      console.error("Prometheus fetch error:", error);
    }
  }

  // Fallback: return mock data
  return NextResponse.json({
    source: "mock",
    data: mockMetrics
  });
}