# Design — Binh Minh DevOps Portfolio

A locked system for the recruiter-facing portfolio.

## Genre and structure

- Genre: technical editorial with a controlled brutalist edge.
- Marketing page: Split Studio — alternating evidence and explanation, led by real project work.
- Project evidence: labelled architecture and pipeline diagrams live beside each case study and are always marked as demonstrations.
- Navigation: brutal slab buttons; compact on mobile.
- Footer: one clear pink contact close, followed by a full-width black copyright band.

## Tokens

- Paper: warm off-white.
- Ink: near-black.
- Accent: safety yellow, used as the main action and emphasis.
- Supporting accents: infrastructure teal and deployment pink, used only for labelled evidence.
- Display: self-hosted Barlow Condensed (400/700/800), with a system condensed fallback. Body: system sans stack. Labels: system mono stack.
- Type hierarchy: role-first hero copy is capped at 4.75rem; section titles at 3.6rem; project titles at 2.9rem. Headings use a 0.94 line-height, while body copy stays at 1.5+ for reading comfort.
- Rhythm: section intros use a separate number rail and a single stacked copy column. Major sections use responsive 3.75–5.25rem vertical spacing; the Experience-to-Skills transition uses one intentional gap rather than stacked section margins.
- Borders: primary evidence and calls to action use 3px ink borders with a 7px offset. Supporting cards use 2px borders with a 3px offset; buttons use a 4px offset. No blur.

## Interaction and accessibility

- Motion is layered: every section reveals once on actual viewport entry, in the order heading → evidence block → internal object/detail. Project diagrams draw their links and nodes while case-study rows, stack tags and actions stage in separately; Experience, Skills and recognition follow the same readable sequence. Motion stays within 250–600ms, moves no more than 1.25rem and uses transform/opacity only.
- Ambient props are semantic-free, `aria-hidden` isometric SVG sketches of actual delivery concerns: Kubernetes pods, CI runners, Tailscale mesh links, Podman/K3s/Argo delivery pieces, PostgreSQL backup and security gates. The desktop canvas keeps only two low-opacity edge props with a subtle scroll impulse; Work remains a clean white reading surface. Section stages retain their own layered props, entering sequentially before their restrained idle motion begins. Compact layouts remove global props, while reduced motion removes every ambient layer.
- Sticky navigation measures its own rendered height and reserves that exact offset plus breathing room, so anchor targets never begin under the header. The header gains only a restrained shadow/tint after scrolling.
- Hover states are enabled only on hover-capable devices. All actionable controls have a 44px minimum target and an active pressed state.
- Desktop diagrams are replaced by a semantic, readable step flow below 560px rather than shrinking SVG labels below legible size.
- `prefers-reduced-motion` keeps all content visible, stops the marquee and removes spatial motion.
- Buttons and links always have a visible focus ring.
- Video previews are user initiated in a keyboard-accessible dialog; no autoplay or sound on page load.
- Every screen recording must use demo data and redact addresses, tokens, identity and internal URLs.

## Content rules

- The CV is the source of truth for personal information, experience, education, skills and stated outcomes. Repository history explains the technical problem and engineering decision behind those outcomes.
- Project claims use a private provenance record: CV outcome plus directly authored repository evidence; integration-only merges do not imply sole implementation ownership.
- The public portfolio never presents mocked telemetry as live production information.
