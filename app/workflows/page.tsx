import type { Metadata } from 'next';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Section, SectionHeading, Tag, EmptyState } from '@/components/ui';
import { getWorkflows } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Workflow Systems',
  description: 'AI-powered workflow systems and automation built by Madhumithan P R.',
};

export const revalidate = 60;

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Section>
          <SectionHeading
            title="Workflow Systems"
            subtitle="Automation and operational systems I've architected to eliminate repetitive work and scale output."
          />

          {workflows.length === 0 ? (
            <EmptyState title="No workflows yet" description="Workflow systems will appear here." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workflows.map((wf) => (
                <div key={wf.id} className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
                  <h2 className="text-base font-bold text-on-background mb-5">{wf.name}</h2>

                  <div className="space-y-4 mb-6">
                    {wf.problem && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-1">Problem</span>
                        <p className="text-sm text-secondary leading-relaxed">{wf.problem}</p>
                      </div>
                    )}
                    {wf.solution && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-1">Solution</span>
                        <p className="text-sm text-secondary leading-relaxed">{wf.solution}</p>
                      </div>
                    )}
                    {wf.outcome && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-1">Outcome</span>
                        <p className="text-sm text-on-surface font-medium leading-relaxed">{wf.outcome}</p>
                      </div>
                    )}
                  </div>

                  {wf.tools.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-2">Tools Used</span>
                      <div className="flex flex-wrap gap-1.5">
                        {wf.tools.map((tool) => (
                          <Tag key={tool}>{tool}</Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </main>
      <Footer />
    </>
  );
}
