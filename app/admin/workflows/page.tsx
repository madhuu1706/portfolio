import type { Metadata } from 'next';
import Link from 'next/link';
import { getWorkflows } from '@/lib/data';
import { EmptyState, Button } from '@/components/ui';
import { WorkflowsTable } from '@/components/admin/Tables';

export const metadata: Metadata = { title: 'Workflows | Admin' };

export default async function AdminWorkflowsPage() {
  const workflows = await getWorkflows(true);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Workflow Systems</h1>
          <p className="text-sm text-secondary mt-1">{workflows.length} total</p>
        </div>
        <Link href="/admin/workflows/new"><Button>Add Workflow</Button></Link>
      </div>

      {workflows.length === 0 ? (
        <EmptyState title="No workflows yet" description="Add your first workflow system." action={<Link href="/admin/workflows/new"><Button>Add Workflow</Button></Link>} />
      ) : (
        <WorkflowsTable workflows={workflows} />
      )}
    </div>
  );
}
