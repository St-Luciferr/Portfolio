import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

// Flat config (Next 16 removed `next lint`). See todo.md 13.26.
// The stricter `eslint-config-next/typescript` preset reports ~60 pre-existing
// `any` usages; add it once those are typed.
const eslintConfig = defineConfig([
  ...nextVitals,
  {
    // React Compiler rules flag the admin pages' "useEffect(() => fetchX())
    // before const fetchX" pattern. It works at runtime; refactor, then
    // restore these to errors.
    rules: {
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'scripts/assets/**']),
]);

export default eslintConfig;
