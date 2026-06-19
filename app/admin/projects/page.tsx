import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/data';
import { EmptyState, Button } from '@/components/ui';
import { ProjectsTable } from '@/components/admin/Tables';

export const metadata: Metadata = { title: 'Projects | Admin' };

export default async function AdminProjectsPage() {
  const projects = await getProjects(true);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Projects</h1>
          <p className="text-sm text-secondary mt-1">
            {projects.filter((p) => p.status === 'published').length} published, {projects.filter((p) => p.status === 'draft').length} drafts
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project to get started."
          action={<Link href="/admin/projects/new"><Button>Add Project</Button></Link>}
        />
      ) : (
        <div className="overflow-x-auto">
          <ProjectsTable projects={projects} />
        </div>
      )}
    </div>
  );
}
