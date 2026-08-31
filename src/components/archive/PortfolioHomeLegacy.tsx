"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { AmbientOpsProps } from "@/components/AmbientOpsProps";
import { GlobalOpsField } from "@/components/GlobalOpsField";
import { InfrastructureIllustration } from "@/components/InfrastructureIllustration";
import { MotionObserver } from "@/components/MotionObserver";
import { PortfolioHeader } from "@/components/PortfolioHeader";
import { ProjectPreview } from "@/components/ProjectPreview";
import { useLanguage } from "@/context/LanguageContext";
import { copy, profile, projects } from "@/data/portfolio";

export function PortfolioHomeLegacy() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <div id="top" className="site-shell">
      <GlobalOpsField />
      <PortfolioHeader />
      <MotionObserver />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div data-motion data-motion-initial className="hero-copy motion-rise">
            <p className="availability"><span aria-hidden="true" />{text.hero.status}</p>
            <h1 id="hero-title">{text.hero.roleHeadline}</h1>
            <p className="hero-statement">{text.hero.statement}</p>
            <p className="hero-body">{text.hero.body}</p>
            <div className="hero-actions">
              <a href="#work" className="button-primary">{text.hero.primary} <ArrowDown aria-hidden="true" size={18} /></a>
              <a href="/cv" className="button-secondary">{text.hero.secondary} <ArrowDown aria-hidden="true" size={18} /></a>
            </div>
            <div className="contact-strip">
              <a href={profile.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" size={18} /> GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" size={18} /> LinkedIn</a>
              <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" size={18} /> {profile.email}</a>
            </div>
          </div>
          <div className="hero-scene">
            <p className="hero-sticker hero-sticker-top" aria-hidden="true">DELIVERY SYSTEMS</p>
            <p className="hero-sticker hero-sticker-side" aria-hidden="true">CODE → PRODUCTION</p>
            <p className="hero-sticker hero-sticker-bottom" aria-hidden="true">OBSERVE · PROTECT · DELIVER</p>
            <div className="hero-visual"><InfrastructureIllustration /></div>
          </div>
        </section>

        <section id="work" className="content-section work-section" aria-labelledby="work-title">
          <div data-motion className="section-intro section-intro-wide motion-rise motion-stage">
            <div className="section-intro-copy motion-item">
              <h2 id="work-title">{text.work.title}</h2>
              <p className="section-intro-body">{text.work.body}</p>
            </div>
          </div>

          <div className="project-list">
            {projects.map((project, index) => {
              const projectText = project.content[language];
              return (
                <article key={project.id} className={`project-case ${index % 2 ? "project-case-reversed" : ""}`}>
                  <ProjectPreview
                    project={project}
                    language={language}
                    buttonLabel={project.preview.ready ? text.work.preview : text.work.architecture}
                    motionClassName={index % 2 ? "motion-from-right" : "motion-from-left"}
                  />
                  <div data-motion className={`project-copy motion-stage ${index % 2 ? "motion-from-left" : "motion-from-right"}`}>
                    <p className="project-meta motion-item"><span>{projectText.category}</span><span>{project.period}</span></p>
                    <h3 className="motion-item">{projectText.title}</h3>
                    <p className="project-summary motion-item">{projectText.summary}</p>
                    <dl className="case-story" aria-label={language === "en" ? `${projectText.title} case study` : `Case study ${projectText.title}`}>
                      <div>
                        <dt>{text.work.storyLabels.problem}</dt>
                        <dd>{projectText.story.problem}</dd>
                      </div>
                      <div>
                        <dt>{text.work.storyLabels.approach}</dt>
                        <dd>{projectText.story.approach}</dd>
                      </div>
                      <div>
                        <dt>{text.work.storyLabels.outcome}</dt>
                        <dd>{projectText.story.outcome}</dd>
                      </div>
                    </dl>
                    <div className="project-stack motion-item">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <div className="project-actions motion-item">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button-primary live-button">
                          {text.work.live} <ArrowUpRight aria-hidden="true" size={18} />
                        </a>
                      )}
                      <a href={project.repo} target="_blank" rel="noreferrer" className="button-secondary source-button">
                        {text.work.source} <ArrowUpRight aria-hidden="true" size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="experience" className="content-section experience-section" aria-labelledby="experience-title">
          <AmbientOpsProps scene="experience" />
          <div data-motion className="section-intro motion-rise motion-stage">
            <div className="section-intro-copy motion-item">
              <h2 id="experience-title">{text.experience.title}</h2>
              <p className="section-intro-body">{text.experience.body}</p>
            </div>
          </div>
          <article data-motion className="experience-card motion-from-right motion-stage">
            <div className="experience-card-meta motion-item"><MapPin aria-hidden="true" size={18} /> {text.experience.period}</div>
            <h3 className="motion-item">{text.experience.role}</h3>
            <dl className="case-story case-story-experience">
              <div>
                <dt>{text.work.storyLabels.problem}</dt>
                <dd>{text.experience.story.problem}</dd>
              </div>
              <div>
                <dt>{text.work.storyLabels.approach}</dt>
                <dd>{text.experience.story.approach}</dd>
              </div>
              <div>
                <dt>{text.work.storyLabels.outcome}</dt>
                <dd>{text.experience.story.outcome}</dd>
              </div>
            </dl>
          </article>
        </section>

        <section id="skills" className="content-section skills-section" aria-labelledby="skills-title">
          <div data-motion className="section-intro motion-rise motion-stage">
            <div className="section-intro-copy motion-item">
              <h2 id="skills-title">{text.skills.title}</h2>
            </div>
          </div>
          <div data-motion className="skill-grid motion-rise motion-stage">
            {text.skills.groups.map((group) => (
              <section key={group.label} className="skill-group" aria-label={group.label}>
                <h3>{group.label}</h3>
                <p>{group.proof}</p>
                <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </section>
            ))}
          </div>
        </section>

        <section id="education" className="content-section education-section" aria-labelledby="education-title">
          <div data-motion className="section-intro motion-rise motion-stage">
            <div className="section-intro-copy motion-item">
              <h2 id="education-title">{text.education.title}</h2>
            </div>
          </div>
          <div data-motion className="education-card motion-from-right motion-stage">
            <p className="motion-item">{text.education.school}</p>
            <p className="motion-item">{text.education.degree}</p>
            <div id="awards" className="education-recognition motion-item">
              <span>{text.education.recognition.label}</span>
              <strong>{text.education.recognition.title}</strong>
              <em>{text.education.recognition.detail}</em>
            </div>
          </div>
        </section>

        <section id="contact" data-motion className="contact-section motion-rise" aria-labelledby="contact-title">
          <h2 id="contact-title">{text.contact.title}</h2>
          <p>{text.contact.body}</p>
          <div className="contact-actions">
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <Mail aria-hidden="true" size={18} /></a>
            <a className="button-secondary" href="/cv">{text.contact.cv} <ArrowDown aria-hidden="true" size={18} /></a>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span>© 2026 - {text.footer}</span></footer>
    </div>
  );
}

export default PortfolioHomeLegacy;
