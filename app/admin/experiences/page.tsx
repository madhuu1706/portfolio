import type { Metadata } from 'next';
import Link from 'next/link';
import { getExperiences } from '@/lib/data';
import { EmptyState, Button } from '@/components/ui';
import { ExperiencesTable } from '@/components/admin/Tables';

export const metadata: Metadata = { title: 'Experiences | Admin' };

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Experiences</h1>
          <p className="text-sm text-secondary mt-1">{experiences.length} total entries</p>
        </div>
        <Link href="/admin/experiences/new">
          <Button>Add Experience</Button>
        </Link>
      </div>

      {experiences.length === 0 ? (
        <EmptyState
          title="No experiences yet"
          description="Add your first work experience to get started."
          action={
            <Link href="/admin/experiences/new">
              <Button>Add Experience</Button>
            </Link>
          }
        />
      ) : (
        <ExperiencesTable experiences={experiences} />
      )}
    </div>
  );
}
