import { motion } from "framer-motion";
import { FaFileDownload, } from "react-icons/fa";
import { styles } from "../styles";
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div className={`${styles.paddingX} absolute inset-0 top-[120px]
      max-w-7xl mx-auto flex flex-row items-start gap-5`}
        style={{ zIndex: 2 }}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white text-shadow`}>
            Hi, I'm <span className="text-[#915eff]">Santosh</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-80 text-shadow`}>
            a machine learning engineer passionate about building real-world solutions
            with Generative AI, NLP, and intelligent automation.
            <br className="sm:block hidden" />
            Let's connect and shape the future of AI together!
          </p>
        </div>

        <div className="text-center mt-4">
          <button className="button-resume bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            <a
              className="text-decoration-none flex items-center justify-center"
              href="/cv.pdf"
              download={true}
              target="_blank"
              rel="noreferrer"

            >
              <FaFileDownload className="me-1" />
              Resume
            </a>
          </button>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex
      justify-center items-center">
        <div className="w-[35px] h-[64px] rounded-3xl border-4
          border-secondary flex justify-center items-start p-2">
          {/* Framer motion element for scrolling gif-like item */}
          <motion.div
            animate={{
              y: [0, 24, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop'
            }}
            className="w-3 h-3 rounded-full bg-secondary mb-1"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero