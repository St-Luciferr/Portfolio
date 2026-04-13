import { FaFileDownload } from 'react-icons/fa';

import { styles } from '@/lib/styles';
import HeroAnimation from '@/components/sections/HeroAnimation';
import Lazy3DCanvas from '@/components/canvas/Lazy3DCanvas';

interface HeroProps {
  data?: {
    name?: string;
    role?: string;
    tagline?: string;
    resume_url?: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const name = data?.name || 'Santosh';
  const role = data?.role || 'Machine Learning Engineer';
  const tagline =
    data?.tagline ||
    "a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation. Let's connect and shape the future of AI together!";
  const resumeUrl = data?.resume_url || '/cv.pdf';

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
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {tagline}
          </p>
        </div>

        <div className="text-center mt-4">
          <button className="button-resume bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            <a
              className="flex items-center justify-center no-underline text-white"
              href={resumeUrl}
              download
              target="_blank"
              rel="noreferrer"
            >
              <FaFileDownload className="mr-1" />
              Resume
            </a>
          </button>
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
