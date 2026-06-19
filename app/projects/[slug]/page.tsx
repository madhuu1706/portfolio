import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Tag } from '@/components/ui';
import { getProjectBySlug, getProjects } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title,
    description: project.short_description,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export const revalidate = 60;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="bg-surface-container-low border-b border-outline-variant py-12">
          <div className="px-4 md:px-6 max-w-4xl mx-auto">
            <Link href="/projects" className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1 mb-6">
              ← Back to projects
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold text-on-background tracking-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-secondary max-w-2xl">{project.short_description}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tech_stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {project.github_link && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-outline-variant rounded text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.live_link && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-on-background text-surface rounded text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Case Study Content */}
        <div className="px-4 md:px-6 max-w-4xl mx-auto py-16 space-y-14">
          {/* Problem */}
          {project.problem && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">The Problem</h2>
              <p className="text-base text-on-surface leading-relaxed">{project.problem}</p>
            </section>
          )}

          {/* Solution */}
          {project.solution && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">The Solution</h2>
              <p className="text-base text-on-surface leading-relaxed">{project.solution}</p>
            </section>
          )}

          {/* Results */}
          {project.results.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">Results</h2>
              <ul className="space-y-3">
                {project.results.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-on-surface">
                    <span className="w-5 h-5 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Images */}
          {project.images.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((img, i) => (
                  <div key={i} className="aspect-video bg-surface-container rounded-lg overflow-hidden border border-outline-variant">
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="px-4 md:px-6 max-w-4xl mx-auto pb-16">
          <Link href="/projects" className="text-sm font-semibold text-primary hover:text-surface-tint transition-colors flex items-center gap-1">
            ← Back to all projects
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
