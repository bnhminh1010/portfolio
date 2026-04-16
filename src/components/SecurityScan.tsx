"use client";

import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const vulnerabilities = [
  {
    severity: "high",
    id: "CVE-2024-1234",
    package: "nginx",
    current: "1.25.0",
    fixed: "1.25.3",
    description: "Out-of-bounds write in HTTP/2",
    days: 45,
  },
  {
    severity: "high",
    id: "CVE-2024-5678",
    package: "openssl",
    current: "3.0.11",
    fixed: "3.0.15",
    description: "Memory corruption in X.509 verification",
    days: 30,
  },
  {
    severity: "medium",
    id: "CVE-2024-9012",
    package: "curl",
    current: "8.5.0",
    fixed: "8.6.0",
    description: "URL parsing vulnerability",
    days: 15,
  },
  {
    severity: "low",
    id: "CVE-2024-3456",
    package: "tzdata",
    current: "2024a",
    fixed: "2024c",
    description: "Time zone data update",
    days: 7,
  },
];

export function SecurityScan() {
  const [expanded, setExpanded] = useState(false);
  const highCount = vulnerabilities.filter((v) => v.severity === "high").length;
  const mediumCount = vulnerabilities.filter((v) => v.severity === "medium").length;
  const lowCount = vulnerabilities.filter((v) => v.severity === "low").length;

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Security Scan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Trivy container vulnerability scan results
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-3xl font-bold text-red-600">{highCount}</div>
            <div className="text-xs text-gray-500 uppercase">High</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-3xl font-bold text-orange-500">{mediumCount}</div>
            <div className="text-xs text-gray-500 uppercase">Medium</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-3xl font-bold text-yellow-500">{lowCount}</div>
            <div className="text-xs text-gray-500 uppercase">Low</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-3xl font-bold text-gray-400">0</div>
            <div className="text-xs text-gray-500 uppercase">Critical</div>
          </div>
        </div>

        {/* Vulnerabilities List */}
        <div className="bg-white border border-gray-200">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <span className="text-sm font-medium">Vulnerability Details</span>
            <span className="text-xs text-gray-400">
              {expanded ? "Hide" : "Show"} ({vulnerabilities.length})
            </span>
          </button>

          {expanded && (
            <div className="border-t border-gray-200">
              {vulnerabilities.map((v, i) => (
                <div
                  key={v.id}
                  className={`flex items-center gap-4 px-4 py-3 ${
                    i !== vulnerabilities.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  {v.severity === "high" ? (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  ) : v.severity === "medium" ? (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-gray-600">{v.id}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 ${
                          v.severity === "high"
                            ? "bg-red-100 text-red-700"
                            : v.severity === "medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {v.severity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {v.package} {v.current} → {v.fixed} • {v.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{v.days}d ago</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Scan */}
        <div className="mt-4 text-xs text-gray-400 text-right">
          Last scan: 2026-04-16 08:00 UTC • Next: 24h
        </div>
      </div>
    </section>
  );
}