"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, Terminal as TerminalIcon } from "lucide-react";

type TerminalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const { language, t, toggleLanguage } = useLanguage();
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (history.length === 0) {
        setHistory([{ command: "", output: t("terminal", "welcome") }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, history.length, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { command: trimmed, output: "" }]);
      return;
    }

    const lowerCmd = trimmed.toLowerCase();
    let output: string | React.ReactNode = "";

    switch (lowerCmd) {
      case "help":
        output = t("terminal", "help");
        break;
      case "whoami":
        output = (
          <div>
            <strong>Minh Nguyen</strong><br />
            {t("hero", "title")}<br />
            {t("hero", "description")}
          </div>
        );
        break;
      case "skills":
        output = "[NestJS] [Spring Boot] [Neo4j] [Docker] [PostgreSQL] [Next.js] [React] [TypeScript]";
        break;
      case "projects":
        output = (
          <div>
            1. Enterprise Knowledge Graph (EKG)<br />
            2. ThinkAI Backend<br />
            3. ZenDo – Focus & Productivity App
          </div>
        );
        break;
      case "download":
      case "download cv":
        output = language === "en" ? "Downloading resume..." : "Đang tải xuống CV...";
        const link = document.createElement("a");
        link.href = "/NguyenBinhMinh_CV_2025_Updated.pdf";
        link.download = "NguyenBinhMinh_CV_2025_Updated.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case "clear":
        setHistory([]);
        return; 
      case "lang en":
        if (language !== "en") toggleLanguage();
        output = "Language set to English.";
        break;
      case "lang vi":
        if (language !== "vi") toggleLanguage();
        output = "Ngôn ngữ đã được chuyển sang Tiếng Việt.";
        break;
      case "lang":
        output = language === "en" ? "Please specify 'lang vi' or 'lang en'." : "Vui lòng chỉ định 'lang vi' hoặc 'lang en'.";
        break;
      case "exit":
      case "quit":
        onClose();
        return;
      case "sudo":
        output = language === "en" ? "nice try. but you don't have permission." : "Thử hay đấy. Nhưng bạn không có quyền.";
        break;
      default:
        output = t("terminal", "commandNotFound").replace("{0}", trimmed);
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-12 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative flex h-full w-full max-w-5xl flex-col bg-[#2C001E] border-2 border-[#300A24] shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-[#D3D7CF]"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <div className="flex items-center justify-between bg-[#300A24] px-4 py-2 border-b border-black">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-5 w-5 text-white" />
            <span className="font-bold tracking-widest text-[#D3D7CF]">BinhMinh_OS Terminal</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="text-white hover:text-white hover:bg-[#E95420] p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E95420] rounded"
            aria-label="Close Terminal"
            title="Close Terminal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 text-sm sm:text-base selection:bg-[#E95420] selection:text-white scrollbar-thin scrollbar-thumb-[#E95420] scrollbar-track-transparent">
          {history.map((entry, i) => (
            <div key={i} className="mb-4">
              {entry.command && (
                <div className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-[#8AE234]">{t("terminal", "prompt")}</span>
                  <span className="break-all text-white">{entry.command}</span>
                </div>
              )}
              {entry.output && (
                <div className="mt-1 whitespace-pre-wrap text-[#D3D7CF]">
                  {entry.output}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="shrink-0 font-bold text-[#8AE234]">{t("terminal", "prompt")}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono focus:ring-0 p-0"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </div>
  );
}
