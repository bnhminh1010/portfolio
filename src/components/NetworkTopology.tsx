"use client";

import { useState } from "react";
import { Globe, Server, Database, HardDrive, ArrowRight, Cloud, Shield } from "lucide-react";

const services = [
  { id: "cdn", name: "CDN", type: "cdn", x: 5, y: 50 },
  { id: "lb", name: "ALB", type: "lb", x: 25, y: 50 },
  { id: "backend", name: "API", type: "app", x: 50, y: 35 },
  { id: "cache", name: "Redis", type: "cache", x: 50, y: 65 },
  { id: "db", name: "DB", type: "db", x: 75, y: 50 },
];

const connections = [
  { from: "cdn", to: "lb" },
  { from: "lb", to: "backend" },
  { from: "backend", to: "cache" },
  { from: "backend", to: "db" },
];

export function NetworkTopology() {
  const [hovered, setHovered] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "cdn":
        return Globe;
      case "lb":
        return Cloud;
      case "cache":
        return HardDrive;
      case "db":
        return Database;
      default:
        return Server;
    }
  };

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Network Topology
          </h2>
          <p className="text-sm text-gray-500 mt-1">Microservices communication architecture</p>
        </div>

        {/* Diagram */}
        <div className="relative bg-white border border-gray-200 p-4" style={{ minHeight: "200px" }}>
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, i) => {
              const from = services.find((s) => s.id === conn.from);
              const to = services.find((s) => s.id === conn.to);
              if (!from || !to) return null;
              return (
                <line
                  key={i}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={hovered === conn.from || hovered === conn.to ? "#000" : "#ccc"}
                  strokeWidth={2}
                />
              );
            })}
          </svg>

          {/* Service Nodes */}
          {services.map((service) => {
            const Icon = getIcon(service.type);
            const isHovered = hovered === service.id;
            return (
              <div
                key={service.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer ${
                  isHovered ? "z-10" : ""
                }`}
                style={{ left: `${service.x}%`, top: `${service.y}%` }}
                onMouseEnter={() => setHovered(service.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`w-10 h-10 rounded flex items-center justify-center text-xs ${
                    service.type === "db"
                      ? "bg-black text-white"
                      : service.type === "cache"
                      ? "bg-orange-500 text-white"
                      : service.type === "lb"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 border border-black"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-center mt-1 text-[10px] font-medium">{service.name}</div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" /> CDN
          </div>
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4" /> Load Balancer
          </div>
          <div className="flex items-center gap-1">
            <Server className="w-4 h-4" /> Application
          </div>
          <div className="flex items-center gap-1">
            <Database className="w-4 h-4" /> Database
          </div>
          <div className="flex items-center gap-1">
            <HardDrive className="w-4 h-4" /> Cache
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-xs text-gray-500">Services</div>
          </div>
          <div>
            <div className="text-2xl font-bold">2</div>
            <div className="text-xs text-gray-500">AZs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-500">Connections</div>
          </div>
        </div>
      </div>
    </section>
  );
}