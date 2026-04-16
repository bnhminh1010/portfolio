"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, GitCommit, Clock, Server, Database, Globe } from "lucide-react";

const mockTraces = [
  {
    id: "abc123def456",
    service: "api-gateway",
    path: "POST /api/courses",
    duration: "145ms",
    status: 200,
  },
  {
    id: "def456ghi789",
    service: "user-service",
    path: "GET /api/users/123",
    duration: "89ms",
    status: 200,
  },
  {
    id: "ghi789jkl012",
    service: "course-service",
    path: "POST /api/enroll",
    duration: "320ms",
    status: 201,
  },
];

const mockServices = [
  { name: "api-gateway", requests: "1.2K/s", latency: "45ms", errors: "0.1%" },
  { name: "user-service", requests: "850/s", latency: "23ms", errors: "0.05%" },
  { name: "course-service", requests: "620/s", latency: "56ms", errors: "0.2%" },
  { name: "payment-service", requests: "180/s", latency: "120ms", errors: "0.3%" },
  { name: "notification", requests: "450/s", latency: "12ms", errors: "0%" },
];

export function DistributedTracing() {
  const { language } = useLanguage();
  const [selectedTrace, setSelectedTrace] = useState(mockTraces[0]);

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600";
    if (status >= 400 && status < 500) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Distributed Tracing
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "OpenTelemetry + Grafana Tempo"
              : "OpenTelemetry + Grafana Tempo"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-gray-500">Services</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">3.3K/s</div>
            <div className="text-xs text-gray-500">Total RPS</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">51ms</div>
            <div className="text-xs text-gray-500">P50 Latency</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">0.1%</div>
            <div className="text-xs text-gray-500">Error Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Map */}
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Service Map</span>
            </div>
            <div className="p-4">
              {/* Simple service topology */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="text-xs">Gateway</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-0.5 bg-gray-300" />
                  <div className="w-8 h-0.5 bg-gray-300" />
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gray-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Server className="w-6 h-6" />
                  </div>
                  <div className="text-xs">User</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-0.5 bg-gray-300" />
                  <div className="w-8 h-0.5 bg-gray-300" />
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-gray-400 text-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="text-xs">DB</div>
                </div>
              </div>

              {/* Service list */}
              <div className="space-y-2">
                {mockServices.map((svc) => (
                  <div key={svc.name} className="flex items-center justify-between p-2 bg-gray-50">
                    <span className="text-sm font-mono">{svc.name}</span>
                    <div className="text-xs text-gray-500">
                      {svc.requests} • {svc.latency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Traces */}
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Recent Traces</span>
            </div>
            <div className="divide-y divide-gray-100">
              {mockTraces.map((trace) => (
                <button
                  key={trace.id}
                  onClick={() => setSelectedTrace(trace)}
                  className={`w-full text-left px-4 py-3 ${
                    selectedTrace.id === trace.id ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono">{trace.id.slice(0, 12)}...</span>
                    <span className={`text-xs ${selectedTrace.id === trace.id ? "text-gray-300" : getStatusColor(trace.status)}`}>
                      {trace.status}
                    </span>
                  </div>
                  <div className="text-sm">{trace.path}</div>
                  <div className={`text-xs ${selectedTrace.id === trace.id ? "text-gray-400" : "text-gray-500"}`}>
                    {trace.service} • {trace.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}