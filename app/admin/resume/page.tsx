import type { Metadata } from 'next';
import { getAllResumeFiles } from '@/lib/data';
import ResumePageClient from './ResumePageClient';

export const metadata: Metadata = { title: 'Resume | Admin' };

export default async function AdminResumePage() {
  const files = await getAllResumeFiles();
  return <ResumePageClient files={files} />;
}
