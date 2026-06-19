import type { Metadata } from 'next';
import { getCertifications } from '@/lib/data';
import CertificationsPageClient from './CertificationsPageClient';

export const metadata: Metadata = { title: 'Certifications | Admin' };

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();
  return <CertificationsPageClient certifications={certifications} />;
}
