'use client';

import { useTransition } from 'react';
import { Badge } from '@/components/ui';
import { formatDate, formatFullDate } from '@/utils/format';
import type {
  Experience,
  Project,
  WorkflowSystem,
  Skill,
  Certification,
  ContactMessage,
  ResumeFile
} from '@/types';

import {
  deleteExperience,
  deleteProject,
  deleteWorkflow,
  deleteSkill,
  deleteCertification,
  deleteMessage,
  deleteResumeFile,
  markMessageRead,
  setActiveResume
} from '@/actions';

// EXPERIENCES
export function ExperiencesTable({ experiences }: { experiences: Experience[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {experiences.map((exp) => (
        <button
          key={exp.id}
          onClick={() => {
            startTransition(() => {
              void deleteExperience(exp.id);
            });
          }}
          disabled={isPending}
        >
          Delete
        </button>
      ))}
    </div>
  );
}

// PROJECTS
export function ProjectsTable({ projects }: { projects: Project[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => {
            startTransition(() => {
              void deleteProject(project.id);
            });
          }}
          disabled={isPending}
        >
          Delete
        </button>
      ))}
    </div>
  );
}

// WORKFLOWS
export function WorkflowsTable({ workflows }: { workflows: WorkflowSystem[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {workflows.map((wf) => (
        <button
          key={wf.id}
          onClick={() => {
            startTransition(() => {
              void deleteWorkflow(wf.id);
            });
          }}
          disabled={isPending}
        >
          Delete
        </button>
      ))}
    </div>
  );
}

// SKILLS
export function SkillsTable({ skills }: { skills: Skill[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {skills.map((skill) => (
        <button
          key={skill.id}
          onClick={() => {
            startTransition(() => {
              void deleteSkill(skill.id);
            });
          }}
          disabled={isPending}
        >
          Delete
        </button>
      ))}
    </div>
  );
}

// CERTIFICATIONS
export function CertificationsTable({
  certifications
}: {
  certifications: Certification[];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {certifications.map((cert) => (
        <button
          key={cert.id}
          onClick={() => {
            startTransition(() => {
              void deleteCertification(cert.id);
            });
          }}
          disabled={isPending}
        >
          Delete
        </button>
      ))}
    </div>
  );
}

// MESSAGES
export function MessagesTable({ messages }: { messages: ContactMessage[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          {!msg.is_read && (
            <button
              onClick={() => {
                startTransition(() => {
                  void markMessageRead(msg.id);
                });
              }}
              disabled={isPending}
            >
              Mark Read
            </button>
          )}

          <button
            onClick={() => {
              startTransition(() => {
                void deleteMessage(msg.id);
              });
            }}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// RESUME
export function ResumeTable({ files }: { files: ResumeFile[] }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {files.map((file) => (
        <div key={file.id}>
          {!file.is_active && (
            <button
              onClick={() => {
                startTransition(() => {
                  void setActiveResume(file.id);
                });
              }}
              disabled={isPending}
            >
              Set Active
            </button>
          )}

          <button
            onClick={() => {
              startTransition(() => {
                void deleteResumeFile(file.id, file.storage_path);
              });
            }}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}