import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { markMessageRead } from '@/actions';
import { formatFullDate } from '@/utils/format';
import type { ContactMessage } from '@/types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MessageDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: message } = await supabase
    .from('contact_messages')
    .select('*')
    .eq('id', id)
    .single<ContactMessage>();

  if (!message) notFound();

  // Mark as read
  if (!message.is_read) {
    await markMessageRead(id);
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/messages" className="text-xs text-secondary hover:text-primary transition-colors">← Back to messages</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">{message.subject || 'No subject'}</h1>
      </div>

      <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
        {/* Sender info */}
        <div className="p-6 border-b border-outline-variant flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-secondary">{message.name[0].toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">{message.name}</p>
            <a href={`mailto:${message.email}`} className="text-xs text-primary hover:underline">{message.email}</a>
          </div>
          <p className="ml-auto text-xs text-secondary">{formatFullDate(message.created_at)}</p>
        </div>

        {/* Message body */}
        <div className="p-6">
          <p className="text-base text-on-surface leading-relaxed whitespace-pre-wrap">{message.message}</p>
        </div>

        {/* Reply action */}
        <div className="p-6 border-t border-outline-variant bg-surface-container-low">
          <a
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject || 'Your message')}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-on-background text-surface text-sm font-semibold rounded hover:bg-secondary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply via Email
          </a>
        </div>
      </div>
    </div>
  );
}
