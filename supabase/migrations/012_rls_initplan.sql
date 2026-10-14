-- Migration: evaluate auth.<function>() once per query in RLS policies
-- Supabase performance advisor (auth_rls_initplan): policies written as
--   USING (auth.role() = 'authenticated')
-- re-run auth.role() for every row a query touches. Wrapping the call as
--   USING ((SELECT auth.role()) = 'authenticated')
-- lets Postgres evaluate it once per query (an "initPlan") and reuse it.
-- Access rules are unchanged; only how often the check runs.
--
-- Rather than hard-coding policy names, this rewrites every policy in the
-- public schema that calls auth.<fn>() unwrapped, using ALTER POLICY, so the
-- policies are never dropped (no window without protection). Already-wrapped
-- policies are skipped, so it is safe to re-run.

DO $$
DECLARE
  pol record;
  new_using text;
  new_check text;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (
        (qual ~ 'auth\.\w+\(\)' AND qual !~* 'select\s+auth\.')
        OR (with_check ~ 'auth\.\w+\(\)' AND with_check !~* 'select\s+auth\.')
      )
  LOOP
    new_using := regexp_replace(pol.qual, 'auth\.(\w+)\(\)', '(SELECT auth.\1())', 'g');
    new_check := regexp_replace(pol.with_check, 'auth\.(\w+)\(\)', '(SELECT auth.\1())', 'g');

    IF pol.qual IS NOT NULL AND pol.with_check IS NOT NULL THEN
      EXECUTE format('ALTER POLICY %I ON %I.%I USING (%s) WITH CHECK (%s)',
        pol.policyname, pol.schemaname, pol.tablename, new_using, new_check);
    ELSIF pol.qual IS NOT NULL THEN
      EXECUTE format('ALTER POLICY %I ON %I.%I USING (%s)',
        pol.policyname, pol.schemaname, pol.tablename, new_using);
    ELSE
      EXECUTE format('ALTER POLICY %I ON %I.%I WITH CHECK (%s)',
        pol.policyname, pol.schemaname, pol.tablename, new_check);
    END IF;

    RAISE NOTICE 'Updated policy "%" on %', pol.policyname, pol.tablename;
  END LOOP;
END $$;

-- Show the result: every policy that uses an auth function, now wrapped.
SELECT tablename, policyname, qual AS using_expression
FROM pg_policies
WHERE schemaname = 'public' AND qual ~ 'auth\.'
ORDER BY tablename, policyname;
