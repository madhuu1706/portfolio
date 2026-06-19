# Madhumithan P R — Portfolio

A full-stack portfolio + admin CMS built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components, Server Actions)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database + Auth + Storage**: Supabase
- **Deployment**: Vercel
- **Validation**: Zod

---

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                    # Public homepage (all sections)
│   ├── layout.tsx                  # Root layout + metadata
│   ├── globals.css
│   ├── not-found.tsx
│   ├── projects/
│   │   ├── page.tsx                # All projects listing
│   │   └── [slug]/page.tsx         # Case study detail
│   ├── experience/page.tsx
│   ├── workflows/page.tsx
│   ├── contact/page.tsx
│   ├── resume/page.tsx             # Redirects to active PDF
│   └── admin/
│       ├── page.tsx                # Redirects to /admin/dashboard
│       ├── layout.tsx              # Admin layout with sidebar
│       ├── login/page.tsx
│       ├── dashboard/page.tsx
│       ├── experiences/
│       │   ├── page.tsx            # List
│       │   ├── ExperienceForm.tsx  # Shared form component
│       │   ├── new/page.tsx
│       │   └── [id]/page.tsx       # Edit
│       ├── projects/
│       │   ├── page.tsx
│       │   ├── ProjectForm.tsx
│       │   ├── new/page.tsx
│       │   └── [id]/page.tsx
│       ├── workflows/
│       │   ├── page.tsx
│       │   ├── WorkflowForm.tsx
│       │   ├── new/page.tsx
│       │   └── [id]/page.tsx
│       ├── skills/
│       │   ├── page.tsx
│       │   └── SkillsPageClient.tsx
│       ├── certifications/
│       │   ├── page.tsx
│       │   └── CertificationsPageClient.tsx
│       ├── resume/
│       │   ├── page.tsx
│       │   └── ResumePageClient.tsx
│       └── messages/
│           ├── page.tsx
│           └── [id]/page.tsx
├── components/
│   ├── ui/index.tsx                # Button, Input, Badge, Skeleton, etc.
│   ├── public/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ContactForm.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       └── Tables.tsx              # All CRUD tables
├── lib/
│   ├── data.ts                     # All data fetching functions
│   ├── validations.ts              # Zod schemas
│   └── supabase/
│       ├── client.ts               # Browser client
│       ├── server.ts               # Server client
│       └── middleware.ts           # Session management
├── actions/index.ts                # All Server Actions (CRUD + Auth)
├── types/index.ts                  # TypeScript interfaces
├── utils/
│   ├── cn.ts                       # clsx + tailwind-merge
│   └── format.ts                   # Date + slug utilities
├── middleware.ts                   # Route protection
├── supabase/schema.sql             # Full DB schema
└── .env.example
```

---

## Step 1 — Supabase Setup

### 1.1 Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Choose a name, database password, and region
4. Wait for the project to finish provisioning

### 1.2 Run the database schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and click **Run**

This creates all tables, RLS policies, triggers, and seeds the initial stats.

### 1.3 Create the storage bucket

1. Go to **Storage** in the sidebar
2. Click **New Bucket**
3. Name it exactly: `portfolio-assets`
4. Toggle **Public bucket** ON
5. Click **Save**

### 1.4 Create your admin user

1. Go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter your email and a strong password
4. This user will be the only one with admin access

### 1.5 Get your API keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Step 2 — Local Development

### 2.1 Clone and install

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

### 2.2 Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.3 Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public portfolio.  
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

---

## Step 3 — Vercel Deployment

### 3.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/portfolio.git
git push -u origin main
```

### 3.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no framework config needed

### 3.3 Add environment variables in Vercel

In your Vercel project → **Settings** → **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project-ref.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |

### 3.4 Configure Supabase for your domain

1. In Supabase → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Redirect URLs**: `https://your-domain.vercel.app/**`
3. Set **Site URL** to: `https://your-domain.vercel.app`

### 3.5 Deploy

```bash
# Trigger a new deployment
git push origin main
```

Or just click **Redeploy** in the Vercel dashboard.

---

## Step 4 — Populate Your Portfolio

Log into `/admin/login` with your Supabase credentials and:

1. **Dashboard** — Overview of all content
2. **Experiences** → Add Work → Experience → Save → It appears on homepage
3. **Projects** → Add Project → Set status to Published
4. **Workflows** → Document your automation systems
5. **Skills** → Add skills by category
6. **Certifications** → Add certs with credential links
7. **Resume** → Upload PDF → automatically set as active and linked from `/resume`
8. **Messages** → View all contact form submissions

---

## Route Reference

### Public

| Route | Description |
|-------|-------------|
| `/` | Full homepage with all sections |
| `/projects` | Projects grid |
| `/projects/[slug]` | Project case study |
| `/experience` | Full experience timeline |
| `/workflows` | Workflow systems |
| `/contact` | Contact form |
| `/resume` | Redirects to active PDF |

### Admin (requires auth)

| Route | Description |
|-------|-------------|
| `/admin/login` | Sign in page |
| `/admin/dashboard` | Overview stats |
| `/admin/experiences` | CRUD experiences |
| `/admin/projects` | CRUD projects |
| `/admin/workflows` | CRUD workflows |
| `/admin/skills` | Add/delete skills |
| `/admin/certifications` | Add/delete certifications |
| `/admin/resume` | Upload/manage resume PDF |
| `/admin/messages` | View contact submissions |

---

## Architecture Notes

### Server Components by default
All data fetching happens in Server Components using `lib/data.ts`. Client components are only used where interactivity is required (forms, delete buttons, file upload).

### Server Actions for mutations
All create/update/delete operations use Next.js Server Actions defined in `actions/index.ts`. Each action validates with Zod, checks auth, and calls `revalidatePath()` to update the cache.

### Route protection via middleware
`middleware.ts` runs on every request to `/admin/*` (except `/admin/login`). It uses `@supabase/ssr` to check the session cookie and redirects unauthenticated users to the login page.

### RLS on all tables
Supabase Row Level Security ensures:
- Public can only read `published` content
- Only authenticated users can write/delete
- Contact messages can be inserted by anyone but read only by auth users

---

## Customization

### Change your name/info
- `app/page.tsx` — Hero section content
- `components/public/Footer.tsx` — Footer links
- `components/public/Navbar.tsx` — Add/remove nav links
- `app/layout.tsx` — SEO metadata

### Change the color palette
Edit `tailwind.config.ts` → `theme.extend.colors`. The key colors are:
- `primary`: `#ab3500` (dark orange-red)
- `primary-container`: `#ff6b35` (accent orange)
- `on-background`: `#1b1c1c` (near black)
- `surface`: `#fbf9f8` (warm white)

### Add a new admin section
1. Create table in `supabase/schema.sql`
2. Add type in `types/index.ts`
3. Add fetch function in `lib/data.ts`
4. Add Zod schema in `lib/validations.ts`
5. Add Server Actions in `actions/index.ts`
6. Create pages in `app/admin/your-section/`
7. Add link in `components/admin/AdminSidebar.tsx`
