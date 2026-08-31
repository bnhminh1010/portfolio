export type Language = "en" | "vi";

export type Localized<T> = Record<Language, T>;

export type Project = {
  id: "homelab" | "thinkai";
  repo: string;
  liveUrl?: string;
  period: string;
  stack: string[];
  accent: "teal" | "pink";
  evidence: {
    cv: string;
    repository: Array<{ claim: string; url: string }>;
  };
  preview: {
    assetStem: string;
    ready: boolean;
    capture: Localized<string>;
  };
  content: Localized<{
    category: string;
    title: string;
    summary: string;
    story: {
      problem: string;
      approach: string;
      outcome: string;
    };
    diagramLabel: string;
  }>;
};

export const profile = {
  name: "Bình Minh",
  role: "DevOps Engineer",
  email: "pata10102004@gmail.com",
  phone: "+84 372 064 929",
  location: "Thu Duc, Ho Chi Minh City, Vietnam",
  domain: "https://binhminh.thinkai.id.vn",
  github: "https://github.com/bnhminh1010",
  linkedin: "https://www.linkedin.com/in/b%C3%ACnh-minh-4a953434b/",
};

export const copy: Localized<{
  nav: { work: string; experience: string; skills: string; about: string; resume: string };
  hero: { status: string; roleHeadline: string; statement: string; body: string; primary: string; secondary: string };
  work: { title: string; body: string; source: string; live: string; preview: string; architecture: string; storyLabels: { problem: string; approach: string; outcome: string } };
  experience: { title: string; body: string; role: string; period: string; story: { problem: string; approach: string; outcome: string } };
  skills: { title: string; groups: Array<{ label: string; proof: string; items: string[] }> };
  education: { title: string; school: string; degree: string; recognition: { label: string; title: string; detail: string } };
  contact: { title: string; body: string; email: string; cv: string };
  footer: string;
}> = {
  en: {
    nav: { work: "Work", experience: "Experience", skills: "Skills", about: "About", resume: "DevOps CV" },
    hero: {
      status: "Available for DevOps opportunities",
      roleHeadline: "DevOps Engineer",
      statement: "I build delivery systems that are easier to ship, operate and recover.",
      body: "Software Engineering graduate focused on the delivery systems behind dependable services: CI/CD, containers, Linux infrastructure and practical security controls.",
      primary: "View case studies",
      secondary: "Download DevOps CV",
    },
    work: {
      title: "The work behind the release.",
      body: "Two case studies grounded in CV outcomes and repository evidence: a private operations workbench and an education-platform delivery path.",
      source: "View source",
      live: "Visit live",
      preview: "OpenScreen preview",
      architecture: "View architecture",
      storyLabels: { problem: "Challenge", approach: "Engineering decision", outcome: "Evidence delivered" },
    },
    experience: {
      title: "Controls that make a release easier to trust.",
      body: "A DevOps internship focused on safeguarding an internal .NET workflow and making its delivery path repeatable.",
      role: "DevOps Engineer Intern, Ung Buou Hospital",
      period: "May to July 2026, Ho Chi Minh City",
      story: {
        problem: "An internal .NET procurement workflow needed stronger request boundaries and a repeatable release path before its approved hospital deployment.",
        approach: "I added GitHub Actions checks, CodeQL and SonarQube visibility, API-security review, CSRF remediation and package-vulnerability fixes; repository contracts clarify the access and request risks behind those controls.",
        outcome: "The release baseline put checks before handoff and supported deployment to the hospital server through the approved FTP workflow.",
      },
    },
    skills: {
      title: "Capabilities proven in the work.",
      groups: [
        { label: "Build and automate", proof: "Source checks, container builds and repeatable delivery paths represented in the work above.", items: ["Go", "Git", "GitHub Actions", "Spring Boot", "Docker"] },
        { label: "Operate and recover", proof: "Operate containerized services with private connectivity, host controls and retained service evidence.", items: ["Podman", "Tailscale", "SQLite", "PostgreSQL", "Redis", "WebSocket", "systemd", "K3s"] },
        { label: "Protect and deliver", proof: "Quality gates and security controls used before handing work to production.", items: ["CodeQL", "SonarQube", "Trivy", "Argo CD"] },
        { label: "Familiar with", proof: "Used in labs, coursework or smaller exercises; not presented here as production evidence.", items: ["Python", "Bash", "GitLab CI/CD", "Terraform", "Cloudflare"] },
      ],
    },
    education: {
      title: "A software engineering foundation.",
      school: "HUTECH University, 2022-2026",
      degree: "Bachelor of Software Engineering. GPA 3.24. English B1.",
      recognition: { label: "Recognition", title: "IT Got Talent 2025", detail: "Semifinalist" },
    },
    contact: {
      title: "Open to DevOps work where reliable delivery matters.",
      body: "I am looking for a DevOps Engineer role where automation, reliability and clear operational ownership matter.",
      email: "Email Minh",
      cv: "Download DevOps CV",
    },
    footer: "Binh Minh, DevOps Engineer, Ho Chi Minh City",
  },
  vi: {
    nav: { work: "Dự án", experience: "Kinh nghiệm", skills: "Kỹ năng", about: "Thông tin", resume: "CV DevOps" },
    hero: {
      status: "Sẵn sàng cho cơ hội DevOps",
      roleHeadline: "Kỹ sư DevOps",
      statement: "Tôi xây hệ thống phân phối dễ phát hành, vận hành và phục hồi hơn.",
      body: "Kỹ sư Phần mềm mới tốt nghiệp, tập trung vào hệ thống phía sau các dịch vụ đáng tin cậy: CI/CD, container, Linux infrastructure và kiểm soát bảo mật thực dụng.",
      primary: "Xem case study",
      secondary: "Tải CV DevOps",
    },
    work: {
      title: "Công việc phía sau mỗi lần phát hành.",
      body: "Hai case study đặt kết quả trong CV cạnh bằng chứng repository: một operations workbench riêng tư và một delivery path cho nền tảng giáo dục.",
      source: "Xem mã nguồn",
      live: "Xem live",
      preview: "Xem preview OpenScreen",
      architecture: "Xem kiến trúc",
      storyLabels: { problem: "Thách thức", approach: "Quyết định kỹ thuật", outcome: "Bằng chứng bàn giao" },
    },
    experience: {
      title: "Kiểm soát giúp một bản phát hành đáng tin hơn.",
      body: "Kỳ thực tập DevOps tập trung vào bảo vệ workflow .NET nội bộ và làm cho đường phát hành có thể lặp lại.",
      role: "Thực tập sinh DevOps, Bệnh viện Ung Bướu",
      period: "Tháng 05 đến tháng 07 năm 2026, TP. Hồ Chí Minh",
      story: {
        problem: "Một workflow mua sắm .NET nội bộ cần boundary request chặt hơn và một đường phát hành lặp lại được trước khi triển khai theo quy trình bệnh viện đã duyệt.",
        approach: "Tôi bổ sung GitHub Actions, CodeQL, SonarQube, rà soát API, xử lý CSRF và package-vulnerability; các contract trong repo làm rõ rủi ro access/request mà các kiểm soát này giải quyết.",
        outcome: "Baseline phát hành đặt kiểm tra trước handoff và hỗ trợ triển khai lên máy chủ bệnh viện qua FTP workflow được phê duyệt.",
      },
    },
    skills: {
      title: "Năng lực được chứng minh qua công việc.",
      groups: [
        { label: "Xây dựng và tự động hóa", proof: "Source check, container build và delivery path có thể lặp lại xuất hiện trong các phần phía trên.", items: ["Go", "Git", "GitHub Actions", "Spring Boot", "Docker"] },
        { label: "Vận hành và phục hồi", proof: "Vận hành service container với kết nối riêng, host control và service evidence được lưu lại.", items: ["Podman", "Tailscale", "SQLite", "PostgreSQL", "Redis", "WebSocket", "systemd", "K3s"] },
        { label: "Bảo vệ và phân phối", proof: "Quality gate và security control được dùng trước khi bàn giao production.", items: ["CodeQL", "SonarQube", "Trivy", "Argo CD"] },
        { label: "Đã làm quen", proof: "Đã dùng trong lab, môn học hoặc bài tập nhỏ; không trình bày tại đây như bằng chứng production.", items: ["Python", "Bash", "GitLab CI/CD", "Terraform", "Cloudflare"] },
      ],
    },
    education: {
      title: "Nền tảng kỹ thuật phần mềm.",
      school: "Đại học HUTECH, 2022-2026",
      degree: "Cử nhân Kỹ thuật Phần mềm. GPA 3.24. Tiếng Anh B1.",
      recognition: { label: "Ghi nhận", title: "IT Got Talent 2025", detail: "Bán kết" },
    },
    contact: {
      title: "Sẵn sàng cho vị trí DevOps coi trọng phát hành đáng tin cậy.",
      body: "Tôi tìm kiếm vị trí DevOps Engineer coi trọng automation, reliability và trách nhiệm vận hành rõ ràng.",
      email: "Email cho Minh",
      cv: "Tải CV DevOps",
    },
    footer: "Bình Minh, DevOps Engineer, TP. Hồ Chí Minh",
  },
};

