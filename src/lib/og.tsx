import { ImageResponse } from 'next/og';
import { SITE_URL, SITE_NAME } from '@/lib/site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

interface OgCardProps {
  /** Small uppercase label above the title, e.g. "Case Study". */
  eyebrow: string;
  title: string;
  subtitle?: string | null;
  tags?: string[];
}

const ACCENT = '#915eff';
const BG = '#050816';
const MUTED = '#aaa6c3';

/** Shrink long titles so they never overflow the card. */
function titleFontSize(title: string): number {
  if (title.length > 90) return 48;
  if (title.length > 60) return 58;
  if (title.length > 35) return 68;
  return 80;
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/**
 * Branded 1200x630 share card rendered with next/og (Satori).
 * Satori supports a subset of CSS: every element with more than one child needs
 * an explicit `display: flex`.
 */
export function renderOgCard({ eyebrow, title, subtitle, tags = [] }: OgCardProps) {
  const host = new URL(SITE_URL).host.replace(/^www\./, '');
  const safeTitle = truncate(title, 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: BG,
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(145,94,255,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(0,206,168,0.18), transparent 40%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: ACCENT }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: MUTED,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: titleFontSize(safeTitle),
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {safeTitle}
          </div>
          {subtitle && (
            <div style={{ fontSize: 28, lineHeight: 1.4, color: MUTED }}>
              {truncate(subtitle, 140)}
            </div>
          )}
          {tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: 22,
                    padding: '8px 18px',
                    borderRadius: 999,
                    border: `1px solid rgba(145,94,255,0.5)`,
                    color: '#d9ccff',
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
            fontSize: 26,
          }}
        >
          <div style={{ fontWeight: 700 }}>{SITE_NAME}</div>
          <div style={{ color: ACCENT }}>{host}</div>
        </div>
      </div>
    ),
    ogSize
  );
}
