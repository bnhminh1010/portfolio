"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, AlertTriangle, CheckCircle, Terminal, Eye, Lock } from "lucide-react";

const mockAlerts = [
  { id: "FALCO-001", rule: "Terminal shell in container", severity: "warning", source: "user-service", time: "2 min ago", status: "active" },
  { id: "FALCO-002", rule: "Write to /proc filesystem", severity: "info", source: "payment-service", time: "15 min ago", status: "resolved" },
  { id: "FALCO-003", rule: "Network connection outside cluster", severity: "critical", source: "notification", time: "1 hour ago", status: "active" },
];

const mockRules = [
  { name: "Container shell detection", status: "enabled", triggers: 12 },
  { name: "Sensitive file access", status: "enabled", triggers: 5 },
  { name: "Privilege escalation", status: "enabled", triggers: 0 },
  { name: "Network anomalies", status: "enabled", triggers: 8 },
];

export function RuntimeSecurity() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"alerts" | "rules">("alerts");

  const activeAlerts = mockAlerts.filter(a => a.status === "active").length;

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Runtime Security
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Falco - eBPF Runtime Threat Detection"
              : "Falco - eBPF Runtime Threat Detection"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{mockAlerts.length}</div>
            <div className="text-xs text-gray-500">Total Rules</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-orange-500">{activeAlerts}</div>
            <div className="text-xs text-gray-500">Active Alerts</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">25</div>
            <div className="text-xs text-gray-500">Events Today</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-xs text-gray-500">Coverage</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("alerts")}
            className={`px-4 py-2 text-sm ${
              activeTab === "alerts" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            Alerts ({mockAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-4 py-2 text-sm ${
              activeTab === "rules" ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            <Lock className="w-4 h-4 inline mr-1" />
            Rules ({mockRules.length})
          </button>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200">
          {activeTab === "alerts" ? (
            <div className="divide-y divide-gray-100">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className="px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-600">{alert.id}</span>
                      <span className={`text-xs px-2 py-0.5 ${
                        alert.severity === "critical" ? "bg-red-100 text-red-700" :
                        alert.severity === "warning" ? "bg-orange-100 text-orange-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 ${
                      alert.status === "active" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <div className="text-sm">{alert.rule}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <Terminal className="w-3 h-3" />
                    {alert.source} • {alert.time}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {mockRules.map((rule) => (
                <div key={rule.name} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{rule.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{rule.triggers} triggers</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* eBPF status */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Eye className="w-4 h-4" />
          <span>eBPF kernel module active • 25 syscalls monitored</span>
        </div>
      </div>
    </section>
  );
}