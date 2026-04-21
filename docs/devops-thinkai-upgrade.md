# DevOps ThinkAI Upgrade

## Mục tiêu
Nâng cấp ThinkAI từ mô hình Docker Compose + Tunnel hiện tại lên kiến trúc DevOps v3 theo lộ trình có kiểm soát, ưu tiên bảo mật, tự động hóa, khả năng quan sát và khả năng phục hồi.

## Phase 0: Chốt Kiến Trúc và Scope
Mục tiêu: khóa phạm vi triển khai khả thi, tránh over-engineering.

- Chốt cloud chính: AWS.
- Chốt runtime: Kubernetes (EKS), GitOps (ArgoCD), Cloudflare Tunnel.
- Chốt stack dữ liệu: DB chính (MySQL hoặc MongoDB), Kafka, Vault hoặc AWS Secrets Manager.
- Chốt nguyên tắc bảo mật: private-first, không mở inbound trực tiếp vào workload ứng dụng.
- Viết và duyệt 3 tài liệu nền tảng:
  - ADR kiến trúc tổng thể.
  - Threat model.
  - NFR/SLO (latency, availability, chi phí trần, RTO/RPO).
- Output: bộ tài liệu thiết kế v1 được freeze.

Entry Criteria:
- Có owner kỹ thuật chịu trách nhiệm kiến trúc.
- Đã thống nhất mục tiêu sản phẩm và phạm vi MVP.

Exit Criteria:
- ADR, threat model, NFR/SLO được review và approve.
- Có danh sách risk + assumption được chốt.
- Không còn tranh luận mở về công nghệ lõi (cloud/runtime/data stack).

## Phase 1: Nền Tảng IaC và Landing Zone
Mục tiêu: mọi tài nguyên hạ tầng được quản lý bằng code.

- Tạo repo hoặc module `infra` riêng.
- Thiết kế Terraform module theo domain:
  - `network`
  - `eks`
  - `iam`
  - `storage`
  - `observability-base`
- Bật remote state an toàn:
  - S3 versioning + encryption.
  - DynamoDB lock.
- Tạo IAM role theo least-privilege cho CI và Terraform runner.
- Tích hợp Checkov trong pipeline Terraform để chặn cấu hình nguy hiểm.
- Output: `terraform plan/apply` reproducible, có state backend chuẩn team.

Entry Criteria:
- Phase 0 đã chốt xong kiến trúc.
- Có tài khoản cloud và quyền tạo tài nguyên nền tảng.

Exit Criteria:
- Terraform chạy `plan/apply` thành công trên môi trường mục tiêu.
- S3 state backend + DynamoDB lock hoạt động đúng.
- Checkov chạy trong CI và có policy fail.
- Tài nguyên tạo mới có tagging chuẩn (env, owner, cost-center).

## Phase 2: Container Security và CI Gate
Mục tiêu: chỉ image đạt chuẩn mới được phát hành.

- Chuẩn hóa Dockerfile backend/frontend:
  - Multi-stage build.
  - Chạy non-root.
  - Base image tối giản.
- Thiết kế CI pipeline chuẩn:
  - Lint.
  - Unit test.
  - SonarQube (SAST + quality gate).
  - Trivy scan image.
  - Generate SBOM.
  - Cosign sign image.
  - Push registry.
- Đặt policy fail rõ ràng cho CVE và quality gate.
- Gắn metadata image: commit SHA, build timestamp, SBOM reference.
- Output: image phát hành có chữ ký, traceable và có security gate.

Entry Criteria:
- Repo backend/frontend đã build ổn định bằng Docker.
- Có registry đích (ECR/GHCR) và quyền push.

Exit Criteria:
- Pipeline tự động chạy đầy đủ lint/test/SAST/scan/sign.
- Image không đạt gate thì không được push/deploy.
- Cosign verify pass trên image release.
- Có SBOM artifact cho mỗi build release.

## Phase 3: Kubernetes Platform Core
Mục tiêu: dựng platform layer ổn định trước khi onboard app.

- Cài ArgoCD.
- Cài External Secrets Operator.
- Cài metrics-server và các dependency nền tảng vận hành.
- Chia namespace chuẩn:
  - `platform`
  - `security`
  - `monitoring`
  - `thinkai-app`
- Áp baseline:
  - Resource request/limit cho workloads.
  - Pod security baseline.
  - NetworkPolicy default deny.
- Output: cluster có guardrail rõ ràng, sẵn sàng triển khai ứng dụng qua GitOps.

Entry Criteria:
- Cluster EKS đã provision xong từ Phase 1.
- CI image pipeline (Phase 2) đã ổn định.

Exit Criteria:
- ArgoCD + ESO + metrics-server chạy healthy.
- Namespace và policy baseline đã áp cho toàn cluster.
- Pod không khai báo security/resource policy sẽ bị chặn.
- Kiểm thử network policy xác nhận default deny có hiệu lực.

## Phase 4: GitOps CD và Runtime Delivery
Mục tiêu: triển khai thuần GitOps, rollback an toàn.

- Tạo repo `gitops` chứa manifests/Helm/Kustomize.
- ArgoCD auto-sync theo nhánh release.
- Cấu hình rollout:
  - Rolling update.
  - Readiness/liveness/startup probes.
  - Auto rollback khi health check fail.
- Bật drift detection và audit log thay đổi.
- Output: deploy production qua Git commit, không deploy tay bằng SSH.

