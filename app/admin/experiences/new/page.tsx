import type { Metadata } from 'next';
import ExperienceForm from '../ExperienceForm';

export const metadata: Metadata = { title: 'New Experience | Admin' };

export default function NewExperiencePage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 mt-4 md:mt-8">
      <div>
        <a href="/admin/experiences" className="text-xs text-secondary hover:text-primary transition-colors">← Back to experiences</a>
        <h1 className="text-2xl font-bold text-on-surface mt-2">New Experience</h1>
      </div>
      <div className="bg-surface border border-outline-variant rounded-lg p-6 md:p-8">
        <ExperienceForm />
      </div>
    </div>
  );
}
