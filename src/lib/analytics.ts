import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | {
      name: 'contact_submit';
      props: { status: 'success' | 'error'; hasSubject: boolean };
    }
  | { name: 'hero_cta_click'; props: { variant: 'primary' | 'resume' } }
  | { name: 'resume_download'; props: { source: 'hero' | 'other' } }
  | {
      name: 'project_demo_click';
      props: { slug: string; source: 'card' | 'detail' };
    }
  | {
      name: 'project_source_click';
      props: { slug: string; source: 'card' | 'detail' };
    }
  | { name: 'blog_outbound_click'; props: { slug: string; href: string } };

type EventName = AnalyticsEvent['name'];
type PropsFor<N extends EventName> = Extract<AnalyticsEvent, { name: N }>['props'];

type AllowedValue = string | number | boolean | null;

export function track<N extends EventName>(name: N, props: PropsFor<N>): void {
  if (typeof window === 'undefined') return;

  if (process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === '1') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', name, props);
  }

  vercelTrack(name, props as Record<string, AllowedValue>);
}
