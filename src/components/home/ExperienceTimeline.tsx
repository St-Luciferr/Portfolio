'use client';

import Image from 'next/image';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import type { Experience } from '@/types/frontend';

// Colours come from the site CSS variables so the timeline follows the theme.
const contentStyle = {
  background: 'rgb(var(--site-surface))',
  color: 'rgb(var(--site-fg))',
  boxShadow: 'none',
  border: '1px solid rgb(var(--site-fg) / 0.1)',
  borderRadius: '14px',
  padding: '20px 22px',
};
const arrowStyle = { borderRight: '7px solid rgb(var(--site-fg) / 0.12)' };

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;

  return (
    <VerticalTimeline layout="1-column-left" lineColor="rgb(var(--site-fg) / 0.12)" className="experience-timeline">
      {experiences.map((exp) => (
        <VerticalTimelineElement
          key={exp.id}
          date={exp.date}
          dateClassName="experience-timeline__date"
          contentStyle={contentStyle}
          contentArrowStyle={arrowStyle}
          iconStyle={{ background: exp.iconBgColor || 'rgb(var(--site-surface))', boxShadow: '0 0 0 4px rgb(var(--site-bg)), 0 0 0 5px rgb(var(--site-fg) / 0.12)' }}
          icon={
            <div className="flex h-full w-full items-center justify-center">
              <Image src={exp.iconUrl} alt={exp.companyName} width={28} height={28} className="object-contain" />
            </div>
          }
        >
          <h4 className="text-fg text-[17px] font-semibold leading-snug">{exp.title}</h4>
          <p className="!m-0 !mt-1 text-sm !font-normal text-brand-fg">{exp.companyName}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {exp.points.map((point, i) => (
              <li key={point.id || i} className="text-sm leading-6 text-secondary">
                {point.text}
              </li>
            ))}
          </ul>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
