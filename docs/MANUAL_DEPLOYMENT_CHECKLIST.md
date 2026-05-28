# Manual Deployment Checklist - Phases 1-3

This document lists **every manual action** required to sync all changes from Phases 1-3.

## 📋 Quick Status Check

Run this command to verify your current state:

```bash
# Check environment variables
echo "✓ Supabase configured" && \
echo "✓ EmailJS configured" && \
echo "⚠ Google verification: ${NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:-NOT SET}"

# Check if migrations have been run
ls -la supabase/migrations/
```

---

## 🔴 CRITICAL: Required Actions (Must Do)

### 1. Run Database Migrations

**Status**: ⚠️ **REQUIRED** - Your database schema is out of sync

**What**: Update database to support new hero fields and related projects

**How**: Open [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) and run these **in order**:

#### Step 1: Update Hero Settings Schema

```bash
# Copy this file's contents:
cat supabase/migrations/003_standardize_hero_fields.sql

# Then paste and run in Supabase SQL Editor
```

**What this does**:

- Renames `subtitle` → `tagline` in hero settings
- Adds `role` field for professional title
- Adds `cta_text` and `cta_url` for primary CTA
- Updates existing data to new structure

**Verification**:

```sql
-- Run this to verify the migration worked:
SELECT key, value FROM site_settings WHERE key = 'hero';

-- You should see: tagline, role, cta_text, cta_url (NOT subtitle)
```

---

#### Step 2: Create Related Projects Table

```bash
# Copy this file's contents:
cat supabase/migrations/004_add_related_projects.sql

# Then paste and run in Supabase SQL Editor
```

**What this does**:

- Creates `project_relations` junction table
- Adds indexes for performance
- Seeds 6 logical project relationships
- Enables "Related Projects" feature on detail pages

**Verification**:

```sql
-- Run this to verify:
SELECT COUNT(*) as relation_count FROM project_relations;

-- Should return: 6 (or more if you added custom relationships)
```

---

### 2. Migrate Project Details to Database

**Status**: ⚠️ **REQUIRED** - Case study content is in code, needs to move to DB

**What**: Update all 6 project case studies with enhanced content (380-450 words each)

**How**:

```bash
# Run this command from project root:
npm run db:migrate-details

# Or manually:
node --env-file=.env.local -r tsx/cjs scripts/migrate-project-details.ts
```

**What this does**:

- Updates Medical Q/A Chatbot case study (77 → 380+ words)
- Updates WhatsApp Chatbot case study (64 → 420+ words)
- Updates Trek Pal Nepal case study (71 → 450+ words)
- Updates Monument Detection case study (68 → 400+ words)
- Updates PestPAD case study (62 → 380+ words)
- Updates AMID case study (59 → 410+ words)

**Expected Output**:

```
🚀 Starting project details migration...

📦 Found 7 projects in the database

✅ Updated "Medical Q/A Chatbot (RAG)" (medical-qa-chatbot)
✅ Updated "WhatsApp Chatbot with Function Calling" (whatsapp-chatbot)
✅ Updated "Trek Pal Nepal" (trek-pal-nepal)
✅ Updated "Continual Monument Detection" (continual-monument-detection)
✅ Updated "PestPAD" (pestpad)
✅ Updated "AMID" (amid)
⏭️  Skipping "Context-Aware RAG Chatbot" (already has content)

╔════════════════════════════════════════╗
║     Migration Complete!                ║
╚════════════════════════════════════════╝

📊 Summary:
   ✅ Updated: 6 projects
   ⏭️  Skipped: 1 projects
   📦 Total: 7 projects
```

**Verification**:

- Visit any project page (e.g., `/projects/medical-qa-chatbot`)
- Case study should have detailed Problem, Solution, Features, Architecture, Results sections
- Each section should have 4-8 detailed bullet points

---

### 3. Add Missing Environment Variable

**Status**: ⚠️ **OPTIONAL** but recommended for Google Search Console

**What**: Add Google site verification code

**How**:

```bash
# Edit .env.local and add this line:
nano .env.local

# Add:
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-actual-google-verification-code
```

**How to get the code**:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your site: `https://pandeysantosh.com.np`
3. Choose "HTML tag" verification method
4. Copy the code from: `<meta name="google-site-verification" content="YOUR_CODE_HERE" />`
5. Paste the code (just the content value) into .env.local

**Note**: If you skip this, the site will work fine, but Google Search Console won't verify ownership.

---

### 4. Update Hero Settings via Admin Dashboard

