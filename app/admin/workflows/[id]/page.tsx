import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import WorkflowForm from '../WorkflowForm';
import type { WorkflowSystem } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: 'Edit Workflow | Admin' };

export default async function EditWorkflowPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from('workflow_systems').select('*').eq('id', id).single<WorkflowSystem>();
  if (!data) notFound();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/workflows" className="text-xs text-secondary hover:text-primary transition-colors">← Back to workflows</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">Edit Workflow</h1>
        <p className="text-sm text-secondary mt-1">{data.name}</p>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <WorkflowForm workflow={data} />
      </div>
    </div>
  );
}
