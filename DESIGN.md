# Soralabs Studio — Design System & Motion Specification (`DESIGN.md`)

> **Phiên bản:** 2.0 (High-Fidelity Specification)  
> **Áp dụng cho:** `/preview-sora` (DevOps & Systems Engineering Portfolio)  
> **Tiêu chuẩn tham chiếu:** `soralabs.studio`, `SoraLabsOSS/skills` (`motion-meaning`, `animating-icons`), `SoraLabsOSS/ui`.

---

## 1. Triết Lý Thiết Kế & Hệ Thống Thị Giác (Visual Philosophy)

Giao diện Soralabs không phải là một landing page thông thường; nó là một **Layered Editorial Experience (Trải nghiệm Tạp chí Điện tử Phân Tầng)**. Sự kết hợp giữa phong cách **Dark-Tech Minimalist** và kỹ thuật **Motion-First** tạo nên cảm giác cao cấp qua 4 trụ cột:

1. **High-Contrast Density (Tương phản Mật độ):** Đan xen giữa các section tối đậm (`#121212`, `#141417`) và các khoang tương phản mạnh (Drawer About màu sáng `#f4f4f5`, ô Stack hover màu trắng rực `#ffffff`).
2. **Typography as Structure (Chữ là Kiến trúc):** Sử dụng các tiêu đề Grotesque siêu lớn (Display XL) kéo dài toàn bộ chiều ngang để định hình cấu trúc trang, kết hợp nhãn Monospace siêu nhỏ (`11px`) để tạo chất kỹ thuật (Engineering Credibility).
3. **12-Column Asymmetric Grid (Lưới 12 Cột Bất Đối Xứng):** Cột định danh (`● Section Label`) luôn nằm riêng biệt ở biên trái, tạo nhịp quét mắt nhất quán khi người dùng cuộn từ trên xuống dưới.
4. **Communicative Motion (Chuyển Động Có Chủ Đích):** Mọi chuyển động phải trả lời được câu hỏi: *"Chuyển động này đóng vai trò gì trong việc đọc và tương tác?"*. Tuyệt đối không dùng chuyển động lắc lư (wiggle) vô nghĩa.

---

## 2. Bảng Token Thiết Kế (Design Tokens)

### 2.1. Bảng Màu (Color Palette)

| Token Name | Hex / CSS Value | Ứng Dụng |
| :--- | :--- | :--- |
| `--sora-bg` | `#121212` | Nền canvas gốc, nền Hero, Footer |
| `--sora-sheet` | `#141417` | Nền các tầng nội dung (Work, Products) |
| `--sora-sheet-alt` | `#111113` | Nền khoang phụ, Tech Stack, Footer Alt |
| `--sora-card-surface` | `#18181c` | Bề mặt card, Bezel laptop mockup |
| `--sora-code-block` | `#161619` | Khối dòng lệnh CLI, terminal snippet |
| `--sora-drawer-bg` | `#f4f4f5` | Nền Modal/Drawer About (Tương phản sáng) |
| `--sora-border` | `rgba(255, 255, 255, 0.08)` | Viền chia section, grid lines |
| `--sora-border-strong`| `rgba(255, 255, 255, 0.22)` | Viền hover, viền trạng thái active |
| `--sora-fg` | `#fcfcfc` | Chữ chính, display headings, logo |
| `--sora-fg-muted` | `#8a8a93` | Chữ diễn giải, monospace labels |
| `--sora-fg-subtle` | `#5a5a63` | Metadata phụ, số thứ tự phân cách |
| `--sora-accent-green` | `#4ade80` | Status dot, verification indicator |

### 2.2. Thang Typography (Typography Scale)

| Level | Size (Clamp / Rem) | Weight | Tracking | Line-Height | Transform | Ứng Dụng |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `clamp(3.4rem, 10.5vw, 9.2rem)` | 800 | `-0.045em` | `0.88` | UPPERCASE | Hero Headline, Slogan CTA, Modern Tech Stack |
| **Display LG** | `clamp(2.4rem, 6vw, 5.5rem)` | 800 | `-0.040em` | `0.92` | UPPERCASE | Section Titles, Footer Navigation Links |
| **Statement** | `clamp(1.5rem, 3.2vw, 2.6rem)` | 600 | `-0.025em` | `1.22` | Normal | Core Statement (Highlight on Scroll) |
| **H3 / Card** | `1.875rem (30px)` – `2.25rem` | 700 | `-0.020em` | `1.15` | Normal | Project Titles, Work Experience Roles |
| **Body LG** | `1.0625rem (17px)` | 300 | `-0.010em` | `1.65` | Normal | Project Summaries, Drawer Bio |
| **Body SM** | `0.875rem (14px)` | 400 | `0` | `1.55` | Normal | 3-Pillar Story details (Problem/Approach/Outcome) |
| **Mono Label**| `0.6875rem (11px)` | 500 | `+0.160em` | `1.00` | UPPERCASE | Metadata tags, `● Products`, `01/02`, CLI headers |

