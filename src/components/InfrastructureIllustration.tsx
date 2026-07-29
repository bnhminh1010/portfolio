export function InfrastructureIllustration() {
  return (
    <svg className="infrastructure-illustration" viewBox="0 0 680 520" role="img" aria-label="Illustration of connected infrastructure services">
      <path className="illustration-grid" d="M0 72h680M0 144h680M0 216h680M0 288h680M0 360h680M0 432h680M85 0v520M170 0v520M255 0v520M340 0v520M425 0v520M510 0v520M595 0v520" />
      <rect x="54" y="76" width="226" height="142" className="illustration-panel" />
      <rect x="74" y="96" width="186" height="24" className="illustration-accent" />
      <path d="M84 148h72M84 174h130M84 198h88" className="illustration-line" />
      <text x="86" y="113" className="illustration-label">CI / CD</text>
      <rect x="390" y="62" width="222" height="196" className="illustration-panel illustration-panel-alt" />
      <rect x="416" y="88" width="170" height="34" className="illustration-fill" />
      <path d="M436 150h132M436 180h104M436 210h142" className="illustration-line" />
      <circle cx="436" cy="150" r="6" className="illustration-dot" />
      <circle cx="436" cy="180" r="6" className="illustration-dot" />
      <circle cx="436" cy="210" r="6" className="illustration-dot" />
      <text x="419" y="112" className="illustration-label">SERVICES</text>
      <path d="M278 146h110" pathLength={1} className="illustration-wire" />
      <path d="M372 132l18 14-18 14" pathLength={1} className="illustration-arrow" />
      <rect x="154" y="332" width="390" height="118" className="illustration-panel" />
      <path d="M190 370h80M320 370h80M450 370h58" className="illustration-line" />
      <circle cx="210" cy="406" r="18" className="illustration-fill" />
      <circle cx="350" cy="406" r="18" className="illustration-accent" />
      <circle cx="490" cy="406" r="18" className="illustration-panel-alt" />
      <path d="M228 406h104M368 406h104" pathLength={1} className="illustration-wire" />
      <text x="190" y="352" className="illustration-label">OBSERVE · PROTECT · DELIVER</text>
      <path d="M500 258v72" pathLength={1} className="illustration-wire" />
      <path d="M486 312l14 18 14-18" pathLength={1} className="illustration-arrow" />
    </svg>
  );
}

export function ArchitectureDiagram({ projectId }: { projectId: "homelab" | "thinkai" }) {
  if (projectId === "homelab") {
    return (
      <svg className="architecture-diagram" viewBox="0 0 720 330" role="img" aria-label="HomeLab architecture diagram">
        <rect x="34" y="112" width="182" height="98" className="diagram-node diagram-node-yellow" />
        <text x="125" y="151" className="diagram-text">PRIVATE</text><text x="125" y="176" className="diagram-text">MESH</text>
        <rect x="269" y="112" width="182" height="98" className="diagram-node diagram-node-teal" />
        <text x="360" y="151" className="diagram-text">PROTECTED</text><text x="360" y="176" className="diagram-text">SERVICES</text>
        <rect x="504" y="112" width="182" height="98" className="diagram-node diagram-node-pink" />
        <text x="595" y="151" className="diagram-text">OPS</text><text x="595" y="176" className="diagram-text">EVIDENCE</text>
        <path d="M216 161h53M451 161h53" pathLength={1} className="diagram-wire" />
        <path d="M246 151l20 10-20 10M481 151l20 10-20 10" pathLength={1} className="diagram-arrow" />
      </svg>
    );
  }

  return (
    <svg className="architecture-diagram" viewBox="0 0 720 330" role="img" aria-label="ThinkAI delivery pipeline diagram">
      <rect x="34" y="112" width="182" height="98" className="diagram-node diagram-node-paper" />
      <text x="125" y="151" className="diagram-text">PULL</text><text x="125" y="176" className="diagram-text">REQUEST</text>
      <rect x="269" y="112" width="182" height="98" className="diagram-node diagram-node-yellow" />
      <text x="360" y="151" className="diagram-text">SECURITY</text><text x="360" y="176" className="diagram-text">GATES</text>
      <rect x="504" y="112" width="182" height="98" className="diagram-node diagram-node-pink" />
      <text x="595" y="151" className="diagram-text">RELEASE</text><text x="595" y="176" className="diagram-text">READY</text>
      <path d="M216 161h53M451 161h53" pathLength={1} className="diagram-wire" />
      <path d="M246 151l20 10-20 10M481 151l20 10-20 10" pathLength={1} className="diagram-arrow" />
    </svg>
  );
}

const projectFlow = {
  homelab: ["Tailscale mesh", "Host agent", "Podman services", "Operations dashboard"],
  thinkai: ["Pull request", "GitHub Actions security checks", "Spring Boot image", "Local Compose deployment"],
} as const;

export function ProjectFlow({ projectId }: { projectId: "homelab" | "thinkai" }) {
  return (
    <ol className="project-flow" aria-label={`${projectId} delivery flow`}>
      {projectFlow[projectId].map((step) => <li key={step}>{step}</li>)}
    </ol>
  );
}
