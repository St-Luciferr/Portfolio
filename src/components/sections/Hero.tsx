import { styles } from '@/lib/styles';
import HeroAnimation from '@/components/sections/HeroAnimation';
import { HeroCTAs } from '@/components/sections/HeroCTAs';
import { HeroSettings } from '@/types/frontend';

interface HeroProps {
  data?: HeroSettings;  
}

const Hero = ({ data }: HeroProps) => {
  const name = data?.name || 'Santosh';
  const role = data?.role || 'Machine Learning Engineer';
  const tagline =
    data?.tagLine ||
    "a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation. Let's connect and shape the future of AI together!";
  const ctaText = data?.ctaText || "Let's Work Together";
  const ctaUrl = data?.ctaURL || '#contact';
  const resumeUrl = data?.resumeUrl || '/cv.pdf';

  return (
    <section className="relative w-full mx-auto pt-[120px] pb-40 sm:pb-48">
      {/* Static content - renders immediately for LCP. The 3D desk model was
          removed (docs/SITE_REVIEW_2026-10.md F5): it cost ~16 s of mobile TBT. */}
      <div
        className={`${styles.paddingX} relative max-w-7xl mx-auto flex flex-row items-start gap-5`}
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          {/* LCP element - critical for performance */}
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I&apos;m <span className="text-[#915eff]">{name}</span>
          </h1>
          <p className="mt-2 text-white text-[20px] sm:text-[26px] font-medium">
            {role}
          </p>
          <p className={`${styles.heroSubText} mt-4 text-white-100 max-w-3xl`}>
            {tagline}
          </p>

          <HeroCTAs ctaText={ctaText} ctaUrl={ctaUrl} resumeUrl={resumeUrl} />
        </div>
      </div>

      {/* Animated scroll indicator - client component */}
      <HeroAnimation />
    </section>
  );
};

export default Hero;
