/**
 * One hue per offer (docs/DESIGN_SPEC.md): AI assistants violet, WhatsApp
 * emerald, documents amber, full-stack sky. Every place an offer shows up
 * (service card, case study, process step, metric) uses the same hue, so
 * colour carries meaning instead of decorating the background.
 *
 * Class strings are written out in full so Tailwind's scanner sees them.
 */
export type HueName = 'violet' | 'emerald' | 'amber' | 'sky';

interface Hue {
  /** Icon tile / number badge */
  tile: string;
  /** Text in the hue (AA on the page ground in both themes) */
  ink: string;
  /** Card: a tint fading into the surface from the top */
  card: string;
  /** Media panel behind screenshots */
  panel: string;
}

export const HUES: Record<HueName, Hue> = {
  violet: {
    tile: 'bg-violet-500/10 ring-1 ring-violet-500/20 dark:bg-violet-500/15',
    ink: 'text-violet-700 dark:text-violet-300',
    card: 'border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-tertiary to-60% dark:border-violet-500/30 dark:from-violet-500/[0.13]',
    panel: 'border-violet-500/20 bg-gradient-to-br from-violet-500/[0.18] to-violet-500/[0.04] dark:border-violet-500/30 dark:from-violet-500/[0.26] dark:to-violet-500/[0.06]',
  },
  emerald: {
    tile: 'bg-emerald-500/10 ring-1 ring-emerald-500/20 dark:bg-emerald-500/15',
    ink: 'text-emerald-700 dark:text-emerald-300',
    card: 'border-emerald-500/20 bg-gradient-to-b from-emerald-500/[0.08] to-tertiary to-60% dark:border-emerald-500/30 dark:from-emerald-500/[0.12]',
    panel: 'border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.18] to-emerald-500/[0.04] dark:border-emerald-500/30 dark:from-emerald-500/[0.24] dark:to-emerald-500/[0.05]',
  },
  amber: {
    tile: 'bg-amber-500/10 ring-1 ring-amber-500/25 dark:bg-amber-500/15',
    ink: 'text-amber-700 dark:text-amber-300',
    card: 'border-amber-500/25 bg-gradient-to-b from-amber-500/[0.09] to-tertiary to-60% dark:border-amber-500/30 dark:from-amber-500/[0.12]',
    panel: 'border-amber-500/25 bg-gradient-to-br from-amber-500/[0.18] to-amber-500/[0.04] dark:border-amber-500/30 dark:from-amber-500/[0.22] dark:to-amber-500/[0.05]',
  },
  sky: {
    tile: 'bg-sky-500/10 ring-1 ring-sky-500/20 dark:bg-sky-500/15',
    ink: 'text-sky-700 dark:text-sky-300',
    card: 'border-sky-500/20 bg-gradient-to-b from-sky-500/[0.08] to-tertiary to-60% dark:border-sky-500/30 dark:from-sky-500/[0.12]',
    panel: 'border-sky-500/20 bg-gradient-to-br from-sky-500/[0.18] to-sky-500/[0.04] dark:border-sky-500/30 dark:from-sky-500/[0.22] dark:to-sky-500/[0.05]',
  },
};

/** Offer order on the homepage: the three CMS services, then full-stack. */
export const OFFER_ORDER: HueName[] = ['violet', 'emerald', 'amber', 'sky'];
