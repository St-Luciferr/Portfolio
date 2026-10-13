import Image from 'next/image';
import { styles } from '@/lib/styles';
import type { Technology } from '@/types/frontend';

/** Slow marquee of the tools I ship with; pauses on hover, static under reduced motion. */
export function StackStrip({ technologies }: { technologies: Technology[] }) {
  if (technologies.length === 0) return null;
  const item = (tech: Technology, dup = false) => (
    <li
      key={`${tech.id}${dup ? '-dup' : ''}`}
      {...(dup && { 'data-dup': '', 'aria-hidden': true })}
      className="flex flex-none items-center gap-2.5 rounded-full border border-fg/10 bg-tertiary px-4 py-2 text-sm text-white-100 shadow-soft"
    >
      <Image src={tech.iconUrl} alt="" width={18} height={18} className="object-contain" />
      {tech.name}
    </li>
  );

  return (
    <section aria-label="Tools I work with" className={`pb-6 ${styles.paddingX}`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-secondary">Tools I ship with</p>
        <div className="marquee mt-5 overflow-hidden">
          <ul className="marquee-track flex w-max gap-3">
            {technologies.map((t) => item(t))}
            {technologies.map((t) => item(t, true))}
          </ul>
        </div>
      </div>
    </section>
  );
}
