import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import ExperienceForm from '../ExperienceForm';
import type { Experience } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: 'Edit Experience | Admin' };

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('experiences').select('*').eq('id', id).single<Experience>();
  if (!data) notFound();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/experiences" className="text-xs text-secondary hover:text-primary transition-colors">← Back to experiences</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">Edit Experience</h1>
        <p className="text-sm text-secondary mt-1">{data.role} at {data.company}</p>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <ExperienceForm experience={data} />
      </div>
    </div>
  );
}
