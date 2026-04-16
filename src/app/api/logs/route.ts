import { NextResponse } from "next/server";
import logs from "@/data/logs.json";
import config from "@/data/config.json";

// Mock logs data
const mockLogs = [
  { timestamp: "2026-04-17T10:23:45Z", level: "info", message: "Request completed", service: "api-gateway", duration: "45ms" },
  { timestamp: "2026-04-17T10:23:44Z", level: "info", message: "Health check passed", service: "api-gateway", duration: "2ms" },
  { timestamp: "2026-04-17T10:23:43Z", level: "warn", message: "High response time detected", service: "user-service", duration: "520ms" },
  { timestamp: "2026-04-17T10:23:42Z", level: "error", message: "Database connection timeout", service: "user-service", duration: "5s" },
  { timestamp: "2026-04-17T10:23:41Z", level: "info", message: "Cache hit for user:12345", service: "cache-service", duration: "1ms" },
  { timestamp: "2026-04-17T10:23:40Z", level: "info", message: "Scheduled job completed", service: "worker", duration: "2.3s" },
];

export async function GET() {
  // If Loki is configured and enabled, fetch from real Loki
  if (config.loki?.enabled && config.loki?.url) {
    try {
      const response = await fetch(`${config.loki.url}/loki/api/v1/query?query={job="app"}`);
      const data = await response.json();
      if (data.status === "success") {
        return NextResponse.json({
          source: "loki",
          data: data.data.result
        });
      }
    } catch (error) {
      console.error("Loki fetch error:", error);
    }
  }

  // Fallback: return mock data
  return NextResponse.json({
    source: "mock",
    data: mockLogs
  });
}