export type Language = "en" | "vi";

export const dictionaries = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      resume: "Resume",
    },
    hero: {
      greeting: "Hello, I'm Minh.",
      title: "Backend Developer & DevOps Engineer.",
      description:
        "As a senior IT student specializing in backend development and DevOps, I aim to apply my skills in NestJS, Spring Boot, Neo4j, and Docker to build scalable and reliable systems. My long-term goal is to grow into a Senior Backend Engineer.",
    },
    skills: {
      title: "Skills & Technologies",
    },
    skillsDesc: {
      NodeJS: "Built backend APIs for EKG System using NestJS and Next.js.",
      "Spring Boot": "Developed RESTful APIs and managed lifecycle for ThinkAI e-learning platform.",
      Neo4j: "Architected enterprise knowledge graph modeling 80+ employees and 300+ relationships.",
      PostgreSQL: "Designed schemas and optimized complex queries for focus apps and e-learning platforms.",
      Docker: "Containerized applications and optimized multi-stage builds to reduce image size by 90%.",
      Linux: "Administrated Linux environments, hardening security and managing server resources.",
      Git: "Maintained version control with strict branch protection rules and GitOps workflows.",
      "CI/CD": "Designed automated pipelines including SAST scanning, testing, and deployment.",
      ClaudeCode: "Terminal-native agent by Anthropic. Opus 4.6 model for deep multi-file refactoring.",
      Cursor: "AI-native IDE forked from VS Code. Multi-model support with interactive pair programming.",
      OpenCode: "Open-source terminal CLI agent. 45K+ GitHub stars, free and highly extensible.",
      Antigravity: "Free agent-first IDE by Google. Claude Opus + Gemini 3 Pro, 5 parallel agents.",
    },
    experience: {
      title: "Experience",
      jobs: [
        {
          title: "Fullstack Developer @ Enterprise Knowledge Graph (EKG System)",
          period: "Oct 2025 – Present",
          bullets: [
            "Architected an enterprise knowledge graph using Neo4j, modeling 80+ employees, 6 departments, and over 300 relationships.",
            "Integrated graph algorithms to analyze personnel relationships within the organization.",
            "In charge of backend architecture design, data modeling, and collaborating directly with a 3-member team.",
          ],
        },
        {
          title: "Backend Developer @ ZenDo – Focus & Productivity App",
          period: "Sep 2025 – Oct 2025",
          bullets: [
            "Developed backend features for a time management mobile application using Supabase.",
            "Built authentication flows (login, signup, session) and real-time task synchronization.",
            "Designed database schema for tasks, focus sessions, statistics, and user progress.",
            "Optimized database queries and implemented structured error handling to improve API reliability.",
          ],
        },
        {
          title: "Backend Developer & DevOps @ ThinkAI",
          period: "2026",
          bullets: [
            "Developed Spring Boot backend API for the ThinkAI e-learning platform using MySQL and JPA/Hibernate.",
            "Containerized the system using Docker and set up a fast local development environment via docker-compose.",
            "Managed the software development lifecycle, ensuring optimal backend stability and easy deployment.",
          ],
        },
      ]
    },
    projects: {
      title: "Featured Projects",
      viewSource: "View Source",
      items: [
        {
          title: "Enterprise Knowledge Graph (EKG)",
          description: "Enterprise Knowledge Graph built with Neo4j, NestJS, and Next.js. Integrates 3-tier routing AI Chat (Neo4j direct / Ollama RAG / Gemini) and Redis caching for conversation history.",
          meta: "Neo4j • NestJS • Next.js • Redis • Ollama • Gemini",
        },
        {
          title: "ThinkAI Backend",
          description: "Spring Boot backend API for the ThinkAI e-learning platform. Utilizes MySQL and JPA/Hibernate, packaged with Docker for quick local environment setup via docker-compose.",
          meta: "Java (Spring Boot) • MySQL • JPA/Hibernate • Docker • Maven",
        }
      ]
    },
    serverStatus: {
      label: "System Core",
      online: "Operational",
      offline: "System Down",
      checking: "Checking...",
      region: "Region",
      visitorIP: "Visitor IP",
    },
    terminal: {
      button: "Terminal",
      welcome: "BinhMinhOS v1.0.0 (Linux x86_64)\nSystem ready. Type 'help' to see available commands.",
      prompt: "guest@binhminh-portfolio:~$",
      commandNotFound: "-bash: {0}: command not found. This incident will be reported.",
      help: "Available commands:\n  help      - Show this help message\n  whoami    - Show information about me\n  skills    - List core skills\n  projects  - List featured projects\n  download  - Download my resume\n  clear     - Clear the terminal screen\n  lang      - Switch language (e.g., lang vi, lang en)",
    },
    gitops: {
      latestCommit: "Latest Commit",
      fetching: "Fetching CI/CD status...",
      status: "Status",
      success: "SUCCESS",
    },
    devops: {
      title: "System Observability",
      kubernetes: "K8s ReplicaSet",
      killPod: "Kill a Pod to test Self-Healing",
      grafana: "Grafana Dash (Mini)",
      cpu: "CPU",
      mem: "MEM",
      healthy: "Healthy",
    },
    pipeline: {
      title: "CI/CD Pipeline Architecture",
      source: "Source Code",
      sourceDesc: "Triggered on push to main branch or PR creation. Follows strict branch protection rules.",
      sast: "Lint & SAST",
      sastDesc: "Runs ESLint, Prettier, and Trivy container scanning. Fails fast to save cloud runner minutes and prevent CVEs.",
      test: "Unit Test",
      testDesc: "Executes Jest/Vitest suites. Requires minimum 80% coverage to proceed to build stage.",
      build: "Build Image",
      buildDesc: "Utilizes Docker Multi-stage builds. Compiles code in heavy builder layer, extracts only binary to Alpine base reducing image size by 90%.",
      registry: "Push Registry",
      registryDesc: "Pushes optimized Docker image to GitHub Container Registry (GHCR) / AWS ECR with secure tag signing.",
      deploy: "Deploy",
      deployDesc: "ArgoCD detects drift and updates Kubernetes manifests, or Vercel Edge automatically serves new static assets.",
    },
  },
  vi: {
    nav: {
      about: "Giới thiệu",
      skills: "Kỹ năng",
      experience: "Kinh nghiệm",
      projects: "Dự án",
      resume: "Tải CV",
    },
    hero: {
      greeting: "Xin chào, mình là Minh.",
      title: "Backend Developer & DevOps Engineer.",
      description:
        "Là một sinh viên CNTT năm cuối chuyên về lập trình Backend và DevOps, mình mong muốn áp dụng các kỹ năng về NestJS, Spring Boot, Neo4j và Docker để xây dựng các hệ thống có khả năng mở rộng và độ tin cậy cao. Mục tiêu dài hạn của mình là trở thành một Senior Backend Engineer.",
    },
    skills: {
      title: "Kỹ năng & Công nghệ",
    },
    skillsDesc: {
      NodeJS: "Xây dựng API backend cho hệ thống EKG bằng NestJS và Next.js.",
      "Spring Boot": "Phát triển RESTful API và quản lý vòng đời trọn gói cho nền tảng e-learning ThinkAI.",
      Neo4j: "Thiết kế kiến trúc knowledge graph mô hình hóa hơn 80 nhân viên và 300 mối quan hệ.",
      PostgreSQL: "Thiết kế CSDL và tối ưu hóa truy vấn phức tạp cho các ứng dụng quản lý thời gian.",
      Docker: "Đóng gói ứng dụng (Containerization) và tối ưu hóa multi-stage build giảm 90% dung lượng.",
      Linux: "Quản trị môi trường Linux, tăng cường bảo mật và cấp phát tài nguyên máy chủ.",
      Git: "Quản lý mã nguồn với các quy tắc bảo vệ nhánh nghiêm ngặt và luồng GitOps.",
      "CI/CD": "Thiết kế đường ống tự động với luồng DevSecOps (quét SAST, kiểm thử, triển khai).",
      ClaudeCode: "AI agent terminal-native của Anthropic. Model Opus 4.6 cho refactoring đa file chuyên sâu.",
      Cursor: "IDE AI-native fork từ VS Code. Hỗ trợ multi-model với pair programming tương tác.",
      OpenCode: "CLI agent mã nguồn mở. 45K+ sao GitHub, miễn phí và dễ mở rộng.",
      Antigravity: "IDE agent-first miễn phí của Google. Tích hợp Claude Opus + Gemini 3 Pro, 5 agent song song.",
    },
    experience: {
      title: "Kinh nghiệm làm việc",
      jobs: [
        {
          title: "Fullstack Developer @ Enterprise Knowledge Graph (Hệ thống EKG)",
          period: "Tháng 10 2025 – Hiện tại",
          bullets: [
            "Thiết kế kiến trúc knowledge graph doanh nghiệp bằng Neo4j, mô hình hóa hơn 80 nhân viên, 6 phòng ban và hơn 300 mối quan hệ.",
            "Tích hợp các thuật toán đồ thị (graph algorithms) để phân tích mối quan hệ nhân sự.",
            "Đảm nhận thiết kế kiến trúc Backend, mô hình hóa dữ liệu và làm việc trực tiếp với nhóm 3 người.",
          ],
        },
        {
          title: "Backend Developer @ ZenDo – Ứng dụng Tập trung & Hiệu suất",
          period: "Tháng 09 2025 – Tháng 10 2025",
          bullets: [
            "Phát triển backend cho ứng dụng điện thoại quản lý thời gian sử dụng Supabase.",
            "Xây dựng luồng xác thực (đăng nhập, đăng ký, phiên làm việc) và đồng bộ hóa công việc theo thời gian thực.",
            "Thiết kế cơ sở dữ liệu cho các đầu việc, phiên tập trung, thống kê và tiến độ người dùng.",
            "Tối ưu truy vấn dữ liệu và thiết lập chuẩn hóa bắt lỗi để tăng độ ổn định cho API.",
          ],
        },
        {
          title: "Backend Developer & DevOps @ ThinkAI",
          period: "2026",
          bullets: [
            "Phát triển Spring Boot API cho hệ thống e-learning ThinkAI với MySQL và JPA/Hibernate.",
            "Đóng gói hệ thống với Docker và thiết lập môi trường phát triển cục bộ nhanh chóng bằng docker-compose.",
            "Quản lý vòng đời phát triển phần mềm, đảm bảo sự ổn định của backend và dễ dàng triển khai.",
          ],
        },
      ]
    },
    projects: {
      title: "Dự án Nổi bật",
      viewSource: "Mã nguồn",
      items: [
        {
          title: "Enterprise Knowledge Graph (EKG)",
          description: "Hệ thống tri thức doanh nghiệp cấu trúc bởi Neo4j, NestJS và Next.js. Tích hợp định tuyến Chat AI 3 lớp (Trực tiếp Neo4j / Ollama RAG / Gemini) và Redis cache cho lịch sử chat.",
          meta: "Neo4j • NestJS • Next.js • Redis • Ollama • Gemini",
        },
        {
          title: "ThinkAI Backend",
          description: "Spring Boot API cho nền tảng e-learning ThinkAI. Sử dụng MySQL và JPA/Hibernate, triển khai bằng Docker giúp setup nhanh trên môi trường local qua docker-compose.",
          meta: "Java (Spring Boot) • MySQL • JPA/Hibernate • Docker • Maven",
        }
      ]
    },
    serverStatus: {
      label: "Lõi Hệ Thống",
      online: "Đang Hoạt Động",
      offline: "Mất Kết Nối",
      checking: "Đang Kiểm Tra...",
      region: "Khu vực",
      visitorIP: "IP Truy Cập",
    },
    terminal: {
      button: "Terminal",
      welcome: "BinhMinhOS v1.0.0 (Linux x86_64)\nHệ thống đã sẵn sàng. Gõ 'help' để xem các lệnh khả dụng.",
      prompt: "guest@binhminh-portfolio:~$",
      commandNotFound: "-bash: {0}: không tìm thấy lệnh. Sự cố này sẽ được báo cáo.",
      help: "Các lệnh khả dụng:\n  help      - Hiển thị thông báo hướng dẫn này\n  whoami    - Xem thông tin về tôi\n  skills    - Xem danh sách kỹ năng\n  projects  - Xem danh sách dự án\n  download  - Tải xuống CV của tôi\n  clear     - Xóa màn hình\n  lang      - Đổi ngôn ngữ (VD: lang vi, lang en)",
    },
    gitops: {
      latestCommit: "Bản triển khai mới nhất",
      fetching: "Đang lấy trạng thái CI/CD...",
      status: "Trạng thái",
      success: "THÀNH CÔNG",
    },
    devops: {
      title: "Khả Năng Quan Sát Hệ Thống",
      kubernetes: "K8s ReplicaSet",
      killPod: "Bấm Kill để test Self-Healing",
      grafana: "Grafana Dash (Mini)",
      cpu: "CPU",
      mem: "MEM",
      healthy: "Ổn định",
    },
    pipeline: {
      title: "Kiến trúc CI/CD Pipeline",
      source: "Mã Nguồn (Source)",
      sourceDesc: "Kích hoạt khi có lệnh Push lên nhánh main hoặc tạo PR. Tuân thủ luật bảo vệ nhánh nghiêm ngặt.",
      sast: "Lint & SAST",
      sastDesc: "Chạy phân tích tính tĩnh (Trivy/SonarQube). Bắt lỗi sớm (Fail-fast) chặn rủi ro bảo mật (CVE) và tiết kiệm chi phí Server.",
      test: "Unit Test",
      testDesc: "Thực thi kịch bản kiểm thử (Jest/Vitest). Yêu cầu độ bao phủ mã nguồn (Coverage) tối thiểu 80% để được build.",
      build: "Build Image",
      buildDesc: "Áp dụng Docker Multi-stage build. Loại bỏ các thư viện rác, chỉ mang file thực thi sang Alpine Linux giúp giảm 90% dung lượng.",
      registry: "Push Registry",
      registryDesc: "Đẩy image siêu nhẹ lên Github Container Registry (GHCR) hoặc AWS ECR kèm theo bảo mật chữ ký (Tag signing).",
      deploy: "Triển khai (Deploy)",
      deployDesc: "Sử dụng ArgoCD tự động đồng bộ (GitOps) xuống Kubernetes Cluster hoặc chạy Vercel Edge tự động trích xuất file tĩnh.",
    },
  },
};

export type Dictionary = typeof dictionaries.en;
