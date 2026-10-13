/**
 * Seed rich content for 6 service entries.
 * Run: npm run db:seed-services
 *
 * This script matches services by title (case-insensitive) and updates them
 * with slugs, summaries, process steps, benefits, tools, and deliverables.
 */
import { createClient } from '@supabase/supabase-js';

// Env is loaded by `node --env-file=.env.local` (see package.json), same as db:seed.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in .env.local');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface ServiceSeed {
  /** Title written to the row (what visitors see on cards and the page H1). */
  title: string;
  /**
   * Existing row titles this offer may take over, matched exactly (case-insensitive).
   * The seed also matches its own `title` and `slug`, so re-running is idempotent.
   */
  matchTitles: string[];
  /** Case studies shown under "Live Examples", in display order. */
  projectSlugs: string[];
  slug: string;
  summary: string;
  description: string;
  process: Array<{ step: string; description: string }>;
  benefits: string[];
  tools_technologies: string[];
  deliverables: string[];
  pricing_model: string;
  /**
   * DRAFT FAQs — answers restate only what this file already says about the service
   * (process, deliverables, tools, pricing model). Review and add specifics such as
   * typical timelines or starting prices before relying on them commercially.
   */
  faqs: Array<{ question: string; answer: string }>;
}

const services: ServiceSeed[] = [
  {
    title: 'RAG & AI Knowledge Assistants',
    matchTitles: ['ML Developer'],
    projectSlugs: ['medical-qa-chatbot', 'context-aware-rag'],
    slug: 'rag-systems',
    summary:
      'Build Retrieval-Augmented Generation (RAG) systems that answer questions from your private documents with accurate, citation-backed responses — no hallucinations.',
    description:
      'Standard LLMs make things up. RAG systems ground every response in your actual documents, giving users accurate information they can trust and verify. I build end-to-end RAG pipelines from ingestion and chunking through retrieval, reranking, and final generation.',
    process: [
      {
        step: 'Document Audit',
        description:
          'Inventory your data sources: PDFs, databases, APIs, wikis — and identify the query types to optimize for.',
      },
      {
        step: 'Ingestion Pipeline',
        description:
          'Parse, chunk, and embed documents using optimized strategies (semantic chunking, parent-child, late chunking).',
      },
      {
        step: 'Retrieval & Reranking',
        description:
          'Combine vector similarity search with BM25 or cross-encoder reranking for maximum precision.',
      },
      {
        step: 'Generation Layer',
        description:
          'Prompt-engineer the LLM to answer only from retrieved context, include citations, and gracefully handle out-of-scope queries.',
      },
      {
        step: 'Evaluation & Tuning',
        description:
          'Measure retrieval precision, answer faithfulness, and latency — then tune until metrics hit production targets.',
      },
    ],
    benefits: [
      'Answers grounded in your data — not LLM guesswork',
      'Cites exact source passages users can verify',
      'Works on private, proprietary documents that never leave your infrastructure',
      'Continuously improvable as your document corpus grows',
      'Reduces time-to-answer from hours to seconds for knowledge workers',
    ],
    tools_technologies: [
      'Python',
      'LlamaIndex',
      'Pinecone / ChromaDB / Weaviate',
      'OpenAI / HuggingFace Embeddings',
      'BM25 / Cross-Encoder Reranking',
      'FastAPI',
      'PostgreSQL + pgvector',
    ],
    deliverables: [
      'End-to-end RAG pipeline codebase',
      'Document ingestion and re-indexing scripts',
      'Query API with streaming support',
      'Evaluation benchmark with accuracy metrics',
      'Infrastructure-as-code for deployment',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "What is a RAG system?",
        answer:
          "Retrieval-Augmented Generation combines search over your private documents with a language model. The model answers only from the passages it retrieves and cites them, so responses can be verified.",
      },
      {
        question: "What kinds of documents can it handle?",
        answer:
          "PDFs, databases, APIs, and wikis. The first step is a document audit to inventory your sources and the types of questions people ask.",
      },
      {
        question: "Do my documents have to leave my infrastructure?",
        answer:
          "No. The pipeline can run on your own infrastructure, and the deliverables include infrastructure-as-code for deploying it there.",
      },
      {
        question: "How do you measure answer quality?",
        answer:
          "Retrieval precision, answer faithfulness, and latency are measured against an evaluation benchmark, and the pipeline is tuned until those targets are met. The benchmark is handed over with the code.",
      },
      {
        question: "Which vector databases do you work with?",
        answer:
          "Pinecone, ChromaDB, Weaviate, and PostgreSQL with pgvector, chosen to fit your existing stack.",
      },
    ],
  },
  {
    title: 'WhatsApp AI Automation',
    matchTitles: ['Backend Developer'],
    projectSlugs: ['whatsapp-chatbot'],
    slug: 'whatsapp-automation',
    summary:
      'Automate customer interactions, lead qualification, and support via WhatsApp Business API — powered by AI that understands natural language and handles complex workflows.',
    description:
      'WhatsApp has 2B+ active users. I build AI-powered WhatsApp agents that handle conversations 24/7, qualify inbound leads, process orders, and escalate to human agents when needed — using Twilio or Meta Cloud API with a robust FastAPI backend.',
    process: [
      {
        step: 'Workflow Mapping',
        description: 'Map your customer journey: what queries arrive, what decisions need to be made, and when to escalate.',
      },
      {
        step: 'WhatsApp Setup',
        description: 'Configure WhatsApp Business API via Twilio or Meta Cloud, set up webhook handlers and phone numbers.',
      },
      {
        step: 'AI Agent Build',
        description: 'Build the conversational AI with function calling (CRM lookups, order queries, appointment booking).',
      },
      {
        step: 'Integration',
        description: 'Connect to your CRM, helpdesk, or backend APIs using secure webhooks and REST calls.',
      },
      {
        step: 'Launch & Monitor',
        description: 'Deploy with uptime monitoring, fallback escalation paths, and weekly analytics reports.',
      },
    ],
    benefits: [
      'Automate 60–80% of common customer queries without human intervention',
      'Respond to leads within seconds, dramatically improving conversion',
      'Handles multiple conversations simultaneously — no queue, no wait',
      'Seamlessly hands off to human agents when queries exceed AI capability',
      'Works on the channel your customers already use daily',
    ],
    tools_technologies: [
      'Python',
      'FastAPI',
      'Twilio WhatsApp API / Meta Cloud API',
      'OpenAI GPT-4',
      'LangChain',
      'Redis (session state)',
      'PostgreSQL',
      'Docker',
    ],
    deliverables: [
      'WhatsApp bot backend with webhook handlers',
      'AI conversation logic with intent routing',
      'Human escalation flow with notification system',
      'Analytics dashboard for conversation metrics',
      'Deployment guide with uptime monitoring setup',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "Which WhatsApp API do you use?",
        answer:
          "WhatsApp Business API through either Twilio or Meta Cloud API, depending on what fits your account and volume.",
      },
      {
        question: "What happens when the bot cannot answer?",
        answer:
          "Conversations are escalated to a human agent through an escalation flow with notifications, so customers are never stuck with the bot.",
      },
      {
        question: "Can the bot look up orders or book appointments?",
        answer:
          "Yes. The agent uses function calling to query your CRM or backend, look up orders, or book appointments during the conversation.",
      },
      {
        question: "Will it integrate with our existing systems?",
        answer:
          "It connects to your CRM, helpdesk, or backend APIs over secure webhooks and REST calls, mapped during the workflow-mapping step.",
      },
      {
        question: "How do we know how it is performing?",
        answer:
          "The deliverables include an analytics dashboard for conversation metrics and uptime monitoring after launch.",
      },
    ],
  },
  {
    title: 'Document & OCR Automation',
    matchTitles: ['Automation Engineer'],
    projectSlugs: [],
    slug: 'ocr-document-automation',
    summary:
      'Automate document processing — invoices, forms, reports — using OCR and AI to extract structured data and trigger downstream workflows, replacing hours of manual data entry.',
    description:
      'From invoice processing to compliance form extraction, I build OCR and document automation pipelines that handle the full lifecycle: ingestion, extraction, validation, and integration into your existing systems. Using Robocorp RPA, PaddleOCR, and LLM-based extraction for complex layouts.',
    process: [
      {
        step: 'Sample Review',
        description: 'Analyze 20–50 sample documents to identify extraction targets and edge cases.',
      },
      {
        step: 'Extraction Pipeline',
        description: 'Build OCR + LLM extraction for structured fields, tables, and handwritten text.',
      },
      {
        step: 'Validation Rules',
        description: 'Define validation logic: required fields, cross-field checks, confidence thresholds.',
      },
      {
        step: 'Integration',
        description: 'Route extracted data to your ERP, database, or downstream API via webhook or scheduled batch.',
      },
      {
        step: 'Exception Handling',
        description: 'Build a review queue for low-confidence extractions that require human verification.',
      },
    ],
    benefits: [
      'Reduce document processing time by 80%+ vs manual entry',
      'Eliminate human transcription errors for structured fields',
      'Scales to thousands of documents per day without added headcount',
      'Handles PDFs, scanned images, handwritten forms, and mixed layouts',
      'Provides confidence scores so low-quality extractions get flagged for review',
    ],
    tools_technologies: [
      'Python',
      'PaddleOCR / Tesseract',
      'OpenAI GPT-4 Vision',
      'Robocorp RPA',
      'FastAPI',
      'PostgreSQL',
      'Apache Airflow (batch scheduling)',
      'Docker',
    ],
    deliverables: [
      'End-to-end document processing pipeline',
      'Extraction schema and validation rules',
      'REST API for document submission and status tracking',
      'Human review queue for exception cases',
      'Accuracy metrics report on your sample dataset',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "What document types can be processed?",
        answer:
          "PDFs, scanned images, handwritten forms, and mixed layouts such as invoices, forms, and reports.",
      },
      {
        question: "What do you need from us to start?",
        answer:
          "A set of sample documents. The first step reviews roughly 20 to 50 samples to define the fields to extract and the edge cases to handle.",
      },
      {
        question: "What happens with documents the system is unsure about?",
        answer:
          "Each extraction carries a confidence score. Low-confidence results go to a human review queue instead of flowing straight into your systems.",
      },
      {
        question: "Where does the extracted data go?",
        answer:
          "Into your ERP, database, or downstream API, either by webhook or by scheduled batch.",
      },
      {
        question: "How will we know the accuracy?",
        answer:
          "You receive an accuracy metrics report measured on your own sample dataset.",
      },
    ],
  },
];

