# Sora Studio Motion Redesign — Implementation Plan

> **For Hermes:** Use subagent-driven-development to implement this plan task-by-task.

**Goal:** Chuyển portfolio (`/preview-sora`) về đúng chất UI/UX soralabs.studio — trọng tâm là *motion đẹp và tối ưu* theo đúng hệ thống chuyển động thật mà Sora dùng (đã nghiên cứu từ source + repo).

**Architecture:** Giữ nguyên cấu trúc nội dung/case study hiện có. Chỉ thay *lớp vỏ*: thu palette về monochrome (đen/trắng/xám + 1 accent), chuẩn hóa toàn bộ motion dùng chung 1 token easing/duration, bỏ mọi glow/mesh đa màu/thứ không có trong Sora thật. Motion nằm trong `src/lib/motion.ts` (token) + `src/components/motion/*` (primitives) + class CSS trong `sora.css`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion@13` (framer-motion), lucide-react, TypeScript.

---

## A. Sự thật về motion Sora (đã verify, dùng làm chuẩn)

### Easing — họ dùng 4 bậc (từ repo Sora UI thật)

| Easing (cubic-bezier) | Ý nghĩa | Dùng cho |
|---|---|---|
| `[0.22, 1, 0.36, 1]` | easeOutCubic chuẩn "Sora" | reveal, fade, vị trí |
| `[0.16, 1, 0.3, 1]` | easeOutExpo (sạch nhất) | hero chữ lớn, scroll | 
| `[0.19, 1, 0.22, 1]` | easeOutQuint (tuyến tính cup) | menu, modal |
| `[0.32, 0.72, 0, 1]` | back-out | điểm nhấn, card |

**Chú ý:** Sora KHÔNG ưu tiên spring (dữ liệu grep: 0 dòng spring). Họ dùng **duration tĩnh + cubic-bezier**. Nên bỏ mọi `type:"spring"` — không phải chất của họ.

### Duration — phân phối thật

Thiên về ngắn → vừa: **0.2 / 0.25 / 0.3 / 0.5s** là nhóm chính (10-13 lần). Hiếm khi quá 0.9s (trừ marquee/long). Với reduced-motion, `duration:0`.

### Kỹ thuật motion đặc trưng (từ source thật)

1. **Hero chữ khổng lồ reveal theo ký tự + mask** — mỗi ký tự `overflow:hidden` + mặt nạ cuộn lên từ dưới (`.hero_sora_char_inner`). En/fr ký tự.
2. **Transition screen** — fullscreen `#121212` fade khi đổi section (`.transition_screen` `z-index:2147483647`).
3. **Halftone + noise** — `radial-gradient(circle,...)` dot matrix + `mix-blend-mode:multiply` + noise overlay `steps(6,end)`. Là DNA thị giác.
4. **Tech-stack letter scroll** — chữ cuộn dọc vô tận `.letter_slot` + `.letter_duplicate`.
5. **Cursor bubble** — theo `data-cursor` state (active/edge), `clip-path` reveal + ease.
6. **Footer đồng hồ realtime** — giờ/phút/giây + date + location.
7. **Counter động**, **divider mảnh** (1px xám), **index "01/03" + arrow text nav**.

### Quần áo màu (verify vision): gần như KHÔNG màu
Nền `#0a0a0a`/`#111111`/`#19171c`, chữ `#fcfcfc`, xám muted `#8a8a93`. Điểm nhấn = **Next.js logo card nền trắng** (contrast bằng hình, không màu). KHÔNG có cam/đỏ/tím/xanh neon.

---

## B. Các bước sửa lỗi chặn TRƯỚC (phải làm để chạy được)

### Task 1: Sửa lỗi build TextScramble.tsx (polymorphic ref type)

**Files:**
- Modify: `src/app/preview-sora/TextScramble.tsx`

**Vấn đề:** `Component` là union `"span"|"div"|"h1"|...`, khai `useRef<HTMLElement>` và `<Component ref={ref}>` → TS không hòa giải ref span vs div.

**Fix:** Dùng `useRef<any>(null)` cho ref (chấp nhận union), hoặc bỏ `ref` ở component polymorphic và dùng `forwardRef` tách riêng. Đơn giản nhất:

```tsx
const ref = useRef<HTMLSpanElement | null>(null);
```
rồi cast khi gắn:
```tsx
<Component ref={ref as any} className={className} {...props}>
```

**Verify:** `npm run typecheck && npm run build` → pass.

### Task 2: Sửa lint error motion.ts (setState sync trong effect)

**Files:**
- Modify: `src/lib/motion.ts` (dòng ~14)

**Vấn đề:** `react-hooks/set-state-in-effect` — `setReducedMotion(mediaQuery.matches)` gọi sync trong effect body.

**Fix (pattern anh đã dùng chuẩn ở ThemeContext — dùng `useSyncExternalStore`):**

