"use client";

import { useEffect, useState } from "react";
import { FileText, Search, Filter, Download } from "lucide-react";

type LogItem = {
  timestamp?: string;
  time?: string;
  level?: string;
  service?: string;
  message?: string;
  msg?: string;
};

const levelColors: Record<string, string> = {
  INFO: "text-blue-600",
  WARN: "text-yellow-600",
  ERROR: "text-red-600",
  DEBUG: "text-gray-400",
};

export function LokiLogs() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const filter = "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchLogs = async () => {
      try {
        const res = await fetch("/api/logs");
        const payload = await res.json();
        if (mounted) {
          setLogs(Array.isArray(payload?.data) ? payload.data : []);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) setLoading(false);
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const normalized = logs.map((log) => {
    const level = String(log.level ?? "info").toUpperCase();
    const message = String(log.message ?? log.msg ?? "");
    const timestamp = log.timestamp
      ? new Date(log.timestamp).toLocaleTimeString()
      : String(log.time ?? "--:--:--");

    return {
      level,
      message,
      service: String(log.service ?? "unknown"),
      timestamp,
    };
  });

  const filteredLogs = filter
    ? normalized.filter((l) => l.message.includes(filter) || l.service.includes(filter))
    : normalized;

  return (
    <section className="border-b border-gray-200 bg-gray-900">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Loki
            </h2>
            <p className="text-sm text-gray-400">Log aggregation</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 text-xs">
              <Search className="w-3 h-3" /> Search
            </button>
            <button className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 text-xs">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-400 text-xs">
              <Download className="w-3 h-3" /> Export
            </button>
          </div>
        </div>

        <div className="font-mono text-xs bg-black p-3 max-h-48 overflow-y-auto">
          {loading && <div className="text-gray-500">Loading logs...</div>}
          {!loading && filteredLogs.length === 0 && <div className="text-gray-500">No logs available</div>}
          {filteredLogs.map((log, i) => (
            <div key={`${log.timestamp}-${i}`} className="flex gap-3 py-1 hover:bg-gray-800">
              <span className="text-gray-500">{log.timestamp}</span>
              <span className={`w-12 ${levelColors[log.level] ?? "text-gray-400"}`}>{log.level}</span>
              <span className="text-purple-400 w-16">{log.service}</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 bg-gray-800 text-gray-400 text-xs">
          {`{service="backend", level="INFO"} | json | msg =~ "Request.*"`}
        </div>
      </div>
    </section>
  );
}
