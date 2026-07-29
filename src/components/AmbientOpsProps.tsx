type AmbientScene = "hero" | "work" | "experience" | "skills" | "education";

type AmbientOpsPropsProps = {
  scene: AmbientScene;
};

const labels: Record<AmbientScene, { large: string; packet: string; micro: string }> = {
  hero: { large: "K8S RELEASE PATH", packet: "BUILD → SIGN → SHIP", micro: "HEALTH" },
  work: { large: "TAILSCALE MESH", packet: "TLS → OBSERVE", micro: "SLO" },
  experience: { large: "SECURITY GATE", packet: "CODEQL → RELEASE", micro: "CSRF" },
  skills: { large: "PLATFORM TOOLCHAIN", packet: "PODMAN → K3S", micro: "ARGO" },
  education: { large: "SYSTEMS PRACTICE", packet: "LEARN → SHIP", micro: "GIT" },
};

function SceneLarge({ scene, label }: { scene: AmbientScene; label: string }) {
  if (scene === "hero") {
    return (
      <g className="ambient-prop ambient-prop-large">
        <path d="m58 146 96-31 49 37-98 34Z" className="ambient-paper" />
        <path d="m58 146 47 40v110l-47-38Z" className="ambient-teal" />
        <path d="m105 186 98-34v110l-98 34Z" className="ambient-pink" />
        <path d="M124 201h56M124 226h42M124 251h56" className="ambient-line" />
        <text x="116" y="176" className="ambient-label">PODMAN</text>
        <path d="M219 208h78m-14-16 16 16-16 16" className="ambient-line" />
        <path d="m318 116 92-27 43 34-93 30Z" className="ambient-paper" />
        <path d="m318 116 42 37v92l-42-34Z" className="ambient-yellow" />
        <path d="m360 153 93-30v92l-93 30Z" className="ambient-teal" />
        <path d="M377 170h55M377 193h37" className="ambient-line" />
        <text x="374" y="145" className="ambient-label">CI/CD</text>
        <path d="m506 236 69-19 35 28-70 21Z" className="ambient-paper" />
        <path d="m506 236 34 30v70l-34-29Z" className="ambient-pink" />
        <path d="m540 266 70-21v70l-70 21Z" className="ambient-yellow" />
        <path d="M529 282h56M529 304h45" className="ambient-line" />
        <text x="533" y="259" className="ambient-label">K3S</text>
        <path d="M462 174c0-18 16-30 38-30s38 12 38 30-16 30-38 30-38-12-38-30Zm0 0v52c0 18 16 30 38 30s38-12 38-30v-52" className="ambient-line" />
        <text x="466" y="179" className="ambient-label">POSTGRES</text>
        <text x="83" y="328" className="ambient-label">{label}</text>
      </g>
    );
  }

  if (scene === "work") {
    return (
      <g className="ambient-prop ambient-prop-large">
        <path d="m66 126 83-31 61 35-85 34Z" className="ambient-paper" />
        <path d="m66 126 59 38v108l-59-36Z" className="ambient-teal" />
        <path d="m125 164 85-34v108l-85 34Z" className="ambient-pink" />
        <path d="M136 180h52M136 204h52M136 228h38" className="ambient-line" />
        <path d="M210 178 314 126M210 214l104 3M210 242l104 55" className="ambient-line" />
        <circle cx="336" cy="116" r="24" className="ambient-yellow" />
        <circle cx="336" cy="218" r="24" className="ambient-paper" />
        <circle cx="336" cy="314" r="24" className="ambient-teal" />
        <path d="M360 116h50M360 218h50M360 314h50" className="ambient-line" />
        <text x="86" y="153" className="ambient-label">TAILSCALE</text>
        <text x="370" y="120" className="ambient-label">HOST</text>
        <text x="370" y="222" className="ambient-label">SLO</text>
        <text x="370" y="318" className="ambient-label">TLS</text>
      </g>
    );
  }

  if (scene === "experience") {
    return (
      <g className="ambient-prop ambient-prop-large">
        <path d="m60 119 72-28 45 31-74 31Z" className="ambient-paper" />
        <path d="m60 119 43 34v98l-43-31Z" className="ambient-yellow" />
        <path d="m103 153 74-31v99l-74 30Z" className="ambient-teal" />
        <path d="M198 169h66M198 218h66M264 169l-13-13m13 13-13 13M264 218l-13-13m13 13-13 13" className="ambient-line" />
        <path d="m282 125 72-29 45 32-74 30Z" className="ambient-paper" />
        <path d="m282 125 43 33v98l-43-32Z" className="ambient-pink" />
        <path d="m325 158 74-30v97l-74 31Z" className="ambient-yellow" />
        <path d="m404 125 42 43 77-82" className="ambient-line" />
        <text x="73" y="148" className="ambient-label">GITHUB ACTIONS</text>
        <text x="293" y="151" className="ambient-label">CODEQL</text>
      </g>
    );
  }

  if (scene === "skills") {
    return (
      <g className="ambient-prop ambient-prop-large">
        <path d="m56 126 75-23 34 28-77 25Z" className="ambient-paper" />
        <path d="m56 126 32 30v69l-32-27Z" className="ambient-teal" />
        <path d="m88 156 77-25v70l-77 24Z" className="ambient-yellow" />
        <path d="m190 105 75-23 34 28-77 25Z" className="ambient-paper" />
        <path d="m190 105 32 30v69l-32-27Z" className="ambient-pink" />
        <path d="m222 135 77-25v70l-77 24Z" className="ambient-teal" />
        <path d="m324 154 75-23 34 28-77 25Z" className="ambient-paper" />
        <path d="m324 154 32 30v69l-32-27Z" className="ambient-yellow" />
        <path d="m356 184 77-25v70l-77 24Z" className="ambient-pink" />
        <text x="77" y="187" className="ambient-label">GO</text>
        <text x="208" y="166" className="ambient-label">PODMAN</text>
        <text x="340" y="214" className="ambient-label">ARGO</text>
      </g>
    );
  }

  return (
    <g className="ambient-prop ambient-prop-large">
      <path d="M82 106 238 72l72 54-160 40Z" className="ambient-paper" />
      <path d="m82 106 148 60v142L82 246Z" className="ambient-teal" />
      <path d="m230 166 80-40v143l-80 39Z" className="ambient-pink" />
      <path d="M111 138 202 116l54 39-93 24Z" className="ambient-yellow" />
      <path d="M112 202h83M112 230h61M112 258h84" className="ambient-line" />
      <circle cx="265" cy="186" r="10" className="ambient-yellow ambient-led" />
      <circle cx="265" cy="219" r="10" className="ambient-paper ambient-led" />
      <text x="118" y="161" className="ambient-label">GIT · LINUX · DEPLOY</text>
    </g>
  );
}