```ts
import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getServerSnapshot() {
  return false;
}
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

**Verify:** `npm run lint` → 0 error.

---

## C. Thu về đúng chất Sora (monochrome + bỏ neon)

### Task 3: Rewrite sora.css token — bỏ 5 accent, giữ 1 accent + monochrome

**Files:**
- Modify: `src/app/preview-sora/sora.css`

**Thay đổi:** Sửa block `:root` (dark default):
- Bỏ `--sora-accent-cyan/emerald/purple/amber/pink` cũ → thay bằng 1 trong các token sau (chọn theo nội dung DevOps):

```css
--sora-accent: #fb460d;      /* vermilion (accent chính, như Sora) */
--sora-bg: #19171c;          /* xám-đen phớt tím ấm (thật từ pixel) */
--sora-bg-2: #0a0a0a;        /* section CTA/footer tối hơn */
--sora-bg-card: #181818;     /* hover card tối nhưng nhẹ hơn nền */
--sora-fg: #fcfcfc;
--sora-muted: #8a8a93;
--sora-border: rgba(255,255,255,0.08);
--sora-surface: #18181c;
--sora-surface-hover: #222226;
--sora-shadow: 0 10px 40px rgba(0,0,0,0.5);
```

**Xóa:** `.sora-mesh-bg` (mesh đa màu), `.sora-card-glow` (gradient neon border), `--sora-glow-*`.

**Thay thế bằng:** `.sora-halftone` (dot matrix) + `.sora-noise` (giữ nguyên).

### Task 4: Chuẩn hóa ease/duration trong src/lib/motion.ts

**Files:**
- Modify: `src/lib/motion.ts`

**Sửa** `defaultTransition` thành bộ easing Sora:
```ts
export const EASE = {
  outCubic: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
  outQuint: [0.19, 1, 0.22, 1],
  backOut: [0.32, 0.72, 0, 1],
};
export const defaultTransition = { duration: 0.3, ease: EASE.outCubic };
```
Xóa mọi `type:"spring"`, thay bằng `EASE.*`. Giảm duration trudng (`slideUp y:30` → `y:0` dùng outExpo).

### Task 5: Cập nhật page.tsx — bỏ accent theo project, dùng token mới

**Files:**
- Modify: `src/app/preview-sora/page.tsx`

- `ProductMockup`: hiện `type==="homelab" ? cyan : emerald` glow → **bỏ glow**, nền `#18181c`, điểm nhấn duy nhất là logo trắng.
- `text-cyan-400`/`text-emerald-400` trong ArchitectureModal/TerminalDrawer → giữ **một** semantic color cho "success/verified" (emerald) hoặc đơn sắc trắng. Chọn 1, không đổi trong mọi nơi.
- Bỏ `bg-cyan-*` các tab label.

---

## D. Triển khai motion "đúng chất Sora" còn thiếu

### Task 6: Hero chữ ký tự reveal có mask (component mới)

**Files:**
- Create: `src/components/motion/RevealByChar.tsx`
- Modify: `src/app/preview-sora/page.tsx` hero

Component: mỗi ký tự trong `overflow:hidden` wrapper, `whileInView` nâng `y: 1.2em→0` với `EASE.outExpo`, stagger 0.03s. Render "RELIABLE" / "DELIVERY" thành 2 dòng ký tự.

### Task 7: Transition screen giữa section

**Files:**
- Create: `src/components/motion/SectionTransition.tsx` hoặc lazy
- Dùng `AnimatePresence` + fullscreen `#0a0a0a` fade 0.5s outExpo khi scroll qua section mốc (hero→work, etc.).

### Task 8: Tech-stack marquee dọc kiểu letter scroll

**Files:**
- Create: `src/components/sora/TechStackMarquee.tsx`
- Dùng `.sora-marquee-track` + duplicate, `transform: translateY` vô tận, `prefers-reduced-motion` → đứng yên.

### Task 9: Footer đồng hồ realtime + location (đã có code time, tinh chỉnh)

**Files:**
- Modify: `src/app/preview-sora/page.tsx` footer
- Đã có `time` state + `Asia/Ho_Chi_Minh`. Bổ sung date "MON, AUG 31" style + location "Based in Vietnam · Remote-first". Đổi accent về mono.

### Task 10: Verify reduced-motion toàn cục

- Đảm bảo mọi component dùng `getVariantsWithReducedMotion` hoặc `useReducedMotion`.
- `prefers-reduced-motion: reduce` → marquee/halftone-scroll/hover off, nhưng **content vẫn hiện** (không nuke). Kiểm tra 2 trạng thái OS.

---

## E. Final verification

```bash
npm run typecheck   # pass
npm run lint        # 0 error
npm run build       # pass
npm run test:smoke  # playwright pass (nếu có spec)
```

Manual: `npm run dev` → mở `/preview-sora`: kiểm hero reveal, transition, marquee, footer clock, `⌘⇧P` emulate reduced motion.

---

## Thứ tự thực thi đề xuất

1. **Task 1-2** (sửa build/lint) — để chạy được bản hiện tại.
2. **Task 3-5** (monochrome + ease token) — thay áo, trước.
3. **Task 6-9** (motion mới) — sau khi áo ổn.
4. **Task 10** (verify reduced-motion) + build.

> Một lựa chọn cần anh quyết định trước Task 5: **accent "success/verified" nên giữ emerald (đọc như health/monitor, hợp DevOps) hay chuyển về trắng/vermilion (đúng Sora tuyệt đối)?** Em mặc định giữ **1 emerald cho trạng thái ok + 1 vermilion cho accent** nếu anh muốn vừa chuẩn Sora vừa hợp chất hệ thống, nhưng chờ anh chốt.