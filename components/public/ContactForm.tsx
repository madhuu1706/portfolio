'use client';

import { useActionState } from 'react';
import { submitContact } from '@/actions';
import { Button, Input, Textarea } from '@/components/ui';
import type { ActionResult } from '@/types';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    submitContact,
    null
  );

  if (state?.success) {
    return (
      <div className="p-8 bg-surface-container-low border border-outline-variant rounded-lg text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-on-surface mb-2">Message sent.</h3>
        <p className="text-sm text-secondary">I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {!state?.success && state?.error && (
        <div className="p-4 bg-error-container border border-error/30 rounded text-sm text-on-error-container">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Name"
          name="name"
          placeholder="Your full name"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>

      <Input
        label="Subject"
        name="subject"
        placeholder="What's this about?"
      />

      <Textarea
        label="Message"
        name="message"
        placeholder="Your message..."
        rows={6}
        required
      />

      <Button type="submit" isLoading={isPending} size="lg">
        {isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