**Status**: ⚠️ **REQUIRED** - New fields need values

**What**: Configure the new hero fields (role, tagline, CTA)

**How**:

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/settings`
3. Find the "Hero Section" card
4. Fill in these NEW fields:

**New Fields to Configure**:

```
Role/Title: Machine Learning Engineer
  └─ This displays prominently below your name

Tagline: (instead of old "Subtitle")
  └─ Your existing subtitle should auto-migrate, verify it's correct

Primary CTA Text: Let's Work Together
  └─ Main call-to-action button text

Primary CTA URL: #contact
  └─ Where the primary button links to
```

**Before/After**:

```
BEFORE (old schema):
- Name: Santosh
- Subtitle: "a machine learning engineer..."
- [Resume button only]

AFTER (new schema):
- Name: Santosh
- Role: Machine Learning Engineer  ← NEW, displays below name
- Tagline: "a machine learning engineer..."  ← Renamed from subtitle
- [Let's Work Together] [Download Resume]  ← NEW dual CTA system
```

**Verification**:

- Visit homepage: `http://localhost:3000`
- Should see role below name
- Should see two CTAs (primary purple + secondary muted)

---

## 🟡 RECOMMENDED: Optional Improvements

### 5. Test Related Projects Feature

**What**: Verify project relationships are working correctly

**How**:

1. Visit any project detail page: `/projects/medical-qa-chatbot`
2. Scroll to bottom
3. Should see "Related Projects" section with 1-3 related projects
4. Click on a related project, should navigate correctly

**Expected Relationships**:

- Medical Q/A ↔ Context-Aware RAG (both RAG projects)
- WhatsApp Chatbot → Medical Q/A (both chatbots)
- PestPAD ↔ AMID (both Flutter mobile apps)
- AMID → Monument Detection (both computer vision)
- Trek Pal → WhatsApp Chatbot (both full-stack)

**Add More Relationships** (optional):

```sql
-- In Supabase SQL Editor:
INSERT INTO project_relations (project_id, related_project_id, relation_type, display_order)
SELECT
  (SELECT id FROM projects WHERE slug = 'source-project-slug'),
  (SELECT id FROM projects WHERE slug = 'related-project-slug'),
  'related',
  0
ON CONFLICT DO NOTHING;
```

---

### 6. Validate SEO Improvements

**What**: Test that structured data and metadata are working

**How**: Use these online validators:

#### Google Rich Results Test

```
https://search.google.com/test/rich-results
```

- Enter: `https://pandeysantosh.com.np/projects/medical-qa-chatbot`
- Should show: ✅ BreadcrumbList schema detected
- Should show: ✅ SoftwareApplication schema detected

#### Facebook Sharing Debugger

```
https://developers.facebook.com/tools/debug/
```

- Enter your project URL
- Should show project image (1200x630)
- Should show enhanced description
- Should show correct title

#### Twitter Card Validator

```
https://cards-dev.twitter.com/validator
```

- Enter your project URL
- Should show "summary_large_image" card
- Should preview project image and description

---

### 7. Test Contact Form

**What**: Verify EmailJS is still working with new error handling

**How**:

1. Go to: `http://localhost:3000/#contact`
2. Fill out the contact form
3. Submit

**Expected Behavior**:

- If EmailJS configured: ✅ "Thank you! I will get back to you..."
- If NOT configured: ⚠️ "Email service is not configured. Please contact me directly at <suntoss.pandey@gmail.com>"

**Why this changed**: Removed hardcoded fallback credentials for security

---

## 📊 Verification Matrix

After completing all steps, verify everything works:

| Feature | Check | Status |
| --------- | ------- | -------- |
| **Hero Section** | Role displays below name | ⬜ Not checked |
| **Hero Section** | Dual CTAs present (primary + secondary) | ⬜ Not checked |
| **Hero Section** | Primary CTA links to #contact | ⬜ Not checked |
| **Project Pages** | Case studies have 4+ sections | ⬜ Not checked |
| **Project Pages** | Each section has 4-8 bullets | ⬜ Not checked |
| **Project Pages** | Related projects appear at bottom | ⬜ Not checked |
| **Project Pages** | Breadcrumb navigation works | ⬜ Not checked |
| **Contact Form** | Submission works or shows fallback | ⬜ Not checked |
| **SEO** | Rich results test passes | ⬜ Not checked |
| **SEO** | Facebook preview looks good | ⬜ Not checked |

---

## 🐛 Troubleshooting

### Migration Script Fails

**Error**: `Cannot find module 'tsx'`

```bash
# Install tsx globally:
npm install -g tsx

# Or use npx:
npx tsx scripts/migrate-project-details.ts
```

**Error**: `Missing Supabase credentials`

```bash
# Verify .env.local has:
NEXT_PUBLIC_SUPABASE_URL=https://...
SUPABASE_SERVICE_KEY=...

# Check with:
cat .env.local | grep SUPABASE
```

---

### Hero Settings Don't Update

**Issue**: Admin form doesn't show new fields

**Solution**:

1. Make sure migration 003 ran successfully
2. Clear browser cache: `Ctrl+Shift+R` (hard reload)
3. Check browser console for errors
4. Verify validation schema updated:

   ```bash
   grep "role" src/lib/validations.ts
   # Should show: role: z.string().min(1)...
   ```

---

### Related Projects Don't Show

**Issue**: No related projects section on detail pages

**Possible causes**:

1. ❌ Migration 004 not run → Run migration
2. ❌ No relationships seeded → Check with SQL:

   ```sql
   SELECT COUNT(*) FROM project_relations;
   ```

3. ❌ Projects not published → Check:

   ```sql
   SELECT slug, is_published FROM projects;
   ```

---

### Contact Form Shows Error

**Issue**: "Email service is not configured"

**Expected**: This is CORRECT if you haven't set up EmailJS!

**To fix** (if you want EmailJS to work):

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create a template
4. Copy Service ID, Template ID, Public Key
5. Add to `.env.local`:

   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_pubkey456
   ```

---

## 📦 File Changes Reference

### Modified Files (Already in Git)

- ✅ `src/lib/validations.ts` - Updated hero schema
- ✅ `src/components/admin/settings/HeroSettings.tsx` - New form fields
- ✅ `src/components/sections/Hero.tsx` - Dual CTA UI
- ✅ `src/components/sections/Contact.tsx` - Secure EmailJS
- ✅ `src/app/layout.tsx` - Google verification meta tag
- ✅ `src/app/projects/[slug]/page.tsx` - Enhanced metadata + related projects
- ✅ `src/lib/data.ts` - New `getRelatedProjects()` function
- ✅ `scripts/migrate-project-details.ts` - Enhanced case study content

### Migration Files (Need to Run)

- ⚠️ `supabase/migrations/003_standardize_hero_fields.sql` - **Run in Supabase**
- ⚠️ `supabase/migrations/004_add_related_projects.sql` - **Run in Supabase**

### Scripts (Need to Execute)

- ⚠️ `npm run db:migrate-details` - **Run locally**

---

## ✅ Success Checklist

Mark each when complete:

### Database

- [ ] Migration 003 executed successfully
- [ ] Migration 004 executed successfully
- [ ] Verified hero settings have new fields (role, tagline, cta_text, cta_url)
- [ ] Verified project_relations table exists with 6+ rows
- [ ] Project details migration script completed

### Configuration

- [ ] .env.local has all required variables
- [ ] Google verification code added (optional)
- [ ] EmailJS credentials added (optional)

### Admin Dashboard

- [ ] Hero settings updated with role
- [ ] Hero settings updated with tagline
- [ ] Hero settings updated with CTA text and URL
- [ ] Resume URL verified

### Frontend Verification

- [ ] Homepage shows role below name
- [ ] Homepage shows dual CTAs (primary + secondary)
- [ ] Project pages show enhanced case studies
- [ ] Project pages show related projects section
- [ ] Contact form works (or shows proper error)
- [ ] All navigation links work

### SEO Testing

- [ ] Google Rich Results Test passes
- [ ] Facebook preview looks correct
- [ ] Twitter card preview looks correct
- [ ] Meta descriptions are enhanced
- [ ] Structured data validates

---

## 🚀 Estimated Time

| Task | Time | Difficulty |
|------|------|------------|
| Run database migrations | 5 minutes | Easy |
| Run project details migration | 2 minutes | Easy |
| Add Google verification | 10 minutes | Easy |
| Update hero settings | 3 minutes | Easy |
| Test all features | 15 minutes | Easy |
| SEO validation | 10 minutes | Medium |
| **Total** | **~45 minutes** | **Easy to Medium** |

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Review error messages carefully
3. Check browser console (F12) for client-side errors
4. Check terminal for server-side errors
5. Verify .env.local has all required variables

---

**Next**: After completing all checklist items, you're ready for production deployment! 🎉
