import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/public/Navbar';
import { Footer } from '@/components/public/Footer';
import {
  Section,
  SectionHeading,
  Tag,
  Badge,
  Skeleton,
  SkeletonCard,
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

  const skillCategories = Object.entries(skills);

  return (
