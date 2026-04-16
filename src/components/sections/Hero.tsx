import { FaFileDownload } from 'react-icons/fa';

import { styles } from '@/lib/styles';
import HeroAnimation from '@/components/sections/HeroAnimation';
import Lazy3DCanvas from '@/components/canvas/Lazy3DCanvas';
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
    <section className="relative w-full h-screen mx-auto">
      {/* Static content - renders immediately for LCP */}
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
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

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            {/* Primary CTA - Contact/Hire */}
            <a
              href={ctaUrl}
              className="bg-[#915eff] hover:bg-[#7a4fd4] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              {ctaText}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* Secondary CTA - Resume Download */}
            <a
              href={resumeUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="bg-tertiary hover:bg-tertiary/80 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-white/10"
            >
              <FaFileDownload className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* 3D Canvas - loads only when visible */}
      <Lazy3DCanvas type="computer" />

      {/* Animated scroll indicator - client component */}
      <HeroAnimation />
    </section>
  );
};

export default Hero;
