"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Database, Clock, CheckCircle, AlertTriangle, RotateCcw } from "lucide-react";

const mockBackups = [
  { name: "mongodb-thinkai", type: "Full", size: "2.3GB", lastBackup: "2026-04-17 02:00", status: "success" },
  { name: "mongodb-thinkai", type: "Incremental", size: "450MB", lastBackup: "2026-04-17 10:00", status: "success" },
  { name: "k8s-velero", type: "Snapshot", size: "5.1GB", lastBackup: "2026-04-16 23:00", status: "success" },
  { name: "s3-assets", type: "Copy", size: "12GB", lastBackup: "2026-04-17 01:00", status: "pending" },
];

export function BackupStatus() {
  const { language } = useLanguage();
  const [showRestore, setShowRestore] = useState(false);

  const successCount = mockBackups.filter(b => b.status === "success").length;

  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="w-6 h-6" />
            Backup & Recovery
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {language === "vi"
              ? "Velero + S3 - Disaster Recovery"
              : "Velero + S3 - Disaster Recovery"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">4</div>
            <div className="text-xs text-gray-500">Backup Jobs</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">&lt;30m</div>
            <div className="text-xs text-gray-500">RTO Target</div>
          </div>
          <div className="bg-white p-4 border border-gray-200">
            <div className="text-2xl font-bold">1h</div>
            <div className="text-xs text-gray-500">RPO Target</div>
          </div>
        </div>

        {/* Backup List */}
        <div className="bg-white border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium">Recent Backups</span>
            <button
              onClick={() => setShowRestore(!showRestore)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-black"
            >
              <RotateCcw className="w-3 h-3" />
              Test Restore
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {mockBackups.map((backup, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{backup.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100">{backup.type}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {backup.size} • {backup.lastBackup}
                  </div>
                </div>
                {backup.status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Restore Simulation */}
        {showRestore && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Simulating restore: Would recover in ~15 minutes</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}