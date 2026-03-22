"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docx_1 = require("docx");
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const font = 'Times New Roman';
const fontSize = 24;
const smallSize = 20;
function bold(text, size = fontSize) {
    return new docx_1.TextRun({ text, bold: true, size, font, color: '111111' });
}
function normal(text, size = fontSize) {
    return new docx_1.TextRun({ text, size, font, color: '111111' });
}
function link(text, size = fontSize) {
    return new docx_1.TextRun({ text, size, font, color: '0563C1', underline: { type: 'single' } });
}
function sectionTitle(text) {
    return new docx_1.Paragraph({
        children: [
            new docx_1.TextRun({
                text: text.toUpperCase(),
                bold: true,
                size: fontSize,
                font,
                color: '111111',
                characterSpacing: 100,
            }),
        ],
        border: {
            bottom: { color: 'AAAAAA', space: 1, style: docx_1.BorderStyle.SINGLE, size: 6 },
        },
        spacing: { after: 80, before: 200 },
    });
}
function title(text) {
    return new docx_1.Paragraph({
        children: [new docx_1.TextRun({ text, bold: true, size: 32, font, color: '111111' })],
        alignment: docx_1.AlignmentType.CENTER,
        spacing: { after: 40 },
    });
}
function subtitle(text) {
    return new docx_1.Paragraph({
        children: [new docx_1.TextRun({ text, bold: true, size: fontSize, font, color: '444444' })],
        alignment: docx_1.AlignmentType.CENTER,
        spacing: { after: 60 },
    });
}
function contactLine(children) {
    return new docx_1.Paragraph({
        children,
        alignment: docx_1.AlignmentType.CENTER,
        spacing: { after: 60 },
    });
}
function eduRow(left, right) {
    return new docx_1.Paragraph({
        children: [
            new docx_1.TextRun({ text: left, bold: true, size: fontSize, font, color: '111111' }),
            new docx_1.TextRun({ text: right, size: fontSize, font, color: '444444' }),
        ],
        spacing: { after: 40 },
    });
}
function projectTitle(text, sub) {
    return new docx_1.Paragraph({
        children: [
            new docx_1.TextRun({ text, bold: true, size: fontSize, font, color: '111111' }),
            new docx_1.TextRun({ text: sub ? ` — ${sub}` : '', size: fontSize, font, color: '666666', italics: true }),
        ],
        spacing: { before: 100, after: 20 },
    });
}
function techLine(text) {
    return new docx_1.Paragraph({
        children: [new docx_1.TextRun({ text, size: fontSize, font, color: '444444' })],
        spacing: { after: 40 },
    });
}
function bullet(text) {
    return new docx_1.Paragraph({
        children: [
            new docx_1.TextRun({ text: '• ', size: fontSize, font, color: '111111' }),
            new docx_1.TextRun({ text, size: fontSize, font, color: '111111' }),
        ],
        indent: { left: 360 },
        spacing: { after: 40 },
    });
}
function spacer() {
    return new docx_1.Paragraph({ children: [], spacing: { after: 60 } });
}
const doc = new docx_1.Document({
    styles: {
        default: {
            document: {
                run: { font, size: fontSize, color: '111111' },
            },
        },
    },
    sections: [
        {
            properties: {
                page: {
                    margin: {
                        top: 720,
                        right: 720,
                        bottom: 720,
                        left: 720,
                    },
                },
            },
            children: [
                title('Binh Minh'),
                subtitle('Backend & DevOps Engineer'),
                contactLine([
                    link('pata10102004@gmail.com'),
                    new docx_1.TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
                    new docx_1.TextRun({ text: '037 206 4929', size: fontSize, font, color: '444444' }),
                    new docx_1.TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
                    new docx_1.TextRun({ text: 'Ho Chi Minh City, Vietnam', size: fontSize, font, color: '444444' }),
                ]),
                contactLine([
                    link('github.com/bnhminh1010'),
                    new docx_1.TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
                    link('portfolio-binhminh.vercel.app'),
                ]),
                spacer(),
                new docx_1.Paragraph({
                    children: [new docx_1.TextRun({ text: '─'.repeat(85), color: '999999', size: fontSize, font })],
                    spacing: { after: 80 },
                }),
                sectionTitle('Education'),
                eduRow('Ho Chi Minh City University of Technology (HUTECH)', 'Sep 2022 – Jun 2026'),
                new docx_1.Paragraph({
                    children: [
                        new docx_1.TextRun({ text: 'Engineer in Software Engineering — GPA: 3.19 / 4.0', size: fontSize, font, color: '444444' }),
                    ],
                    spacing: { after: 40 },
                }),
                bullet('Semi-Finalist, IT Got Talent 2025'),
                bullet('Relevant Coursework: Data Structures & Algorithms, System Design, Database Management, Software Engineering, Operating Systems'),
                bullet('English: TOEIC Target 650'),
                spacer(),
                sectionTitle('Technical Skills'),
                new docx_1.Paragraph({
                    children: [
                        bold('Backend: ', fontSize),
                        normal('Node.js, NestJS, Spring Boot, .NET, Neo4j, PostgreSQL', fontSize),
                    ],
                    spacing: { after: 60 },
                }),
                new docx_1.Paragraph({
                    children: [
                        bold('DevOps: ', fontSize),
                        normal('Docker, GitOps, Linux, CI/CD (GitHub Actions), DevSecOps', fontSize),
                    ],
                    spacing: { after: 60 },
                }),
                new docx_1.Paragraph({
                    children: [
                        bold('AI-Powered Development: ', fontSize),
                        normal('Claude Code, OpenCode, Cursor, Antigravity', fontSize),
                    ],
                    spacing: { after: 60 },
                }),
                spacer(),
                sectionTitle('Experience & Projects'),
                projectTitle('Enterprise Knowledge Graph', 'Personal Project'),
                techLine('React · NestJS · Neo4j · Docker'),
                bullet('Designed and architected an internal search and knowledge visualization tool using Neo4j, mapping relationships among 80+ employees and their skill sets'),
                bullet('Implemented multi-layer caching to enable instant retrieval of 300+ graph nodes, reducing query latency by over 70%'),
                bullet('Containerized the full-stack application using Docker multi-stage builds, cutting image size by 60%'),
                spacer(),
                projectTitle('ThinkAI E-Learning Platform', 'Team Project'),
                techLine('Spring Boot · PostgreSQL · Next.js · GitHub Actions · SAST'),
                bullet('Built a monolithic core system managing the full lifecycle of online courses and user subscriptions'),
                bullet('Optimized complex database queries to support 1,000+ concurrent mock-test sessions, improving throughput by 40%'),
                bullet('Designed automated CI/CD pipelines with GitHub Actions, integrating DevSecOps practices (SAST scanning)'),
                spacer(),
                sectionTitle('Additional'),
                new docx_1.Paragraph({
                    children: [
                        normal('Passionate about clean architecture, scalable system design, and automating development workflows. Committed to writing maintainable, well-tested code and continuously improving engineering practices.'),
                    ],
                    spacing: { after: 40 },
                }),
            ],
        },
    ],
});
const outputPath = path_1.default.join(process.cwd(), 'public', 'Resume_BinhMinh.docx');
docx_1.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    console.log('Done:', outputPath);
});
