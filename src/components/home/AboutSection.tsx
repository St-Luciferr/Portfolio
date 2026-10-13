import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Section } from './Section';
import type { BioSettings, Technology } from '@/types/frontend';

interface AboutSectionProps {
  bio?: BioSettings;
  name: string;
  technologies: Technology[];
  resumeUrl: string;
}

export function AboutSection({ bio, name, technologies, resumeUrl }: AboutSectionProps) {
  const paragraphs = (bio?.paragraphs || []).filter((p) => p && p !== 'No bio available').slice(0, 3);
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Section id="about" eyebrow="About" title="The developer behind the work.">
      <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#915eff]/40 via-tertiary to-black-100">
            {bio?.photoUrl ? (
              <Image src={bio.photoUrl} alt={name} fill sizes="280px" className="object-cover" />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/80">
                {initials}
              </span>
            )}
          </div>
          <div className="mt-5 space-y-3 text-sm">
            {bio?.availability && (
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {bio.availability}
              </p>
            )}
            {bio?.location && (
              <p className="flex items-center gap-2 text-secondary">
                <MapPin className="h-4 w-4" />
                {bio.location}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="space-y-4 text-[17px] leading-[30px] text-secondary">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-white-100' : ''}>
                {p}
              </p>
            ))}
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex text-sm font-semibold text-[#cbb5ff] hover:text-white"
          >
            Full résumé (PDF) →
          </a>

          {technologies.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm uppercase tracking-wider text-secondary">Tools I use</h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <li
                    key={tech.id}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-tertiary/50 px-3 py-2 text-sm text-white-100"
                  >
                    <Image src={tech.iconUrl} alt="" width={18} height={18} className="object-contain" />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
