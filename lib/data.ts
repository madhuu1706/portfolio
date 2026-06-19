import { createClient } from '@/lib/supabase/server';
import type {
  Experience,
  Project,
  WorkflowSystem,
  Skill,
  Certification,
  ContactMessage,
  ResumeFile,
  SiteStat,
} from '@/types';

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('display_order', { ascending: true })
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }
  return data ?? [];
}

export async function getProjects(adminView = false): Promise<Project[]> {
  const supabase = await createClient();
  let query = supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (!adminView) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data;
}

export async function getWorkflows(adminView = false): Promise<WorkflowSystem[]> {
  const supabase = await createClient();
  let query = supabase
    .from('workflow_systems')
    .select('*')
    .order('display_order', { ascending: true });

  if (!adminView) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
  return data ?? [];
}

export async function getSkills(): Promise<Record<string, string[]>> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    return {};
  }

  const grouped: Record<string, string[]> = {};
  for (const skill of data ?? []) {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill.skill_name);
  }
  return grouped;
}

export async function getSkillsRaw(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('display_order', { ascending: true })
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
  return data ?? [];
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
  return data ?? [];
}

export async function getActiveResume(): Promise<ResumeFile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resume_files')
    .select('*')
    .eq('is_active', true)
    .order('uploaded_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getAllResumeFiles(): Promise<ResumeFile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('resume_files')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getSiteStats(): Promise<SiteStat[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_stats')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) return [];
  return data ?? [];
}
