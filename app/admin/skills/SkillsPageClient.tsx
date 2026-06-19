'use client';

import { useActionState } from 'react';
import { createSkill } from '@/actions';
import { Button, Input } from '@/components/ui';
import type { ActionResult, Skill } from '@/types';
import { SkillsTable } from '@/components/admin/Tables';

function SkillForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(createSkill, null);

  return (
    <form action={formAction} className="bg-surface border border-outline-variant rounded-lg p-6">
      <h2 className="text-sm font-semibold text-on-surface mb-4">Add New Skill</h2>
      {state && !state.success && (
        <div className="mb-4 p-3 bg-error-container border border-error/30 rounded text-sm text-on-error-container">{state.error}</div>
      )}
      {state?.success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Skill added.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <Input label="Category" name="category" placeholder="e.g. Frontend" required />
        <Input label="Skill Name" name="skill_name" placeholder="e.g. React" required />
        <Button type="submit" isLoading={isPending}>Add Skill</Button>
      </div>
    </form>
  );
}

export default function SkillsPageClient({ skills }: { skills: Skill[] }) {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Skills</h1>
        <p className="text-sm text-secondary mt-1">{skills.length} total skills</p>
      </div>
      <SkillForm />
      {skills.length > 0 && <SkillsTable skills={skills} />}
    </div>
  );
}
