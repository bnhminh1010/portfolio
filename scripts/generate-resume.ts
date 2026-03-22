import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
} from 'docx';
import * as fs from 'fs';
import path from 'path';

const font = 'Times New Roman';
const fontSize = 24;
const smallSize = 20;

function bold(text: string, size = fontSize) {
  return new TextRun({ text, bold: true, size, font, color: '111111' });
}

function normal(text: string, size = fontSize) {
  return new TextRun({ text, size, font, color: '111111' });
}

function link(text: string, size = fontSize) {
  return new TextRun({ text, size, font, color: '0563C1', underline: { type: 'single' } });
}

function sectionTitle(text: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: fontSize,
        font,
        color: '111111',
        characterSpacing: 100,
      }),
    ],
    border: {
      bottom: { color: 'AAAAAA', space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
    spacing: { after: 80, before: 200 },
  });
}

function title(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, font, color: '111111' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  });
}

function subtitle(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: fontSize, font, color: '444444' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  });
}

function contactLine(children: TextRun[]) {
  return new Paragraph({
    children,
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  });
}

function eduRow(left: string, right: string) {
  return new Paragraph({
    children: [
      new TextRun({ text: left, bold: true, size: fontSize, font, color: '111111' }),
      new TextRun({ text: right, size: fontSize, font, color: '444444' }),
    ],
    spacing: { after: 40 },
  });
}

function projectTitle(text: string, sub: string | undefined) {
  return new Paragraph({
    children: [
      new TextRun({ text, bold: true, size: fontSize, font, color: '111111' }),
      new TextRun({ text: sub ? ` — ${sub}` : '', size: fontSize, font, color: '666666', italics: true }),
    ],
    spacing: { before: 100, after: 20 },
  });
}

function techLine(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, size: fontSize, font, color: '444444' })],
    spacing: { after: 40 },
  });
}

function bullet(text: string) {
  return new Paragraph({
    children: [
      new TextRun({ text: '• ', size: fontSize, font, color: '111111' }),
      new TextRun({ text, size: fontSize, font, color: '111111' }),
    ],
    indent: { left: 360 },
    spacing: { after: 40 },
  });
}

function spacer() {
  return new Paragraph({ children: [], spacing: { after: 60 } });
}

const doc = new Document({
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
          new TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
          new TextRun({ text: '037 206 4929', size: fontSize, font, color: '444444' }),
          new TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
          new TextRun({ text: 'Ho Chi Minh City, Vietnam', size: fontSize, font, color: '444444' }),
        ]),
        contactLine([
          link('github.com/bnhminh1010'),
          new TextRun({ text: '    \u2022    ', size: fontSize, font, color: '666666' }),
          link('portfolio-binhminh.vercel.app'),
        ]),

        spacer(),

        new Paragraph({
          children: [new TextRun({ text: '─'.repeat(85), color: '999999', size: fontSize, font })],
          spacing: { after: 80 },
        }),

        sectionTitle('Education'),

        eduRow(
          'Ho Chi Minh City University of Technology (HUTECH)',
          'Sep 2022 – Jun 2026'
        ),
        new Paragraph({
          children: [
            new TextRun({ text: 'Engineer in Software Engineering — GPA: 3.19 / 4.0', size: fontSize, font, color: '444444' }),
          ],
          spacing: { after: 40 },
        }),
        bullet('Semi-Finalist, IT Got Talent 2025'),
        bullet('Relevant Coursework: Data Structures & Algorithms, System Design, Database Management, Software Engineering, Operating Systems'),
        bullet('English: TOEIC Target 650'),

        spacer(),

        sectionTitle('Technical Skills'),

        new Paragraph({
          children: [
            bold('Backend: ', fontSize),
            normal('Node.js, NestJS, Spring Boot, .NET, Neo4j, PostgreSQL', fontSize),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            bold('DevOps: ', fontSize),
            normal('Docker, GitOps, Linux, CI/CD (GitHub Actions), DevSecOps', fontSize),
          ],
          spacing: { after: 60 },
        }),
        new Paragraph({
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

        new Paragraph({
          children: [
            normal(
              'Passionate about clean architecture, scalable system design, and automating development workflows. Committed to writing maintainable, well-tested code and continuously improving engineering practices.'
            ),
          ],
          spacing: { after: 40 },
        }),
      ],
    },
  ],
});

const outputPath = path.join(process.cwd(), 'public', 'Resume_BinhMinh.docx');
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log('Done:', outputPath);
});
