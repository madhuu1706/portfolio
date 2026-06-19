import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Section, SectionHeading, Tag, EmptyState, SkeletonCard } from '@/components/ui';
import { getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects across automation, operations, and web development by Madhumithan P R.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Section>
          <SectionHeading
            title="Projects"
            subtitle="Selected work across automation, AI systems, operations, and web development."
          />

          {projects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              description="Projects will appear here once published."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col bg-surface border border-outline-variant rounded-lg p-6 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  {/* Icon placeholder */}
                  <div className="w-10 h-10 rounded bg-surface-container border border-outline-variant flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  <h2 className="font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{project.title}</h2>
                  <p className="text-sm text-secondary leading-relaxed mb-4 flex-1">{project.short_description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                    {project.tech_stack.length > 4 && (
                      <span className="text-xs text-secondary self-center">+{project.tech_stack.length - 4}</span>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-outline-variant flex items-center gap-3">
                    {project.github_link && (
                      <span className="text-xs text-secondary">GitHub</span>
                    )}
                    {project.live_link && (
                      <span className="text-xs text-secondary">Live Demo</span>
                    )}
                    <span className="ml-auto text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                      View case study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
