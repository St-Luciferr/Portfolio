-- Database Sync Verification Script
-- Run this in Supabase SQL Editor to check if all Phase 1-3 changes are applied
-- Copy and paste the entire file into Supabase SQL Editor and execute

-- ============================================
-- Test 1: Hero Settings Schema
-- ============================================
SELECT
  'Test 1: Hero Settings Schema' as test_name,
  CASE
    WHEN value ? 'role' AND value ? 'tagline' AND value ? 'cta_text' AND value ? 'cta_url'
    THEN '✅ PASS: New fields exist (role, tagline, cta_text, cta_url)'
    WHEN value ? 'subtitle'
    THEN '⚠️ FAIL: Old schema detected - Still has subtitle field. Run migration 003'
    ELSE '❌ FAIL: Hero settings missing entirely'
  END as result,
  value::text as current_value
FROM site_settings
WHERE key = 'hero';

-- ============================================
-- Test 2: Project Relations Table Exists
-- ============================================
SELECT
  'Test 2: Related Projects Table' as test_name,
  CASE
    WHEN EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'project_relations')
    THEN '✅ PASS: project_relations table exists'
    ELSE '❌ FAIL: project_relations table missing - Run migration 004'
  END as result,
  '' as current_value;

-- ============================================
-- Test 3: Project Relations Has Data
-- ============================================
SELECT
  'Test 3: Related Projects Data' as test_name,
  CASE
    WHEN EXISTS (SELECT FROM pg_tables WHERE tablename = 'project_relations') THEN
      CASE
        WHEN (SELECT COUNT(*) FROM project_relations) >= 6
        THEN '✅ PASS: ' || (SELECT COUNT(*) FROM project_relations)::text || ' relationships seeded (expected 6+)'
        WHEN (SELECT COUNT(*) FROM project_relations) > 0
        THEN '⚠️ WARNING: Only ' || (SELECT COUNT(*) FROM project_relations)::text || ' relationships (expected 6+)'
        ELSE '❌ FAIL: Table exists but no relationships - Run migration 004 again'
      END
    ELSE '⚠️ SKIP: Table does not exist yet'
  END as result,
  COALESCE((SELECT COUNT(*)::text FROM project_relations WHERE EXISTS (SELECT FROM pg_tables WHERE tablename = 'project_relations')), '0') as current_value;

-- ============================================
-- Test 4: Project Details Migration
-- ============================================
SELECT
  'Test 4: Case Study Content (Problem)' as test_name,
  CASE
    WHEN (SELECT COUNT(*) FROM projects WHERE problem IS NOT NULL AND jsonb_array_length(problem) >= 4) >= 6
    THEN '✅ PASS: ' || (SELECT COUNT(*) FROM projects WHERE jsonb_array_length(problem) >= 4)::text || ' projects have detailed problems (4+ items)'
    WHEN (SELECT COUNT(*) FROM projects WHERE problem IS NOT NULL AND jsonb_array_length(problem) > 0) > 0
    THEN '⚠️ WARNING: Only ' || (SELECT COUNT(*) FROM projects WHERE problem IS NOT NULL)::text || ' projects have problem content - Run npm run db:migrate-details'
    ELSE '❌ FAIL: No enhanced content detected - Run npm run db:migrate-details'
  END as result,
  (SELECT COUNT(*)::text FROM projects WHERE problem IS NOT NULL AND jsonb_array_length(problem) >= 4) || ' / ' || (SELECT COUNT(*)::text FROM projects) as current_value;

-- ============================================
-- Test 5: Project Details - Solution
-- ============================================
SELECT
  'Test 5: Case Study Content (Solution)' as test_name,
  CASE
    WHEN (SELECT COUNT(*) FROM projects WHERE solution IS NOT NULL AND jsonb_array_length(solution) >= 4) >= 6
    THEN '✅ PASS: ' || (SELECT COUNT(*) FROM projects WHERE jsonb_array_length(solution) >= 4)::text || ' projects have detailed solutions'
    ELSE '⚠️ WARNING: Incomplete solution content - Run npm run db:migrate-details'
  END as result,
  (SELECT COUNT(*)::text FROM projects WHERE solution IS NOT NULL AND jsonb_array_length(solution) >= 4) || ' / ' || (SELECT COUNT(*)::text FROM projects) as current_value;

-- ============================================
-- Test 6: Project Details - Features
-- ============================================
SELECT
  'Test 6: Case Study Content (Features)' as test_name,
  CASE
    WHEN (SELECT COUNT(*) FROM projects WHERE features IS NOT NULL AND jsonb_array_length(features) >= 5) >= 6
    THEN '✅ PASS: ' || (SELECT COUNT(*) FROM projects WHERE jsonb_array_length(features) >= 5)::text || ' projects have detailed features (5+ items)'
    ELSE '⚠️ WARNING: Incomplete features content'
  END as result,
  (SELECT COUNT(*)::text FROM projects WHERE features IS NOT NULL AND jsonb_array_length(features) >= 5) || ' / ' || (SELECT COUNT(*)::text FROM projects) as current_value;

-- ============================================
-- Test 7: Project Details - Stack
-- ============================================
SELECT
  'Test 7: Case Study Content (Stack)' as test_name,
  CASE
    WHEN (SELECT COUNT(*) FROM projects WHERE stack IS NOT NULL AND jsonb_array_length(stack) >= 3) >= 6
    THEN '✅ PASS: ' || (SELECT COUNT(*) FROM projects WHERE jsonb_array_length(stack) >= 3)::text || ' projects have tech stack details'
    ELSE '⚠️ WARNING: Incomplete stack content'
  END as result,
  (SELECT COUNT(*)::text FROM projects WHERE stack IS NOT NULL AND jsonb_array_length(stack) >= 3) || ' / ' || (SELECT COUNT(*)::text FROM projects) as current_value;

-- ============================================
-- FINAL SUMMARY
-- ============================================
SELECT
  '══════════════════════════════════' as separator,
  'FINAL SUMMARY' as test_name,
  CASE
    WHEN
      -- Hero check
      (SELECT value ? 'role' AND value ? 'tagline' AND value ? 'cta_text' FROM site_settings WHERE key = 'hero') AND
      -- Relations table check
      (SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'project_relations')) AND
      -- Relations data check
      (SELECT COUNT(*) FROM project_relations) >= 6 AND
      -- Content check
      (SELECT COUNT(*) FROM projects WHERE jsonb_array_length(problem) >= 4) >= 6
    THEN '✅ ALL TESTS PASSED - Database is fully synced!'
    ELSE '⚠️ SOME TESTS FAILED - Review results above and follow recommended actions'
  END as result,
  '' as current_value;

-- ============================================
-- Detailed Project Content Check (Optional)
-- ============================================
SELECT
  '── Project Details Breakdown ──' as separator,
  name as project_name,
  CASE WHEN eyebrow IS NOT NULL THEN '✅' ELSE '❌' END as has_eyebrow,
  CASE WHEN summary IS NOT NULL THEN '✅' ELSE '❌' END as has_summary,
  COALESCE(jsonb_array_length(problem), 0)::text || ' items' as problem_count,
  COALESCE(jsonb_array_length(solution), 0)::text || ' items' as solution_count,
  COALESCE(jsonb_array_length(features), 0)::text || ' items' as features_count,
  COALESCE(jsonb_array_length(stack), 0)::text || ' items' as stack_count
FROM projects
ORDER BY display_order;
