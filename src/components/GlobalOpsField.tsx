"use client";

import { useEffect } from "react";

export function GlobalOpsField() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let resetTimer = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const impulse = Math.max(-1, Math.min(1, delta / 72));
      document.documentElement.style.setProperty("--ops-scroll-impulse", `${(impulse * 6).toFixed(2)}px`);
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty("--ops-scroll-impulse", "0px");
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(resetTimer);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--ops-scroll-impulse");
    };
  }, []);

  return (
    <div className="global-ops-field" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="global-ops-route">
          <path d="M-36 708c252-118 410 34 680-90s526-42 992-198" />
          <circle cx="1168" cy="504" r="9" />
        </g>

        <g className="global-ops-idle global-ops-idle-b">
          <g className="global-ops-prop global-ops-prop-b">
            <path d="m1320 152 76-22 40 31-78 25Z" className="ambient-paper" />
            <path d="m1320 152 38 34v79l-38-30Z" className="ambient-yellow" />
            <path d="m1358 186 78-25v79l-78 25Z" className="ambient-teal" />
            <path d="M1373 201h44m-44 17h29" className="ambient-line" />
            <path d="m1375 226 8 8 18-20" className="ambient-line" />
          </g>
        </g>

        <g className="global-ops-idle global-ops-idle-d">
          <g className="global-ops-prop global-ops-prop-d">
            <ellipse cx="1329" cy="738" rx="42" ry="14" className="ambient-paper" />
            <path d="M1287 738v66c0 8 19 14 42 14s42-6 42-14v-66" className="ambient-pink" />
            <path d="M1287 770c0 8 19 14 42 14s42-6 42-14M1287 798c0 8 19 14 42 14s42-6 42-14" className="ambient-line" />
            <path d="m1385 764 12 12 24-27" className="ambient-line" />
          </g>
        </g>
      </svg>
    </div>
  );
}
