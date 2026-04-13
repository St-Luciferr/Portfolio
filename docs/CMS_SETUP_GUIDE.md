# Portfolio CMS Setup Guide

This guide will walk you through setting up your dynamic portfolio with Supabase backend and admin dashboard.

## 📋 What's Been Done

### ✅ Phase 1: Foundation (Completed)

1. **Dependencies Installed**
   - `@supabase/supabase-js` - Supabase client library
   - `@supabase/ssr` - Server-side rendering support
   - `zod` - Schema validation
   - `react-hook-form` + `@hookform/resolvers` - Form handling
   - `@tiptap/react` + `@tiptap/starter-kit` - Rich text editor
   - `@dnd-kit/core` + `@dnd-kit/sortable` - Drag and drop
   - `shadcn/ui` components - UI library
   - `tsx` - TypeScript execution

2. **Database Schema Created**
   - Location: `/supabase/migrations/001_initial_schema.sql`
   - Tables: projects, experiences, technologies, services, testimonials, site_settings, nav_links
   - Row Level Security (RLS) policies configured
   - Indexes for performance optimization
   - Auto-updating timestamps

3. **Supabase Client Utilities**
   - `/src/lib/supabase/client.ts` - Browser client
   - `/src/lib/supabase/server.ts` - Server-side client

4. **TypeScript Types**
   - `/src/lib/types.ts` - Extended with database entity types
   - Types for all content models
   - Helper types for create operations

5. **Validation Schemas**
   - `/src/lib/validations.ts` - Zod schemas for all content types
   - Input validation for API routes
   - Type-safe form handling

6. **Database Seed Script**
   - `/scripts/seed-database.ts` - Migrates current data to database
   - Includes all 6 projects, 3 experiences, 9 technologies, 4 services
   - Can be run with `npm run db:seed`

7. **Configuration Files**
   - `/components.json` - shadcn/ui configuration
   - `/.env.example` - Environment variables template
   - Updated `next.config.mjs` - Added Supabase image domains
   - Updated `package.json` - Added db:seed script

## 🚀 Next Steps

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in the details:
   - **Name**: `portfolio-cms` (or your choice)
   - **Database Password**: Choose a strong password ⚠️ **SAVE THIS!**
   - **Region**: Choose closest to your users (e.g., ap-southeast-1 for Asia)
   - **Pricing Plan**: Free
4. Click "Create new project"
5. Wait 2-3 minutes for setup

### Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy these values:

```bash
Project URL: https://your-project-id.supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: (click "Reveal" button to see)
```

### Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_KEY=your-service-role-key-here
   ```

### Step 4: Run Database Migrations

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `/supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. You should see: "Success. No rows returned"

### Step 5: Seed the Database

Run the seed script to populate your database with current portfolio data:

```bash
npm run db:seed
```

Expected output:

```bash
🌱 Starting database seeding...
✓ Environment variables are set
✓ Site settings are seeded via migration
✓ Seeded 3 navigation links
✓ Seeded 4 services
✓ Seeded 9 technologies
✓ Seeded experience: QuickFox Consulting with 4 points
✓ Seeded experience: AutomateBoring, USA with 2 points
✓ Seeded experience: Self-Employed with 3 points
✓ Seeded 3 experiences
✓ Seeded project: Medical Q/A Chatbot (RAG) with 4 tags
✓ Seeded project: WhatsApp Chatbot with Function Calling with 3 tags
...
✅ Database seeding completed successfully!
```

### Step 6: Set Up Supabase Storage

Create storage buckets for your images:

1. In Supabase Dashboard, go to **Storage**
2. Click **"New bucket"**
3. Create a bucket named `portfolio-images`
4. Make it **Public** (check the "Public bucket" checkbox)
5. Click **"Create bucket"**

Now create folders inside the bucket:

1. Click on the `portfolio-images` bucket
2. Create these folders:
   - `projects/`
   - `companies/`
   - `technologies/`
   - `services/`
   - `testimonials/`
   - `meta/`
   - `resume/`

### Step 7: Create Admin User

Create an admin user for your dashboard:

