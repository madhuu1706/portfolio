'use client';

import { useActionState, useState } from 'react';
import { createProject, updateProject } from '@/actions';
import { Button, Input, Textarea, Select } from '@/components/ui';
import { slugify } from '@/utils/format';
import type { Project, ActionResult } from '@/types';

export default function ProjectForm({ project }: { project?: Project }) {
  const [results, setResults] = useState<string[]>(project?.results ?? ['']);
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state && !state.success && (
        <div className="p-4 bg-error-container border border-error/30 rounded text-sm text-on-error-container">{state.error}</div>
      )}
      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Project saved successfully.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Title"
          name="title"
          defaultValue={project?.title}
          required
          onChange={(e) => {
            if (!project) {
              const slugInput = document.querySelector<HTMLInputElement>('[name="slug"]');
              if (slugInput) slugInput.value = slugify(e.target.value);
            }
          }}
        />
        <Input label="Slug" name="slug" defaultValue={project?.slug} required hint="URL-safe identifier (e.g. my-project)" />
      </div>

      <Textarea label="Short Description" name="short_description" defaultValue={project?.short_description} rows={3} required />
      <Textarea label="Problem" name="problem" defaultValue={project?.problem ?? ''} rows={4} />
      <Textarea label="Solution" name="solution" defaultValue={project?.solution ?? ''} rows={4} />

      <Input
        label="Tech Stack"
        name="tech_stack"
        defaultValue={project?.tech_stack.join(', ')}
        hint="Comma-separated list, e.g. Next.js, TypeScript, Supabase"
      />

      {/* Results */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-secondary">Results</label>
          <button type="button" onClick={() => setResults([...results, ''])} className="text-xs font-semibold text-primary hover:text-surface-tint transition-colors">
            + Add result
          </button>
        </div>
        {results.map((r, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              name="results"
              value={r}
              onChange={(e) => {
                const next = [...results];
                next[i] = e.target.value;
                setResults(next);
              }}
              placeholder={`Result ${i + 1}`}
              className="flex-1 px-3 py-2.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {results.length > 1 && (
              <button type="button" onClick={() => setResults(results.filter((_, idx) => idx !== i))} className="p-2.5 text-secondary hover:text-error rounded border border-outline-variant transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="GitHub Link" name="github_link" type="url" defaultValue={project?.github_link ?? ''} placeholder="https://github.com/..." />
        <Input label="Live Link" name="live_link" type="url" defaultValue={project?.live_link ?? ''} placeholder="https://..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Select label="Status" name="status" defaultValue={project?.status ?? 'draft'}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
        <Input label="Display Order" name="display_order" type="number" defaultValue={project?.display_order ?? 0} />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isPending}>{project ? 'Save Changes' : 'Create Project'}</Button>
        <a href="/admin/projects" className="px-5 py-2.5 border border-outline-variant text-on-surface text-sm font-semibold rounded hover:bg-surface-container transition-colors">Cancel</a>
      </div>
    </form>
  );
}
