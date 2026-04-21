"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock, BookOpen, Play } from "lucide-react";

type Incident = {
  id: string;
  title: string;
  severity: string;
  status: string;
  time: string;
  mttr: string;
};

const runbooks = [
  {
    id: "RB-001",
    title: "High CPU Response",
    steps: ["Check prometheus", "Scale pods", "Review logs", "Notify on-call"],
  },
  {
    id: "RB-002",
    title: "Database Connection Pool Exhausted",
    steps: ["Check connections", "Identify leak", "Restart service", "Monitor recovery"],
  },
  {
    id: "RB-003",
    title: "Deployment Rollback",
    steps: ["ArgoCD rollback", "Verify health", "Notify team", "Create post-mortem"],
  },
];

export function IncidentDemo() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRunbook, setActiveRunbook] = useState(runbooks[0]);
  const [playbackIndex, setPlaybackIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    fetch("/api/incidents")
      .then((res) => res.json())
      .then((payload) => {
        if (!mounted) return;
        setIncidents(Array.isArray(payload?.data) ? payload.data : []);
        setLoading(false);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handlePlay = () => {
    setPlaybackIndex(0);
    const interval = setInterval(() => {
      setPlaybackIndex((prev) => {
        if (prev >= activeRunbook.steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  const avgMttr = incidents.length > 0 ? incidents[0].mttr : "--";

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Incident Response
          </h2>
          <p className="text-sm text-gray-500 mt-1">Runbook automation & post-incident analysis</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : incidents.length}</div>
            <div className="text-xs text-gray-500">Incidents</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : avgMttr}</div>
            <div className="text-xs text-gray-500">Avg MTTR</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">99.95%</div>
            <div className="text-xs text-gray-500">Uptime</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="text-sm font-medium">Recent Incidents</span>
            </div>
            <div className="divide-y divide-gray-100">
              {loading && <div className="px-4 py-3 text-sm text-gray-400">Loading incidents...</div>}
              {!loading && incidents.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-400">No incidents available</div>
              )}
              {incidents.map((incident) => (
                <div key={incident.id} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-mono text-gray-600">{incident.id}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700">{incident.status}</span>
                  </div>
                  <div className="text-sm">{incident.title}</div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {incident.time}
                    </span>
                    <span>MTTR: {incident.mttr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Runbooks
              </span>
              <button onClick={handlePlay} className="flex items-center gap-1 text-xs text-gray-500 hover:text-black">
                <Play className="w-3 h-3" /> Play
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {runbooks.map((rb) => (
                  <button
                    key={rb.id}
                    onClick={() => {
                      setActiveRunbook(rb);
                      setPlaybackIndex(0);
                    }}
                    className={`text-xs px-3 py-1.5 transition-colors ${
                      activeRunbook.id === rb.id ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {rb.title}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {activeRunbook.steps.map((step, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2 text-sm ${
                      i <= playbackIndex ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {i <= playbackIndex ? <CheckCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-gray-300" />}
                    <span className={i <= playbackIndex ? "" : "line-through"}>
                      {i + 1}. {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