---

## 3. Hệ Thống Lưới & Khoảng Cách (12-Column Grid & Spacing)

### 3.1. Cấu Trúc Lưới 12 Cột (Desktop >= 1024px)
Toàn bộ nội dung nằm trong container `max-w-[1400px] px-6 mx-auto`.

```
[ Col 1-2 ]           [ Col 3-8 ]                      [ Col 9-12 ]
┌──────────────┐   ┌──────────────────────────────┐   ┌──────────────────────┐
│ ● Products   │   │                              │   │ UI ← 01/02           │
│              │   │   Large Mockup / Media       │   │ Project Title        │
│ 01/02        │   │   with Inset Parallax        │   │ 3-Pillar Story       │
│              │   │                              │   │ CLI Box & Buttons    │
└──────────────┘   └──────────────────────────────┘   └──────────────────────┘
(2 Cols - 16.6%)          (6 Cols - 50.0%)               (4 Cols - 33.3%)
```

### 3.2. Nhịp Khoảng Cách (Vertical Rhythm)
- **Section Spacing:** `py-28` (112px) đến `py-36` (144px) đối với các sheet lớn.
- **Section Gap:** `space-y-16` (64px) giữa các khối nội dung lớn.
- **Card Padding:** `p-8` (32px) cho Work cards; `p-5` cho Laptop Mockup bezel.

---

## 4. Đặc Tả Hệ Thống Chuyển Động (Layered Motion Specification)

### 4.1. Bảng Easing & Timing Curve Chuẩn

```ts
export const SORA_EASE = {
  luxury: [0.16, 1, 0.3, 1] as const,     // Easing mượt mà cho reveal, trượt mở, transition chính
  snappy: [0.19, 1, 0.22, 1] as const,    // Easing nhanh dứt khoát cho button hover, pill sweep
  entrance: [0.25, 1, 0.5, 1] as const,   // Easing tự nhiên cho element trượt vào tầm nhìn
};
```

---

### 4.2. Chi Tiết Từng Lớp Chuyển Động (Motion Layers)

#### Lớp 1: Ambient Visual Motion (Canvas Nền)
- **Component:** `WaveHalftoneCanvas` / `HalftoneBanner`
- **Vị trí:** Hero section và CTA kết màn.
- **Cơ chế:** Render bằng Canvas 2D/WebGL trực tiếp trên GPU. Các hạt halftone biến đổi vị trí theo hàm sóng Sin kết hợp độ lệch con trỏ chuột (`mouse position lerp factor: 0.05`).
- **FPS Target:** 120 FPS / không gây jank luồng DOM chính.
- **Reduced Motion:** Ngừng vòng lặp requestAnimationFrame, vẽ 1 frame tĩnh với độ mờ dịu.

#### Lớp 2: Typography Mask Reveal (Tiêu đề & Nhãn)
- **Component:** `MaskedTextReveal`
- **Vị trí:** Eyebrow, H1, H2, Tiêu đề section.
- **Cơ chế:** Wrap từng dòng/từ trong `span` có `overflow: hidden; display: block;`. 
- **Animation:** `initial: { y: "100%", opacity: 0 } -> whileInView: { y: "0%", opacity: 1 }`.
- **Timing:** Duration `0.9s`, Ease `[0.16, 1, 0.3, 1]`, Stagger dòng `0.12s`.
- **Reduced Motion:** Hiển thị tức thì (`y: "0%", opacity: 1, duration: 0`).

#### Lớp 3: Scroll-Driven 3D Perspective Roll (Chữ Khổng Lồ Cuộn Xoay)
- **Component:** `ScrollRollText`
- **Vị trí:** `RELIABLE / DELIVERY`, `MODERN / TECH STACK`, `RELIABLE SYSTEMS YOU OWN → SHIP`.
- **Cơ chế:** Tách mỗi dòng thành 2 nửa bằng `clipPath: inset(0 0 50% 0)` (nửa trên) và `clipPath: inset(50% 0 0 0)` (nửa dưới).
- **Interpolation:** Gắn với `scrollYProgress` qua `useTransform`:
  - Nửa trên xoay quanh trục `bottom center` từ `-90deg -> 0deg -> 90deg`.
  - Nửa dưới xoay quanh trục `top center` từ `90deg -> 0deg -> -90deg`.
  - Perspective: `1200px`. Độ sâu Z: `-200px -> 0px -> -200px`.
- **Reduced Motion:** Tắt biến đổi 3D, hiển thị text phẳng căn giữa.

#### Lớp 4: Scroll Progress Text Highlight (Đoạn Tuyên Ngôn)
- **Component:** `HighlightOnScroll`
- **Vị trí:** Large Statement Section.
- **Cơ chế:** Tách câu thành mảng từ. Tính toán dải cuộn từ `start: "80%"` đến `end: "40%"`.
- **Interpolation:** Mỗi từ `i` sáng từ `opacity: 0.2` lên `opacity: 1.0` khi tiến trình đạt khoảng `[i / total, (i + 1) / total]`.
- **Reduced Motion:** Toàn bộ từ có `opacity: 1.0` cố định.

#### Lớp 5: Sequence & Chapter Carousel (Product Showcase)
- **Component:** `ProjectSequence`
- **Vị trí:** Products Section.
- **Cơ chế:** State Transition giữa các chapter dự án.
- **Transitions:** `AnimatePresence mode="wait"` với animation `x: 20 -> 0`, `opacity: 0 -> 1` (Duration `0.5s`).
- **Tự động hóa:** Tích hợp bộ đếm `5s` tự chuyển slide; hiển thị thanh progress bar mượt mà chạy từ `0% -> 100%`; tạm dừng (Pause) ngay khi người dùng rê chuột vào vùng card.
- **Reduced Motion:** Bỏ slide X, dùng crossfade opacity `0 -> 1` trong `0.15s`.

#### Lớp 6: Media Mask & Parallax Inset (Khung Ảnh & Mockup)
- **Component:** `ProductMockup` / `MediaMask`
- **Vị trí:** Mockup laptop, hình ảnh minh họa case study.
- **Cơ chế:**
  - Container reveal: `clipPath: inset(20% 0 20% 0) -> inset(0% 0 0% 0)` (Duration `1.2s`, Ease `[0.16, 1, 0.3, 1]`).
  - Inner Parallax: Media bên trong scale `1.05` và di chuyển `y: -30px -> +30px` ngược chiều cuộn chuột.
- **Reduced Motion:** Bỏ parallax, container hiển thị ở `clipPath: inset(0)`.

#### Lớp 7: Interactive Micro-Gestures & Buttons
- **Component:** `SoraButton`, `TechLogos`
- **Nguyên tắc Soralabs OSS:** "Chuyển động là ý nghĩa của chính đối tượng tác động lên nó".
  - **Button:** Lớp phủ ánh sáng `mix-blend-overlay` quét từ dưới lên `y: 100% -> 0%`. Text nhấc nhẹ `y: -1px`.
  - **Directional Arrow:** Mũi tên tiến về trước `x: +4px` (Không rung lắc, không xoay góc giả tạo).
  - **Tech Stack Tiles:** Khi hover, màu nền đảo nghịch từ đen sang trắng rực (`bg-white text-black`), nâng nổi `y: -2px`, đổ bóng `shadow-xl`.

#### Lớp 8: Overlay / Modal State Transition (About Drawer)
- **Component:** `AboutDrawer`
- **Vị trí:** Global overlay kích hoạt từ Nav hoặc Footer.
- **Cơ chế:**
  - Backdrop: Fade `opacity: 0 -> 0.6`.
  - Drawer Panel: Spring sliding `x: 100% -> 0%` (`damping: 28, stiffness: 260`).
  - Internal Stagger: Các mục Bio, Principles, Tech Matrix xuất hiện so le.
  - Phím bấm `ESC` và Click Outside tự động đóng; khoá cuộn màn hình nền (`overflow: hidden`).

---

## 5. Quy Chuẩn Tuân Thủ Reduced Motion (WCAG & SoraLabs OSS)

Toàn bộ component phải triển khai đúng 4 chiến lược theo tài liệu `motion-meaning`:

| Chiến Lược | Áp Dụng Cho | Biểu Hiện Dưới Reduced Motion |
| :--- | :--- | :--- |
| **1. Bail** | Ambient Canvas, Parallax Layers, Glow Blurs | Hiệu ứng biến mất hoặc đứng yên, giải phóng tài nguyên GPU |
| **2. Snap to end state** | `ScrollRollText`, `HighlightOnScroll`, Typography Reveal | Văn bản hiển thị đầy đủ ở trạng thái cuối cùng, không lửng lơ |
| **3. Collapse transition** | `SoraButton` sweep, Tab switches, `ProjectSequence` | Chuyển đổi trạng thái ngay lập tức (`duration: 0.01ms`) |
| **4. Reduce complexity** | `WaveHalftoneCanvas` | Giảm mật độ particle, tắt auto-drift |

---

## 6. Tiêu Chí Nghiệm Thu Điểm 10/10

1. **Về Layout:** Tỉ lệ lưới 12 cột chuẩn xác trên màn hình `>= 1024px`, responsive hoàn hảo trên Mobile (`< 768px`) và Tablet (`768px - 1023px`).
2. **Về Typography:** Chữ tiêu đề lớn có độ nén kerning chuẩn grotesque, không có lỗi rớt từ cụt ngủn.
3. **Về Motion:** Chuyển động mượt mà 60–120 FPS, không gây Layout Shifts (CLS = 0), không gây lag CPU.
4. **Về UX:** Khả năng truy cập bàn phím đầy đủ, mở đóng Drawer About mượt mà, copy dòng lệnh CLI trơn tru.
