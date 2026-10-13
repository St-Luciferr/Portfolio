import type { Config } from 'tailwindcss';

// Public-site colours are CSS variables (space-separated RGB) so one class
// works in both themes; values live in globals.css under :root (light) and
// [data-theme="dark"]. See docs/DESIGN_SPEC.md.
const site = (name: string) => `rgb(var(--site-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: site('bg'),
        secondary: site('muted'),
        tertiary: site('surface'),
        'black-100': site('surface-2'),
        'black-200': site('surface-3'),
        'white-100': site('fg-soft'),
        fg: site('fg'),
        brand: {
          DEFAULT: site('brand'),
          strong: site('brand-strong'),
          fg: site('brand-fg'),
        },
        'admin-primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
        soft: '0 1px 2px rgb(var(--site-shadow) / 0.06), 0 8px 24px -12px rgb(var(--site-shadow) / 0.18)',
        lift: '0 2px 4px rgb(var(--site-shadow) / 0.06), 0 24px 48px -20px rgb(var(--site-shadow) / 0.28)',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/herobg.webp')",
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
