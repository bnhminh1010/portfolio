"use client";

import React from "react";

export function TechLogo({ name, className = "w-8 h-8" }: { name: string; className?: string }) {
  switch (name) {
    case "Go":
      return (
        <span className={`font-black text-2xl tracking-tighter ${className} flex items-center justify-center`}>
          GO
        </span>
      );
    case "Docker":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.082.185.185.185zm21.688 1.488c-.313-.238-.83-.34-1.378-.34-.33 0-.66.037-.99.112a4.42 4.42 0 00-.806-1.572 4.35 4.35 0 00-1.89-1.325.267.267 0 00-.315.084.267.267 0 00-.012.327c.456.685.733 1.503.733 2.366 0 .09-.004.18-.011.27-.66-.192-1.348-.292-2.046-.292H2.33a.582.582 0 00-.582.582c0 3.39 1.547 5.753 4.29 6.55 2.11.614 4.542.428 6.942.245 2.12-.162 4.22-.323 6.012.324a.58.58 0 00.757-.367c.755-2.316.516-4.524-.87-5.992z"/>
        </svg>
      );
    case "Kubernetes":
      return (
        <span className={`font-black text-2xl tracking-tighter ${className} flex items-center justify-center`}>
          K8S
        </span>
      );
    case "Linux":
      return (
        <span className={`font-black text-xl tracking-wider ${className} flex items-center justify-center font-mono`}>
          LINUX
        </span>
      );
    case "GitHub Actions":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          ACTIONS
        </span>
      );
    case "Podman":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          PODMAN
        </span>
      );
    case "Tailscale":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          TAILSCALE
        </span>
      );
    case "PostgreSQL":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          POSTGRES
        </span>
      );
    case "Argo CD":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          ARGO CD
        </span>
      );
    case "SonarQube":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          SONAR
        </span>
      );
    case "CodeQL":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          CODEQL
        </span>
      );
    case "K3s":
      return (
        <span className={`font-black text-sm tracking-tight ${className} flex items-center justify-center font-mono`}>
          K3S
        </span>
      );
    default:
      return (
        <span className={`font-bold text-xs tracking-tight ${className} flex items-center justify-center font-mono`}>
          {name}
        </span>
      );
  }
}
