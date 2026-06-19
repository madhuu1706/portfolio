import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Section, SectionHeading, Tag, Badge, Skeleton, SkeletonCard } from '@/components/ui';
import {
  getExperiences,
  getProjects,
  getWorkflows,
  getSkills,
  getCertifications,
  getSiteStats,
} from '@/lib/data';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function generateStaticParams() {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
export const revalidate = 60;

export default async function HomePage() {
  const [experiences, projects, workflows, skills, certifications, stats] = await Promise.all([
    getExperiences(),
    getProjects(),
    getWorkflows(),
    getSkills(),
    getCertifications(),
    getSiteStats(),
  ]);

  const skillCategories = Object.entries(skills);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ============================================================ */}
        {/* HERO */}
        {/* ============================================================ */}
        <section id="home" className="px-4 md:px-6 max-w-6xl mx-auto py-20 md:py-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-secondary uppercase">Open to opportunities</span>
              </div>

              <div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-background leading-tight mb-4">
                  MADHUMITHAN<br />
                  <span className="text-primary">P R</span>
                </h1>
                <p className="text-base md:text-lg font-semibold text-secondary">
                  Program Operations · Learner Success · Product Ops · AI Workflow Systems
                </p>
              </div>

              <p className="text-base text-secondary leading-relaxed max-w-lg">
                I build robust operational systems, streamline workflows, and ensure seamless product execution. Passionate about bridging the gap between strategy and execution through data-driven automation.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-on-background text-surface text-sm font-semibold rounded hover:bg-secondary transition-colors"
                >
                  Contact Me
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 border border-outline-variant text-on-surface text-sm font-semibold rounded hover:bg-surface-container transition-colors"
                >
                  View Work
                </Link>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-outline-variant overflow-hidden bg-surface-container">
                  <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
                    <span className="text-6xl font-black text-primary opacity-20">M</span>
                  </div>
                </div>
                {/* Accent decoration */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border border-outline-variant bg-surface-container-low" />
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full border border-outline-variant bg-surface" />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS */}
        {/* ============================================================ */}
        <div className="bg-surface-container-low border-y border-outline-variant py-12">
          <div className="px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.length > 0
                ? stats.map((stat) => (
                    <div key={stat.id} className="bg-surface border border-outline-variant p-6 rounded-lg text-center">
                      <p className="text-3xl font-black text-primary-container">{stat.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-secondary mt-1">{stat.label}</p>
                    </div>
                  ))
                : [
                    { value: '12+', label: 'Projects Built' },
                    { value: '8+', label: 'Workflow Systems' },
                    { value: '5+', label: 'Clients Worked' },
                    { value: '20+', label: 'Automations' },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface border border-outline-variant p-6 rounded-lg text-center">
                      <p className="text-3xl font-black text-primary-container">{s.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-wider text-secondary mt-1">{s.label}</p>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ABOUT */}
        {/* ============================================================ */}
        <Section id="about">
          <SectionHeading title="About Me" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 h-64 md:h-96 bg-surface-container rounded-lg border border-outline-variant overflow-hidden flex items-center justify-center">
              <span className="text-8xl font-black text-outline-variant">M</span>
            </div>
            <div className="md:col-span-7 flex flex-col gap-5">
              <p className="text-lg text-on-surface leading-relaxed">
                I am a systematic problem solver focused on optimizing operations and enhancing learner success. My approach combines analytical thinking with technical workflow automation to remove friction from processes.
              </p>
              <p className="text-base text-secondary leading-relaxed">
                With a background spanning program operations, social media management, and product strategy, I bring a holistic view to building operational infrastructure. I thrive in environments where data meets design, ensuring that teams can focus on high-impact work rather than repetitive tasks.
              </p>
              <p className="text-base text-secondary leading-relaxed">
                Whether it's building an AI-driven content pipeline or establishing a robust CRM automation system, my goal is always the same: efficiency, clarity, and scalable growth.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Operations', 'Automation', 'Data Analysis', 'Content Strategy', 'Product Thinking'].map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ============================================================ */}
        {/* EXPERIENCE */}
        {/* ============================================================ */}
        <Section id="experience" alt>
          <SectionHeading
            title="Experience"
            subtitle="A timeline of roles where I've built systems, managed programs, and driven results."
          />
          {experiences.length === 0 ? (
            <div className="space-y-6">
              {[1, 2].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="relative pl-6 md:pl-0">
              <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-px bg-outline-variant md:-translate-x-1/2" />
              {experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className={`relative mb-10 md:flex justify-between items-start w-full ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`hidden md:block w-5/12 ${idx % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <span className="text-xs font-semibold text-primary-container">
                      {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                    </span>
                  </div>
                  <div className="absolute left-[-21px] md:left-1/2 w-3 h-3 bg-on-background rounded-full md:-translate-x-1/2 z-10 mt-5 border-4 border-surface-container-low" />
                  <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} bg-surface border border-outline-variant rounded-lg p-6`}>
                    <h3 className="text-base font-bold text-on-background mb-0.5">{exp.role}</h3>
                    <p className="text-xs font-semibold text-secondary mb-3">{exp.company}</p>
                    <p className="md:hidden text-xs text-primary-container mb-3">
                      {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                    </p>
                    {exp.location && <p className="text-xs text-secondary mb-3">{exp.location}</p>}
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="w-1 h-1 rounded-full bg-primary-container mt-2 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link href="/experience" className="text-sm font-semibold text-primary hover:text-surface-tint transition-colors flex items-center gap-1">
              View all experience →
            </Link>
          </div>
        </Section>

        {/* ============================================================ */}
        {/* PROJECTS */}
        {/* ============================================================ */}
        <Section id="projects">
          <SectionHeading
            title="Projects"
            subtitle="Selected work across automation, operations, and web development."
          />
          {projects.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group block bg-surface border border-outline-variant rounded-lg p-6 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <h3 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-secondary leading-relaxed mb-4 line-clamp-3">{project.short_description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link href="/projects" className="text-sm font-semibold text-primary hover:text-surface-tint transition-colors flex items-center gap-1">
              View all projects →
            </Link>
          </div>
        </Section>

        {/* ============================================================ */}
        {/* WORKFLOWS */}
        {/* ============================================================ */}
        <Section id="workflows" alt>
          <SectionHeading
            title="Workflow Systems"
            subtitle="Automation and operational systems I've built to eliminate repetitive work."
          />
          {workflows.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workflows.slice(0, 4).map((wf) => (
                <div key={wf.id} className="bg-surface border border-outline-variant rounded-lg p-6">
                  <h3 className="font-bold text-on-surface mb-3">{wf.name}</h3>
                  {wf.problem && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Problem</span>
                      <p className="text-sm text-secondary mt-1">{wf.problem}</p>
                    </div>
                  )}
                  {wf.outcome && (
                    <div className="mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Outcome</span>
                      <p className="text-sm text-secondary mt-1">{wf.outcome}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {wf.tools.map((tool) => (
                      <Tag key={tool}>{tool}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <Link href="/workflows" className="text-sm font-semibold text-primary hover:text-surface-tint transition-colors flex items-center gap-1">
              View all workflows →
            </Link>
          </div>
        </Section>

        {/* ============================================================ */}
        {/* SKILLS */}
        {/* ============================================================ */}
        <Section id="skills">
          <SectionHeading title="Skills" />
          {skillCategories.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map(([category, skillList]) => (
                <div key={category} className="bg-surface border border-outline-variant rounded-lg p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* ============================================================ */}
        {/* CERTIFICATIONS */}
        {/* ============================================================ */}
        {certifications.length > 0 && (
          <Section id="certifications" alt>
            <SectionHeading title="Certifications" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-surface border border-outline-variant rounded-lg p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{cert.name}</p>
                    <p className="text-xs text-secondary mt-0.5">{cert.issuer}</p>
                    <p className="text-xs text-secondary mt-0.5">{formatDate(cert.date)}</p>
                    {cert.credential_url && (
                      <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">
                        View credential →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ============================================================ */}
        {/* CONTACT CTA */}
        {/* ============================================================ */}
        <Section id="contact">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-background mb-4">Let's work together.</h2>
            <p className="text-secondary text-base leading-relaxed mb-8">
              I'm open to internships, full-time roles, and freelance projects. If you have an opportunity or just want to connect, reach out.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-on-background text-surface font-semibold rounded hover:bg-secondary transition-colors"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
