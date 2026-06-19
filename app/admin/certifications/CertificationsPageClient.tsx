'use client';

import { useActionState } from 'react';
import { createCertification } from '@/actions';
import { Button, Input } from '@/components/ui';
import type { ActionResult, Certification } from '@/types';
import { CertificationsTable } from '@/components/admin/Tables';

function CertificationForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(createCertification, null);

  return (
    <form action={formAction} className="bg-surface border border-outline-variant rounded-lg p-6">
      <h2 className="text-sm font-semibold text-on-surface mb-4">Add New Certification</h2>
      {state && !state.success && (
        <div className="mb-4 p-3 bg-error-container border border-error/30 rounded text-sm text-on-error-container">{state.error}</div>
      )}
      {state?.success && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded text-sm text-emerald-700">Certification added.</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input label="Certification Name" name="name" required />
        <Input label="Issuer" name="issuer" required />
        <Input label="Date" name="date" type="date" required />
        <Input label="Credential URL" name="credential_url" type="url" placeholder="https://..." />
      </div>
      <Button type="submit" isLoading={isPending}>Add Certification</Button>
    </form>
  );
}

export default function CertificationsPageClient({ certifications }: { certifications: Certification[] }) {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Certifications</h1>
        <p className="text-sm text-secondary mt-1">{certifications.length} total</p>
      </div>
      <CertificationForm />
      {certifications.length > 0 && <CertificationsTable certifications={certifications} />}
    </div>
  );
}
