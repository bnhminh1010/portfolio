"use client";

import { useEffect, useRef } from "react";

export function GlobalOpsField() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationFrame = 0;
    let pressResetTimer = 0;
    let scrollResetTimer = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastScrollY = window.scrollY;

    const applyPointer = () => {
      document.documentElement.style.setProperty("--ops-pointer-x", `${(pointerX * 13).toFixed(2)}px`);
      document.documentElement.style.setProperty("--ops-pointer-y", `${(pointerY * 9).toFixed(2)}px`);
      animationFrame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(applyPointer);
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(applyPointer);
    };

    const onPointerDown = () => {
      field.dataset.pressed = "true";
      window.clearTimeout(pressResetTimer);
      pressResetTimer = window.setTimeout(() => { delete field.dataset.pressed; }, 220);
    };

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const impulse = Math.max(-1, Math.min(1, delta / 72));
      document.documentElement.style.setProperty("--ops-scroll-impulse", `${(impulse * 14).toFixed(2)}px`);
      window.clearTimeout(scrollResetTimer);
      scrollResetTimer = window.setTimeout(() => {
        document.documentElement.style.setProperty("--ops-scroll-impulse", "0px");
      }, 120);
    };

    field.dataset.pointerReady = "true";
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(pressResetTimer);
      window.clearTimeout(scrollResetTimer);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.style.removeProperty("--ops-pointer-x");
      document.documentElement.style.removeProperty("--ops-pointer-y");
      document.documentElement.style.removeProperty("--ops-scroll-impulse");
    };
  }, []);

  return (
    <div ref={fieldRef} className="global-ops-field" aria-hidden="true">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
        <g className="global-ops-route">
          <path d="M-40 240C188 162 300 352 534 274S922 184 1102 314s314 82 546-24" />
          <path d="M-44 694c202-118 362 40 568-62s300-230 574-116 320 68 546-88" />
          <circle cx="330" cy="330" r="10" />
          <circle cx="1065" cy="292" r="10" />
          <circle cx="548" cy="628" r="10" />
          <circle cx="1220" cy="596" r="10" />
        </g>

        <g className="global-ops-idle global-ops-idle-a">
          <g className="global-ops-prop global-ops-prop-a">
            <path d="m90 128 82-25 42 32-83 28Z" className="ambient-paper" />
            <path d="m90 128 41 35v87l-41-32Z" className="ambient-teal" />
            <path d="m131 163 83-28v87l-83 28Z" className="ambient-pink" />
            <path d="M146 180h45m-45 18h34m-34 18h46" className="ambient-line" />
            <rect x="145" y="174" width="10" height="10" className="ambient-yellow" />
            <rect x="160" y="174" width="10" height="10" className="ambient-yellow" />
            <rect x="175" y="174" width="10" height="10" className="ambient-yellow" />
            <text x="140" y="156" className="ambient-label">K8S POD</text>
          </g>
        </g>

        <g className="global-ops-idle global-ops-idle-b">
          <g className="global-ops-prop global-ops-prop-b">
            <path d="m1320 152 76-22 40 31-78 25Z" className="ambient-paper" />
            <path d="m1320 152 38 34v79l-38-30Z" className="ambient-yellow" />
            <path d="m1358 186 78-25v79l-78 25Z" className="ambient-teal" />
            <path d="M1373 201h44m-44 17h29" className="ambient-line" />
            <path d="m1375 226 8 8 18-20" className="ambient-line" />
            <text x="1366" y="180" className="ambient-label">CI RUN</text>
          </g>
        </g>

        <g className="global-ops-idle global-ops-idle-c">
          <g className="global-ops-prop global-ops-prop-c">
            <path d="m144 748 86-27 44 35-88 29Z" className="ambient-paper" />
            <path d="m144 748 42 37v88l-42-34Z" className="ambient-pink" />
            <path d="m186 785 88-29v88l-88 29Z" className="ambient-yellow" />
            <circle cx="210" cy="800" r="8" className="ambient-teal" />
            <circle cx="232" cy="800" r="8" className="ambient-teal" />
            <path d="M218 800h6" className="ambient-line" />
            <text x="191" y="776" className="ambient-label">TAILSCALE</text>
          </g>
        </g>

        <g className="global-ops-idle global-ops-idle-d">
          <g className="global-ops-prop global-ops-prop-d">
            <ellipse cx="1329" cy="738" rx="42" ry="14" className="ambient-paper" />
            <path d="M1287 738v66c0 8 19 14 42 14s42-6 42-14v-66" className="ambient-pink" />
            <path d="M1287 770c0 8 19 14 42 14s42-6 42-14M1287 798c0 8 19 14 42 14s42-6 42-14" className="ambient-line" />
            <path d="m1385 764 12 12 24-27" className="ambient-line" />
            <text x="1303" y="732" className="ambient-label">BACKUP</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
