import { NextResponse } from "next/server";
import config from "@/data/config.json";

const mockTraces = [
  { traceId: "abc123def456", service: "portfolio", path: "GET /", duration: "245ms", spans: 12, status: 200 },
  { traceId: "xyz789uvw012", service: "api-gateway", path: "GET /health", duration: "89ms", spans: 5, status: 200 },
  { traceId: "mno345pqr678", service: "database", path: "SELECT * FROM users", duration: "156ms", spans: 3, status: 200 },
];

const mockServices = [
  { name: "api-gateway", requests: "1.2K/s", latency: "45ms", errors: "0.1%" },
  { name: "user-service", requests: "850/s", latency: "23ms", errors: "0.05%" },
  { name: "course-service", requests: "620/s", latency: "56ms", errors: "0.2%" },
  { name: "payment-service", requests: "180/s", latency: "120ms", errors: "0.3%" },
  { name: "notification", requests: "450/s", latency: "12ms", errors: "0%" },
];

type TempoTrace = {
  traceID?: string;
  traceId?: string;
  rootServiceName?: string;
  serviceName?: string;
  rootTraceName?: string;
  name?: string;
  durationMs?: number | string;
  duration_ms?: number | string;
  spanCount?: number;
  spans?: number;
};

export async function GET() {
  const tempoEnabled =
    process.env.TEMPO_ENABLED != null
      ? process.env.TEMPO_ENABLED === "true"
      : config.tempo?.enabled;
  const tempoUrl = process.env.TEMPO_URL || config.tempo?.url;

  if (tempoEnabled && tempoUrl) {
    try {
      const query = encodeURIComponent('{service.name=~".+"}');
      const res = await fetch(`${tempoUrl}/api/search?limit=10&q=${query}`);
      const data = await res.json();

      const tracesRaw = (data?.traces || data?.results || []) as TempoTrace[];
      if (Array.isArray(tracesRaw) && tracesRaw.length > 0) {
        const traces = tracesRaw.map((trace) => {
          const durationMs = Number(trace.durationMs ?? trace.duration_ms ?? 0);
          return {
            traceId: String(trace.traceID ?? trace.traceId ?? "unknown"),
            service: String(trace.rootServiceName ?? trace.serviceName ?? "unknown"),
            path: String(trace.rootTraceName ?? trace.name ?? "N/A"),
            duration: durationMs > 0 ? `${durationMs}ms` : "N/A",
            spans: Number(trace.spanCount ?? trace.spans ?? 0),
            status: 200,
          };
        });

        return NextResponse.json({ source: "tempo", data: { traces, services: mockServices } });
      }
    } catch (error) {
      console.error("Tempo fetch error:", error);
    }
  }

  return NextResponse.json({
    source: "mock",
    data: {
      traces: mockTraces,
      services: mockServices,
    },
  });
}
