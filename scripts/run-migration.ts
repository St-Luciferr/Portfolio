/**
 * Database Migration Script
 *
 * This script adds project detail fields to the database.
 *
 * To run this migration, you have two options:
 *
 * 1. Using Supabase Dashboard (Recommended):
 *    - Go to https://supabase.com/dashboard
 *    - Navigate to your project > SQL Editor
 *    - Copy and paste the contents of supabase/migrations/002_add_project_details.sql
 *    - Click "Run"
 *
 * 2. Using psql (if you have direct database access):
 *    - psql "postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres" -f supabase/migrations/002_add_project_details.sql
 *
 * After running the migration, you can verify by running:
 *    SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'projects';
 */

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                     Database Migration Guide                       ║
╚════════════════════════════════════════════════════════════════════╝

This script needs to add new columns to the projects table.

📋 Migration File: supabase/migrations/002_add_project_details.sql

✅ To run the migration:

1. Open Supabase Dashboard:
   https://supabase.com/dashboard/project/hjyooiuxohephbuuwosa/sql

2. Open the migration file and copy its contents:
   supabase/migrations/002_add_project_details.sql

3. Paste the SQL into the Supabase SQL Editor and click "Run"

4. Verify the migration by running:
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'projects';

The migration will add the following columns:
  - eyebrow (TEXT)
  - summary (TEXT)
  - problem (JSONB)
  - solution (JSONB)
  - features (JSONB)
  - architecture (JSONB)
  - results (JSONB)
  - stack (JSONB)

After running the migration, you can run the data migration script to
populate these fields from the static data:
  npm run db:migrate-project-details
`);
