import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { useState } from "react";

import { styles } from '../styles';
import { github, web } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({ index, name, description, tags, image, source_code_link, demo_url }) => {
  const [readMore, setReadMore] = useState(false);
  const maxDescriptionLength = 120; // adjust as needed

  const truncatedDescription = description.length > maxDescriptionLength
    ? description.slice(0, maxDescriptionLength) + "..."
    : description;

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="sm:w-[360px] w-full"
      style={{ minHeight: "480px" }}
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer flex flex-col h-full"
      >
        <div className="relative w-full h-48 sm:h-54 md:h-62 lg:h-68 xl:h-76 rounded-3xl overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-fill rounded-3xl"
          />

          <div className="absolute inset-0 flex justify-end items-start p-4">
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open(source_code_link, "_blank");
              }}
              className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-800/70 transition-colors duration-200"
              title="View Source Code"
            >
              <img
                src={demo_url ? web : github}
                alt="github"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Content container to fill height */}
        <div className="mt-6 flex flex-col flex-grow">
          <h3 className="text-white font-semibold text-xl sm:text-2xl truncate" title={name}>
            {name}
          </h3>

          <p
            className="mt-3 text-secondary text-sm sm:text-base leading-relaxed"
            style={{ textAlign: "justify" }}
          >
            {readMore ? description : truncatedDescription}
            {description.length > maxDescriptionLength && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setReadMore(!readMore);
                }}
                className="ml-2 text-blue-400 hover:underline focus:outline-none"
              >
                {readMore ? "Read less" : "Read more"}
              </button>
            )}
          </p>

          {/* Tags aligned at bottom */}
          <div className="mt-auto flex flex-wrap pt-5">
            {tags.map((tag) => (
              <p
                key={tag.name}
                className={`text-[13px] sm:text-sm ${tag.color} bg-gray-800/30 px-2 py-1 rounded-full select-none`}
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}
        className={`${styles.paddingX} mx-auto`}>
        <p className={`${styles.sectionSubText} `}>
          My Work
        </p>
        <h2 className={styles.sectionHeadText}>
          Projects.
        </h2>
      </motion.div>

      <div className={`${styles.paddingX} w-full flex `}>
        <motion.p
          variants={fadeIn("", "", 0.1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          The following projects showcase my skills and experience through real-world examples of my work.
          Each project is briefly described with links to code repositories.
          {/* and live demos in it. */}
          {/* They reflect my ability to solve complex problems, work with different technologies, and manage projects effectively. */}
        </motion.p>
      </div>

      <div className={`${styles.paddingX} mt-10 flex flex-wrap items-center justify-center gap-7`}>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Works, "work")