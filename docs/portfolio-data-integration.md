# Phase 8: Tích Hợp Portfolio Dữ Liệu Thật

Mục tiêu: Hiển thị trạng thái hệ thống (uptime, metrics, logs) trên Portfolio mà không làm lộ thông tin nhạy cảm hoặc tạo rủi ro bảo mật (Zero Trust boundary).

## 1. Nguyên Tắc Thiết Kế (Data Flow)

**Luồng Dữ Liệu (Read-only):**
```text
Portfolio (Vercel) -> ThinkAI Backend API (Read-only / Aggregate) -> Database / Redis / Prometheus
```
- **Không** cho phép Portfolio gọi trực tiếp Database.
- **Không** cho phép Portfolio gọi trực tiếp Prometheus / Grafana.
- **Không** tiết lộ token/secret của hệ thống quản trị trên trình duyệt của người dùng.

---

## 2. API Cần Tạo Trên ThinkAI Backend

Backend cần cung cấp các endpoint công khai dành riêng cho Portfolio.

### 2.1 GET /api/public/system/status
Trả về trạng thái hoạt động của hệ thống.
```json
{
  "status": "UP",
  "components": {
    "database": "UP",
    "cache": "UP",
    "storage": "UP"
  },
  "uptime_seconds": 345600,
  "response_time_ms": 45
}
```

### 2.2 GET /api/public/system/metrics
Dữ liệu tổng hợp để hiển thị trên Portfolio (Cần cache Redis 5 phút).
```json
{
  "total_users": 1542,
  "active_courses": 45,
  "total_enrollments": 8900,
  "ai_requests_processed": 15420
}
```

---

## 3. Cấu Hình Bảo Mật (Cloudflare & API)

Để bảo vệ API khỏi DDoS khi public:

### 3.1 Rate Limiting (Cloudflare)
- Tạo rule Rate Limiting: `Path: /api/public/*`
- Giới hạn: `100 requests / 1 minute`
- Action: `Challenge` (CaptCha) nếu vượt ngưỡng.

### 3.2 CORS & Security Headers (Spring Boot)
Cấu hình trong `SecurityConfig.java`:
```java
corsConfiguration.setAllowedOrigins(List.of("https://binhminh.dev", "https://portfolio.binhminh.dev"));
corsConfiguration.setAllowedMethods(List.of("GET"));
// Chỉ allow GET cho public endpoints
```

---

## 4. Tích hợp Grafana Dashboard (Tùy Chọn)

Nếu muốn nhúng biểu đồ (CPU, RAM, Requests) trực tiếp vào Portfolio bằng iframe.

**Bước 1:** Cấu hình Grafana (`values.yaml` của Helm chart):
```yaml
grafana:
  grafana.ini:
    security:
      allow_embedding: true
    auth.anonymous:
      enabled: true
      org_role: Viewer
```

**Bước 2:** Lấy link iframe từ Grafana Dashboard (Share -> Embed).

**Bước 3:** Nhúng vào React/Next.js Portfolio:
```jsx
<iframe 
  src="https://grafana.thinkai.id.vn/d-solo/xxx/dashboard?orgId=1&panelId=2" 
  width="100%" 
  height="200" 
  frameBorder="0"
/>
```
*Cảnh báo: Cách này public biểu đồ ra ngoài. Hãy tạo một dashboard riêng chỉ chứa các metrics an toàn (không có PII, không có business metrics nhạy cảm).*

---

## 5. Quy trình Thực Hiện (Checklist)

1. [ ] **Backend:** Tạo `PublicStatsController.java` với các endpoint read-only.
2. [ ] **Backend:** Implement Redis caching (TTL 5 phút) cho các endpoint này để tránh db load.
3. [ ] **Backend:** Cấu hình CORS chặt chẽ cho domain Portfolio.
4. [ ] **Cloudflare:** Thêm Rate Limiting rule cho `/api/public/*`.
5. [ ] **Grafana (Optional):** Cấu hình `allow_embedding` và tạo public dashboard.
6. [ ] **Portfolio:** Tích hợp SWR/React Query để fetch và hiển thị dữ liệu.