Entry Criteria:
- Phase 3 đã có ArgoCD và guardrail nền tảng.
- Helm/Kustomize structure đã chuẩn hóa trong repo.

Exit Criteria:
- Mọi thay đổi deployment đi qua pull request + merge.
- ArgoCD sync thành công, không drift kéo dài.
- Rollback test pass trên 1 release giả lập lỗi.
- Không còn runbook deploy tay bằng SSH trong quy trình chính.

## Phase 5: Zero Trust Ingress với Cloudflared
Mục tiêu: public traffic đi qua edge bảo mật, workload vẫn private.

- Deploy cloudflared tối thiểu 2 replicas (HA).
- Cấu hình ingress route domain -> service nội bộ.
- Bật WAF, rate limit, bot protection tại Cloudflare.
- Quy tắc public:
  - Cho phép: web/app endpoint cần public.
  - Cấm public: Vault, Kafka, DB, Redis.
- Output: không mở inbound port cho app workload, chỉ outbound tunnel.

Entry Criteria:
- Workload app đã chạy ổn định trong cluster qua GitOps.
- Có domain và tài khoản Cloudflare quản trị đầy đủ.

Exit Criteria:
- Cloudflared >=2 replicas chạy healthy.
- Public traffic vào app đi qua Cloudflare tunnel thành công.
- Security policy (WAF/rate limit) được bật và test smoke pass.
- Không còn service nội bộ nhạy cảm bị public nhầm.

## Phase 6: Secrets và Event Streaming
Mục tiêu: chuẩn hóa secrets lifecycle và xử lý async lõi nghiệp vụ.

- Chọn nguồn secrets chuẩn:
  - HashiCorp Vault, hoặc
  - AWS Secrets Manager.
- Dùng ESO để sync secrets về Kubernetes Secret theo chu kỳ.
- Loại bỏ secret hardcode trong repo/manifests.
- Thiết kế Kafka event contract:
  - Topic naming.
  - Schema versioning.
  - Retry strategy.
  - Dead Letter Queue.
- Tích hợp producer/consumer cho tác vụ nặng trong thinkai-backend.
- Bật TLS + SASL cho Kafka ở môi trường production.
- Output: backend async thực sự và có secret governance.

Entry Criteria:
- Phase 4/5 đã ổn định deployment và ingress.
- Team backend đã thống nhất use case async cần Kafka.

Exit Criteria:
- Không còn secret nhạy cảm hardcode trong source/manifests.
- ESO sync secret thành công và có rotate test.
- Kafka flow có producer/consumer thật, có retry + DLQ.
- TLS/SASL Kafka pass test kết nối và ACL đúng quyền.

## Phase 7: Observability, Runtime Security và DR
Mục tiêu: quan sát toàn hệ thống + phản ứng sự cố + khôi phục được.

- Metrics/Logs:
  - Prometheus + Alertmanager.
  - Loki.
  - Grafana dashboards.
- Tracing:
  - OpenTelemetry instrumentation cho backend/frontend path quan trọng.
  - Tempo làm backend tracing.
- Runtime security:
  - Falco rule set cho hành vi bất thường.
- Backup/DR:
  - Velero backup cluster objects + PV.
  - Backup database theo policy.
  - Thực hiện restore drill định kỳ.
- Output:
  - Dashboard + alert hoạt động.
  - Trace end-to-end có thể dùng để debug.
  - Báo cáo test restore đạt mục tiêu RTO/RPO.

Entry Criteria:
- Backend đã có metrics/log/traces instrumentation cơ bản.
- Kafka/DB/workload chính đã chạy production-like.

Exit Criteria:
- Dashboard có đầy đủ golden signals cho dịch vụ chính.
- Alertmanager gửi cảnh báo thành công theo rule đã định.
- Trace đi xuyên frontend -> backend -> async worker quan sát được.
- Restore drill thành công, có biên bản đo RTO/RPO thực tế.
- Falco phát hiện được ít nhất 1 kịch bản hành vi bất thường giả lập.

## Phase 8: Tích Hợp Portfolio Dữ Liệu Thật
Mục tiêu: portfolio hiển thị data thật mà không tăng risk.

- Không cho portfolio truy cập trực tiếp Vault/Kafka.
- Tạo lớp API read-only trong thinkai-backend để aggregate dữ liệu vận hành.
- Portfolio gọi API aggregate, có cache/rate limit/sanitize.
- Xác định SLA dữ liệu hiển thị (gần real-time hay periodic).
- Output: portfolio real-data ổn định, tách biệt rõ giữa observability và control plane.

Entry Criteria:
- Phase 7 đã có telemetry và API nguồn dữ liệu ổn định.
- Đã thống nhất data nào được phép public trên portfolio.

Exit Criteria:
- Portfolio không truy cập trực tiếp Vault/Kafka/DB.
- API aggregate có auth/rate-limit/sanitize phù hợp.
- Dashboard/section portfolio hiển thị dữ liệu thật ổn định.
- Không phát sinh lộ thông tin nhạy cảm qua endpoint hiển thị.

## Definition of Done
- Triển khai production theo GitOps, không deploy tay.
- Image deploy có scan pass và chữ ký hợp lệ.
- Không còn secrets nhạy cảm trong code/manifests.
- Có metrics, logs, traces, alerts cho các luồng chính.
- Có backup và restore test định kỳ với bằng chứng.
- Portfolio hiển thị real-data qua API trung gian an toàn.
