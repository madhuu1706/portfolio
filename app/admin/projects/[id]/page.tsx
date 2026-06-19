import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import ProjectForm from '../ProjectForm';
import type { Project } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: 'Edit Project | Admin' };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('projects').select('*').eq('id', id).single<Project>();
  if (!data) notFound();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/projects" className="text-xs text-secondary hover:text-primary transition-colors">← Back to projects</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">Edit Project</h1>
        <p className="text-sm text-secondary mt-1">{data.title}</p>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <ProjectForm project={data} />
      </div>
    </div>
  );
}
