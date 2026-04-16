/**
 * Seed rich content for 6 service entries.
 * Run: npx ts-node scripts/seed-services.ts
 *
 * This script matches services by title (case-insensitive) and updates them
 * with slugs, summaries, process steps, benefits, tools, and deliverables.
 */
import { createClient } from '@supabase/supabase-js';
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ServiceSeed {
  titlePatterns: string[];
  slug: string;
  summary: string;
  description: string;
  process: Array<{ step: string; description: string }>;
  benefits: string[];
  tools_technologies: string[];
  deliverables: string[];
  pricing_model: string;
}

const services: ServiceSeed[] = [
  {
    titlePatterns: ['chatbot', 'ai chatbot', 'conversational'],
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
  },
  {
    titlePatterns: ['rag', 'retrieval', 'document qa', 'knowledge base'],
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
  },
  {
    titlePatterns: ['whatsapp', 'whatsapp automation', 'whatsapp bot'],
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
  },
  {
    titlePatterns: ['ocr', 'document automation', 'document processing', 'rpa'],
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
  },
  {
    titlePatterns: ['django', 'fastapi', 'backend', 'api', 'rest api'],
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
  },
  {
    titlePatterns: ['ml deployment', 'machine learning', 'model optimization', 'ml ops', 'mlops'],
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
  },
];

async function seedServices() {
  console.log('Fetching existing services...');
  const { data: existing, error } = await supabase.from('services').select('id, title');

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
    const match = existing.find((s) =>
      seed.titlePatterns.some((pattern) =>
        s.title.toLowerCase().includes(pattern.toLowerCase())
      )
    );

    if (!match) {
      console.log(`  SKIP: No match for patterns [${seed.titlePatterns.join(', ')}]`);
      skipped++;
      continue;
    }

    const { error: updateError } = await supabase
      .from('services')
      .update({
        slug: seed.slug,
        summary: seed.summary,
        description: seed.description,
        process: seed.process,
        benefits: seed.benefits,
        tools_technologies: seed.tools_technologies,
        deliverables: seed.deliverables,
        pricing_model: seed.pricing_model,
      })
      .eq('id', match.id);

    if (updateError) {
      console.error(`  ERROR updating "${match.title}":`, updateError.message);
    } else {
      console.log(`  OK: Updated "${match.title}" → slug: ${seed.slug}`);
      updated++;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

seedServices();
