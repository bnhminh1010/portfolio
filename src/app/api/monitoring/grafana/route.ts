import { NextResponse } from "next/server";
import config from "@/data/config.json";

// Mock Grafana panels data
const mockPanels = [
  { title: "Request Rate", value: "1.2K/s", change: "+5%", type: "graph" },
  { title: "Error Rate", value: "0.1%", change: "-2%", type: "stat" },
  { title: "CPU Usage", value: "45%", change: "+3%", type: "gauge" },
  { title: "Memory", value: "1.2GB", change: "+8%", type: "gauge" },
  { title: "Disk I/O", value: "120MB/s", change: "-10%", type: "graph" },
  { title: "Network", value: "5.2MB/s", change: "+15%", type: "graph" },
];

export async function GET() {
  // If Grafana is configured and enabled, fetch from real Grafana
  if (config.grafana?.enabled && config.grafana?.url && config.grafana?.dashboardId) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (config.grafana?.apiKey) {
        headers["Authorization"] = `Bearer ${config.grafana.apiKey}`;
      }

      const response = await fetch(
        `${config.grafana.url}/api/dashboards/uid/${config.grafana.dashboardId}`,
        { headers }
      );
      const data = await response.json();
      if (data.dashboard) {
        return NextResponse.json({
          source: "grafana",
          data: data.dashboard.panels
        });
      }
    } catch (error) {
      console.error("Grafana fetch error:", error);
    }
  }

  // Fallback: return mock data
  return NextResponse.json({
    source: "mock",
    data: mockPanels
  });
}