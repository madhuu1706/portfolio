import type { Metadata } from 'next';
import { getExperiences, getProjects, getWorkflows, getContactMessages } from '@/lib/data';

export const metadata: Metadata = { title: 'Dashboard | Admin' };

export default async function DashboardPage() {
  const [experiences, projects, workflows, messages] = await Promise.all([
    getExperiences(),
    getProjects(true),
    getWorkflows(true),
    getContactMessages(),
  ]);

  const unread = messages.filter((m) => !m.is_read).length;
  const published = projects.filter((p) => p.status === 'published').length;

  const stats = [
    { label: 'Total Experiences', value: experiences.length, href: '/admin/experiences', icon: '💼' },
    { label: 'Projects', value: `${published} / ${projects.length}`, href: '/admin/projects', icon: '🗂️', sub: 'published' },
    { label: 'Workflow Systems', value: workflows.length, href: '/admin/workflows', icon: '⚙️' },
    { label: 'Unread Messages', value: unread, href: '/admin/messages', icon: '✉️', highlight: unread > 0 },
  ];

  const recentMessages = messages.slice(0, 5);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 mt-4 md:mt-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-on-surface">Dashboard</h1>
        <p className="text-secondary text-sm mt-1">Manage your portfolio content and track activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className={`bg-surface border rounded-lg p-5 hover:shadow-sm transition-all block ${stat.highlight ? 'border-primary/40 bg-primary/5' : 'border-outline-variant'}`}
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className={`text-2xl font-black mt-2 ${stat.highlight ? 'text-primary' : 'text-on-surface'}`}>
              {stat.value}
            </p>
            <p className="text-xs text-secondary mt-0.5">{stat.label}</p>
          </a>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Add Experience', href: '/admin/experiences/new' },
            { label: 'Add Project', href: '/admin/projects/new' },
            { label: 'Add Workflow', href: '/admin/workflows/new' },
            { label: 'Upload Resume', href: '/admin/resume' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded bg-surface text-sm font-medium text-on-surface hover:bg-surface-container hover:text-primary transition-all text-center"
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider">Recent Messages</h2>
          <a href="/admin/messages" className="text-xs font-semibold text-primary hover:text-surface-tint transition-colors">
            View all →
          </a>
        </div>

        {recentMessages.length === 0 ? (
          <div className="bg-surface border border-outline-variant rounded-lg p-8 text-center">
            <p className="text-sm text-secondary">No messages yet.</p>
          </div>
        ) : (
          <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
            {recentMessages.map((msg, i) => (
              <a
                key={msg.id}
                href={`/admin/messages/${msg.id}`}
                className={`flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors ${i < recentMessages.length - 1 ? 'border-b border-outline-variant' : ''} ${!msg.is_read ? 'bg-primary/5' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-secondary">{msg.name[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-on-surface truncate">{msg.name}</p>
                    {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary-container shrink-0" />}
                  </div>
                  <p className="text-xs text-secondary truncate">{msg.message.slice(0, 80)}...</p>
                </div>
                <span className="text-xs text-secondary shrink-0">
                  {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
