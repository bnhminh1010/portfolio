"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ShieldCheck,
  Server,
  ArrowRight,
  Layers,
  Lock,
  Cpu,
  Database,
  Activity,
  GitBranch,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import { TaiLogoMark } from "./HalftoneBanner";
import { TAI_EASE } from "@/lib/motion";

interface ArchitectureModalProps {
  projectId: "homelab" | "thinkai" | null;
  onClose: () => void;
  lang: "en" | "vi";
}

export function ArchitectureModal({ projectId, onClose, lang }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"diagram" | "security" | "provenance">("diagram");
  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (projectId) {
      document.addEventListener("keydown", handleGlobalKeyDown, true);
    }
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [projectId, onClose]);

  if (!project) return null;

  const isHomelab = project.id === "homelab";

  return (
    <AnimatePresence>
      {projectId && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 16 }}
            transition={{ duration: 0.25, ease: TAI_EASE.luxury }}
            className="w-full max-w-5xl bg-[#0a0a0c] border border-white/[0.08] rounded-none shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh] cursor-default"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#141417] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TaiLogoMark className="w-4 h-4" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                      {project.content[lang].title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-none bg-white/[0.06] border border-white/[0.08] text-neutral-300">
                      {lang === "vi" ? "Kiến trúc hệ thống" : "System Architecture"}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono">
                    {project.content[lang].category} · {project.period}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Minimalist Monochrome Tabs */}
                <div className="flex items-center bg-black/50 p-1 rounded-none border border-white/[0.08] text-xs font-mono">
                  <button
                    onClick={() => setActiveTab("diagram")}
                    className={`px-3 py-1 rounded-none transition-colors ${
                      activeTab === "diagram" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Sơ đồ" : "Flow"}
                  </button>
                  <button
                    onClick={() => setActiveTab("security")}
                    className={`px-3 py-1 rounded-none transition-colors ${
                      activeTab === "security" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Bảo mật" : "Security"}
                  </button>
                  <button
                    onClick={() => setActiveTab("provenance")}
                    className={`px-3 py-1 rounded-none transition-colors ${
                      activeTab === "provenance" ? "bg-white text-black font-bold" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang === "vi" ? "Bằng chứng" : "Claims"}
                  </button>
                </div>

                <button
                  data-testid="arch-close-button"
                  onClick={onClose}
                  aria-label="Close Architecture Modal"
                  className="p-1.5 rounded-none bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {activeTab === "diagram" && (
                <div className="space-y-6">
                  {isHomelab ? (
                    <div className="space-y-4">
                      <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>HostDeck Ops Workbench: Zero-Trust Delivery &amp; Telemetry Flow</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                        {/* Column 1: Ingress */}
                        <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-3">
                          <div className="font-mono font-bold text-white flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span>01 // INGRESS</span>
                            <Lock className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">Tailscale Mesh</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">WireGuard encrypted private overlay (100.x.x.x)</div>
                            </div>
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">Traefik Proxy</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">Automated Let&apos;s Encrypt TLS &amp; rate-limiting</div>
                            </div>
                          </div>
                        </div>

                        {/* Column 2: Runtime Engine */}
                        <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-3">
                          <div className="font-mono font-bold text-white flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span>02 // RUNTIME</span>
                            <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">Rootless Podman</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">Non-root user namespace daemonless execution</div>
                            </div>
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">K3s Node</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">Lightweight cluster control plane</div>
                            </div>
                          </div>
                        </div>

                        {/* Column 3: Services & Data */}
                        <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-3">
                          <div className="font-mono font-bold text-white flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span>03 // STORAGE &amp; SERVICES</span>
                            <Database className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">Go Daemon</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">WebSocket real-time telemetry stream</div>
                            </div>
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">SQLite WAL &amp; Redis</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">Low-overhead state &amp; ephemeral caching</div>
                            </div>
                          </div>
                        </div>

                        {/* Column 4: Observability */}
                        <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-3">
                          <div className="font-mono font-bold text-white flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span>04 // OBSERVABILITY</span>
                            <Activity className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">ArgoCD Sync</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">GitOps declarative state synchronization</div>
                            </div>
                            <div className="p-2.5 bg-black/40 border border-white/[0.06] rounded-none">
                              <div className="font-bold text-white font-mono">Promtail &amp; Loki</div>
                              <div className="text-neutral-400 text-[11px] mt-0.5">Structured service log retention</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>ThinkAI Automated DevSecOps Pipeline Flow</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                        {[
                          { step: "01", title: "Git Push / PR", sub: "Trigger via main branch push" },
                          { step: "02", title: "CodeQL & Sonar", sub: "SAST & quality gate validation" },
                          { step: "03", title: "Trivy Scan", sub: "Container image CVE audit" },
                          { step: "04", title: "Automated Tests", sub: "Smoke & integration suite" },
                          { step: "05", title: "Staged Rollout", sub: "Zero-downtime health verification" },
                        ].map((s) => (
                          <div key={s.step} className="p-3 bg-[#141418] border border-white/[0.08] rounded-none space-y-1">
                            <span className="font-mono text-[10px] text-neutral-500 font-bold">{s.step} // STAGE</span>
                            <div className="font-bold text-white font-mono text-xs">{s.title}</div>
                            <p className="text-[11px] text-neutral-400 font-light">{s.sub}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold font-mono">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Rootless Namespace Isolation</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed text-xs">
                        Containers run in unprivileged user namespaces via Podman, eliminating root daemon escape vulnerabilities on the host kernel.
                      </p>
                    </div>

                    <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold font-mono">
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <span>Zero-Trust Mesh Networking</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed text-xs">
                        No public inbound ports exposed. All service-to-service communication is encapsulated within encrypted WireGuard tunnels.
                      </p>
                    </div>

                    <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold font-mono">
                        <GitBranch className="w-4 h-4 text-emerald-400" />
                        <span>Automated Quality Gates</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed text-xs">
                        CodeQL static analysis, SonarQube quality criteria, and Trivy CVE scans must pass before any staging release is authorized.
                      </p>
                    </div>

                    <div className="p-4 bg-[#141418] border border-white/[0.08] rounded-none space-y-2">
                      <div className="flex items-center gap-2 text-white font-bold font-mono">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Data Redaction &amp; Secrets Control</span>
                      </div>
                      <p className="text-neutral-300 font-light leading-relaxed text-xs">
                        Ephemeral runtime secrets injected via environment variables; all host telemetry and log outputs sanitize tokens and internal IP addresses.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "provenance" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    {project.evidence.repository.map((item, idx) => (
                      <div key={idx} className="p-4 bg-[#141418] border border-white/[0.08] rounded-none flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] text-neutral-500 uppercase">CLAIM EVIDENCE 0{idx + 1}</span>
                          <p className="text-white text-xs font-light">{item.claim}</p>
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-none bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
                        >
                          <span>Verify Repo</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-[#101013] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>{project.repo}</span>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline flex items-center gap-1"
              >
                <span>Open repository</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
