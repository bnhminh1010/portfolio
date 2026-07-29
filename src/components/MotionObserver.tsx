"use client";

import { useEffect } from "react";

export function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    if (elements.length === 0) return;

    let observer: IntersectionObserver | undefined;
    let armFrame = 0;
    const reveal = (element: HTMLElement) => {
      element.dataset.motionRevealed = "true";
      observer?.unobserve(element);
    };

    armFrame = window.requestAnimationFrame(() => {
      elements.forEach((element) => { element.dataset.motionReady = "true"; });

      if (!("IntersectionObserver" in window)) {
        elements.forEach(reveal);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );

      elements.forEach((element) => {
        if (element.dataset.motionInitial === "true") reveal(element);
        else observer?.observe(element);
      });

    });

    return () => {
      window.cancelAnimationFrame(armFrame);
      observer?.disconnect();
    };
  }, []);

  return null;
}