/**
 * Folded into the three offers above on 2026-10-13 (docs/SITE_REVIEW_2026-10.md, R1).
 * Backend and ML deployment are now supporting capabilities inside each offer.
 * Kept here so the copy can be reused; this list is NOT seeded.
 */
export const archivedServices: Array<Omit<ServiceSeed, 'matchTitles' | 'projectSlugs'>> = [
  {
    title: 'AI Chatbot Development',
    slug: 'ai-chatbot',
    summary:
      'Build production-ready AI chatbots powered by GPT-4 that understand context, retain conversation history, and answer questions from your proprietary data.',
    description:
      'From customer support bots to internal knowledge assistants, I build end-to-end chatbot systems that go far beyond scripted responses. Each chatbot is grounded in your data using RAG architecture, ensuring accurate, cited answers rather than hallucinated ones.',
    process: [
      {
        step: 'Discovery',
        description:
          'Define the chatbot scope, target users, knowledge sources, and success metrics in a focused kickoff session.',
      },
      {
        step: 'Data Preparation',
        description:
          'Index your documents, FAQs, or databases into a vector store for accurate, citation-backed retrieval.',
      },
      {
        step: 'Build & Integrate',
        description:
          'Implement the conversational layer using LlamaIndex or LangChain with session memory and tool-use capabilities.',
      },
      {
        step: 'API & Deployment',
        description:
          'Wrap in a FastAPI backend with rate limiting, auth, and deploy via Docker or cloud functions.',
      },
      {
        step: 'Monitoring & Handoff',
        description:
          'Set up logging, analytics, and a feedback loop to continuously improve answer quality post-launch.',
      },
    ],
    benefits: [
      '24/7 availability with consistent, accurate responses grounded in your actual data',
      'Reduces support ticket volume by 40–70% for common queries',
      'Cites sources so users know exactly where answers come from',
      'Integrates with existing tools: Slack, WhatsApp, web widget, or REST API',
      'Scales to thousands of concurrent users without added headcount',
    ],
    tools_technologies: [
      'Python',
      'OpenAI GPT-4 / GPT-3.5',
      'LlamaIndex',
      'LangChain',
      'Pinecone',
      'FastAPI',
      'Docker',
      'Redis (session memory)',
    ],
    deliverables: [
      'Production-ready chatbot codebase with tests',
      'REST API with authentication and rate limiting',
      'Vector store setup and indexing pipeline',
      'Admin panel for updating knowledge base',
      'Deployment guide and CI/CD configuration',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "What data can the chatbot answer from?",
        answer:
          "Your own documents, FAQs, or databases. They are indexed into a vector store during the data-preparation step so every answer is retrieved from your content and cites its source.",
      },
      {
        question: "Where can the chatbot be deployed?",
        answer:
          "It ships as a REST API, so it can sit behind a website widget, Slack, WhatsApp, or any internal tool that can call an API.",
      },
      {
        question: "How do you stop it from making things up?",
        answer:
          "Answers are grounded with a RAG architecture: the model only responds from retrieved passages and shows which sources it used, rather than relying on its general knowledge.",
      },
      {
        question: "Can my team update the knowledge base after launch?",
        answer:
          "Yes. The deliverables include an admin panel for updating the knowledge base and an indexing pipeline that re-processes new content.",
      },
      {
        question: "How is the project priced?",
        answer:
          "Pricing is project-based. Scope, knowledge sources, and success metrics are agreed in a discovery session first, and the quote follows from that.",
      },
    ],
  },
  {
    title: 'Django & FastAPI Backend Development',
    slug: 'django-fastapi-backend',
    summary:
      'Build scalable, production-ready REST API backends with Django or FastAPI — complete with auth, testing, and deployment configurations ready for your frontend or mobile app.',
    description:
      'I architect and build backends that handle real production load: clean API design, proper authentication, database optimization, background tasks, and cloud deployment. Choose Django for feature-rich CRUD systems or FastAPI for high-performance, async-first microservices.',
    process: [
      {
        step: 'API Design',
        description: 'Define resource models, endpoints, and authentication strategy — documented in OpenAPI before writing code.',
      },
      {
        step: 'Database Design',
        description: 'Design normalized schemas, indexes, and migration strategy with PostgreSQL.',
      },
      {
        step: 'Core Build',
        description: 'Implement models, serializers/schemas, views, and business logic with test coverage.',
      },
      {
        step: 'Auth & Security',
        description: 'Add JWT or session auth, RBAC permissions, rate limiting, and input validation.',
      },
      {
        step: 'Deployment',
        description: 'Dockerize, configure CI/CD, and deploy to AWS / DigitalOcean / Railway with health checks.',
      },
    ],
    benefits: [
      'Clean, maintainable codebase following REST best practices',
      'Comprehensive test suite (unit + integration) for confidence in refactoring',
      'Auto-generated OpenAPI docs your frontend team can use immediately',
      'Production-ready from day one: logging, error handling, monitoring hooks',
      'Async-ready with background task support via Celery or FastAPI BackgroundTasks',
    ],
    tools_technologies: [
      'Python',
      'Django / Django REST Framework',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'GitHub Actions CI/CD',
      'AWS / DigitalOcean',
    ],
    deliverables: [
      'Production-ready API codebase with tests (80%+ coverage)',
      'OpenAPI/Swagger documentation',
      'Docker Compose setup for local dev',
      'CI/CD pipeline configuration',
      'Deployment guide with environment variable reference',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "Should I choose Django or FastAPI?",
        answer:
          "Django suits feature-rich CRUD systems with an admin and ORM. FastAPI suits high-performance, async-first services. The choice is made during API design based on your workload.",
      },
      {
        question: "Will the API be documented?",
        answer:
          "Yes. Endpoints are designed in OpenAPI before code is written, and you receive generated OpenAPI/Swagger documentation your frontend team can use immediately.",
      },
      {
        question: "Is the code tested?",
        answer:
          "The deliverable is a production-ready codebase with unit and integration tests.",
      },
      {
        question: "Where can it be deployed?",
        answer:
          "It is Dockerized with CI/CD configured, and can be deployed to AWS, DigitalOcean, or Railway with health checks.",
      },
      {
        question: "How is security handled?",
        answer:
          "JWT or session authentication, role-based permissions, rate limiting, and input validation are built in as a dedicated step.",
      },
    ],
  },
  {
    title: 'ML Model Deployment',
    slug: 'ml-deployment',
    summary:
      'Deploy your ML models to production with optimized inference, monitoring, and auto-scaling — turning notebook experiments into reliable production systems.',
    description:
      'A model that lives in a Jupyter notebook delivers zero business value. I take trained models and productionize them: optimized inference with ONNX or quantization, REST APIs with FastAPI, monitoring for data drift, and auto-scaling infrastructure on cloud providers.',
    process: [
      {
        step: 'Model Audit',
        description: 'Review current model format, inference speed, memory usage, and accuracy baseline.',
      },
      {
        step: 'Optimization',
        description: 'Apply quantization, pruning, or ONNX export to hit target latency at acceptable accuracy.',
      },
      {
        step: 'Serving Layer',
        description: 'Wrap in a FastAPI or Triton Inference Server endpoint with batch support and input validation.',
      },
      {
        step: 'Monitoring',
        description: 'Instrument prediction logging, latency metrics, and data drift alerts.',
      },
      {
        step: 'Scaling',
        description: 'Configure auto-scaling on Kubernetes or serverless GPU (Modal, AWS SageMaker) for variable load.',
      },
    ],
    benefits: [
      'Reduce inference latency by 2–10x through optimization without major accuracy loss',
      'Reliable uptime SLA with health checks and automatic restart on failure',
      'Data drift alerts catch model degradation before it impacts users',
      'Cost-efficient: auto-scale up during traffic spikes, down during idle periods',
      'Reproducible deployments via Docker — no "works on my machine" surprises',
    ],
    tools_technologies: [
      'Python',
      'ONNX Runtime',
      'FastAPI',
      'Triton Inference Server',
      'Docker / Kubernetes',
      'Prometheus + Grafana',
      'AWS SageMaker / Modal',
      'HuggingFace Transformers',
    ],
    deliverables: [
      'Optimized model artifacts (ONNX / quantized)',
      'Inference API with health check and metrics endpoints',
      'Docker image and Kubernetes manifests',
      'Monitoring dashboard with drift detection',
      'Load test results and scaling configuration guide',
    ],
    pricing_model: 'project-based',
    faqs: [
      {
        question: "My model works in a notebook. What changes for production?",
        answer:
          "The model is optimized for inference, wrapped in an API with input validation, monitored for latency and data drift, and packaged with Docker so deployments are reproducible.",
      },
      {
        question: "Will optimization reduce accuracy?",
        answer:
          "Quantization, pruning, or ONNX export are applied against an accuracy baseline measured in the model audit, so the trade-off is explicit before anything ships.",
      },
      {
        question: "How is the model served?",
        answer:
          "Through a FastAPI or Triton Inference Server endpoint with batch support, health checks, and metrics endpoints.",
      },
      {
        question: "How do we know if the model degrades?",
        answer:
          "Prediction logging, latency metrics, and data drift alerts are set up, with a monitoring dashboard as part of the deliverables.",
      },
      {
        question: "Can it scale with traffic?",
        answer:
          "Yes. Auto-scaling is configured on Kubernetes or serverless GPU platforms such as Modal or AWS SageMaker, with load test results and a scaling guide.",
      },
    ],
  },
];

