/**
 * Database Seed Script
 * Migrates data from constants.ts to Supabase database
 *
 * Usage: npx tsx scripts/seed-database.ts
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service key (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!, // Service key for admin operations
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Data from constants.ts
const navLinks = [
  { link_id: 'about', title: 'About', display_order: 0 },
  { link_id: 'work', title: 'Work', display_order: 1 },
  { link_id: 'contact', title: 'Contact', display_order: 2 },
];

const services = [
  { title: 'ML Developer', icon_url: '/images/creator.png', display_order: 0 },
  { title: 'Backend Developer', icon_url: '/images/backend.png', display_order: 1 },
  { title: 'Mobile Application Developer', icon_url: '/images/mobile.png', display_order: 2 },
  { title: 'Automation Engineer', icon_url: '/images/web.png', display_order: 3 },
];

const technologies = [
  { name: 'Python', icon_url: '/images/tech/python.webp', display_order: 0 },
  { name: 'MongoDB', icon_url: '/images/tech/mongodb.svg', display_order: 1 },
  { name: 'React JS', icon_url: '/images/tech/reactjs.png', display_order: 2 },
  { name: 'Node JS', icon_url: '/images/tech/nodejs.png', display_order: 3 },
  { name: 'TypeScript', icon_url: '/images/tech/typescript.png', display_order: 4 },
  { name: 'Firebase', icon_url: '/images/tech/firebase.png', display_order: 5 },
  { name: 'Flutter', icon_url: '/images/tech/flutter.png', display_order: 6 },
  { name: 'Tensorflow', icon_url: '/images/tech/Tensorflow.png', display_order: 7 },
  { name: 'Pytorch', icon_url: '/images/tech/pytorch.png', display_order: 8 },
];

const experiences = [
  {
    title: 'Software Engineer',
    company_name: 'QuickFox Consulting',
    icon_url: '/images/company/quickfox.png',
    icon_bg_color: '#E6DEDD',
    date: 'Jan 2024 – Present',
    display_order: 0,
    points: [
      'Built Quick CCA – an OCR-based cheque processing and clearing system deployed at Global IME Bank using Django REST Framework and ReactJS.',
      'Developed intelligent automation solutions using Robocorp RPA, streamlining business processes.',
      'Implemented a Siamese network-based signature verification system to detect forgery and enhance fraud prevention.',
      'Created QuickRef, a chatbot application using RAG and LLaMA 3 for internal knowledge assistance in the banking domain.',
    ],
  },
  {
    title: 'Software Engineer (Remote)',
    company_name: 'AutomateBoring, USA',
    icon_url: '/images/company/automateboring.png',
    icon_bg_color: '#F0F0F0',
    date: 'May 2024 – Aug 2024',
    display_order: 1,
    points: [
      'Designed and developed a secure, scalable Learning Management System (LMS) with video streaming, user authentication, and interactive quizzes.',
      'Built a robust PDF and web data extraction pipeline using Python and RPA tools to automate information retrieval.',
    ],
  },
  {
    title: 'Contract Developer',
    company_name: 'Self-Employed',
    icon_url: '/images/company/freelance_icon.png',
    icon_bg_color: '#DFF6FF',
    date: 'Open to Freelance Projects',
    display_order: 2,
    points: [
      'Developed Raid Sentinel – a Django + Celery based backend system to monitor ARK game accounts and notify users of potential raids.',
      'Built BhasaSanjal – a FastAPI + ReactJS language learning platform with MongoDB, focused on multilingual education.',
      'Created Trekpal Nepal – a tourism-focused site with booking features and PACO payment integration, using ReactJS and Django.',
    ],
  },
];

const projects = [
  {
    slug: 'medical-qa-chatbot',
    name: 'Medical Q/A Chatbot (RAG)',
    description:
      'A context-aware medical chatbot using Retrieval-Augmented Generation (RAG) to answer questions with cited information from ingested PDFs using OpenAI, LlamaIndex, and Pinecone and embedding model fined tuned for medical documents.',
    tags: [
      { name: 'Python', color: 'orange-text-gradient' },
      { name: 'Chatbot', color: 'green-text-gradient' },
      { name: 'RAG', color: 'blue-text-gradient' },
      { name: 'Streamlit', color: 'pink-text-gradient' },
    ],
    image_url: '/images/projects/ragbot.webp',
    source_code_link: 'https://github.com/St-Luciferr/Q-A-Chatbot',
    demo_url: null,
    is_demo: false,
    display_order: 0,
  },
  {
    slug: 'whatsapp-chatbot',
    name: 'WhatsApp Chatbot with Function Calling',
    description:
      'AI chat agent on WhatsApp Business using OpenAI and function calling. Capable of handling user queries and triggering backend logic on demand.',
    tags: [
      { name: 'Django', color: 'green-text-gradient' },
      { name: 'OpenAI', color: 'pink-text-gradient' },
      { name: 'WhatsApp API', color: 'blue-text-gradient' },
    ],
    image_url: '/images/projects/whatsapp.svg',
    source_code_link: 'https://github.com/St-Luciferr/Whatsapp-Agent',
    demo_url: null,
    is_demo: false,
    display_order: 1,
  },
  {
    slug: 'trek-pal-nepal',
    name: 'Trek Pal Nepal',
    description:
      'A trekking platform with 30+ destinations, booking features, admin dashboard, and PACO payment integration. Built using React and Django.',
    tags: [
      { name: 'React', color: 'blue-text-gradient' },
      { name: 'Django', color: 'green-text-gradient' },
      { name: 'MongoDB', color: 'pink-text-gradient' },
    ],
    image_url: '/images/projects/trekpal.webp',
    source_code_link: 'https://trekpalnepal.com',
    demo_url: 'https://trekpalnepal.com',
    is_demo: true,
    display_order: 2,
  },
  {
    slug: 'continual-monument-detection',
    name: 'Continual Monument Detection',
    description:
      'Applied knowledge distillation and meta-learning techniques with Faster R-CNN for continual learning in object detection tasks.',
    tags: [
      { name: 'PyTorch', color: 'green-text-gradient' },
      { name: 'Computer Vision', color: 'blue-text-gradient' },
      { name: 'R-CNN', color: 'pink-text-gradient' },
    ],
    image_url: '/images/projects/continualmonuments.webp',
    source_code_link: 'https://github.com/St-Luciferr/Continual-Monument-Detection',
    demo_url: null,
    is_demo: false,
    display_order: 3,
  },
  {
    slug: 'pestpad',
    name: 'PestPAD',
    description:
      'PestPAD, an Android software designed to optimize pesticide detection processes, users can quickly and effectively determine the presence of pesticides in vegetable samples.',
    tags: [
      { name: 'Flutter', color: 'green-text-gradient' },
      { name: 'Firebase', color: 'pink-text-gradient' },
    ],
    image_url: '/images/projects/pestpad.jpg',
    source_code_link: '#',
    demo_url: null,
    is_demo: false,
    display_order: 4,
  },
  {
    slug: 'amid',
    name: 'AMID',
    description:
      'Mobile app which simplifies exploration of historical landmarks, using advanced object detection for easy identification. Enhances connection with cultural heritage and streamlines the journey of discovering iconic monuments.',
    tags: [
      { name: 'Tensorflow', color: 'green-text-gradient' },
      { name: 'Flutter', color: 'pink-text-gradient' },
      { name: 'Firebase', color: 'blue-text-gradient' },
    ],
    image_url: '/images/projects/amid.jpg',
    source_code_link: 'https://github.com/St-Luciferr/Flutter_App',
    demo_url: null,
    is_demo: false,
    display_order: 5,
  },
];

const testimonials = [
  {
    testimonial:
      'I thought it was impossible to make a website as beautiful as our product, but Santosh proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image_url: 'https://randomuser.me/api/portraits/women/4.jpg',
    display_order: 0,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Santosh does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image_url: 'https://randomuser.me/api/portraits/men/5.jpg',
    display_order: 1,
  },
  {
    testimonial:
      "After Santosh optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image_url: 'https://randomuser.me/api/portraits/women/6.jpg',
    display_order: 2,
  },
];

async function seedNavLinks() {
  console.log('Seeding navigation links...');
  const { data, error } = await supabase.from('nav_links').insert(navLinks).select();

  if (error) {
    console.error('Error seeding nav links:', error);
    throw error;
  }

  console.log(`✓ Seeded ${data.length} navigation links`);
}

async function seedServices() {
  console.log('Seeding services...');
  const { data, error } = await supabase.from('services').insert(services).select();

  if (error) {
    console.error('Error seeding services:', error);
    throw error;
  }

  console.log(`✓ Seeded ${data.length} services`);
}

async function seedTechnologies() {
  console.log('Seeding technologies...');
  const { data, error} = await supabase.from('technologies').insert(technologies).select();

  if (error) {
    console.error('Error seeding technologies:', error);
    throw error;
  }

  console.log(`✓ Seeded ${data.length} technologies`);
}

async function seedExperiences() {
  console.log('Seeding experiences...');

  for (const exp of experiences) {
    const { points, ...experienceData } = exp;

    // Insert experience
    const { data: expData, error: expError } = await supabase
      .from('experiences')
      .insert(experienceData)
      .select()
      .single();

    if (expError) {
      console.error('Error seeding experience:', expError);
      throw expError;
    }

    // Insert experience points
    const experiencePoints = points.map((point, index) => ({
      experience_id: expData.id,
      point,
      display_order: index,
    }));

    const { error: pointsError } = await supabase
      .from('experience_points')
      .insert(experiencePoints);

    if (pointsError) {
      console.error('Error seeding experience points:', pointsError);
      throw pointsError;
    }

    console.log(`✓ Seeded experience: ${exp.company_name} with ${points.length} points`);
  }

  console.log(`✓ Seeded ${experiences.length} experiences`);
}

async function seedProjects() {
  console.log('Seeding projects...');

  for (const proj of projects) {
    const { tags, ...projectData } = proj;

    // Insert project
    const { data: projData, error: projError } = await supabase
      .from('projects')
      .insert(projectData)
      .select()
      .single();

    if (projError) {
      console.error('Error seeding project:', projError);
      throw projError;
    }

    // Insert project tags
    const projectTags = tags.map((tag, index) => ({
      project_id: projData.id,
      name: tag.name,
      color: tag.color,
      display_order: index,
    }));

    const { error: tagsError } = await supabase.from('project_tags').insert(projectTags);

    if (tagsError) {
      console.error('Error seeding project tags:', tagsError);
      throw tagsError;
    }

    console.log(`✓ Seeded project: ${proj.name} with ${tags.length} tags`);
  }

  console.log(`✓ Seeded ${projects.length} projects`);
}

async function seedTestimonials() {
  console.log('Seeding testimonials...');
  const { data, error } = await supabase.from('testimonials').insert(testimonials).select();

  if (error) {
    console.error('Error seeding testimonials:', error);
    throw error;
  }

  console.log(`✓ Seeded ${data.length} testimonials`);
}

async function checkEnvironmentVariables() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  }

  if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error('SUPABASE_SERVICE_KEY is not set');
  }

  console.log('✓ Environment variables are set');
}

async function main() {
  console.log('🌱 Starting database seeding...\n');

  try {
    await checkEnvironmentVariables();

    // Note: Site settings are already seeded in the migration file
    console.log('✓ Site settings are seeded via migration\n');

    await seedNavLinks();
    await seedServices();
    await seedTechnologies();
    await seedExperiences();
    await seedProjects();
    await seedTestimonials();

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Check your Supabase dashboard to verify the data');
    console.log('2. Create an admin user in Supabase Auth');
    console.log('3. Set up Supabase Storage buckets for images');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();
