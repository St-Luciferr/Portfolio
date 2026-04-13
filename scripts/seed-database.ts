/**
 * Database seed script.
 *
 * Uploads local portfolio media to Supabase Storage and upserts the CMS rows
 * with public Supabase URLs.
 *
 * Usage: npm run db:seed
 */

import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const STORAGE_BUCKET = 'portfolio-images';

if (!SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
}

if (!SUPABASE_SERVICE_KEY) {
  throw new Error('SUPABASE_SERVICE_KEY is not set');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

const assetCache = new Map<string, string>();

async function ensureStorageBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw listError;
  }

  if (buckets.some((bucket) => bucket.name === STORAGE_BUCKET)) {
    return;
  }

  const { error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: Object.values(mimeTypes),
  });

  if (error) {
    throw error;
  }
}

async function uploadAsset(publicPath: string, storagePath = publicPath.replace(/^\//, '')) {
  if (/^https?:\/\//.test(publicPath)) {
    return publicPath;
  }

  if (assetCache.has(publicPath)) {
    return assetCache.get(publicPath)!;
  }

  const filePath = path.join(process.cwd(), 'public', publicPath.replace(/^\//, ''));

  if (!existsSync(filePath)) {
    console.warn(`Skipping missing asset: ${publicPath}`);
    assetCache.set(publicPath, publicPath);
    return publicPath;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  const fileBuffer = await readFile(filePath);

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType,
      cacheControl: '31536000',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

  assetCache.set(publicPath, publicUrl);
  return publicUrl;
}

async function buildSeedData() {
  const [
    creatorIcon,
    backendIcon,
    mobileIcon,
    webIcon,
    pythonIcon,
    mongodbIcon,
    reactIcon,
    nodeIcon,
    typescriptIcon,
    firebaseIcon,
    flutterIcon,
    tensorflowIcon,
    pytorchIcon,
    quickfoxIcon,
    automateBoringIcon,
    freelanceIcon,
    ragbotImage,
    contextAwareRagImage,
    whatsappImage,
    trekpalImage,
    monumentsImage,
    pestpadImage,
    amidImage,
    heroBackground,
    resumeUrl,
    testimonialImage,
  ] = await Promise.all([
    uploadAsset('/images/creator.png', 'services/creator.png'),
    uploadAsset('/images/backend.png', 'services/backend.png'),
    uploadAsset('/images/mobile.png', 'services/mobile.png'),
    uploadAsset('/images/web.png', 'services/web.png'),
    uploadAsset('/images/tech/python.webp', 'technologies/python.webp'),
    uploadAsset('/images/tech/mongodb.svg', 'technologies/mongodb.svg'),
    uploadAsset('/images/tech/reactjs.png', 'technologies/reactjs.png'),
    uploadAsset('/images/tech/nodejs.png', 'technologies/nodejs.png'),
    uploadAsset('/images/tech/typescript.png', 'technologies/typescript.png'),
    uploadAsset('/images/tech/firebase.png', 'technologies/firebase.png'),
    uploadAsset('/images/tech/flutter.png', 'technologies/flutter.png'),
    uploadAsset('/images/tech/Tensorflow.png', 'technologies/Tensorflow.png'),
    uploadAsset('/images/tech/pytorch.png', 'technologies/pytorch.png'),
    uploadAsset('/images/company/quickfox.png', 'companies/quickfox.png'),
    uploadAsset('/images/company/automateboring.png', 'companies/automateboring.png'),
    uploadAsset('/images/company/freelance_icon.png', 'companies/freelance_icon.png'),
    uploadAsset('/images/projects/ragbot.webp', 'projects/ragbot.webp'),
    uploadAsset('/images/projects/context-aware-rag.svg', 'projects/context-aware-rag.svg'),
    uploadAsset('/images/projects/whatsapp.svg', 'projects/whatsapp.svg'),
    uploadAsset('/images/projects/trekpal.webp', 'projects/trekpal.webp'),
    uploadAsset('/images/projects/continualmonuments.webp', 'projects/continualmonuments.webp'),
    uploadAsset('/images/projects/pestpad.jpg', 'projects/pestpad.jpg'),
    uploadAsset('/images/projects/amid.jpg', 'projects/amid.jpg'),
    uploadAsset('/images/herobg.webp', 'meta/herobg.webp'),
    uploadAsset('/cv.pdf', 'resume/cv.pdf'),
    uploadAsset('/images/logo.svg', 'testimonials/placeholder.svg'),
  ]);

  return {
    settings: [
      {
        key: 'hero',
        value: {
          heading: "Hi, I'm",
          name: 'Santosh',
          subtitle:
            "a machine learning engineer passionate about building real-world solutions with Generative AI, NLP, and intelligent automation. Let's connect and shape the future of AI together!",
          background_image_url: heroBackground,
          resume_url: resumeUrl,
        },
      },
      {
        key: 'bio',
        value: {
          paragraphs: [
            'I am a passionate machine learning enthusiast and backend-focused engineer with a strong foundation in Python, Natural Language Processing (NLP), and Large Language Models (LLMs). I specialize in designing scalable backend systems and crafting intelligent solutions powered by Generative AI and automation.',
            "I've worked on impactful projects such as medical chatbots using Retrieval-Augmented Generation (RAG) for accurate health query responses, WhatsApp automation bots for streamlined customer interactions, and production-grade LLM deployments optimized for low-latency, high-throughput environments. My expertise extends to model quantization, ONNX optimization, and deploying AI solutions on cloud platforms.",
            "Constantly exploring innovations in model optimization, fine-tuning (LoRA, QLoRA), and real-time inference pipelines, I thrive on solving complex problems with elegant, scalable code. Let's connect and build the future of AI together!",
          ],
        },
      },
      {
        key: 'seo',
        value: {
          title: 'Santosh Pandey | ML Engineer & Full Stack Developer',
          description:
            'Machine Learning Engineer passionate about Generative AI, NLP, and intelligent automation. Specializing in LLMs, RAG systems, and scalable backend development.',
          keywords: [
            'Machine Learning Engineer',
            'Generative AI',
            'NLP Developer',
            'Python Developer',
            'LLM Expert',
            'RAG Systems',
            'Backend Developer',
            'AI Engineer',
          ],
          canonical_url: 'https://pandeysantosh.com.np',
          og_image: heroBackground,
        },
      },
      {
        key: 'contact',
        value: {
          email: 'suntoss.pandey@gmail.com',
        },
      },
      {
        key: 'social_links',
        value: {
          github: 'https://github.com/suntoss',
          linkedin: 'https://linkedin.com/in/santosh-pandey',
        },
      },
    ],
    navLinks: [
      { link_id: 'about', title: 'About', display_order: 0, is_published: true },
      { link_id: 'work', title: 'Work', display_order: 1, is_published: true },
      { link_id: 'projects', title: 'Projects', display_order: 2, is_published: true },
      { link_id: 'contact', title: 'Contact', display_order: 3, is_published: true },
    ],
    services: [
      { title: 'ML Developer', icon_url: creatorIcon, display_order: 0 },
      { title: 'Backend Developer', icon_url: backendIcon, display_order: 1 },
      { title: 'Mobile Application Developer', icon_url: mobileIcon, display_order: 2 },
      { title: 'Automation Engineer', icon_url: webIcon, display_order: 3 },
    ],
    technologies: [
      { name: 'Python', icon_url: pythonIcon, display_order: 0 },
      { name: 'MongoDB', icon_url: mongodbIcon, display_order: 1 },
      { name: 'React JS', icon_url: reactIcon, display_order: 2 },
      { name: 'Node JS', icon_url: nodeIcon, display_order: 3 },
      { name: 'TypeScript', icon_url: typescriptIcon, display_order: 4 },
      { name: 'Firebase', icon_url: firebaseIcon, display_order: 5 },
      { name: 'Flutter', icon_url: flutterIcon, display_order: 6 },
      { name: 'Tensorflow', icon_url: tensorflowIcon, display_order: 7 },
      { name: 'Pytorch', icon_url: pytorchIcon, display_order: 8 },
    ],
    experiences: [
      {
        title: 'Software Engineer',
        company_name: 'QuickFox Consulting',
        icon_url: quickfoxIcon,
        icon_bg_color: '#E6DEDD',
        date: 'Jan 2024 - Present',
        display_order: 0,
        points: [
          'Built Quick CCA - an OCR-based cheque processing and clearing system deployed at Global IME Bank using Django REST Framework and ReactJS.',
          'Developed intelligent automation solutions using Robocorp RPA, streamlining business processes.',
          'Implemented a Siamese network-based signature verification system to detect forgery and enhance fraud prevention.',
          'Created QuickRef, a chatbot application using RAG and LLaMA 3 for internal knowledge assistance in the banking domain.',
        ],
      },
      {
        title: 'Software Engineer (Remote)',
        company_name: 'AutomateBoring, USA',
        icon_url: automateBoringIcon,
        icon_bg_color: '#F0F0F0',
        date: 'May 2024 - Aug 2024',
        display_order: 1,
        points: [
          'Designed and developed a secure, scalable Learning Management System (LMS) with video streaming, user authentication, and interactive quizzes.',
          'Built a robust PDF and web data extraction pipeline using Python and RPA tools to automate information retrieval.',
        ],
      },
      {
        title: 'Contract Developer',
        company_name: 'Self-Employed',
        icon_url: freelanceIcon,
        icon_bg_color: '#DFF6FF',
        date: 'Open to Freelance Projects',
        display_order: 2,
        points: [
          'Developed Raid Sentinel - a Django + Celery based backend system to monitor ARK game accounts and notify users of potential raids.',
          'Built BhasaSanjal - a FastAPI + ReactJS language learning platform with MongoDB, focused on multilingual education.',
          'Created Trekpal Nepal - a tourism-focused site with booking features and PACO payment integration, using ReactJS and Django.',
        ],
      },
    ],
    projects: [
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
        image_url: ragbotImage,
        source_code_link: 'https://github.com/St-Luciferr/Q-A-Chatbot',
        demo_url: null,
        is_demo: false,
        display_order: 0,
      },
      {
        slug: 'context-aware-rag',
        name: 'Context-Aware RAG Chatbot',
        description:
          'A GenAI-powered AI/ML chatbot that delivers accurate, citation-backed answers using Retrieval-Augmented Generation. The system ingests curated Wikipedia articles, applies semantic chunking to preserve topic boundaries, and retrieves context through hybrid search with vector MMR and BM25. It uses LangGraph for structured conversation flow, AutoCut-style context distillation to reduce redundant evidence, SQLite-backed session persistence, and LangSmith tracing for observability. Built with FastAPI, Pydantic, ChromaDB, HuggingFace embeddings, Ollama-hosted LLMs, and a Next.js + TypeScript + Tailwind frontend, with Docker Compose support for deployment.',
        tags: [
          { name: 'RAG', color: 'blue-text-gradient' },
          { name: 'LangGraph', color: 'green-text-gradient' },
          { name: 'Hybrid Search', color: 'orange-text-gradient' },
          { name: 'FastAPI', color: 'pink-text-gradient' },
          { name: 'Next.js', color: 'blue-text-gradient' },
        ],
        image_url: contextAwareRagImage,
        source_code_link: 'https://github.com/St-Luciferr/context-aware-rag',
        demo_url: null,
        is_demo: false,
        display_order: 1,
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
        image_url: whatsappImage,
        source_code_link: 'https://github.com/St-Luciferr/Whatsapp-Agent',
        demo_url: null,
        is_demo: false,
        display_order: 2,
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
        image_url: trekpalImage,
        source_code_link: 'https://trekpalnepal.com',
        demo_url: 'https://trekpalnepal.com',
        is_demo: true,
        display_order: 3,
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
        image_url: monumentsImage,
        source_code_link: 'https://github.com/St-Luciferr/Continual-Monument-Detection',
        demo_url: null,
        is_demo: false,
        display_order: 4,
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
        image_url: pestpadImage,
        source_code_link: 'https://github.com/St-Luciferr',
        demo_url: null,
        is_demo: false,
        display_order: 5,
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
        image_url: amidImage,
        source_code_link: 'https://github.com/St-Luciferr/Flutter_App',
        demo_url: null,
        is_demo: false,
        display_order: 6,
      },
    ],
    testimonials: [
      {
        testimonial:
          'Placeholder testimonial seeded so the testimonials media folder exists in Supabase Storage.',
        name: 'Portfolio',
        designation: 'Placeholder',
        company: 'Portfolio',
        image_url: testimonialImage,
        display_order: 0,
        is_published: false,
      },
    ],
  };
}

async function upsertSiteSettings(settings: Array<{ key: string; value: unknown }>) {
  const { error } = await supabase
    .from('site_settings')
    .upsert(settings, { onConflict: 'key' });

  if (error) {
    throw error;
  }

  console.log(`Seeded ${settings.length} site settings`);
}

async function upsertNavLinks(navLinks: unknown[]) {
  const { error } = await supabase
    .from('nav_links')
    .upsert(navLinks, { onConflict: 'link_id' });

  if (error) {
    throw error;
  }

  console.log(`Seeded ${navLinks.length} navigation links`);
}

async function upsertByLookup(table: string, items: any[], lookup: (item: any) => Record<string, unknown>) {
  for (const item of items) {
    let query = supabase.from(table).select('id, created_at').order('created_at', { ascending: true });
    const lookupFields = lookup(item);

    for (const [column, value] of Object.entries(lookupFields)) {
      query = query.eq(column, value);
    }

    const { data: existingRows, error: selectError } = await query;

    if (selectError) {
      throw selectError;
    }

    const [existing, ...duplicates] = existingRows || [];

    if (duplicates.length > 0) {
      const { error } = await supabase
        .from(table)
        .delete()
        .in(
          'id',
          duplicates.map((row) => row.id)
        );

      if (error) throw error;
    }

    if (existing) {
      const { error } = await supabase.from(table).update(item).eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from(table).insert(item);
      if (error) throw error;
    }
  }

  console.log(`Seeded ${items.length} ${table}`);
}

async function seedTechnologies(technologies: unknown[]) {
  const { error } = await supabase
    .from('technologies')
    .upsert(technologies, { onConflict: 'name' });

  if (error) {
    throw error;
  }

  console.log(`Seeded ${technologies.length} technologies`);
}

async function seedExperiences(experiences: any[]) {
  for (const experience of experiences) {
    const { points, ...experienceData } = experience;

    const { data: existingRows, error: selectError } = await supabase
      .from('experiences')
      .select('id, created_at')
      .eq('title', experience.title)
      .eq('company_name', experience.company_name)
      .order('created_at', { ascending: true });

    if (selectError) {
      throw selectError;
    }

    const [existing, ...duplicates] = existingRows || [];

    if (duplicates.length > 0) {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .in(
          'id',
          duplicates.map((row) => row.id)
        );

      if (error) throw error;
    }

    const experienceId = existing?.id;
    const result = experienceId
      ? await supabase.from('experiences').update(experienceData).eq('id', experienceId).select('id').single()
      : await supabase.from('experiences').insert(experienceData).select('id').single();

    if (result.error) {
      throw result.error;
    }

    await supabase.from('experience_points').delete().eq('experience_id', result.data.id);

    const experiencePoints = points.map((point: string, index: number) => ({
      experience_id: result.data.id,
      point,
      display_order: index,
    }));

    const { error: pointsError } = await supabase
      .from('experience_points')
      .insert(experiencePoints);

    if (pointsError) {
      throw pointsError;
    }
  }

  console.log(`Seeded ${experiences.length} experiences`);
}

async function seedProjects(projects: any[]) {
  for (const project of projects) {
    const { tags, ...projectData } = project;

    const { data: projectRow, error: projectError } = await supabase
      .from('projects')
      .upsert(projectData, { onConflict: 'slug' })
      .select('id')
      .single();

    if (projectError) {
      throw projectError;
    }

    await supabase.from('project_tags').delete().eq('project_id', projectRow.id);

    const projectTags = tags.map((tag: { name: string; color: string }, index: number) => ({
      project_id: projectRow.id,
      name: tag.name,
      color: tag.color,
      display_order: index,
    }));

    const { error: tagsError } = await supabase.from('project_tags').insert(projectTags);

    if (tagsError) {
      throw tagsError;
    }
  }

  console.log(`Seeded ${projects.length} projects`);
}

async function seedTestimonials(testimonials: any[]) {
  await upsertByLookup('testimonials', testimonials, (testimonial) => ({
    name: testimonial.name,
    company: testimonial.company,
  }));
}

async function main() {
  console.log('Starting Supabase seed');

  await ensureStorageBucket();
  console.log(`Using Supabase Storage bucket: ${STORAGE_BUCKET}`);

  const seedData = await buildSeedData();

  await upsertSiteSettings(seedData.settings);
  await upsertNavLinks(seedData.navLinks);
  await upsertByLookup('services', seedData.services, (service) => ({ title: service.title }));
  await seedTechnologies(seedData.technologies);
  await seedExperiences(seedData.experiences);
  await seedProjects(seedData.projects);
  await seedTestimonials(seedData.testimonials);

  console.log('Database seeding completed successfully');
}

main().catch((error) => {
  console.error('Database seeding failed:', error);
  process.exit(1);
});
