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
        output = (
          <div className="space-y-1">
            <div className="font-bold text-[#8AE234] mb-2">Available commands:</div>
            <div><span className="text-[#8AE234]">whoami</span> - About me</div>
            <div><span className="text-[#8AE234]">skills</span> - Technical skills</div>
            <div><span className="text-[#8AE234]">projects</span> - Featured projects</div>
            <div><span className="text-[#8AE234]">experience</span> - Work experience</div>
            <div><span className="text-[#8AE234]">education</span> - Education</div>
            <div><span className="text-[#8AE234]">certifications</span> - Certifications</div>
            <div><span className="text-[#8AE234]">contact</span> - Contact info</div>
            <div><span className="text-[#8AE234]">docker ps</span> - Docker containers</div>
            <div><span className="text-[#8AE234]">docker images</span> - Docker images</div>
            <div><span className="text-[#8AE234]">kubectl get pods</span> - Kubernetes pods</div>
            <div><span className="text-[#8AE234]">terraform show</span> - Infrastructure state</div>
            <div><span className="text-[#8AE234]">cost</span> - Cloud cost breakdown</div>
            <div><span className="text-[#8AE234]">security</span> - Security scan results</div>
            <div><span className="text-[#8AE234]">incidents</span> - Active incidents</div>
            <div><span className="text-[#8AE234]">metrics</span> - System metrics</div>
            <div><span className="text-[#8AE234]">top</span> - Resource usage</div>
            <div><span className="text-[#8AE234]">logs</span> - Recent logs</div>
            <div><span className="text-[#8AE234]">network</span> - Network topology</div>
            <div><span className="text-[#8AE234]">infra as code</span> - IaC status</div>
            <div><span className="text-[#8AE234]">gitops</span> - GitOps status</div>
            <div><span className="text-[#8AE234]">download</span> - Download CV</div>
            <div><span className="text-[#8AE234]">clear</span> - Clear terminal</div>
            <div><span className="text-[#8AE234]">lang</span> - Switch language</div>
          </div>
        );
        break;
      case "whoami":
        output = (
          <div>
            <strong>Nguyen Binh Minh</strong><br />
            Backend/DevOps Developer<br />
            Passionate about scalable systems & CI/CD automation
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-2">
            <div><span className="text-[#729FCF]">Languages:</span> C#, Java, Node.js, TypeScript</div>
            <div><span className="text-[#729FCF]">Frameworks:</span> Spring Boot, .NET, Express, Next.js</div>
            <div><span className="text-[#729FCF]">Database:</span> MySQL, MongoDB, Neo4j, Redis</div>
            <div><span className="text-[#729FCF]">DevOps:</span> Docker, Kubernetes, GitHub Actions, Terraform</div>
            <div><span className="text-[#729FCF]">Cloud:</span> AWS, Railway, Aiven</div>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-2">
            <div>1. <strong>Enterprise Knowledge Graph</strong> - Neo4j + Redis + Docker</div>
            <div>2. <strong>ThinkAI E-Learning</strong> - Spring Boot + MySQL + CI/CD</div>
            <div>3. <strong>Portfolio</strong> - Next.js + 3D visualizations</div>
          </div>
        );
        break;
      case "experience":
        output = (
          <div className="space-y-2">
            <div><strong>Backend/DevOps Developer</strong></div>
            <div className="text-gray-400">ThinkAI E-Learning Platform | 2026 - Present</div>
            <div className="text-gray-500 ml-2">• JWT auth with RBAC</div>
            <div className="text-gray-500 ml-2">• CI/CD with DevSecOps</div>
            <div className="text-gray-500 ml-2">• Deployed on Railway</div>
          </div>
        );
        break;
      case "education":
        output = (
          <div>
            <strong>Ho Chi Minh City University of Technology</strong><br />
            Engineer in Software Engineering<br />
            2022 - 2026 | GPA: 3.19<br />
            <span className="text-gray-400">Semi-Finalist: IT Got Talent 2025</span>
          </div>
        );
        break;
      case "certifications":
        output = (
          <div>
            <span className="text-gray-400">[Coming Soon] AWS Certified</span><br />
            <span className="text-gray-400">[Coming Soon] CKA</span><br />
            <span className="text-gray-400">Self-taught: Docker, K8s, Terraform</span>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-1">
            <div>Email: pata10102004@gmail.com</div>
            <div>Phone: 0372064929</div>
            <div>GitHub: github.com/bnhminh1010</div>
            <div>Portfolio: binhminh.thinkai.id.vn</div>
          </div>
        );
        break;
      case "docker ps":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400">CONTAINER ID   IMAGE                    STATUS         PORTS</div>
            <div>8a2f1c...    thinkai-backend:latest   Up 2 days    8080→3000</div>
            <div>b3e4d5...    neo4j:5.x              Up 5 days    7474→7684</div>
            <div>c5f6a7...    redis:7-alpine         Up 2 days    6379→6379</div>
            <div>d7e8b9...    postgres:15           Up 7 days    5432→5432</div>
            <div className="text-gray-400 mt-1">4 containers running</div>
          </div>
        );
        break;
      case "docker images":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400">REPOSITORY               TAG       SIZE</div>
            <div>thinkai/backend        latest    245MB</div>
            <div>thinkai/frontend      latest    189MB</div>
            <div>neo4j                 5.15     412MB</div>
            <div>redis                 alpine   32MB</div>
            <div>nginx                latest    142MB</div>
            <div className="text-gray-400 mt-1">5 images</div>
          </div>
        );
        break;
      case "kubectl get pods":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400">NAME                          READY   STATUS    RESTARTS   AGE</div>
            <div>thinkai-backend-7d9f8...     1/1     Running   0         5d</div>
            <div>thinkai-frontend-5c2e1...    1/1     Running   0         5d</div>
            <div>neo4j-8a3f2...              1/1     Running   0         10d</div>
            <div>redis-9b4c3...              1/1     Running   0         7d</div>
            <div>postgres-2d5e4...           1/1     Running   0         12d</div>
            <div className="text-gray-400 mt-1">5 pods running</div>
          </div>
        );
        break;
      case "terraform show":
        output = (
          <div className="font-mono text-sm space-y-1">
            <div className="text-[#729FCF]"># Terraform State</div>
            <div className="text-gray-400">resource "aws_ec2_instance" "backend":</div>
            <div className="ml-2">instance_type = "t3.medium"</div>
            <div className="ml-2">ami = "ami-0abc1234"</div>
            <div className="text-gray-400">resource "aws_rds_instance" "postgres":</div>
            <div className="ml-2">instance_class = "db.t3.micro"</div>
            <div className="ml-2">engine = "postgres"</div>
            <div className="text-gray-400 mt-1">6 resources managed</div>
          </div>
        );
        break;
      case "cost":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># Cloud Cost Breakdown (Monthly)</div>
            <div className="text-[#729FCF]">AWS:</div>
            <div className="ml-2">EC2: $24.50</div>
            <div className="ml-2">RDS: $18.00</div>
            <div className="ml-2">S3: $3.20</div>
            <div className="ml-2">CloudFront: $2.10</div>
            <div><span className="text-[#8AE234]">Total: $47.80/mo</span></div>
          </div>
        );
        break;
      case "security":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># Trivy Scan Results</div>
            <div>Critical: 0</div>
            <div>High: 2</div>
            <div className="ml-2 text-orange-400">• CVE-2024-1234 (nginx:1.25)</div>
            <div className="ml-2 text-orange-400">• CVE-2024-5678 (openssl:3.0)</div>
            <div>Medium: 5</div>
            <div>Low: 12</div>
            <div className="mt-1 text-gray-400">Last scan: 2026-04-16 08:00 UTC</div>
          </div>
        );
        break;
      case "incidents":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># Active Incidents</div>
            <div className="text-[#8AE234]">✓ No active incidents</div>
            <div className="text-gray-400 mt-2">MTTR (30d): 15 min</div>
            <div className="text-gray-400">Uptime (30d): 99.95%</div>
          </div>
        );
        break;
      case "metrics":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># System Metrics (Last 24h)</div>
            <div>Requests: <span className="text-[#8AE234]">1.2M</span></div>
            <div>Latency p50: <span className="text-[#8AE234]">45ms</span></div>
            <div>Latency p99: <span className="text-[#8AE234]">180ms</span></div>
            <div>Error rate: <span className="text-[#8AE234]">0.02%</span></div>
            <div>Saturation: <span className="text-[#729FCF]">62%</span></div>
          </div>
        );
        break;
      case "top":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># Resource Usage</div>
            <div className="text-gray-400">CPU     MEM      DISK    NET</div>
            <div>backend  23%    45%    12%   2.3MB</div>
            <div>frontend 12%    28%     8%   4.1MB</div>
            <div>neo4j    35%    67%    45%   0.8MB</div>
            <div>redis    5%     15%     2%   1.2MB</div>
          </div>
        );
        break;
      case "logs":
        output = (
          <div className="font-mono text-sm max-h-40 overflow-y-auto">
            <div className="text-gray-400">2026-04-16T10:23:45.123Z INFO  Request completed in 45ms</div>
            <div className="text-gray-400">2026-04-16T10:23:46.456Z INFO  Cache hit for user:1234</div>
            <div className="text-orange-400">2026-04-16T10:24:01.789Z WARN  Rate limit approaching</div>
            <div className="text-gray-400">2026-04-16T10:24:02.012Z INFO  Request completed in 38ms</div>
            <div className="text-gray-400">2026-04-16T10:24:05.345Z INFO  Database query executed in 12ms</div>
            <div className="text-gray-400">2026-04-16T10:24:08.678Z DEBUG Cache updated for key:session</div>
          </div>
        );
        break;
      case "network":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># Network Topology</div>
            <div>CloudFront → ALB → Backend (x3)</div>
            <div>           ↘→ Cache → Redis</div>
            <div>           ↘→ DB → PostgreSQL</div>
            <div>           ↘→ Graph → Neo4j</div>
            <div className="mt-1 text-gray-400">4 services, 2 AZs</div>
          </div>
        );
        break;
      case "infra as code":
      case "iac":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># IaC Status (Terraform)</div>
            <div className="text-[#8AE234]">✓ State: synchronized</div>
            <div>Modules: 6/6 applied</div>
            <div className="ml-2">aws/ecs-cluster</div>
            <div className="ml-2">aws/rds-postgres</div>
            <div className="ml-2">aws/elasticache</div>
            <div className="ml-2">aws/vpc-network</div>
            <div className="ml-2">aws/alb</div>
            <div className="ml-2">aws/s3-assets</div>
          </div>
        );
        break;
      case "gitops":
        output = (
          <div className="font-mono text-sm">
            <div className="text-gray-400"># GitOps Status (ArgoCD)</div>
            <div>Application: thinkai-prod</div>
            <div>Sync Status: <span className="text-[#8AE234]">✓ Synced</span></div>
            <div>Health: <span className="text-[#8AE234]">✓ Healthy</span></div>
            <div>Revision: HEAD → a1b2c3d</div>
            <div className="mt-1">Last sync: 2 hours ago</div>
          </div>
        );
        break;
      case "download":
      case "download cv":
        output = language === "en" ? "Downloading resume..." : "Đang tải xuống CV...";
        const link = document.createElement("a");
        link.href = "/2026-NguyenBinhMinh-Backend-Devops.pdf";
        link.download = "NguyenBinhMinh_CV.pdf";
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
      // Easter eggs
      case "matrix":
        output = (
          <div className="font-mono text-green-500">
            <div>Follow the white rabbit...</div>
            <div className="animate-pulse">↓ ↓ ← → ← → B A</div>
          </div>
        );
        break;
      case "42":
        output = (
          <div className="font-mono">
            <div>The answer to life, the universe, and everything.</div>
            <div className="text-yellow-500 mt-2">- Douglas Adams</div>
          </div>
        );
        break;
      case "starwars":
        output = (
          <div className="font-mono text-yellow-400">
            <div>May the Force be with you.</div>
            <div className="text-blue-400 mt-1">- Star Wars</div>
          </div>
        );
        break;
      case "hello world":
        output = (
          <div className="font-mono text-green-500">
            <div>Hello, World!</div>
            <div>Welcome to my portfolio.</div>
          </div>
        );
        break;
      case "ls -la":
      case "ls -a":
        output = (
          <div className="font-mono text-sm">
            <div>drwxr-xr-x  user  user  4096 .</div>
            <div>drwxr-xr-x  user  user  4096 ..</div>
            <div>-rw-r--r--  1 user  user  245 secrets/</div>
            <div>-rw-r--r--  1 user  user  123 dreams/</div>
            <div>drwxr-xr-x  user  user  4096 projects/</div>
            <div className="text-gray-400 mt-1">Total: ∞ files</div>
          </div>
        );
        break;
      case "cat":
        output = "Usage: cat [file]. Try: cat skills, cat projects";
        break;
      case "ls":
        output = (
          <div className="font-mono text-sm grid grid-cols-2 gap-x-4">
            <div>skills/</div>
            <div>projects/</div>
            <div>experience/</div>
            <div>contact/</div>
          </div>
        );
        break;
      case "rm -rf":
        output = language === "en"
          ? "I'm afraid I can't let you do that. Your data is precious."
          : "Xin lỗi, tôi không thể để bạn làm vậy. Dữ liệu quý lắm.";
        break;
      case "figlet":
        output = (
          <div className="font-mono text-xs text-green-500">
            <div> _ _ _          _   _ </div>
            <div>| | | |        | | | |</div>
            <div>| |_| | ___  | |_| |</div>
            <div>|  _  |/ _ \\|  _  |</div>
            <div>| | | |  __/ | | | |</div>
            <div>|_| |_|\\___||_| |_|</div>
          </div>
        );
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
