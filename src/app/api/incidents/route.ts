import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockIncidents = [
  {
    id: "INC-001",
    title: "High latency detected",
    severity: "warning",
    status: "resolved",
    time: "2 hours ago",
    mttr: "15 min",
  },
  {
    id: "INC-002",
    title: "Cache miss spike",
    severity: "info",
    status: "resolved",
    time: "1 day ago",
    mttr: "5 min",
  },
];

type PrometheusAlert = {
  metric?: {
    alertname?: string;
    severity?: string;
  };
  value?: [number | string, string];
};

export async function GET() {
  const prometheusEnabled =
    process.env.PROMETHEUS_ENABLED != null
      ? process.env.PROMETHEUS_ENABLED === "true"
      : config.prometheus?.enabled;
  const prometheusUrl = process.env.PROMETHEUS_URL || config.prometheus?.url;

  if (prometheusEnabled && prometheusUrl) {
    try {
      const query = encodeURIComponent('ALERTS{alertstate="firing"}');
      const res = await fetch(`${prometheusUrl}/api/v1/query?query=${query}`);
      const data = await res.json();

      if (data.status === "success" && Array.isArray(data?.data?.result)) {
        const alerts = data.data.result as PrometheusAlert[];
        const incidents = alerts.map((alert, index: number) => {
          const ts = Number(alert.value?.[0]);
          const title = String(alert.metric?.alertname ?? `Alert-${index + 1}`);
          return {
            id: `ALERT-${index + 1}`,
            title,
            severity: String(alert.metric?.severity ?? "warning"),
            status: "firing",
            time: Number.isFinite(ts) ? new Date(ts * 1000).toLocaleString() : "N/A",
            mttr: "N/A",
          };
        });

        if (incidents.length > 0) {
          return NextResponse.json({ source: "prometheus", data: incidents });
        }
      }
    } catch (error) {
      console.error("Prometheus alerts error:", error);
    }
  }

  return NextResponse.json({ source: "mock", data: mockIncidents });
}
