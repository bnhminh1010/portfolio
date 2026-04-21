import { NextResponse } from "next/server";
import config from "@/data/config.json";

type LokiStream = {
  metric?: { level?: string; service?: string; job?: string };
  values?: [number | string, string][];
};

export async function GET() {
  const lokiEnabled = process.env.LOKI_ENABLED === "true" || config.loki?.enabled;
  const lokiUrl = process.env.LOKI_URL || config.loki?.url;

  if (lokiEnabled && lokiUrl) {
    try {
      const query = encodeURIComponent('{service=~".+"}');
      const response = await fetch(`${lokiUrl}/loki/api/v1/query?query=${query}`);
      const data = await response.json();

      if (data.status === "success" && Array.isArray(data?.data?.result)) {
        const logs = (data.data.result as LokiStream[]).flatMap((entry) => {
          const metric = entry.metric ?? {};
          return (entry.values ?? []).map((v) => ({
            timestamp: new Date(Number(v[0]) / 1000000).toISOString(),
            level: String(metric.level || "info").toLowerCase(),
            message: String(v[1]),
            service: String(metric.service || metric.job || "unknown"),
          }));
        });

        return NextResponse.json({ source: "loki", data: logs.slice(0, 100) });
      }
    } catch (error) {
      console.error("Loki fetch error:", error);
    }
  }

  return NextResponse.json({ source: "empty", data: [] });
}
