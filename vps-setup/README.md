# Monitoring Stack Setup for VPS

## Files trong thư mục này

```
vps-setup/
├── docker-compose.yml      # Main Docker Compose file
├── prometheus.yml          # Prometheus config
├── loki-config.yml         # Loki config
├── tempo-config.yml        # Tempo config (distributed tracing)
└── promtail-config.yml    # Promtail config (log scraping)
```

## Cách chạy trên VPS

### Bước 1: Copy files vào VPS
```bash
scp -r ./vps-setup user@your-vps-ip:~/
```

### Bước 2: SSH vào VPS và chạy
```bash
ssh user@your-vps-ip
cd ~/vps-setup
docker compose up -d
```

### Bước 3: Kiểm tra services
```bash
docker compose ps
# Hoặc
docker ps
```

### Bước 4: Truy cập các services

| Service | URL | Default Login |
|---------|-----|---------------|
| Prometheus | http://your-vps-ip:9090 | - |
| Grafana | http://your-vps-ip:3000 | admin / admin123 |
| Loki | http://your-vps-ip:3100 | - |
| Tempo | http://your-vps-ip:3200 | - |

## Cloudflare Tunnel (Optional)

Để expose ra ngoài internet qua Cloudflare:

```bash
# Install cloudflared nếu chưa có
curl -sL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Tạo tunnel
cloudflared tunnel create thinkai-monitoring

# Add tunnel ingress cho từng service
cloudflared tunnel route dns thinkai-monitoring prometheus.yourdomain.com
cloudflared tunnel route dns thinkai-monitoring grafana.yourdomain.com

# Run
cloudflared tunnel run thinkai-monitoring
```

## Kết nối với Portfolio

Sau khi chạy, cập nhật `src/data/config.json`:

```json
{
  "prometheus": {
    "enabled": true,
    "url": "http://localhost:9090"
  },
  "loki": {
    "enabled": true,
    "url": "http://localhost:3100"
  },
  "grafana": {
    "enabled": true,
    "url": "http://localhost:3000",
    "apiKey": "your-grafana-api-key"
  }
}
```

## Dừng services

```bash
docker compose down
# Xóa cả data
docker compose down -v
```

## Troubleshooting

### Prometheus không scrape được
- Kiểm tra: `http://vps-ip:9090/targets`
- Đảm bảo target đang chạy

### Grafana không kết nối được Prometheus
- Vào Grafana → Configuration → Data Sources → Add Prometheus
- URL: `http://prometheus:9090` (dùng container name) hoặc `http://localhost:9090`

### Logs không hiển thị
- Kiểm tra Promtail logs: `docker compose logs promtail`
- Đảm bảo Loki đang chạy