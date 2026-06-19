'use client';

import { useActionState, useState } from 'react';
import { createExperience, updateExperience } from '@/actions';
import { Button, Input, Textarea, Select } from '@/components/ui';
import type { Experience, ActionResult } from '@/types';

interface ExperienceFormProps {
  experience?: Experience;
}

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const [bullets, setBullets] = useState<string[]>(
    experience?.bullets ?? ['']
  );

  const action = experience
    ? updateExperience.bind(null, experience.id)
    : createExperience;

  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(action, null);

  const addBullet = () => setBullets([...bullets, '']);
  const removeBullet = (i: number) => setBullets(bullets.filter((_, idx) => idx !== i));
  const updateBullet = (i: number, val: string) => {
    const next = [...bullets];
    next[i] = val;
    setBullets(next);
  };

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {state && !state.success && (
        <div className="p-4 bg-error-container border border-error/30 rounded text-sm text-on-error-container">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">
          Experience saved successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Company" name="company" defaultValue={experience?.company} required />
        <Input label="Role" name="role" defaultValue={experience?.role} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Start Date" name="start_date" type="date" defaultValue={experience?.start_date?.split('T')[0]} required />
        <Input label="End Date" name="end_date" type="date" defaultValue={experience?.end_date?.split('T')[0]} />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_current"
          name="is_current"
          value="true"
          defaultChecked={experience?.is_current}
          className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
        />
        <label htmlFor="is_current" className="text-sm font-medium text-on-surface">Currently working here</label>
      </div>

      <Input label="Location" name="location" defaultValue={experience?.location ?? ''} placeholder="City, Country" />
      <Input label="Display Order" name="display_order" type="number" defaultValue={experience?.display_order ?? 0} />

      {/* Bullets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-secondary">Bullets</label>
          <button type="button" onClick={addBullet} className="text-xs font-semibold text-primary hover:text-surface-tint transition-colors">
            + Add bullet
          </button>
        </div>
        {bullets.map((bullet, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              name="bullets"
              value={bullet}
              onChange={(e) => updateBullet(i, e.target.value)}
              placeholder={`Bullet point ${i + 1}`}
              className="flex-1 px-3 py-2.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {bullets.length > 1 && (
              <button
                type="button"
                onClick={() => removeBullet(i)}
                className="p-2.5 text-secondary hover:text-error rounded border border-outline-variant hover:border-error/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isPending}>
          {experience ? 'Save Changes' : 'Create Experience'}
        </Button>
        <a href="/admin/experiences" className="px-5 py-2.5 border border-outline-variant text-on-surface text-sm font-semibold rounded hover:bg-surface-container transition-colors">
          Cancel
        </a>
      </div>
    </form>
  );
}
