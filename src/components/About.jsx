import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px]
          flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title}
            className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}
      className={`${styles.paddingX}`}>
        <p className={styles.sectionSubText}>
          Introduction
        </p>
        <h2 className={styles.sectionHeadText}>
          Overview.
        </h2>
      </motion.div>


        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className={`mt-8 ${styles.paddingX} text-secondary text-[17px] max-w-5xl leading-[30px]`}
          style={{ textAlign: 'justify' }}
        >
          <p>
            I am a passionate machine learning enthusiast and backend-focused engineer, with over two years of hands-on experience developing AI-powered systems and scalable backend services using Python, Django, and FastAPI. My academic background in Computer Engineering and industry experience have fueled my deep interest in machine learning, NLP, and Generative AI.
          </p>
          <p>
            I’ve worked on impactful projects such as medical chatbots using RAG architectures, LLM-powered WhatsApp agents, and intelligent document automation tools—leveraging technologies like HuggingFace, OpenAI, LlamaIndex, Pinecone, and Robocorp RPA. I’m particularly fascinated by the intersection of NLP and real-world applications, where language models and vector search meet task automation and user interaction.
          </p>
          <p>
            Constantly exploring innovations in model optimization, embedding techniques, and knowledge retrieval, I’m seeking opportunities to contribute to forward-thinking teams working in the fields of Generative AI, computer vision, and applied machine learning.
          </p>
        </motion.p>




      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about");