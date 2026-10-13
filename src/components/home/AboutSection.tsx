import Image from 'next/image';
import { Download, MapPin } from 'lucide-react';
import { Section } from './Section';
import { ExperienceTimeline } from './ExperienceTimeline';
import type { BioSettings, Experience } from '@/types/frontend';

interface AboutSectionProps {
  bio?: BioSettings;
  name: string;
  role: string;
  experiences: Experience[];
  resumeUrl: string;
}

export function AboutSection({ bio, name, role, experiences, resumeUrl }: AboutSectionProps) {
  const paragraphs = (bio?.paragraphs || []).filter((p) => p && p !== 'No bio available').slice(0, 3);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section id="about" title="About me" glow={['sky', 'rose']}>
      <div className="grid gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
        {/* Profile column */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-xl border border-fg/10 bg-black-100 shadow-soft">
            {bio?.photoUrl ? (
              <Image src={bio.photoUrl} alt={name} fill sizes="300px" className="object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand/20 to-transparent text-6xl font-semibold tracking-tight text-fg/70">
                {initials}
              </span>
            )}
          </div>
          <p className="mt-5 text-fg text-lg font-semibold">{name}</p>
          <p className="text-sm text-secondary">{role}</p>
          <div className="mt-4 space-y-2 text-sm">
            {bio?.availability && (
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {bio.availability}
              </p>
            )}
            {bio?.location && (
              <p className="flex items-center gap-2 text-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {bio.location}
              </p>
            )}
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-fg/15 bg-tertiary px-4 py-2 text-sm font-medium text-fg shadow-soft transition-colors hover:border-fg/30"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Résumé (PDF)
          </a>
        </aside>

        {/* Story and experience */}
        <div className="min-w-0">
          <div className="max-w-2xl space-y-4 text-[17px] leading-[1.75] text-secondary">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-fg text-[19px] leading-[1.6]' : ''}>
                {p}
              </p>
            ))}
          </div>

          {experiences.length > 0 && (
            <div className="mt-14">
              <h3 className="text-fg text-xl font-semibold tracking-[-0.01em]">Experience</h3>
              <div className="mt-2">
                <ExperienceTimeline experiences={experiences} />
              </div>
            </div>
          )}

        </div>
      </div>
    </Section>
  );
}