export const projects: Project[] = [
  {
    id: "homelab",
    repo: "https://github.com/bnhminh1010/HomeLab-Dashboard",
    liveUrl: "https://hostdeck.thinkai.id.vn",
    period: "2026 to present",
    stack: ["Go", "Podman", "Tailscale", "SQLite", "WebSocket"],
    accent: "teal",
    evidence: {
      cv: "Nine containerized services, SLO tracking, alerting, PTY terminal and host hardening.",
      repository: [
        { claim: "Initial Go operations dashboard", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/a335a03c639ead022e6a5e8b9532846d4b8c5997" },
        { claim: "Host-agent security boundary", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/06d7be6073c846fab95393e159d9bfc7422429da" },
        { claim: "SLO, TLS and backup checks", url: "https://github.com/bnhminh1010/HomeLab-Dashboard/commit/7a6571886569d787101a4ceeb7cdc5624ff232e1" },
      ],
    },
    preview: {
      assetStem: "homelab-preview",
      ready: false,
      capture: {
        en: "Maps the private path from the Tailscale mesh to the host agent, Podman services and operations dashboard.",
        vi: "Mô tả đường đi riêng tư từ Tailscale mesh đến host agent, Podman service và operations dashboard.",
      },
    },
    content: {
      en: {
        category: "Self-hosted operations workbench",
        title: "HomeLab Dashboard",
        summary: "A private operations workbench for a nine-service Podman homelab.",
        story: {
          problem: "Nine containerized services needed one view of host, Podman and remote-node health without exposing the control plane on the public internet.",
          approach: "I built a Go and WebSocket workbench with retained SQLite history, Tailscale-connected outbound agents and a separate protected host-action boundary.",
          outcome: "The lab now tracks service evidence, SLOs, alerts and terminal sessions; systemd, OOM handling, automatic reboot and ZRAM harden the operating baseline.",
        },
        diagramLabel: "Tailscale mesh → host agent → Podman services → operations dashboard",
      },
      vi: {
        category: "Operations workbench self-hosted",
        title: "HomeLab Dashboard",
        summary: "Operations workbench riêng tư cho homelab Podman gồm chín service.",
        story: {
          problem: "Chín service container cần một góc nhìn chung về host, Podman và remote node mà không mở control plane ra Internet.",
          approach: "Tôi xây workbench Go và WebSocket với SQLite history, Tailscale/outbound agent và host-action boundary riêng được bảo vệ.",
          outcome: "Homelab theo dõi service evidence, SLO, alert và terminal session; systemd, OOM handling, tự khởi động lại và ZRAM tạo baseline hardening cho vận hành.",
        },
        diagramLabel: "Tailscale mesh → host agent → Podman services → operations dashboard",
      },
    },
  },
  {
    id: "thinkai",
    repo: "https://github.com/ThinkAI-team/thinkai-backend",
    liveUrl: "https://learning.thinkai.id.vn",
    period: "2025-2026",
    stack: ["Spring Boot", "GitHub Actions", "Docker", "Kubernetes", "Argo CD", "Trivy"],
    accent: "pink",
    evidence: {
      cv: "Two-pod K3s delivery, GitOps/DevSecOps pipeline, health checks, signed images and protected collaboration across a 329+ commit, 47-branch repository.",
      repository: [
        { claim: "Security and quality CI", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/1db47cf4271744b6a8117cd3d0189646eb7b9adf" },
        { claim: "Java 21 multi-stage container build", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/4fb5a62eebab4213a5fb127704f5ea93b187693a" },
        { claim: "Compose database health gate", url: "https://github.com/ThinkAI-team/thinkai-backend/commit/77a8a31c5a824befecf8cf1677494708a1d026ce" },
      ],
    },
    preview: {
      assetStem: "thinkai-preview",
      ready: false,
      capture: {
        en: "Maps the pull request security gate, multi-stage image build and local Docker Compose dependencies.",
        vi: "Mô tả security gate của pull request, multi-stage image build và dependency Docker Compose cục bộ.",
      },
    },
    content: {
      en: {
        category: "Education platform delivery pipeline",
        title: "ThinkAI Backend",
        summary: "A DevSecOps delivery path for an AI-powered education backend.",
        story: {
          problem: "As the Spring Boot backend grew across shared services and deployment targets, manual release work made quality, dependency and secret checks inconsistent.",
          approach: "I contributed CI security and quality gates plus a multi-stage container delivery path; the surrounding repository explains the MySQL, Redis, K3s, Argo CD and monitoring context it serves.",
          outcome: "The result was a two-pod K3s path with GitOps, signed-image and health-check controls, delivered within a repository collaboration spanning 329+ commits and 47 branches.",
        },
        diagramLabel: "Pull request → security gates → Spring Boot image → GitOps delivery path",
      },
      vi: {
        category: "Pipeline phân phối nền tảng giáo dục",
        title: "ThinkAI Backend",
        summary: "DevSecOps delivery path cho backend nền tảng giáo dục tích hợp AI.",
        story: {
          problem: "Khi Spring Boot backend mở rộng qua service dùng chung và nhiều deployment target, phát hành thủ công khiến kiểm tra chất lượng, dependency và secret thiếu nhất quán.",
          approach: "Tôi đóng góp CI security/quality gates cùng container delivery path hai giai đoạn; repository xung quanh làm rõ ngữ cảnh MySQL, Redis, K3s, Argo CD và monitoring mà luồng này phục vụ.",
          outcome: "Kết quả là đường đi hai pod K3s với GitOps, signed image và health-check controls, được triển khai trong một repository collaboration gồm 329+ commit và 47 branch.",
        },
        diagramLabel: "Pull request → security gates → Spring Boot image → GitOps delivery path",
      },
    },
  },
];
