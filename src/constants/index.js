import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  csharp,
  nodejs,
  git,
  figma,
  firebase,
  flutter,
  thecoderschool,
  naami_logo,
  quickfox,
  threejs,
  dotNet,
  pytorch,
  python,
  tensorflow,
  masterycoding,
  savvycoders,
  mongodb,
  expressjs,
  pestpad,
  amid,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "ML Developer",
    icon: creator,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Mobile Application Developer",
    icon: mobile,
  },
  {
    title: "Automation Engineer",
    icon: web,
  },
];

const technologies = [
  // {
  //   name: "HTML 5",
  //   icon: html,
  // },
  // {
  //   name: "CSS 3",
  //   icon: css,
  // },
  // {
  //   name: "JavaScript",
  //   icon: javascript,
  // },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "Firebase",
    icon: firebase,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Tensorflow",
    icon: tensorflow,
  },
  {
    name: "Pytorch",
    icon: pytorch,
  }
  // {
  //   name: "figma",
  //   icon: figma,
  // }
];

const experiences = [

  {
    title: "Automation and ML Engineer",
    company_name: "QuickFox Consulting",
    icon: quickfox,
    iconBg: "#E6DEDD",
    date: "Jan 2024 - Present",
    points: [
      "Developed and implemented automation solutions.",
      "Applying machine learning models to automate tasks, enhancing operational workflows.",
      "Leveraging advanced image processing algorithms and computer vision for valuable insights.",
      "Collaborating in cross-functional teams, ensuring seamless automation integration and fostering innovation.",
      "Creating robust APIs for seamless communication and data exchange across diverse components and services.",
    ],
  },
    {
    title: "Flutter Developer",
    company_name: "NAAMII",
    icon: naami_logo,
    iconBg: "#FFFFFF",
    date: "may-2023 - july 2023",
    points: [
      "Developing 'PestPAD', an Android application for detecting pesticide concentrations in vegetable samples.",
      "Implementing advanced image processing algorithms to analyze sample images efficiently.",
      "Exhibiting teamwork and communication skills during the collaborative 'PestPAD' project.",
      "Actively engaging in internal and external communication, incorporating valuable feedback and ensuring project success.",
     
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Santosh proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Santosh does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Santosh optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "PestPAD",
    description:
    "PestPAD, an Android software designed to optimize pesticide detection processes, users can quickly and effectively determine the presence of pesticides in vegetable samples.",
    tags: [
      {
        name: "Flutter",
        color: "green-text-gradient",
      },
      {
        name: "Firebase",
        color: "pink-text-gradient",
      },
   
    ],
    image: pestpad,
    source_code_link: "#",
  },
  {
    name: "AMID",
    description:
      "Mobile app which simplifies exploration of historical landmarks, using advanced object detection for easy identification. Enhances connection with cultural heritage and streamlines the journey of discovering iconic monuments.",    
      tags: [
      {
        name: "Tensorflow",
        color: "green-text-gradient",
      },
      {
        name: "Flutter",
        color: "pink-text-gradient",
      },
      {
        name: "Firebase",
        color: "blue-text-gradient",
      },
    ],
    image: amid,
    source_code_link: "https://github.com/St-Luciferr/Flutter_App",
  },
];

export { services, technologies, experiences, testimonials, projects };