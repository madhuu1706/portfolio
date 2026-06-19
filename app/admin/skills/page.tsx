import type { Metadata } from 'next';
import { getSkillsRaw } from '@/lib/data';
import SkillsPageClient from './SkillsPageClient';

export const metadata: Metadata = { title: 'Skills | Admin' };

export default async function AdminSkillsPage() {
  const skills = await getSkillsRaw();
  return <SkillsPageClient skills={skills} />;
}
