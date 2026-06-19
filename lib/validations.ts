import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
  is_current: z.boolean().default(false),
  location: z.string().optional(),
  bullets: z.array(z.string()).default([]),
  display_order: z.number().int().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  short_description: z.string().min(1, 'Short description is required'),
  problem: z.string().optional(),
  solution: z.string().optional(),
  tech_stack: z.array(z.string()).default([]),
  results: z.array(z.string()).default([]),
  github_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  live_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  images: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published']).default('draft'),
  display_order: z.number().int().default(0),
});

export const workflowSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  problem: z.string().optional(),
  solution: z.string().optional(),
  tools: z.array(z.string()).default([]),
  outcome: z.string().optional(),
  status: z.enum(['draft', 'published']).default('draft'),
  display_order: z.number().int().default(0),
});

export const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  skill_name: z.string().min(1, 'Skill name is required'),
  display_order: z.number().int().default(0),
});

export const certificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  credential_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  display_order: z.number().int().default(0),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type WorkflowFormValues = z.infer<typeof workflowSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type CertificationFormValues = z.infer<typeof certificationSchema>;
