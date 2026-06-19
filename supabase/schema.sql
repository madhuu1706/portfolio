-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- EXPERIENCES
-- ============================================================
create table if not exists experiences (
  id uuid primary key default uuid_generate_v4(),
  company text not null,
  role text not null,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  location text,
  bullets text[] default '{}',
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- PROJECTS
-- ============================================================
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  short_description text not null,
  problem text,
  solution text,
  tech_stack text[] default '{}',
  results text[] default '{}',
  github_link text,
  live_link text,
  images text[] default '{}',
  status text default 'draft' check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- WORKFLOW SYSTEMS
-- ============================================================
create table if not exists workflow_systems (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  problem text,
  solution text,
  tools text[] default '{}',
  outcome text,
  status text default 'draft' check (status in ('draft', 'published')),
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- SKILLS
-- ============================================================
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  skill_name text not null,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- CERTIFICATIONS
-- ============================================================
create table if not exists certifications (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  issuer text not null,
  date date not null,
  credential_url text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- RESUME FILES (track uploads)
-- ============================================================
create table if not exists resume_files (
  id uuid primary key default uuid_generate_v4(),
  file_name text not null,
  storage_path text not null,
  public_url text not null,
  is_active boolean default true,
  uploaded_at timestamptz default now()
);

-- ============================================================
-- SITE STATS (editable from admin)
-- ============================================================
create table if not exists site_stats (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  value text not null,
  display_order integer default 0
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger experiences_updated_at before update on experiences
  for each row execute function update_updated_at();

create trigger projects_updated_at before update on projects
  for each row execute function update_updated_at();

create trigger workflow_systems_updated_at before update on workflow_systems
  for each row execute function update_updated_at();

create trigger skills_updated_at before update on skills
  for each row execute function update_updated_at();

create trigger certifications_updated_at before update on certifications
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table experiences enable row level security;
alter table projects enable row level security;
alter table workflow_systems enable row level security;
alter table skills enable row level security;
alter table certifications enable row level security;
alter table contact_messages enable row level security;
alter table resume_files enable row level security;
alter table site_stats enable row level security;

-- Public read access
create policy "Public read experiences" on experiences for select using (true);
create policy "Public read projects" on projects for select using (status = 'published');
create policy "Public read workflows" on workflow_systems for select using (status = 'published');
create policy "Public read skills" on skills for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read resume_files" on resume_files for select using (is_active = true);
create policy "Public read site_stats" on site_stats for select using (true);

-- Public insert for contact
create policy "Public insert contact" on contact_messages for insert with check (true);

-- Admin full access (authenticated users)
create policy "Admin all experiences" on experiences for all using (auth.role() = 'authenticated');
create policy "Admin all projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admin all workflows" on workflow_systems for all using (auth.role() = 'authenticated');
create policy "Admin all skills" on skills for all using (auth.role() = 'authenticated');
create policy "Admin all certifications" on certifications for all using (auth.role() = 'authenticated');
create policy "Admin read contact" on contact_messages for select using (auth.role() = 'authenticated');
create policy "Admin update contact" on contact_messages for update using (auth.role() = 'authenticated');
create policy "Admin all resume_files" on resume_files for all using (auth.role() = 'authenticated');
create policy "Admin all site_stats" on site_stats for all using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET
-- Run separately in Supabase dashboard or via API
-- ============================================================
-- Create bucket: "portfolio-assets"
-- Set public: true
-- Allowed MIME types: image/*, application/pdf

-- ============================================================
-- SEED SITE STATS
-- ============================================================
insert into site_stats (label, value, display_order) values
  ('Projects Built', '12+', 1),
  ('Workflow Systems', '8+', 2),
  ('Clients Worked', '5+', 3),
  ('Automations', '20+', 4);
