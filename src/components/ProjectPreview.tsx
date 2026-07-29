"use client";

import { ExternalLink, Play, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArchitectureDiagram, ProjectFlow } from "@/components/InfrastructureIllustration";
import type { Language, Project } from "@/data/portfolio";

type ProjectPreviewProps = {
  project: Project;
  language: Language;
  buttonLabel: string;
  motionClassName: string;
};

export function ProjectPreview({ project, language, buttonLabel, motionClassName }: ProjectPreviewProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add("dialog-open");
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("dialog-open");
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  const content = project.content[language];
  const heading = language === "en" ? "OpenScreen preview" : "Preview OpenScreen";
  const comingSoon = language === "en" ? "Recording slot ready" : "Đã sẵn sàng vị trí recording";
  const closeLabel = language === "en" ? "Close preview" : "Đóng preview";

  return (
    <>
      <figure data-motion className={`project-preview project-preview-${project.accent} ${motionClassName} motion-stage`}>
        <div className="project-preview-label motion-item" aria-hidden="true">{content.category}</div>
        <div className="motion-item motion-diagram"><ArchitectureDiagram projectId={project.id} /></div>
        <div className="motion-item"><ProjectFlow projectId={project.id} /></div>
        <figcaption className="motion-item">{content.diagramLabel}</figcaption>
        <button type="button" className="preview-trigger motion-item" onClick={() => setOpen(true)}>
          <Play aria-hidden="true" size={16} /> {buttonLabel}
        </button>
      </figure>

      {open && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <div className="preview-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`${project.id}-preview-title`}>
            <div className="preview-dialog-topline">
              <span>{heading}</span>
              <button ref={closeRef} type="button" className="dialog-close" onClick={() => setOpen(false)} aria-label={closeLabel}>
                <X aria-hidden="true" size={20} />
              </button>
            </div>
            <div className="preview-dialog-content">
              <p className="eyebrow">{project.period}</p>
              <h2 id={`${project.id}-preview-title`}>{content.title}</h2>
              {project.preview.ready ? (
                <video controls preload="metadata" poster={`/projects/${project.preview.assetStem}-poster.webp`} className="project-video">
                  <source src={`/projects/${project.preview.assetStem}.webm`} type="video/webm" />
                  <source src={`/projects/${project.preview.assetStem}.mp4`} type="video/mp4" />
                  {language === "en" ? "Your browser does not support this preview." : "Trình duyệt không hỗ trợ preview này."}
                </video>
              ) : (
                <div className="recording-ready">
                  <ArchitectureDiagram projectId={project.id} />
                  <ProjectFlow projectId={project.id} />
                  <div>
                    <p className="recording-ready-title">{comingSoon}</p>
                    <p>{project.preview.capture[language]}</p>
                  </div>
                </div>
              )}
              <div className="preview-safety-note">
                <ShieldCheck aria-hidden="true" size={18} />
                <span>
                  {language === "en"
                    ? "Capture rule: use demo data only; redact identities, addresses, internal URLs and all secrets before export."
                    : "Quy tắc quay: chỉ dùng dữ liệu demo; che danh tính, địa chỉ, URL nội bộ và mọi secret trước khi export."}
                </span>
              </div>
              <a className="source-link" href={project.repo} target="_blank" rel="noreferrer">
                <ExternalLink aria-hidden="true" size={16} /> {language === "en" ? "Open repository" : "Mở repository"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
