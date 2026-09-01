"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, X, Maximize2, Minimize2, CornerDownLeft, Play } from "lucide-react";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "en" | "vi";
}

interface CommandOutput {
  command?: string;
  output: React.ReactNode;
  time?: string;
}

export function TerminalDrawer({ isOpen, onClose, lang }: TerminalDrawerProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const initialWelcome = (
    <div className="space-y-2 text-neutral-300">
      <div className="text-emerald-400 font-bold">
        {lang === "vi"
          ? "● KẾT NỐI THÀNH CÔNG ĐẾN NGUYEN BINH MINH OPS NODE (vps-edge-01)"
          : "● CONNECTED TO NGUYEN BINH MINH OPS NODE (vps-edge-01)"}
      </div>
      <div className="text-neutral-400 text-xs leading-relaxed">
        {lang === "vi"
          ? "Môi trường giả lập Ops Workbench. Nhập 'help' để xem danh sách lệnh hoặc nhấn các phím tắt bên dưới."
          : "Simulated Ops Workbench session. Type 'help' for available commands or click quick actions below."}
      </div>
      <div className="text-[11px] text-neutral-500 font-mono">
        Linux 6.8.0-45-generic x86_64 | Podman 5.2 (Rootless) | Tailscale Subnet: 100.64.0.0/10
      </div>
    </div>
  );

  const [outputs, setOutputs] = useState<CommandOutput[]>([
    { output: initialWelcome },
  ]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleGlobalKeyDown, true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const runCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const timeStr = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    let resultNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        resultNode = (
          <div className="space-y-1.5 text-neutral-300 text-xs">
            <div className="text-cyan-400 font-bold uppercase tracking-wider">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
              <div><span className="text-emerald-400 font-bold">status</span> - Host telemetry & specs</div>
              <div><span className="text-emerald-400 font-bold">pods / k8s</span> - Cluster pods health state</div>
              <div><span className="text-emerald-400 font-bold">containers</span> - Rootless Podman service list</div>
              <div><span className="text-emerald-400 font-bold">pipeline</span> - ThinkAI CI/CD verification state</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> - Engineer bio & credentials</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Direct links & email</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal screen</div>
              <div><span className="text-emerald-400 font-bold">exit</span> - Close terminal drawer</div>
            </div>
          </div>
        );
        break;

      case "status":
      case "uptime":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-bold">--- HOST SYSTEM METRICS ---</div>
            <div className="text-neutral-300">Host: <span className="text-white">vps-edge-sg.thinkai.id.vn</span></div>
            <div className="text-neutral-300">OS: <span className="text-white">Ubuntu 24.04 LTS (Noble Numbat)</span></div>
            <div className="text-neutral-300">Kernel: <span className="text-white">6.8.0-45-generic x86_64</span></div>
            <div className="text-neutral-300">Uptime: <span className="text-emerald-400 font-bold">99.98% (42 days, 14 hours)</span></div>
            <div className="text-neutral-300">Memory: <span className="text-white">1.82 GiB / 4.00 GiB (45.5%)</span></div>
            <div className="text-neutral-300">Storage: <span className="text-white">24.5 GiB / 80.0 GiB (30.6% NVMe)</span></div>
            <div className="text-neutral-300">Network: <span className="text-white">Tailscale Mesh Active (100.82.14.9)</span></div>
            <div className="text-neutral-300">Rootless Podman: <span className="text-emerald-400 font-bold">ENABLED (UID 1001)</span></div>
          </div>
        );
        break;

      case "pods":
      case "k8s":
      case "kubectl get pods":
      case "kubectl":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-bold">--- KUBERNETES / K3S PODS (NAMESPACE: PRODUCTION) ---</div>
            <div className="overflow-x-auto text-[11px]">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-neutral-500 border-b border-white/[0.1]">
                    <th className="pb-1 pr-4">NAME</th>
                    <th className="pb-1 pr-4">READY</th>
                    <th className="pb-1 pr-4">STATUS</th>
                    <th className="pb-1 pr-4">RESTARTS</th>
                    <th className="pb-1">AGE</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-300 divide-y divide-white/[0.04]">
                  <tr>
                    <td className="py-1 text-white pr-4">hostdeck-core-7f8c9b-x2k9l</td>
                    <td className="py-1 text-emerald-400 pr-4">1/1</td>
                    <td className="py-1 text-emerald-400 pr-4">Running</td>
                    <td className="py-1 pr-4">0</td>
                    <td className="py-1">28d</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-white pr-4">thinkai-auth-api-5d6e-m8npq</td>
                    <td className="py-1 text-emerald-400 pr-4">1/1</td>
                    <td className="py-1 text-emerald-400 pr-4">Running</td>
                    <td className="py-1 pr-4">0</td>
                    <td className="py-1">14d</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-white pr-4">traefik-ingress-controller-4h9z</td>
                    <td className="py-1 text-emerald-400 pr-4">1/1</td>
                    <td className="py-1 text-emerald-400 pr-4">Running</td>
                    <td className="py-1 pr-4">0</td>
                    <td className="py-1">42d</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-white pr-4">promtail-loki-agent-6k1j</td>
                    <td className="py-1 text-emerald-400 pr-4">1/1</td>
                    <td className="py-1 text-emerald-400 pr-4">Running</td>
                    <td className="py-1 pr-4">0</td>
                    <td className="py-1">42d</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-white pr-4">tailscale-router-pod-9a2w</td>
                    <td className="py-1 text-emerald-400 pr-4">1/1</td>
                    <td className="py-1 text-emerald-400 pr-4">Running</td>
                    <td className="py-1 pr-4">0</td>
                    <td className="py-1">42d</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
        break;

      case "containers":
      case "docker ps":
      case "podman ps":
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-400 font-bold">--- ROOTLESS PODMAN CONTAINERS ---</div>
            <div className="text-neutral-300">CONTAINER ID: <span className="text-white">a8f921d3e4b1</span></div>
            <div className="text-neutral-300">IMAGE: <span className="text-white">ghcr.io/bnhminh1010/hostdeck:v1.4.2</span></div>
            <div className="text-neutral-300">PORTS: <span className="text-white">127.0.0.1:8080-&gt;8080/tcp</span></div>
            <div className="text-neutral-300">STATUS: <span className="text-emerald-400 font-bold">Up 672 hours (healthy)</span></div>
            <div className="text-neutral-300">SECURITY: <span className="text-white">no-new-privileges:true, rootless namespace</span></div>
          </div>
        );
        break;

      case "pipeline":
      case "ci":
      case "checks":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-cyan-400 font-bold">--- GITHUB ACTIONS &amp; SECURITY GATES ---</div>
            <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> SonarQube Code Quality: <span className="text-emerald-400 font-bold">PASSED (0 Vulnerabilities, Grade A)</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> CodeQL SAST Analysis: <span className="text-emerald-400 font-bold">PASSED (0 High/Critical findings)</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Trivy Container Image Scan: <span className="text-emerald-400 font-bold">0 CVEs detected</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> CSRF &amp; Input Validation Gates: <span className="text-emerald-400 font-bold">VERIFIED</span></div>
            <div className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Automated Smoke Test Suite: <span className="text-emerald-400 font-bold">PASSED (100% assertions)</span></div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-white font-bold">Nguyễn Bình Minh (@bnhminh1010)</div>
            <div className="text-neutral-300">Role: DevOps / Platform &amp; Infrastructure Engineer</div>
            <div className="text-neutral-400">Focus: Reliable delivery pipelines, rootless container security, Linux host hardening, reproducible systems.</div>
            <div className="text-neutral-400">Location: Ho Chi Minh City, Vietnam</div>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-neutral-300">Email: <a href="mailto:pata10102004@gmail.com" className="text-cyan-400 underline">pata10102004@gmail.com</a></div>
            <div className="text-neutral-300">GitHub: <a href="https://github.com/bnhminh1010" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/bnhminh1010</a></div>
            <div className="text-neutral-300">LinkedIn: <a href="https://www.linkedin.com/in/b%C3%ACnh-minh-4a953434b/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/bình-minh</a></div>
            <div className="text-neutral-300">Phone: <span className="text-white">+84 372 064 929</span></div>
          </div>
        );
        break;

      case "clear":
        setOutputs([]);
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        resultNode = (
          <div className="text-rose-400 text-xs font-mono">
            Command not found: &apos;{trimmed}&apos;. Type &apos;help&apos; to view supported commands.
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        command: cmdStr,
        output: resultNode,
        time: timeStr,
      },
    ]);

    setHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  const quickCommands = ["status", "pods", "containers", "pipeline", "help"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`w-full bg-[#0c0c0e] border border-white/[0.12] rounded-none shadow-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-default ${
              isMaximized ? "h-[94vh] max-w-7xl" : "h-[620px] max-w-3xl"
            }`}
          >
            {/* Window Header */}
            <div className="h-10 bg-[#141418] border-b border-white/[0.08] px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-none bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center group"
                  title="Close"
                >
                  <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                </button>
                <div className="w-3 h-3 rounded-none bg-amber-500/80" />
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="w-3 h-3 rounded-none bg-emerald-500/80 hover:bg-emerald-500 transition-colors flex items-center justify-center group"
                  title={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? (
                    <Minimize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>guest@thinkai-edge: ~ (interactive-pty)</span>
              </div>

              <button
                data-testid="terminal-close-button"
                onClick={onClose}
                aria-label="Close terminal"
                className="text-neutral-500 hover:text-white transition-colors text-xs font-mono"
              >
                ESC
              </button>
            </div>

            {/* Quick Command Bar */}
            <div className="px-4 py-2 bg-[#101013] border-b border-white/[0.04] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Quick Run:</span>
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  className="px-2.5 py-0.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <Play className="w-2.5 h-2.5" />
                  <span>{cmd}</span>
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex-1 p-5 overflow-y-auto space-y-4 font-mono text-xs cursor-text custom-scrollbar"
            >
              {outputs.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  {item.command && (
                    <div className="flex items-center gap-2 text-neutral-400">
                      <span className="text-emerald-400 font-bold">guest@thinkai-edge:~$</span>
                      <span className="text-white font-semibold">{item.command}</span>
                      {item.time && (
                        <span className="text-[10px] text-neutral-600 ml-auto">{item.time}</span>
                      )}
                    </div>
                  )}
                  <div className="pl-0 sm:pl-2">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-emerald-400 font-bold whitespace-nowrap">guest@thinkai-edge:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs caret-cyan-400"
                  autoFocus
                  spellCheck={false}
                />
                <button
                  onClick={() => runCommand(input)}
                  className="text-neutral-500 hover:text-white transition-colors"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
