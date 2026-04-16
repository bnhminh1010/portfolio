import { NextResponse } from "next/server";

// Live monitoring combines multiple sources
const mockLiveData = {
  timestamp: new Date().toISOString(),
  services: [
    { name: "api-gateway", status: "healthy", uptime: "99.9%", latency: "45ms" },
    { name: "user-service", status: "healthy", uptime: "99.8%", latency: "120ms" },
    { name: "payment-service", status: "degraded", uptime: "99.5%", latency: "350ms" },
    { name: "notification-service", status: "healthy", uptime: "99.9%", latency: "25ms" },
  ],
  alerts: [
    { severity: "warning", message: "payment-service latency above threshold" },
  ]
};

export async function GET() {
  // Combine Prometheus + Loki + custom metrics
  return NextResponse.json({
    source: "mock",
    data: mockLiveData
  });
}