1. In Supabase Dashboard, go to **Authentication** > **Users**
2. Click **"Add user"** > **"Create new user"**
3. Enter:
   - **Email**: your admin email (e.g., `suntoss.pandey@gmail.com`)
   - **Password**: Choose a secure password
   - **Auto Confirm User**: YES (check this box)
4. Click **"Create user"**

### Step 8: Verify Everything Works

Check your database tables:

1. Go to **Database** > **Tables**
2. You should see these tables:
   - projects (6 rows)
   - project_tags (multiple rows)
   - experiences (3 rows)
   - experience_points (multiple rows)
   - technologies (9 rows)
   - services (4 rows)
   - site_settings (5 rows)
   - testimonials (3 rows)
   - nav_links (3 rows)

## 📂 Project Structure

```bash
/home/suntoss/projects/personal/Portfolio/
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql          ✅ Database schema
├── scripts/
│   └── seed-database.ts                    ✅ Seed script
├── src/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                   ✅ Browser client
│   │   │   └── server.ts                   ✅ Server client
│   │   ├── types.ts                        ✅ TypeScript types
│   │   ├── validations.ts                  ✅ Zod schemas
│   │   └── utils.ts                        ✅ Utility functions
│   └── app/
│       ├── api/                            🔜 Next: API routes
│       └── admin/                          🔜 Next: Admin dashboard
├── components.json                          ✅ shadcn/ui config
├── .env.example                            ✅ Environment template
└── .env.local                              ⚠️ You need to create this
```

## 🎯 What's Next?

After completing the steps above, we'll continue with:

### Phase 2: API Routes (Backend)

- [ ] Authentication middleware
- [ ] Projects CRUD API
- [ ] Experiences CRUD API
- [ ] Technologies & Services API
- [ ] Site Settings API
- [ ] File upload endpoint
- [ ] ISR revalidation endpoint

### Phase 3: Admin Dashboard

- [ ] Admin login page
- [ ] Dashboard layout
- [ ] Projects management UI
- [ ] Experiences management UI
- [ ] Settings management UI
- [ ] Image upload UI
- [ ] Rich text editor for bio

### Phase 4: Frontend Migration

- [ ] Update page.tsx to fetch from API
- [ ] Update components to use dynamic data
- [ ] Dynamic metadata generation
- [ ] Testing and deployment

## 🔧 Useful Commands

```bash
# Development server
npm run dev

# Seed database (after setting up Supabase)
npm run db:seed

# Build for production
npm run build

# Run production server
npm start
```

## 🆘 Troubleshooting

### "NEXT_PUBLIC_SUPABASE_URL is not set"

- Make sure you created `.env.local` from `.env.example`
- Restart your development server after adding env variables

### "Error seeding database"

- Check that your Supabase credentials are correct
- Make sure you ran the migration SQL first
- Verify the `SUPABASE_SERVICE_KEY` (not the anon key) is set

### "row-level security policy violation"

- Make sure RLS policies were created in the migration
- Try running the migration SQL again

### Database connection issues

- Verify your Supabase project is active
- Check that the URL and keys are correct
- Make sure your IP isn't blocked (check Supabase dashboard)

## 📝 Notes

- **Free Tier Limits**: Supabase free tier includes:
  - 500MB database storage
  - 1GB file storage
  - 2GB bandwidth/month
  - 50,000 monthly active users

- **Current Data Size**: Your portfolio data is ~50MB total, well within free tier

- **Security**: The `service_role` key should NEVER be exposed to the browser. It's only used in server-side scripts and API routes.

- **Image Migration**: Current images in `/public/images/` will eventually be migrated to Supabase Storage. For now, they work fine as local files.

## ✅ Checklist

Before continuing to Phase 2, make sure:

- [ ] Supabase project created
- [ ] Database migrated (SQL script run successfully)
- [ ] Environment variables set in `.env.local`
- [ ] Database seeded (npm run db:seed completed)
- [ ] Storage bucket created and configured
- [ ] Admin user created in Supabase Auth
- [ ] Verified data in Supabase dashboard tables

---

Once you've completed all these steps, let me know and we'll continue building the API routes and admin dashboard! 🚀
