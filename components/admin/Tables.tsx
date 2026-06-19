'use client';

import { useTransition } from 'react';
import { Badge } from '@/components/ui';
import { formatDate, formatFullDate } from '@/utils/format';
import type { Experience, Project, WorkflowSystem, Skill, Certification, ContactMessage, ResumeFile } from '@/types';
import { deleteExperience, deleteProject, deleteWorkflow, deleteSkill, deleteCertification, deleteMessage, deleteResumeFile, markMessageRead, setActiveResume } from '@/actions';

// ============================================================
// EXPERIENCES TABLE
// ============================================================
export function ExperiencesTable({ experiences }: { experiences: Experience[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Role / Company</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Period</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Location</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {experiences.map((exp) => (
            <tr key={exp.id} className="hover:bg-surface-container-low transition-colors group">
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-on-surface">{exp.role}</p>
                <p className="text-xs text-secondary">{exp.company}</p>
              </td>
              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : '—'}
              </td>
              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">{exp.location || '—'}</td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <a href={`/admin/experiences/${exp.id}`} className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => startTransition(() => deleteExperience(exp.id))}
                    disabled={isPending}
                    className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// PROJECTS TABLE
// ============================================================
export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Project</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Status</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Date</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-surface-container-low transition-colors">
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-on-surface">{project.title}</p>
                <p className="text-xs text-secondary truncate max-w-xs">{project.short_description}</p>
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <Badge variant={project.status === 'published' ? 'success' : 'default'}>
                  {project.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </td>
              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {formatDate(project.created_at)}
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <a href={`/admin/projects/${project.id}`} className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => startTransition(() => deleteProject(project.id))}
                    disabled={isPending}
                    className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// WORKFLOWS TABLE
// ============================================================
export function WorkflowsTable({ workflows }: { workflows: WorkflowSystem[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Name</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Tools</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Status</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {workflows.map((wf) => (
            <tr key={wf.id} className="hover:bg-surface-container-low transition-colors">
              <td className="py-4 px-4">
                <p className="text-sm font-semibold text-on-surface">{wf.name}</p>
                <p className="text-xs text-secondary line-clamp-1">{wf.outcome}</p>
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {wf.tools.slice(0, 3).map((tool) => (
                    <span key={tool} className="text-xs px-2 py-0.5 bg-surface-container rounded border border-outline-variant">{tool}</span>
                  ))}
                  {wf.tools.length > 3 && <span className="text-xs text-secondary">+{wf.tools.length - 3}</span>}
                </div>
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <Badge variant={wf.status === 'published' ? 'success' : 'default'}>
                  {wf.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <a href={`/admin/workflows/${wf.id}`} className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </a>
                  <button
                    onClick={() => startTransition(() => deleteWorkflow(wf.id))}
                    disabled={isPending}
                    className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// SKILLS TABLE
// ============================================================
export function SkillsTable({ skills }: { skills: Skill[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Skill</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Category</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {skills.map((skill) => (
            <tr key={skill.id} className="hover:bg-surface-container-low transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-on-surface">{skill.skill_name}</td>
              <td className="py-3 px-4 text-sm text-secondary">{skill.category}</td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => startTransition(() => deleteSkill(skill.id))}
                  disabled={isPending}
                  className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// CERTIFICATIONS TABLE
// ============================================================
export function CertificationsTable({ certifications }: { certifications: Certification[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Name</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Issuer</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Date</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {certifications.map((cert) => (
            <tr key={cert.id} className="hover:bg-surface-container-low transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-on-surface">{cert.name}</td>
              <td className="py-3 px-4 text-sm text-secondary">{cert.issuer}</td>
              <td className="py-3 px-4 text-sm text-secondary hidden md:table-cell">{formatDate(cert.date)}</td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => startTransition(() => deleteCertification(cert.id))}
                  disabled={isPending}
                  className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// MESSAGES TABLE
// ============================================================
export function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">From</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Subject</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Date</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {messages.map((msg) => (
            <tr key={msg.id} className={`hover:bg-surface-container-low transition-colors ${!msg.is_read ? 'bg-primary/5' : ''}`}>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {!msg.is_read && <span className="w-2 h-2 rounded-full bg-primary-container shrink-0" />}
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{msg.name}</p>
                    <p className="text-xs text-secondary">{msg.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {msg.subject || <span className="italic text-secondary/60">No subject</span>}
              </td>
              <td className="py-4 px-4 text-sm text-secondary hidden md:table-cell">
                {formatFullDate(msg.created_at)}
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <a href={`/admin/messages/${msg.id}`} className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  {!msg.is_read && (
                    <button
                      onClick={() => startTransition(() => markMessageRead(msg.id))}
                      disabled={isPending}
                      className="p-1.5 text-secondary hover:text-primary rounded hover:bg-surface-container transition-colors"
                      title="Mark as read"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => startTransition(() => deleteMessage(msg.id))}
                    disabled={isPending}
                    className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================================
// RESUME TABLE
// ============================================================
export function ResumeTable({ files }: { files: ResumeFile[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">File</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary hidden md:table-cell">Uploaded</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary">Status</th>
            <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {files.map((file) => (
            <tr key={file.id} className="hover:bg-surface-container-low transition-colors">
              <td className="py-3 px-4">
                <a href={file.public_url} target="_blank" className="text-sm font-medium text-primary hover:underline">
                  {file.file_name}
                </a>
              </td>
              <td className="py-3 px-4 text-sm text-secondary hidden md:table-cell">{formatFullDate(file.uploaded_at)}</td>
              <td className="py-3 px-4">
                {file.is_active ? (
                  <Badge variant="success">Active</Badge>
                ) : (
                  <button
                    onClick={() => startTransition(() => setActiveResume(file.id))}
                    disabled={isPending}
                    className="text-xs text-secondary hover:text-primary underline transition-colors"
                  >
                    Set active
                  </button>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => startTransition(() => deleteResumeFile(file.id, file.storage_path))}
                  disabled={isPending}
                  className="p-1.5 text-secondary hover:text-error rounded hover:bg-error-container/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
