import type { Metadata } from 'next';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import { Section, SectionHeading, EmptyState } from '@/components/ui';
import { getExperiences } from '@/lib/data';
import { formatDate } from '@/utils/format';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience and career history of Madhumithan P R.',
};

export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Section>
          <SectionHeading
            title="Experience"
            subtitle="My professional journey across operations, marketing, and product management."
          />

          {experiences.length === 0 ? (
            <EmptyState title="No experiences yet" description="Work history will appear here." />
          ) : (
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-on-background">{exp.role}</h2>
                      <p className="text-sm font-semibold text-secondary">{exp.company}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold text-primary-container">
                        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : ''}
                      </p>
                      {exp.location && <p className="text-xs text-secondary mt-0.5">{exp.location}</p>}
                    </div>
                  </div>

                  {exp.bullets.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
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
