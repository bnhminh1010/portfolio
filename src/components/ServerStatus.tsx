"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Server, Activity } from "lucide-react";

type ServerStatusData = {
  status: "online" | "offline" | "checking";
  ping: number | null;
  region: string;
  ip: string;
};

export function ServerStatus() {
  const { t } = useLanguage();
  const [data, setData] = useState<ServerStatusData>({
    status: "checking",
    ping: null,
    region: "global",
    ip: "---",
  });

  useEffect(() => {
    let mounted = true;

    async function checkStatus() {
      const start = Date.now();
      try {
        const res = await fetch("https://cloudflare.com/cdn-cgi/trace", {
          cache: "no-store",
        });
        const text = await res.text();
        const end = Date.now();
        const ping = end - start;
        
        const locMatch = text.match(/loc=(.*)/);
        const region = locMatch ? locMatch[1] : "global";

        const ipMatch = text.match(/ip=(.*)/);
        const ip = ipMatch ? ipMatch[1] : "unknown";

        if (mounted && res.ok) {
          setData({
            status: "online",
            ping,
            region,
            ip,
          });
        } else if (mounted) {
          throw new Error("Bad response");
        }
      } catch (error) {
        if (mounted) {
          setData({
            status: "offline",
            ping: null,
            region: "unknown",
            ip: "---",
          });
        }
      }
    }

    checkStatus();
    const interval = setInterval(checkStatus, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusColor = () => {
    if (data.status === "online") return "bg-green-500";
    if (data.status === "offline") return "bg-red-500";
    return "bg-yellow-500";
  };

  const statusText = t("serverStatus", data.status);

  return (
    <div className="w-full border-y border-black bg-white overflow-hidden py-2" aria-label="Server Status Monitor">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs font-mono uppercase tracking-widest sm:px-6">
        <div className="flex items-center gap-3">
          <Server className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline-block font-semibold">
            {t("serverStatus", "label")}:
          </span>
          
          <div className="flex items-center gap-2 border border-black px-2 py-0.5 bg-black/5">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor()}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
            </span>
            <span>{statusText}</span>
          </div>

          <span className="hidden md:inline-block ml-2 text-black/60">
            | {t("serverStatus", "visitorIP")}: <span className="text-black font-semibold">{data.ip}</span>
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-6 text-black/70">
          <span className="flex items-center gap-1.5" title={t("serverStatus", "region")}>
            <Activity className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline-block">{t("serverStatus", "region")}:</span>
            <span className="font-bold text-black">{data.region}</span>
          </span>
          <span className="flex items-center gap-1.5" title="Ping">
            <span className="hidden sm:inline-block">Ping:</span>
            <span className={`font-bold ${data.status === "online" ? "text-green-600" : ""}`}>
              {data.ping !== null ? `${data.ping}ms` : "--"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
