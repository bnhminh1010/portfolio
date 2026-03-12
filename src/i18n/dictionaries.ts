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
  },
};

export type Dictionary = typeof dictionaries.en;
