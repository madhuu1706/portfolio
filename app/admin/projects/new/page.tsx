import type { Metadata } from 'next';
import ProjectForm from '../ProjectForm';

export const metadata: Metadata = { title: 'New Project | Admin' };

export default function NewProjectPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/projects" className="text-xs text-secondary hover:text-primary transition-colors">← Back to projects</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">New Project</h1>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <ProjectForm />
      </div>
    </div>
  );
}
