import { styles } from '@/lib/styles';
import { HeroCTAs } from '@/components/sections/HeroCTAs';
import HeroVisual from '@/components/sections/HeroVisual';
import { Spotlight } from '@/components/home/Spotlight';
import { HeroSettings } from '@/types/frontend';

interface HeroProps {
  data?: HeroSettings;
  bookingUrl?: string;
  availability?: string;
}

// Defaults until headline / audience are set in /admin/settings (hero).
const DEFAULT_HEADLINE = 'Full-stack products, with the AI built in.';
const DEFAULT_AUDIENCE =
  'I design and build web apps, APIs and AI assistants for startups and growing teams, from first prototype to production.';

const Hero = ({ data, bookingUrl, availability }: HeroProps) => {
  const role = data?.role || 'Full-Stack GenAI Developer';
  const headline = data?.headline || DEFAULT_HEADLINE;
  const audience = data?.audience || DEFAULT_AUDIENCE;
  const resumeUrl = data?.resumeUrl || '/cv.pdf';

  return (
    <section className="relative isolate w-full overflow-x-clip pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Fine grid fading out from the top: structure without a decorative image */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 -z-10"
      />
      <Spotlight />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/[0.12] blur-[120px] dark:bg-brand/[0.18]"
      />

      <div
        className={`${styles.paddingX} relative max-w-6xl mx-auto grid items-center gap-16 xl:grid-cols-[minmax(0,1fr)_420px]`}
      >
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-fg/10 bg-tertiary/70 px-3 py-1 text-[13px] text-secondary shadow-soft">
            <span className={`h-1.5 w-1.5 rounded-full ${availability ? 'bg-emerald-500' : 'bg-brand'}`} />
            {availability || role}
          </p>

          {/* LCP element - plain server-rendered text */}
          <h1 className="mt-6 text-fg font-semibold text-[42px] leading-[1.05] tracking-[-0.035em] sm:text-[60px] lg:text-[68px]">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-secondary text-[18px] leading-[1.65] sm:text-[19px]">{audience}</p>

          <HeroCTAs resumeUrl={resumeUrl} bookingUrl={bookingUrl} />
        </div>

        <div className="flex justify-center xl:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
