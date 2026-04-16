"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Key, RefreshCw, Shield, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const mockSecrets = [
  { key: "DATABASE_URL", status: "active", rotation: "90d", lastRotated: "2026-03-15" },
  { key: "JWT_SECRET", status: "active", rotation: "30d", lastRotated: "2026-04-01" },
  { key: "AWS_ACCESS_KEY", status: "pending", rotation: "30d", lastRotated: "2026-03-20" },
  { key: "REDIS_PASSWORD", status: "active", rotation: "60d", lastRotated: "2026-04-10" },
  { key: "OPENAI_API_KEY", status: "active", rotation: "90d", lastRotated: "2026-03-25" },
];

export function SecretManager() {
  const { language } = useLanguage();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1500);
  };

  const activeCount = mockSecrets.filter(s => s.status === "active").length;

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Key className="w-6 h-6" />
              Secrets Manager
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {language === "vi"
                ? "HashiCorp Vault - Quản lý secrets tập trung"
                : "HashiCorp Vault - Centralized secrets management"}
            </p>
          </div>
          <button
            onClick={handleSync}
            className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 hover:bg-gray-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            Sync
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{mockSecrets.length}</div>
            <div className="text-xs text-gray-500">Total Secrets</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-500">Sync Status</div>
          </div>
        </div>

        {/* Secrets Table */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Secret</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Rotation</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Last Rotated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockSecrets.map((secret) => (
                <tr key={secret.key} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono">{secret.key}</td>
                  <td className="px-4 py-3">
                    {secret.status === "active" ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-orange-600">
                        <AlertTriangle className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{secret.rotation}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{secret.lastRotated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Auto-sync status */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Auto-sync every 5 minutes • Last sync: 2 min ago</span>
        </div>
      </div>
    </section>
  );
}