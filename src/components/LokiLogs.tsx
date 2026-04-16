"use client";

import { useState, useEffect } from "react";
import { FileText, Search, Filter, Download } from "lucide-react";

const sampleLogs = [
  { time: "10:23:45.123", level: "INFO", service: "backend", msg: "Request completed in 45ms status=200" },
  { time: "10:23:46.456", level: "INFO", service: "cache", msg: "Cache hit for key:user:1234" },
  { time: "10:24:01.789", level: "WARN", service: "api", msg: "Rate limit approaching limit=1000" },
  { time: "10:24:02.012", level: "INFO", service: "backend", msg: "Request completed in 38ms status=200" },
  { time: "10:24:05.345", level: "INFO", service: "db", msg: "Query executed in 12ms" },
  { time: "10:24:08.678", level: "DEBUG", service: "cache", msg: "Cache updated key:session:abcd" },
  { time: "10:24:12.901", level: "ERROR", service: "api", msg: "Failed to connect redis" },
  { time: "10:24:15.234", level: "INFO", service: "backend", msg: "Retrying connection successful" },
];

const levelColors: Record<string, string> = {
  INFO: "text-blue-600",
  WARN: "text-yellow-600",
  ERROR: "text-red-600",
  DEBUG: "text-gray-400",
};

export function LokiLogs() {
  const [logs, setLogs] = useState(sampleLogs);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toTimeString().split(" ")[0],
        level: ["INFO", "INFO", "INFO", "WARN", "ERROR"][Math.floor(Math.random() * 5)] as any,
        service: ["backend", "cache", "api", "db"][Math.floor(Math.random() * 4)],
        msg: ["Request completed", "Cache hit", "Query executed", "Connection attempt"][Math.floor(Math.random() * 4)],
      };
      setLogs(prev => [newLog, ...prev.slice(0, 20)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = filter
    ? logs.filter(l => l.msg.includes(filter) || l.service.includes(filter))
    : logs;

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

        {/* Log entries */}
        <div className="font-mono text-xs bg-black p-3 max-h-48 overflow-y-auto">
          {filteredLogs.map((log, i) => (
            <div key={i} className="flex gap-3 py-1 hover:bg-gray-800">
              <span className="text-gray-500">{log.time}</span>
              <span className={`w-12 ${levelColors[log.level]}`}>{log.level}</span>
              <span className="text-purple-400 w-16">{log.service}</span>
              <span className="text-gray-300">{log.msg}</span>
            </div>
          ))}
        </div>

        {/* Labels / Query */}
        <div className="mt-3 p-2 bg-gray-800 text-gray-400 text-xs">
          {`{service="backend", level="INFO"} | json | msg =~ "Request.*"`}
        </div>
      </div>
    </section>
  );
}