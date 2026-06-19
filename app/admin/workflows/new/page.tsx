import type { Metadata } from 'next';
import WorkflowForm from '../WorkflowForm';

export const metadata: Metadata = { title: 'New Workflow | Admin' };

export default function NewWorkflowPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/workflows" className="text-xs text-secondary hover:text-primary transition-colors">← Back to workflows</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">New Workflow System</h1>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <WorkflowForm />
      </div>
    </div>
  );
}
