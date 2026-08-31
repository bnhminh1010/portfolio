export function GlobalOpsField() {
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
