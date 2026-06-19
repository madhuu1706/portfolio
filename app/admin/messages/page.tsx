import type { Metadata } from 'next';
import { getContactMessages } from '@/lib/data';
import { EmptyState } from '@/components/ui';
import { MessagesTable } from '@/components/admin/Tables';

export const metadata: Metadata = { title: 'Messages | Admin' };

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Messages</h1>
        <p className="text-sm text-secondary mt-1">
          {messages.length} total · {unread} unread
        </p>
      </div>

      {messages.length === 0 ? (
        <EmptyState title="No messages yet" description="Contact form submissions will appear here." />
      ) : (
        <div className="overflow-x-auto">
          <MessagesTable messages={messages} />
        </div>
      )}
    </div>
  );
}