export function AmbientOpsProps({ scene }: AmbientOpsPropsProps) {
  const label = labels[scene];

  return (
    <div data-motion data-ambient-scene={scene} className={`ambient-ops ambient-ops-${scene}`} aria-hidden="true">
      <svg className="ambient-ops-main" viewBox="0 0 760 420" focusable="false">
        <SceneLarge scene={scene} label={label.large} />

        <g className="ambient-prop ambient-prop-medium">
          <path d="m458 62 100-25 55 42-102 28Z" className="ambient-paper" />
          <path d="m458 62 53 45v106l-53-41Z" className="ambient-yellow" />
          <path d="m511 107 102-28v108l-102 26Z" className="ambient-teal" />
          <path d="m533 111 51-14v46l-51 12Z" className="ambient-pink" />
          <path d="M526 169h62" className="ambient-line" />
          <text x="527" y="135" className="ambient-label">K3S POD</text>
        </g>

        <g className="ambient-prop ambient-prop-packet">
          <path d="m380 278 129-31 53 35-129 33Z" className="ambient-paper" />
          <path d="m380 278 53 37v51l-53-38Z" className="ambient-yellow" />
          <path d="m433 315 129-33v51l-129 33Z" className="ambient-pink" />
          <text x="448" y="333" className="ambient-label">{label.packet}</text>
        </g>

        <g className="ambient-prop ambient-prop-micro">
          <path d="m642 182 46-12 27 23-48 14Z" className="ambient-paper" />
          <path d="m642 182 25 25v47l-25-24Z" className="ambient-teal" />
          <path d="m667 207 48-14v48l-48 13Z" className="ambient-yellow" />
          <circle cx="690" cy="217" r="7" className="ambient-pink ambient-led" />
          <text x="671" y="239" className="ambient-label">{label.micro}</text>
        </g>

        <g className="ambient-prop ambient-prop-micro">
          <path d="M318 92h92M364 58v70" className="ambient-line" />
          <circle cx="364" cy="92" r="25" className="ambient-paper" />
          <circle cx="364" cy="92" r="9" className="ambient-pink ambient-led" />
        </g>

        <g className="ambient-prop ambient-prop-micro">
          <path d="m625 325 48-13 31 25-49 14Z" className="ambient-paper" />
          <path d="m625 325 30 26v27l-30-26Z" className="ambient-pink" />
          <path d="m655 351 49-14v28l-49 13Z" className="ambient-teal" />
        </g>
      </svg>
      <svg className="ambient-ops-satellite" viewBox="0 0 250 190" focusable="false">
        <g className="ambient-prop ambient-prop-packet">
          <path d="m22 62 96-24 42 29-96 25Z" className="ambient-paper" />
          <path d="m22 62 42 30v42L22 104Z" className="ambient-pink" />
          <path d="m64 92 96-25v42l-96 25Z" className="ambient-yellow" />
          <text x="80" y="109" className="ambient-label">{label.packet}</text>
        </g>
        <g className="ambient-prop ambient-prop-micro">
          <path d="m166 34 43-11 24 20-44 13Z" className="ambient-paper" />
          <path d="m166 34 23 22v42l-23-21Z" className="ambient-teal" />
          <path d="m189 56 44-13v42l-44 13Z" className="ambient-pink" />
          <circle cx="209" cy="67" r="6" className="ambient-yellow ambient-led" />
        </g>
        <g className="ambient-prop ambient-prop-micro">
          <path d="M126 143h58M155 114v58" className="ambient-line" />
          <circle cx="155" cy="143" r="16" className="ambient-paper" />
          <circle cx="155" cy="143" r="6" className="ambient-teal ambient-led" />
        </g>
      </svg>
    </div>
  );
}
