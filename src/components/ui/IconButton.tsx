"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

export function IconButton({
  className = "",
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const base =
    "inline-flex h-10 w-10 items-center justify-center border border-black bg-transparent text-black transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-black hover:text-white";
  return (
    <a {...props} className={`${base} ${className}`}>
      {children}
    </a>
  );
}

