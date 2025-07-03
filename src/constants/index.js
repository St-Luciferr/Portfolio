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
  ragbot,
  whatsApp,
  trekpal,
  continualmonuments,
  automateboring,
  freelance_icon,
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
    title: "Software Engineer",
    company_name: "QuickFox Consulting",
    icon: quickfox,
    iconBg: "#E6DEDD",
    date: "Jan 2024 – Present",
    points: [
      "Built Quick CCA – an OCR-based cheque processing and clearing system deployed at Global IME Bank using Django REST Framework and ReactJS.",
      "Developed intelligent automation solutions using Robocorp RPA, streamlining business processes.",
      "Implemented a Siamese network-based signature verification system to detect forgery and enhance fraud prevention.",
      "Created QuickRef, a chatbot application using RAG and LLaMA 3 for internal knowledge assistance in the banking domain.",
    ],
  },
  {
    title: "Software Engineer (Remote)",
    company_name: "AutomateBoring, USA",
    icon: automateboring, // replace with appropriate logo if available
    iconBg: "#F0F0F0",
    date: "May 2024 – Aug 2024",
    points: [
      "Designed and developed a secure, scalable Learning Management System (LMS) with video streaming, user authentication, and interactive quizzes.",
      "Built a robust PDF and web data extraction pipeline using Python and RPA tools to automate information retrieval.",
    ],
  },
  {
    title: "Contract Developer",
    company_name: "Self-Employed",
    icon: freelance_icon, 
    iconBg: "#DFF6FF",
    date: "Open to Freelance Projects",
    points: [
      "Developed Raid Sentinel – a Django + Celery based backend system to monitor ARK game accounts and notify users of potential raids.",
      "Built BhasaSanjal – a FastAPI + ReactJS language learning platform with MongoDB, focused on multilingual education.",
      "Created Trekpal Nepal – a tourism-focused site with booking features and PACO payment integration, using ReactJS and Django.",
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
    name: "Medical Q/A Chatbot (RAG)",
    description:
      "A context-aware medical chatbot using Retrieval-Augmented Generation (RAG) to answer questions with cited information from ingested PDFs using OpenAI, LlamaIndex, and Pinecone and embedding model fined tuned for medical documents.",
    tags: [
      { name: "Python", color: "orange-text-gradient" },
      { name: "Chatbot", color: "green-text-gradient" },
      { name: "RAG", color: "blue-text-gradient" },
      { name: "Streamlit", color: "pink-text-gradient" },
    ],
    image: ragbot,
    source_code_link: "https://github.com/St-Luciferr/Q-A-Chatbot",
  },
  {
    name: "WhatsApp Chatbot with Function Calling",
    description:
      "AI chat agent on WhatsApp Business using OpenAI and function calling. Capable of handling user queries and triggering backend logic on demand.",
    tags: [
      { name: "Django", color: "green-text-gradient" },
      { name: "OpenAI", color: "pink-text-gradient" },
      { name: "WhatsApp API", color: "blue-text-gradient" },
    ],
    image: whatsApp,
    source_code_link: "https://github.com/St-Luciferr/Whatsapp-Agent",
  },
  {
    name: "Trek Pal Nepal",
    description:
      "A trekking platform with 30+ destinations, booking features, admin dashboard, and PACO payment integration. Built using React and Django.",
    tags: [
      { name: "React", color: "blue-text-gradient" },
      { name: "Django", color: "green-text-gradient" },
      { name: "MongoDB", color: "pink-text-gradient" },
    ],
    image: trekpal,
    source_code_link: "https://trekpalnepal.com",
    demo_url: true
  },
  {
    name: "Continual Monument Detection",
    description:
      "Applied knowledge distillation and meta-learning techniques with Faster R-CNN for continual learning in object detection tasks.",
    tags: [
      { name: "PyTorch", color: "green-text-gradient" },
      { name: "Computer Vision", color: "blue-text-gradient" },
      { name: "R-CNN", color: "pink-text-gradient" },
    ],
    image: continualmonuments,
    source_code_link: "https://github.com/St-Luciferr/Continual-Monument-Detection",
  },
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