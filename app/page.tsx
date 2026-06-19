import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import {
  Section,
  SectionHeading,
  Tag,
  Badge,
} from '@/components/ui';

import {
  getExperiences,
  getProjects,
  getWorkflows,
  getSkills,
  getCertifications,
  getSiteStats,
} from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [
    experiences,
    projects,
    workflows,
    skills,
    certifications,
    stats,
  ] = await Promise.all([
    getExperiences(),
    getProjects(),
    getWorkflows(),
    getSkills(),
    getCertifications(),
    getSiteStats(),
  ]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Section>
          <SectionHeading>Portfolio</SectionHeading>

          <p>Experiences: {experiences.length}</p>
          <p>Projects: {projects.length}</p>
          <p>Workflows: {workflows.length}</p>
          <p>Certifications: {certifications.length}</p>
        </Section>
      </main>

      <Footer />
    </>
  );
}
