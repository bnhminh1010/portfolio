"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

function LineArtIllustration() {
  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-label="Line-art illustration of a developer working with servers"
      className="h-auto w-full"
    >
      <rect x="1" y="1" width="638" height="418" fill="none" stroke="#000" />

      <path
        d="M120 300h400"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />

      <rect
        x="360"
        y="110"
        width="170"
        height="120"
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />
      <path
        d="M380 140h130M380 165h130M380 190h130"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="390" cy="212" r="6" fill="#000" />
      <circle cx="415" cy="212" r="6" fill="none" stroke="#000" strokeWidth="2" />
      <circle cx="440" cy="212" r="6" fill="none" stroke="#000" strokeWidth="2" />

      <path
        d="M220 250c18-55 60-85 110-85s92 30 110 85"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M265 250c10 26 25 40 65 40s55-14 65-40"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="330" cy="150" r="34" fill="none" stroke="#000" strokeWidth="2" />
      <path
        d="M305 150c8-8 16-12 25-12s17 4 25 12"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />

      <rect
        x="260"
        y="240"
        width="140"
        height="70"
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />
      <path
        d="M275 260h110M275 280h80"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />

      <path
        d="M400 170c30 0 60 15 75 38"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M468 205l-10 8M478 214l-12 2"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="about" className="bg-white scroll-mt-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="text-sm font-medium tracking-tight">Hello, I&apos;m Minh.</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Backend Developer &amp; DevOps Engineer.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-black/80">
            As a senior IT student specializing in backend development and DevOps, I aim to apply my skills in NestJS, Spring Boot, Neo4j, and Docker to build scalable and reliable systems. My long-term goal is to grow into a Senior Backend Engineer.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <IconButton
              href="https://github.com/bnhminh1010"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/b%C3%ACnh-minh-4a953434b/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <IconButton href="mailto:pata10102004@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </IconButton>
            <button
              onClick={() => {
                navigator.clipboard.writeText("0372064929");
                alert("Copied phone number to clipboard!");
              }}
              aria-label="Phone"
              className="inline-flex h-10 w-10 items-center justify-center border border-black bg-transparent text-black transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-black hover:text-white"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="border border-black p-4 sm:p-6">
          <LineArtIllustration />
        </div>
      </div>
    </section>
  );
}

