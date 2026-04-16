import { NextResponse } from "next/server";
import metrics from "@/data/metrics.json";
import config from "@/data/config.json";

// Mock metrics data
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

export async function GET() {
  // If Prometheus is configured and enabled, fetch from real Prometheus
  if (config.prometheus?.enabled && config.prometheus?.url) {
    try {
      const response = await fetch(`${config.prometheus.url}/api/v1/query?query=up`);
      const data = await response.json();
      // Transform Prometheus response to our format
      if (data.status === "success") {
        // Return real data
        return NextResponse.json({
          source: "prometheus",
          data: data.data.result
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