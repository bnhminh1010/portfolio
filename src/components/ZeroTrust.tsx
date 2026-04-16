"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Globe, Lock, ArrowRight, Server, CheckCircle } from "lucide-react";

const mockTunnels = [
  { name: "thinkai-api", status: "connected", endpoints: 3, bandwidth: "12MB/s" },
  { name: "thinkai-web", status: "connected", endpoints: 2, bandwidth: "45MB/s" },
  { name: "monitoring", status: "connected", endpoints: 5, bandwidth: "8MB/s" },
  { name: "grafana", status: "disconnected", endpoints: 0, bandwidth: "0MB/s" },
];

export function ZeroTrust() {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);

  const connected = mockTunnels.filter(t => t.status === "connected").length;

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Zero Trust
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Cloudflare Tunnel - Không có Inbound ports"
              : "Cloudflare Tunnel - No Inbound Ports"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{connected}/{mockTunnels.length}</div>
            <div className="text-xs text-gray-500">Tunnels Active</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">10</div>
            <div className="text-xs text-gray-500">Endpoints</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">65MB/s</div>
            <div className="text-xs text-gray-500">Total Traffic</div>
          </div>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white border border-gray-200 p-6 relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Lines from users to Cloudflare */}
            <line x1="10%" y1="30%" x2="30%" y2="30%" stroke="#ccc" strokeWidth="2" />
            <line x1="10%" y1="50%" x2="30%" y2="50%" stroke="#ccc" strokeWidth="2" />
            <line x1="10%" y1="70%" x2="30%" y2="70%" stroke="#ccc" strokeWidth="2" />
            {/* Line from Cloudflare to K8s */}
            <line x1="50%" y1="50%" x2="70%" y2="50%" stroke="#000" strokeWidth="2" />
          </svg>

          {/* User Clients */}
          <div className="flex justify-around mb-8 relative" style={{ zIndex: 1 }}>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-xs">User Browser</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-xs">Mobile App</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-xs">API Client</div>
            </div>
          </div>

          {/* Arrow to Cloudflare */}
          <div className="text-center mb-8 relative" style={{ zIndex: 1 }}>
            <ArrowRight className="w-6 h-6 mx-auto text-gray-400" />
            <div className="text-xs text-gray-500 mt-1">WAF + DDoS + CDN</div>
          </div>

          {/* Cloudflare */}
          <div className="text-center mb-8 relative" style={{ zIndex: 1 }}>
            <div className="inline-block w-32 h-16 bg-orange-500 text-white rounded-lg flex items-center justify-center">
              <Globe className="w-8 h-8" />
              <span className="ml-2 font-bold">Cloudflare</span>
            </div>
          </div>

          {/* Arrow to K8s */}
          <div className="text-center mb-8 relative" style={{ zIndex: 1 }}>
            <ArrowRight className="w-6 h-6 mx-auto text-black" />
            <div className="text-xs text-gray-500 mt-1">Encrypted Tunnel</div>
          </div>

          {/* Kubernetes */}
          <div className="text-center relative" style={{ zIndex: 1 }}>
            <div className="inline-block w-40 h-16 bg-black text-white rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8" />
              <span className="ml-2 font-bold">K8s Private</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">No Public Inbound</div>
          </div>
        </div>

        {/* Tunnel Status */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockTunnels.map((tunnel) => (
            <div
              key={tunnel.name}
              className="bg-white p-3 border border-gray-200"
              onMouseEnter={() => setHovered(tunnel.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono">{tunnel.name}</span>
                {tunnel.status === "connected" ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                )}
              </div>
              <div className="text-xs text-gray-500">
                {tunnel.endpoints} endpoints • {tunnel.bandwidth}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}