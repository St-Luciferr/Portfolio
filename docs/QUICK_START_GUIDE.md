# 🚀 Quick Start Guide - 5 Minutes to Sync Everything

**Goal**: Get all Phase 1-3 changes working in under 5 minutes.

## Current Status Check

Run this to see what's configured:

```bash
# Check environment
cat .env.local | grep -E "SUPABASE_URL|EMAILJS|GOOGLE" | sed 's/=.*/=***/'

# Check migrations
ls -1 supabase/migrations/

# Expected: 001, 002, 003, 004
```

---

## 🔴 Step 1: Database Migrations (2 minutes)

### Open Supabase SQL Editor

👉 <https://supabase.com/dashboard/project/_/sql>

### Run Migration 003 (Hero Fields)

```sql
-- Copy/paste from: supabase/migrations/003_standardize_hero_fields.sql
```

**Quick Copy**:

```bash
cat supabase/migrations/003_standardize_hero_fields.sql | pbcopy
# Or manually open the file and copy all content
```

### Run Migration 004 (Related Projects)

```sql
-- Copy/paste from: supabase/migrations/004_add_related_projects.sql
```

**Quick Copy**:

```bash
cat supabase/migrations/004_add_related_projects.sql | pbcopy
```

**✅ Verify**: Run this in SQL Editor:

```sql
SELECT key, jsonb_object_keys(value) as fields
FROM site_settings
WHERE key = 'hero';

-- Should show: role, tagline, cta_text, cta_url (NEW)
```

---

## 🟡 Step 2: Migrate Project Content (1 minute)

```bash
npm run db:migrate-details
```

**Expected output**:

```
✅ Updated: 6 projects
⏭️  Skipped: 1 project
```

**✅ Verify**: Visit <http://localhost:3000/projects/medical-qa-chatbot>

- Should see detailed case study with 5+ sections

---

## 🟢 Step 3: Configure Hero Settings (1 minute)

1. Visit: <http://localhost:3000/admin/settings>
2. Fill in NEW fields:
   - **Role**: `Machine Learning Engineer`
   - **Tagline**: (auto-populated from old subtitle)
   - **CTA Text**: `Let's Work Together`
   - **CTA URL**: `#contact`
3. Click "Save Changes"

**✅ Verify**: Visit <http://localhost:3000>

- Role displays below name
- Two CTAs visible (purple + muted)

---

## 🔵 Step 4: Add Google Verification (30 seconds - OPTIONAL)

Only if you want Google Search Console:

```bash
# Edit .env.local
echo 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code-here' >> .env.local

# Restart dev server
npm run dev
```

Get code from: <https://search.google.com/search-console>

---

## ✅ Step 5: Verify Everything Works (30 seconds)

### Quick Test Commands

```bash
# 1. Start dev server
npm run dev

# 2. Test homepage
curl -s http://localhost:3000 | grep -o "Let's Work Together"
# Should output: Let's Work Together

# 3. Test project page
curl -s http://localhost:3000/projects/medical-qa-chatbot | grep -o "Related Projects"
# Should output: Related Projects

# 4. Test contact form
# Visit: http://localhost:3000/#contact
# Submit a test message
```

### Manual Checks

- [ ] Homepage shows "Machine Learning Engineer" below name
- [ ] Homepage has primary purple CTA
- [ ] Project pages have detailed case studies (4+ sections)
- [ ] Project pages show "Related Projects" at bottom
- [ ] Contact form works (or shows proper error message)

---

## 🎯 What Each Step Does

| Step | What It Does | Impact |
| ------ | -------------- | -------- |
| **Migration 003** | Updates hero database schema | Enables role + dual CTAs |
| **Migration 004** | Creates related projects table | Enables project cross-linking |
| **Migrate Details** | Populates enhanced case studies | 6x content expansion |
| **Hero Settings** | Configures new CMS fields | Shows role + CTAs on homepage |
| **Google Verify** | Adds verification meta tag | Enables Search Console (optional) |

---

## ⚠️ Common Issues & Fixes

### Issue: "Migration already applied"

**Fix**: Good! This means you're up to date. Skip that migration.

### Issue: "Cannot find module 'tsx'"

**Fix**:

```bash
npm install
# tsx should be in devDependencies
```

### Issue: Hero form doesn't show new fields

**Fix**:

```bash
# Hard reload browser
Ctrl + Shift + R  (Windows/Linux)
Cmd + Shift + R   (Mac)
```

### Issue: Contact form shows config error

**Expected**: This is correct if EmailJS not configured!
**Fix** (optional):

```bash
# Add to .env.local:
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_xxx
```

---

## 🔍 Detailed Checklist

See `MANUAL_DEPLOYMENT_CHECKLIST.md` for comprehensive instructions.

---

## ✨ You're Done

After completing these 5 steps, you'll have:

- ✅ Enhanced hero section with role + dual CTAs
- ✅ Comprehensive project case studies (6x longer)
- ✅ Related projects feature for better engagement
- ✅ Advanced SEO with structured data
- ✅ Secure environment-based configuration

**Next**: Deploy to production or continue with Phase 4! 🚀
