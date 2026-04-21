"use client";

import { Activity, ExternalLink } from "lucide-react";
import config from "@/data/config.json";

export function GrafanaDashboard() {
  const grafanaUrl = process.env.NEXT_PUBLIC_GRAFANA_URL || config.grafana?.url || "https://grafana.thinkai.id.vn";

  // Note: These IDs should be replaced with actual panel IDs from your Grafana dashboard
  // For now, I'm using a generic dashboard embed format or a link to the dashboard
  const dashboardSrc = `${grafanaUrl}/d-solo/thinkai-overview/overview?orgId=1&refresh=5s&theme=light&panelId=1`;

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Grafana Live
            </h2>
            <p className="text-sm text-gray-500">Real-time system observability</p>
          </div>
          <a
            href={grafanaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
          >
            Open Grafana <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="aspect-video w-full border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center relative">
          <iframe
            src={dashboardSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Grafana Dashboard"
            className="absolute inset-0"
          />
          {/* Fallback if iframe fails or panelId is wrong */}
          <div className="text-xs text-gray-400 z-0">
            Loading dashboard from {grafanaUrl}...
          </div>
        </div>
        <p className="mt-2 text-[10px] text-gray-400 italic">
          * Ensure Grafana allows embedding (allow_embedding: true) and anonymous access is enabled for this panel.
        </p>
      </div>
    </section>
  );
}
