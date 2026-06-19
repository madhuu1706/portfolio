'use client';

import { useActionState } from 'react';
import { createWorkflow, updateWorkflow } from '@/actions';
import { Button, Input, Textarea, Select } from '@/components/ui';
import type { WorkflowSystem, ActionResult } from '@/types';

export default function WorkflowForm({ workflow }: { workflow?: WorkflowSystem }) {
  const action = workflow ? updateWorkflow.bind(null, workflow.id) : createWorkflow;
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state && !state.success && (
        <div className="p-4 bg-error-container border border-error/30 rounded text-sm text-on-error-container">{state.error}</div>
      )}
      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Workflow saved successfully.</div>
      )}

      <Input label="Name" name="name" defaultValue={workflow?.name} required />
      <Textarea label="Problem" name="problem" defaultValue={workflow?.problem ?? ''} rows={3} />
      <Textarea label="Solution" name="solution" defaultValue={workflow?.solution ?? ''} rows={3} />
      <Input label="Tools" name="tools" defaultValue={workflow?.tools.join(', ')} hint="Comma-separated, e.g. n8n, Supabase, OpenAI" />
      <Textarea label="Outcome" name="outcome" defaultValue={workflow?.outcome ?? ''} rows={3} />

      <div className="grid grid-cols-2 gap-5">
        <Select label="Status" name="status" defaultValue={workflow?.status ?? 'draft'}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
        <Input label="Display Order" name="display_order" type="number" defaultValue={workflow?.display_order ?? 0} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isPending}>{workflow ? 'Save Changes' : 'Create Workflow'}</Button>
        <a href="/admin/workflows" className="px-5 py-2.5 border border-outline-variant text-on-surface text-sm font-semibold rounded hover:bg-surface-container transition-colors">Cancel</a>
      </div>
    </form>
  );
}
