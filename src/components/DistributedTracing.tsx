"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Activity, Server, Database, Globe } from "lucide-react";

type Trace = {
  traceId: string;
  service: string;
  path: string;
  duration: string;
  spans: number;
  status: number;
};

type ServiceStat = {
  name: string;
  requests: string;
  latency: string;
  errors: string;
};

export function DistributedTracing() {
  const { language } = useLanguage();
  const [traces, setTraces] = useState<Trace[]>([]);
  const [services, setServices] = useState<ServiceStat[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<Trace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/traces")
      .then((res) => res.json())
      .then((payload) => {
        if (!mounted) return;
        const apiTraces = Array.isArray(payload?.data?.traces) ? payload.data.traces : [];
        const apiServices = Array.isArray(payload?.data?.services) ? payload.data.services : [];
        setTraces(apiTraces);
        setServices(apiServices);
        setSelectedTrace(apiTraces[0] ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

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
            {language === "vi" ? "OpenTelemetry + Grafana Tempo" : "OpenTelemetry + Grafana Tempo"}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : services.length}</div>
            <div className="text-xs text-gray-500">Services</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : `${traces.length * 10}/s`}</div>
            <div className="text-xs text-gray-500">Total RPS</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : selectedTrace?.duration ?? "--"}</div>
            <div className="text-xs text-gray-500">Sample Latency</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">0.1%</div>
            <div className="text-xs text-gray-500">Error Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Service Map</span>
            </div>
            <div className="p-4">
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
                  <div className="text-xs">Service</div>
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

              <div className="space-y-2">
                {loading && <div className="text-sm text-gray-400">Loading services...</div>}
                {!loading && services.length === 0 && <div className="text-sm text-gray-400">No services available</div>}
                {services.map((svc) => (
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

          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Recent Traces</span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading && <div className="px-4 py-3 text-sm text-gray-400">Loading traces...</div>}
              {!loading && traces.length === 0 && <div className="px-4 py-3 text-sm text-gray-400">No traces available</div>}
              {traces.map((trace) => (
                <button
                  key={trace.traceId}
                  onClick={() => setSelectedTrace(trace)}
                  className={`w-full text-left px-4 py-3 ${
                    selectedTrace?.traceId === trace.traceId ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono">{trace.traceId.slice(0, 12)}...</span>
                    <span className={`text-xs ${selectedTrace?.traceId === trace.traceId ? "text-gray-300" : getStatusColor(trace.status)}`}>
                      {trace.status}
                    </span>
                  </div>
                  <div className="text-sm">{trace.path}</div>
                  <div className={`text-xs ${selectedTrace?.traceId === trace.traceId ? "text-gray-400" : "text-gray-500"}`}>
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
