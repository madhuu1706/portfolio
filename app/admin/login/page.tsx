'use client';

import { useActionState } from 'react';
import { signIn } from '@/actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, null);

  return (
    <div className="min-h-screen bg-surface-container-low flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-on-background items-center justify-center mb-4">
            <span className="text-surface font-black text-xl">M</span>
          </div>
          <h1 className="text-xl font-bold text-on-surface">Admin Access</h1>
          <p className="text-sm text-secondary mt-1">Sign in to manage your portfolio</p>
        </div>

        <div className="bg-surface border border-outline-variant rounded-lg p-6">
          {state?.error && (
            <div className="mb-4 p-3 bg-error-container border border-error/30 rounded text-sm text-on-error-container">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full px-3 py-2.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-outline-variant rounded bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-on-background text-surface text-sm font-semibold rounded hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-secondary mt-4">
          <a href="/" className="hover:text-primary transition-colors">← Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}
