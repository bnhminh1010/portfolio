"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";

export default function CVPageVI() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4 flex justify-center print:bg-white print:p-0">
      {/* Hide browser print headers/footers and force color */}
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* A4 Size Paper Wrapper */}
      <div className="w-full max-w-[210mm] bg-white border-4 border-black shadow-[16px_16px_0_0_#000] print:border-0 print:shadow-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:max-w-none text-black p-8 sm:p-12 print:p-6 relative overflow-hidden">

        {/* Decorative Brutalist Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-black -translate-y-16 translate-x-16 rotate-45 print:hidden"></div>

        {/* HEADER & ABOUT ME (CENTERED) */}
        <header className="border-b-4 border-black pb-8 print:pb-4 mb-8 print:mb-4 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl print:text-5xl font-black uppercase tracking-tighter leading-none mb-2 print:mb-1">
            Bình Minh
          </h1>
          <h2 className="text-xl md:text-2xl print:text-lg font-bold uppercase tracking-widest bg-black text-white print:bg-transparent print:text-black inline-block px-3 py-1 print:px-0 print:py-0 mb-4 print:mb-2">
            Kỹ sư Backend & DevOps
          </h2>

          {/* PERSONAL INFO */}
          <div className="flex flex-wrap justify-center gap-4 text-sm print:text-xs font-semibold mt-2 mb-6 print:mb-2 text-black">
            <a href="mailto:pata10102004@gmail.com" className="flex items-center gap-1.5 hover:underline"><Mail className="w-4 h-4 print:w-3 print:h-3" /> pata10102004@gmail.com</a>
            <a href="tel:0372064929" className="flex items-center gap-1.5 hover:underline"><Phone className="w-4 h-4 print:w-3 print:h-3" /> 037 206 4929</a>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 print:w-3 print:h-3" /> TP. Hồ Chí Minh, Việt Nam</span>
            <a href="https://portfolio-binhminh.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline"><Globe className="w-4 h-4 print:w-3 print:h-3" /> portfolio-binhminh.vercel.app</a>
          </div>

          {/* ABOUT ME (MOVED TO HEADER FOR CENTERING) */}
          <section className="max-w-2xl mx-auto">
            <p className="text-sm print:text-xs font-medium leading-relaxed">
              Sinh viên năm 4 đam mê Kiến trúc Hệ thống, Phát triển Backend và DevOps. Theo đuổi Clean Code, khả năng tối ưu hóa tính mở rộng, và tự động hoá mọi bề mặt từ quy trình luồng CI/CD đến thiết lập cơ sở hạ tầng.
            </p>
          </section>
        </header>

        {/* MAIN CONTENT BLOCK */}
        <div className="flex flex-col gap-10 print:gap-8">

          {/* ROW 1: EDUCATION & SKILLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid print:grid-cols-2 gap-8 print:gap-6">
            
            {/* EDUCATION */}
            <section>
              <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Học vấn</h3>
              <div>
                <h4 className="font-black text-base print:text-sm uppercase">Kỹ sư Kỹ thuật Phần mềm</h4>
                <p className="text-sm print:text-xs font-bold leading-tight mt-1 opacity-80">Đại học Công nghệ TP.HCM (HUTECH)</p>
                <div className="flex justify-between items-center mt-3 print:mt-2">
                  <p className="text-sm print:text-[11px] font-bold text-black/60">2022 - 2026</p>
                  <p className="text-sm print:text-[11px] font-black bg-black text-white px-3 py-1 print:px-2 print:py-0.5">GPA: 3.19</p>
                </div>
              </div>
              <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 mt-4 print:mt-3 space-y-1">
                <li><span className="font-bold opacity-80">Thành tựu:</span> Bán kết cuộc thi IT Got Talent 2025</li>
                <li><span className="font-bold opacity-80">Ngoại ngữ:</span> Đang học TOEIC band 650</li>
              </ul>
            </section>

            {/* SKILLS */}
            <section>
              <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-3 print:mb-2">Kỹ năng</h3>
              
              <div className="mb-4 print:mb-3">
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">Backend</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["NodeJS", "Spring Boot", ".NET", "Neo4j", "PostgreSQL"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold border-2 border-black px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4 print:mb-3">
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">DevOps</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["Docker", "GitOps", "Linux", "CI/CD"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold bg-black text-white px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm print:text-xs uppercase mb-1.5 opacity-80">AI Tools</h4>
                <div className="flex flex-wrap gap-2 print:gap-1.5">
                  {["ClaudeCode", "OpenCode", "Cursor", "Antigravity"].map(skill => (
                    <span key={skill} className="text-sm print:text-[11px] font-bold border-2 border-black px-2 py-0.5">{skill}</span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ROW 2: EXPERIENCE & PROJECTS */}
          <section>
            <h3 className="text-xl print:text-lg font-black uppercase border-b-2 border-black pb-1 mb-5 print:mb-4">Kinh nghiệm & Dự án</h3>

            <div className="border-2 border-black p-5 print:p-4 mt-2 print:mt-1 relative">
              <div className="absolute -top-4 left-4 bg-white px-2 print:-top-3">
                <h4 className="font-black text-lg print:text-base uppercase">Thực tập sinh Backend/DevOps</h4>
              </div>
              
              <p className="text-sm print:text-xs font-bold opacity-70 mb-5 print:mb-4 mt-2">Dự án Đồ án Môn học & NCKH | 2024 - Hiện tại</p>
              
              <div className="flex flex-col gap-8 print:gap-8">
                {/* PROJECT 1 */}
                <div>
                  <a href="https://github.com/bnhminh1010/ChatBot_Enterprise_knowledge_Graph" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">Enterprise Knowledge Graph (EKG)</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Công nghệ: React, NestJS, Neo4j, Docker</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Thiết kế cấu trúc tìm kiếm nội bộ để trực quan hóa mối quan hệ giữa hơn 80 nhân sự và bộ kỹ năng công nghệ bằng cơ sở dữ liệu đồ thị Neo4j.</li>
                    <li>Triển khai các lớp bộ đệm (caching layers) giúp load ra hơn 300 đối tượng biểu diễn nhánh đồ thị cùng lúc cực kỳ nhanh chóng.</li>
                    <li>Áp dụng Docker multi-stage builds để đóng gói toàn bộ hệ thống, qua đó tối ưu hóa và giảm triệt để dung lượng Image.</li>
                  </ul>
                </div>

                {/* PROJECT 2 */}
                <div>
                  <a href="https://github.com/ThinkAI-team/thinkai-backend" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-2 w-max mb-1">
                    <h5 className="font-black text-sm print:text-sm uppercase tracking-tight">Nền tảng học trực tuyến ThinkAI</h5>
                    <Globe className="w-4 h-4 text-black/50 print:text-black" />
                  </a>
                  <p className="text-xs print:text-[11px] font-bold mb-3 opacity-70 border-b border-black/20 pb-2">Công nghệ: Spring Boot, PostgreSQL, CI/CD, Next.js</p>
                  <ul className="text-sm print:text-xs font-medium list-disc list-outside ml-4 space-y-2 print:space-y-1.5 leading-relaxed">
                    <li>Phát triển hệ thống lõi tập trung (Monolithic) để quản lý trọn vẹn vòng đời khóa học và quyền truy cập của người dùng.</li>
                    <li>Tối ưu và mở rộng các câu mã giả truy vấn (Queries) logic phức tạp, xử lý thành công hơn 1000 lượt yêu cầu mock-test đồng thời không phát sinh lỗi tắt nghẽn.</li>
                    <li>Tự động hóa luồng triển khai CI/CD và liên tục kiểm thử bằng sức mạnh của GitHub Actions, có tích hợp chặt chẽ DevSecOps (SAST).</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* PRINT BUTTON */}
        <div className="mt-12 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-black text-white font-black uppercase px-6 py-3 border-2 border-black hover:bg-white hover:text-black hover:shadow-[8px_8px_0_0_#000] transition-all cursor-crosshair"
          >
            In / Tải PDF
          </button>
        </div>
      </div>
    </div>
  );
}
