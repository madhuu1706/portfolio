export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Experience {
  id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string | null;
  bullets: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  problem: string | null;
  solution: string | null;
  tech_stack: string[];
  results: string[];
  github_link: string | null;
  live_link: string | null;
  images: string[];
  status: 'draft' | 'published';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowSystem {
  id: string;
  name: string;
  problem: string | null;
  solution: string | null;
  tools: string[];
  outcome: string | null;
  status: 'draft' | 'published';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  category: string;
  skill_name: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ResumeFile {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  is_active: boolean;
  uploaded_at: string;
}

export interface SiteStat {
  id: string;
  label: string;
  value: string;
  display_order: number;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ExperienceFormData {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  location: string;
  bullets: string[];
  display_order: number;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  short_description: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  results: string[];
  github_link: string;
  live_link: string;
  images: string[];
  status: 'draft' | 'published';
  display_order: number;
}

export interface WorkflowFormData {
  name: string;
  problem: string;
  solution: string;
  tools: string[];
  outcome: string;
  status: 'draft' | 'published';
  display_order: number;
}

export interface SkillFormData {
  category: string;
  skill_name: string;
  display_order: number;
}

export interface CertificationFormData {
  name: string;
  issuer: string;
  date: string;
  credential_url: string;
  display_order: number;
}

// API Response types
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
