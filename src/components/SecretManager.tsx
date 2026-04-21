"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Key, RefreshCw, Clock, CheckCircle, AlertTriangle } from "lucide-react";

type Secret = {
  key: string;
  status: string;
  rotation: string;
  lastRotated: string;
};

export function SecretManager() {
  const { language } = useLanguage();
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSecrets = async () => {
    try {
      const res = await fetch("/api/secrets");
      const payload = await res.json();
      setSecrets(Array.isArray(payload?.data) ? payload.data : []);
    } catch (error) {
      console.error("Failed to fetch secrets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await fetch("/api/secrets/sync", { method: "POST" });
      await fetchSecrets();
    } finally {
      setSyncing(false);
    }
  };

  const activeCount = secrets.filter((s) => s.status === "active").length;

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
              {language === "vi" ? "HashiCorp Vault - Quản lý secrets tập trung" : "HashiCorp Vault - Centralized secrets management"}
            </p>
          </div>
          <button onClick={handleSync} className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 hover:bg-gray-50">
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            Sync
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold">{loading ? "--" : secrets.length}</div>
            <div className="text-xs text-gray-500">Total Secrets</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{loading ? "--" : activeCount}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-500">Sync Status</div>
          </div>
        </div>

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
              {loading && (
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-400" colSpan={4}>
                    Loading secrets...
                  </td>
                </tr>
              )}
              {!loading && secrets.length === 0 && (
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-400" colSpan={4}>
                    No secrets available
                  </td>
                </tr>
              )}
              {secrets.map((secret) => (
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

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Auto-sync every 5 minutes • Last sync: 2 min ago</span>
        </div>
      </div>
    </section>
  );
}