/** Replace the service's linked case studies with `seed.projectSlugs`, in order. */
async function syncProjectLinks(serviceId: string, seed: ServiceSeed) {
  const { error: deleteError } = await supabase
    .from('service_projects')
    .delete()
    .eq('service_id', serviceId);
  if (deleteError) {
    console.error(`    ERROR clearing project links:`, deleteError.message);
    return;
  }
  if (!seed.projectSlugs.length) return;

  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, slug')
    .in('slug', seed.projectSlugs);
  if (error) {
    console.error(`    ERROR fetching projects:`, error.message);
    return;
  }

  const rows = seed.projectSlugs.flatMap((slug, index) => {
    const project = projects?.find((p) => p.slug === slug);
    if (!project) {
      console.warn(`    WARN: project "${slug}" not found, not linked`);
      return [];
    }
    return [{ service_id: serviceId, project_id: project.id, display_order: index }];
  });

  const { error: insertError } = await supabase.from('service_projects').insert(rows);
  if (insertError) {
    console.error(`    ERROR linking projects:`, insertError.message);
  } else {
    console.log(`    linked case studies: ${rows.length}`);
  }
}

async function seedServices() {
  console.log('Fetching existing services...');
  const { data: existing, error } = await supabase.from('services').select('id, title, slug');

  if (error) {
    console.error('Failed to fetch services:', error.message);
    process.exit(1);
  }

  if (!existing?.length) {
    console.log('No services found. Add services via the admin panel first.');
    return;
  }

  let updated = 0;
  let skipped = 0;

  for (const seed of services) {
    const candidates = [seed.title, ...seed.matchTitles].map((t) => t.toLowerCase());
    const match = existing.find(
      (s) => s.slug === seed.slug || candidates.includes(s.title.toLowerCase())
    );

    if (!match) {
      console.log(`  SKIP: No row titled [${[seed.title, ...seed.matchTitles].join(' | ')}] or with slug ${seed.slug}`);
      skipped++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('services')
      .update({
        title: seed.title,
        slug: seed.slug,
        summary: seed.summary,
        description: seed.description,
        process: seed.process,
        benefits: seed.benefits,
        tools_technologies: seed.tools_technologies,
        deliverables: seed.deliverables,
        pricing_model: seed.pricing_model,
        faqs: seed.faqs,
      })
      .eq('id', match.id);

    if (updateError) {
      console.error(`  ERROR updating "${match.title}":`, updateError.message);
    } else {
      console.log(`  OK: Updated "${match.title}" → "${seed.title}" (slug: ${seed.slug})`);
      updated++;
      await syncProjectLinks(match.id, seed);
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

seedServices();
