import { styles } from '@/lib/styles';
import { HeroCTAs } from '@/components/sections/HeroCTAs';
import HeroVisual from '@/components/sections/HeroVisual';
import { HeroSettings } from '@/types/frontend';

interface HeroProps {
  data?: HeroSettings;
  bookingUrl?: string;
}

// Defaults until headline / audience are set in /admin/settings (hero).
const DEFAULT_HEADLINE = 'Full-stack products, with the AI built in.';
const DEFAULT_AUDIENCE =
  'I design and build web apps, APIs and AI assistants (RAG, WhatsApp, document automation) for startups and growing teams, from first prototype to production.';

const Hero = ({ data, bookingUrl }: HeroProps) => {
  const name = data?.name || 'Santosh';
  const role = data?.role || 'Full-Stack GenAI Developer';
  const headline = data?.headline || DEFAULT_HEADLINE;
  const audience = data?.audience || DEFAULT_AUDIENCE;
  const resumeUrl = data?.resumeUrl || '/cv.pdf';

  return (
    <section className="relative w-full mx-auto overflow-x-clip pt-[120px] pb-20 xl:pt-[150px] xl:pb-28">
      <div
        className={`${styles.paddingX} relative max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between gap-14 xl:gap-12`}
      >
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-[#915eff]" />
            {name} · {role}
          </p>

          {/* LCP element - plain server-rendered text */}
          <h1 className="mt-6 text-white font-black text-[40px] leading-[1.1] sm:text-[56px] lg:text-[64px]">
            {headline}
          </h1>
          <p className="mt-6 text-[#dfd9ff] text-[17px] leading-[30px] sm:text-[19px] sm:leading-[32px]">
            {audience}
          </p>

          <HeroCTAs resumeUrl={resumeUrl} bookingUrl={bookingUrl} />
        </div>

        <div className="flex justify-center xl:justify-end xl:flex-none">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default Hero;
