'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  contactSchema,
  experienceSchema,
  projectSchema,
  workflowSchema,
  skillSchema,
  certificationSchema,
} from '@/lib/validations';
import type { ActionResult } from '@/types';

// ============================================================
// AUTH ACTIONS
// ============================================================

export async function signIn(
  prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/admin/dashboard');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

// ============================================================
// CONTACT ACTIONS
// ============================================================

export async function submitContact(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').insert(result.data);

  if (error) {
    return { success: false, error: 'Failed to send message. Please try again.' };
  }

  return { success: true, data: undefined };
}

// ============================================================
// EXPERIENCE ACTIONS
// ============================================================

export async function createExperience(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const bullets = formData.getAll('bullets') as string[];
  const raw = {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || undefined,
    is_current: formData.get('is_current') === 'true',
    location: formData.get('location') as string,
    bullets: bullets.filter(Boolean),
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = experienceSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.errors[0].message };
  }

  const { error } = await supabase.from('experiences').insert(result.data);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/experiences');
  revalidatePath('/');
  return { success: true, data: undefined };
}

export async function updateExperience(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const bullets = formData.getAll('bullets') as string[];
  const raw = {
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    start_date: formData.get('start_date') as string,
    end_date: formData.get('end_date') as string || undefined,
    is_current: formData.get('is_current') === 'true',
    location: formData.get('location') as string,
    bullets: bullets.filter(Boolean),
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = experienceSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('experiences').update(result.data).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/experiences');
  revalidatePath('/');
  return { success: true, data: undefined };
}

export async function deleteExperience(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/experiences');
  revalidatePath('/');
  return { success: true, data: undefined };
}

// ============================================================
// PROJECT ACTIONS
// ============================================================

export async function createProject(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('short_description') as string,
    problem: formData.get('problem') as string,
    solution: formData.get('solution') as string,
    tech_stack: (formData.get('tech_stack') as string).split(',').map((s) => s.trim()).filter(Boolean),
    results: formData.getAll('results') as string[],
    github_link: formData.get('github_link') as string,
    live_link: formData.get('live_link') as string,
    images: [],
    status: formData.get('status') as 'draft' | 'published',
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('projects').insert(result.data);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true, data: undefined };
}

export async function updateProject(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    short_description: formData.get('short_description') as string,
    problem: formData.get('problem') as string,
    solution: formData.get('solution') as string,
    tech_stack: (formData.get('tech_stack') as string).split(',').map((s) => s.trim()).filter(Boolean),
    results: formData.getAll('results') as string[],
    github_link: formData.get('github_link') as string,
    live_link: formData.get('live_link') as string,
    status: formData.get('status') as 'draft' | 'published',
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = projectSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('projects').update(result.data).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true, data: undefined };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true, data: undefined };
}

// ============================================================
// WORKFLOW ACTIONS
// ============================================================

export async function createWorkflow(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    name: formData.get('name') as string,
    problem: formData.get('problem') as string,
    solution: formData.get('solution') as string,
    tools: (formData.get('tools') as string).split(',').map((s) => s.trim()).filter(Boolean),
    outcome: formData.get('outcome') as string,
    status: formData.get('status') as 'draft' | 'published',
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = workflowSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('workflow_systems').insert(result.data);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/workflows');
  revalidatePath('/workflows');
  return { success: true, data: undefined };
}

export async function updateWorkflow(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    name: formData.get('name') as string,
    problem: formData.get('problem') as string,
    solution: formData.get('solution') as string,
    tools: (formData.get('tools') as string).split(',').map((s) => s.trim()).filter(Boolean),
    outcome: formData.get('outcome') as string,
    status: formData.get('status') as 'draft' | 'published',
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = workflowSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('workflow_systems').update(result.data).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/workflows');
  revalidatePath('/workflows');
  return { success: true, data: undefined };
}

export async function deleteWorkflow(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('workflow_systems').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/workflows');
  revalidatePath('/workflows');
  return { success: true, data: undefined };
}

// ============================================================
// SKILL ACTIONS
// ============================================================

export async function createSkill(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    category: formData.get('category') as string,
    skill_name: formData.get('skill_name') as string,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = skillSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('skills').insert(result.data);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/skills');
  revalidatePath('/');
  return { success: true, data: undefined };
}

export async function deleteSkill(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/skills');
  revalidatePath('/');
  return { success: true, data: undefined };
}

// ============================================================
// CERTIFICATION ACTIONS
// ============================================================

export async function createCertification(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const raw = {
    name: formData.get('name') as string,
    issuer: formData.get('issuer') as string,
    date: formData.get('date') as string,
    credential_url: formData.get('credential_url') as string,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const result = certificationSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0].message };

  const { error } = await supabase.from('certifications').insert(result.data);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/certifications');
  revalidatePath('/');
  return { success: true, data: undefined };
}

export async function deleteCertification(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('certifications').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/certifications');
  revalidatePath('/');
  return { success: true, data: undefined };
}

// ============================================================
// RESUME ACTIONS
// ============================================================

export async function setActiveResume(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  // Deactivate all
  await supabase.from('resume_files').update({ is_active: false }).neq('id', id);
  // Activate this one
  const { error } = await supabase.from('resume_files').update({ is_active: true }).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/resume');
  revalidatePath('/resume');
  return { success: true, data: undefined };
}

export async function deleteResumeFile(id: string, storagePath: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  await supabase.storage.from('portfolio-assets').remove([storagePath]);
  const { error } = await supabase.from('resume_files').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/resume');
  return { success: true, data: undefined };
}

// ============================================================
// MESSAGE ACTIONS
// ============================================================

export async function markMessageRead(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: true })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/messages');
  return { success: true, data: undefined };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/messages');
  return { success: true, data: undefined };
}
