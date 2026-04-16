import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

// Static project details to migrate
const projectDetails: Record<string, any> = {
  'context-aware-rag': {
    eyebrow: 'Architecture, search, chunking, observability',
    summary:
      'A GenAI-powered chatbot that provides accurate, citation-backed answers about Artificial Intelligence and Machine Learning topics using Retrieval-Augmented Generation.',
    problem: [
      'AI/ML information is fragmented across sources with varying levels of quality and reliability.',
      'Traditional chatbots often answer without citations, making it difficult to verify generated claims.',
      'Ungrounded LLM responses can hallucinate plausible but incorrect information.',
      'Long conversations require history optimization so the model receives the right context without excessive token usage.',
    ],
    solution: [
      'Ingest curated Wikipedia articles and split them with semantic chunking to preserve natural topic boundaries.',
      'Retrieve evidence through hybrid search that combines vector MMR with BM25 keyword matching.',
      'Filter redundant retrieved evidence before generation using context distillation.',
      'Generate responses with numbered citations and source metadata for traceability.',
      'Persist sessions and message history in SQLite while exposing a FastAPI backend and a Next.js frontend.',
    ],
    features: [
      'Hybrid vector and BM25 retrieval for semantic and exact-match search.',
      'Semantic chunking with configurable breakpoint strategies.',
      'LangGraph state machine for retrieve-and-generate conversation flow.',
      'Citation tracking with source title, URL, preview, page, and chunk metadata.',
      'History optimization with sliding window, token budget, and summarization strategies.',
      'LangSmith tracing and evaluation support for observability.',
      'Docker Compose deployment with Ollama model support.',
    ],
    architecture: [
      'Next.js frontend sends user messages to a FastAPI API.',
      'The API coordinates a LangGraph workflow with retrieval and generation nodes.',
      'ChromaDB stores HuggingFace embeddings for vector retrieval while BM25 provides keyword matching.',
      'Ollama-hosted LLMs generate responses from distilled retrieved context.',
      'SQLite stores sessions, messages, timestamps, and citation payloads.',
    ],
    results: [
      'Grounded answers with explicit citations for transparent AI/ML topic exploration.',
      'Improved retrieval coverage through combined semantic and keyword search.',
      'Reduced context noise through retrieval distillation and history optimization.',
    ],
    stack: [
      'LangChain',
      'LangGraph',
      'ChromaDB',
      'HuggingFace embeddings',
      'Ollama',
      'FastAPI',
      'Pydantic',
      'SQLite',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Docker',
      'LangSmith',
    ],
  },
  'medical-qa-chatbot': {
    eyebrow: 'Healthcare AI, RAG Architecture, Medical NLP',
    summary:
      'A production-ready medical Q/A chatbot that provides accurate, citation-backed answers to health questions by retrieving evidence from specialized medical documents. Built with fine-tuned embeddings for medical terminology and deployed with a secure, scalable RAG architecture.',
    problem: [
      'Healthcare professionals and patients need reliable medical information, but LLMs can hallucinate dangerous misinformation when answering medical queries.',
      'Medical literature is locked in static PDFs spanning thousands of pages, making manual search impractical and time-consuming.',
      'General-purpose chatbots lack domain-specific understanding of medical terminology, drug interactions, and clinical protocols.',
      'Answers without citations create liability concerns and make it impossible to verify accuracy against source material.',
      'Standard embeddings fail to capture semantic relationships between medical terms, symptoms, and diagnoses.',
    ],
    solution: [
      'Implement a Retrieval-Augmented Generation pipeline specifically tuned for medical document understanding.',
      'Fine-tune embedding models on medical corpora to improve semantic understanding of clinical terminology and relationships.',
      'Use Pinecone vector database for sub-second similarity search across millions of document chunks with HNSW indexing.',
      'Extract and chunk PDFs while preserving medical context boundaries (e.g., keeping drug dosage info together).',
      'Generate responses with numbered citations linking back to exact source pages and passages for full transparency.',
      'Deploy with LlamaIndex orchestration framework for production-grade document ingestion and query routing.',
    ],
    features: [
      'Medical PDF ingestion with intelligent chunking that preserves clinical context and table structures.',
      'Fine-tuned embeddings optimized for medical vocabulary, abbreviations, and semantic relationships.',
      'Citation tracking with exact page numbers, document names, and retrievable source passages.',
      'Pinecone-powered vector search with HNSW algorithm for sub-100ms retrieval latency.',
      'OpenAI GPT integration with medical-specific prompt engineering and temperature tuning.',
      'Streamlit web interface with conversation history and source document preview.',
      'Configurable retrieval parameters (top-k, similarity threshold, chunk overlap) via admin controls.',
    ],
    architecture: [
      'Medical PDFs are parsed and chunked using LlamaIndex with overlap to preserve context across boundaries.',
      'Document chunks are embedded using a medical-domain fine-tuned model and stored in Pinecone with metadata.',
      'User queries are embedded and used to retrieve top-k most relevant passages via approximate nearest neighbor search.',
      'Retrieved context is ranked by relevance score and passed to OpenAI GPT with medical safety constraints.',
      'The LLM generates responses with inline citations, which are mapped back to source documents.',
      'Streamlit frontend handles session management, displays conversation history, and renders source previews.',
    ],
    results: [
      'Successfully answers complex medical queries with 95%+ citation accuracy based on ground truth evaluation.',
      'Reduces medical information search time from 15+ minutes (manual PDF search) to under 10 seconds.',
      'Demonstrates production-ready RAG architecture applicable to legal, research, and enterprise knowledge bases.',
      'Shows expertise in domain-specific AI tuning, vector databases, and healthcare compliance considerations.',
      'Provides template for client medical Q/A, drug information systems, or clinical decision support tools.',
    ],
    stack: [
      'Python',
      'OpenAI GPT-3.5/4',
      'LlamaIndex',
      'Pinecone Vector DB',
      'HuggingFace Transformers',
      'Streamlit',
      'PyPDF2',
      'Sentence Transformers',
      'RAG Architecture',
    ],
  },
  'whatsapp-chatbot': {
    eyebrow: 'Customer Automation, Conversational AI, Workflow Integration',
    summary:
      'An intelligent WhatsApp Business chatbot that combines natural language understanding with backend automation. Handles customer queries conversationally while triggering real business workflows like bookings, order tracking, and data lookups through OpenAI function calling.',
    problem: [
      'Businesses receive high volumes of repetitive customer inquiries on WhatsApp, overwhelming support teams and increasing response times.',
      'Basic WhatsApp auto-responders can only send static messages and cannot handle dynamic queries or trigger backend actions.',
      'Traditional chatbot builders lack the intelligence to understand complex user intent and execute multi-step workflows.',
      'Customer service teams need 24/7 availability but hiring round-the-clock staff is cost-prohibitive for most businesses.',
      'Integration between WhatsApp conversations and backend systems (CRM, inventory, bookings) typically requires manual data entry.',
    ],
    solution: [
      'Build an AI-powered WhatsApp agent using OpenAI\'s function calling capability to map natural language to structured backend actions.',
      'Integrate with WhatsApp Business API for official, reliable message delivery and webhook handling.',
      'Develop Django backend with modular function handlers for extensible business logic (bookings, queries, updates).',
      'Implement intent classification to route conversations between AI responses and function execution.',
      'Add conversation state management to handle multi-turn dialogues and gather required parameters across messages.',
      'Deploy with webhook verification, message queuing, and error handling for production reliability.',
    ],
    features: [
      'WhatsApp Business API integration with webhook support for real-time message processing.',
      'OpenAI function calling with dynamic tool selection based on conversation context.',
      'Modular function registry allowing easy addition of new business workflows without code changes.',
      'Conversation state tracking for multi-turn parameter collection (e.g., "What date?" → "Morning or afternoon?").',
      'Fallback to human agents with smooth conversation handoff when AI confidence is low.',
      'Message queue processing with Celery for handling high-volume message bursts.',
      'Admin dashboard for monitoring conversations, function execution logs, and performance metrics.',
    ],
    architecture: [
      'WhatsApp Business API sends incoming messages to a Django webhook endpoint.',
      'Message router analyzes conversation history and current message to determine response strategy.',
      'OpenAI API receives conversation context and available function schemas, returning either a text response or function call.',
      'If function is called, Django executes the corresponding handler (e.g., query database, create booking, check inventory).',
      'Function results are sent back to OpenAI for natural language formatting before returning to user.',
      'PostgreSQL stores conversation history, function logs, and user session data for continuity.',
      'Redis caches active conversations and rate-limits API calls to stay within quotas.',
    ],
    results: [
      'Reduces customer support response time from 15+ minutes to under 30 seconds for common queries.',
      'Handles 80% of customer inquiries automatically, allowing human agents to focus on complex cases.',
      'Demonstrates production-ready integration of LLM reasoning with business process automation.',
      'Provides reusable architecture for customer support, booking systems, order tracking, and CRM integration.',
      'Shows expertise in WhatsApp Business API, conversational AI, and backend automation for client projects.',
    ],
    stack: [
      'Django',
      'Django REST Framework',
      'OpenAI Function Calling',
      'WhatsApp Business API',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Python',
      'Webhooks',
    ],
  },
  'trek-pal-nepal': {
    eyebrow: 'Full-Stack SaaS, E-commerce, Payment Integration',
    summary:
      'A comprehensive trekking and tourism platform connecting travelers with 30+ destinations across Nepal. Features complete booking workflows, secure payment processing, multi-role admin dashboard, and dynamic content management. Live in production at trekpalnepal.com.',
    problem: [
      'Nepali tourism operators struggle with fragmented booking systems, relying on email, phone calls, and WhatsApp for reservations.',
      'Travelers lack a centralized platform to discover, compare, and book trekking experiences with transparent pricing and availability.',
      'Manual booking management creates errors, double-bookings, and requires significant administrative overhead.',
      'Payment collection is unreliable with cash-on-arrival creating financial risk and limiting advance planning.',
      'Tour operators need real-time visibility into bookings, revenue, and customer data but lack technical infrastructure.',
    ],
    solution: [
      'Build a full-stack tourism marketplace with React frontend for responsive, SEO-optimized destination browsing.',
      'Develop Django REST API backend with role-based access control for customers, tour operators, and administrators.',
      'Implement end-to-end booking workflow with date selection, group size management, and automatic pricing calculation.',
      'Integrate PACO payment gateway for secure online payments with Nepal-specific compliance.',
      'Create comprehensive admin dashboard for destination management, booking oversight, and revenue analytics.',
      'Deploy with MongoDB for flexible schema supporting varied trek packages and seasonal pricing.',
    ],
    features: [
      '30+ curated trekking destinations with detailed itineraries, difficulty ratings, and photo galleries.',
      'Multi-step booking form with date picker, group size selector, and add-ons (guides, equipment, permits).',
      'PACO payment gateway integration with secure checkout, payment verification, and automatic confirmation emails.',
      'Admin dashboard with destination CRUD, booking management, customer database, and revenue reports.',
      'Role-based authentication supporting customers, tour operators, and super admins with granular permissions.',
      'Dynamic pricing engine supporting seasonal rates, group discounts, and promotional codes.',
      'Responsive React UI with lazy loading, image optimization, and mobile-first design.',
      'Email notification system for booking confirmations, payment receipts, and itinerary updates.',
    ],
    architecture: [
      'React SPA with React Router handles client-side navigation and state management via Context API.',
      'Django REST Framework exposes API endpoints for destinations, bookings, payments, and admin operations.',
      'MongoDB stores flexible document schemas for trek packages, bookings, users, and payment records.',
      'PACO payment gateway processes transactions with webhook validation for payment status updates.',
      'JWT authentication with refresh tokens ensures secure API access and session management.',
      'AWS S3 (or similar) hosts destination images and documents with CDN delivery.',
      'Nginx reverse proxy handles HTTPS, static file serving, and API request routing.',
    ],
    results: [
      'Successfully launched production platform processing real bookings and payments at trekpalnepal.com.',
      'Automated 90%+ of booking workflow, reducing manual administrative time from hours to minutes per booking.',
      'Demonstrates full-stack e-commerce expertise applicable to booking platforms, marketplaces, and SaaS products.',
      'Shows end-to-end product development from requirements gathering through production deployment.',
      'Provides reference architecture for travel booking, event ticketing, rental platforms, and service marketplaces.',
    ],
    stack: [
      'React',
      'React Router',
      'Django',
      'Django REST Framework',
      'MongoDB',
      'PACO Payment Gateway',
      'JWT Authentication',
      'AWS S3',
      'Nginx',
      'Email Service',
    ],
  },
  'continual-monument-detection': {
    eyebrow: 'Deep Learning Research, Computer Vision, Continual Learning',
    summary:
      'Advanced computer vision research applying continual learning techniques to monument detection. Implements knowledge distillation and meta-learning strategies with Faster R-CNN to overcome catastrophic forgetting when learning new monument classes incrementally.',
    problem: [
      'Traditional object detection models suffer from catastrophic forgetting when fine-tuned on new classes, losing ability to recognize previously learned monuments.',
      'Cultural heritage applications require models that continuously learn new landmarks without requiring full retraining on all historical data.',
      'Standard transfer learning approaches degrade performance on old classes by 40-60% when adapted to new monument categories.',
      'Collecting and labeling complete monument datasets upfront is impractical as new landmarks are constantly added to databases.',
      'Real-world deployment requires models to maintain stable performance across all monument classes while adapting to new data.',
    ],
    solution: [
      'Implement continual learning framework using knowledge distillation to preserve representations of previously learned monuments.',
      'Apply meta-learning (MAML-style) optimization to enable rapid adaptation to new monument classes with few examples.',
      'Use Faster R-CNN as the base detector with custom continual learning heads for incremental class expansion.',
      'Employ memory replay strategy with exemplar selection to maintain representative samples from earlier training tasks.',
      'Implement task-specific normalization and feature disentanglement to reduce interference between old and new knowledge.',
    ],
    features: [
      'Faster R-CNN architecture modified with continual learning-aware components and elastic weight consolidation.',
      'Knowledge distillation framework preserving feature representations and predictions from previous task models.',
      'Meta-learning initialization enabling quick adaptation to new monument classes with limited labeled data.',
      'Memory buffer management with herding-based exemplar selection for balanced class representation.',
      'Task-incremental learning protocol supporting sequential addition of monument classes without forgetting.',
      'Comprehensive evaluation metrics including backward transfer, forward transfer, and forgetting measures.',
      'PyTorch implementation with modular design for experimenting with different continual learning strategies.',
    ],
    architecture: [
      'Faster R-CNN backbone (ResNet-50/101) extracts visual features from monument images.',
      'Task-specific detection heads added incrementally for new monument classes while preserving old heads.',
      'Knowledge distillation loss computed between current model and frozen teacher model from previous task.',
      'Meta-learning outer loop optimizes for fast adaptation across monument detection tasks.',
      'Memory buffer stores representative exemplars from each monument class for replay during new task training.',
      'Elastic Weight Consolidation (EWC) penalizes changes to important weights for previous tasks.',
    ],
    results: [
      'Achieves 78% retention of old class performance while learning new monuments (vs. 35% baseline forgetting).',
      'Demonstrates 3x faster adaptation to new monument classes compared to fine-tuning from scratch.',
      'Shows strong research capabilities in continual learning, meta-learning, and computer vision.',
      'Provides foundation for lifelong learning systems in cultural heritage, robotics, and evolving environments.',
      'Applicable to any domain requiring incremental object detection: e-commerce, medical imaging, autonomous vehicles.',
    ],
    stack: [
      'PyTorch',
      'Faster R-CNN',
      'torchvision',
      'Knowledge Distillation',
      'Meta-Learning (MAML)',
      'ResNet',
      'Elastic Weight Consolidation',
      'Computer Vision',
    ],
  },
  pestpad: {
    eyebrow: 'Mobile Development, AgriTech, Field Automation',
    summary:
      'A mobile application streamlining pesticide residue testing workflows for agricultural safety inspectors. Enables rapid field data collection, sample tracking, and test result management with offline-first architecture for rural deployment.',
    problem: [
      'Agricultural inspectors conduct pesticide residue tests using paper forms, causing data entry errors and delayed reporting.',
      'Test results are recorded manually, making it difficult to track sample history, identify trends, or generate compliance reports.',
      'Rural testing locations often lack reliable internet connectivity, preventing real-time data upload and synchronization.',
      'Coordination between field inspectors and lab technicians requires phone calls and physical paperwork transfer.',
      'Vegetable farmers need quick turnaround on test results to make harvest and distribution decisions, but paper workflows take days.',
    ],
    solution: [
      'Develop cross-platform Flutter mobile app with offline-first architecture for reliable field use without connectivity.',
      'Implement Firebase backend with automatic data sync when connection is restored and conflict resolution.',
      'Create guided workflow for sample collection with photo capture, barcode scanning, and GPS location tagging.',
      'Build real-time notification system to alert farmers and inspectors when test results are available.',
      'Design role-based access with separate views for field inspectors, lab technicians, and agricultural officers.',
    ],
    features: [
      'Offline-first data collection with automatic sync when connectivity is restored.',
      'Sample registration workflow with photo capture, barcode/QR code scanning, and location tracking.',
      'Test result entry interface for lab technicians with dropdown menus for common pesticide types.',
      'Push notifications for test completion, abnormal results, and compliance alerts.',
      'Historical sample tracking with search, filter, and export capabilities for regulatory reporting.',
      'Role-based dashboards showing pending tests, completion rates, and compliance statistics.',
      'PDF report generation for sharing results with farmers and regulatory authorities.',
    ],
    architecture: [
      'Flutter UI provides consistent experience across Android devices with Material Design components.',
      'Local SQLite database stores sample data, test results, and user actions for offline operation.',
      'Firebase Firestore serves as cloud database with real-time sync and automatic conflict resolution.',
      'Firebase Cloud Messaging delivers push notifications for test updates and system alerts.',
      'Firebase Storage hosts sample photos and generated PDF reports with secure access controls.',
      'Sync engine monitors connectivity and intelligently batches uploads to minimize data usage.',
    ],
    results: [
      'Reduces sample-to-result turnaround time from 3-5 days to under 24 hours by eliminating paperwork.',
      'Enables offline operation in remote areas, syncing data automatically when inspectors return to coverage.',
      'Demonstrates mobile development expertise for field workflows, agriculture tech, and public health applications.',
      'Shows capabilities in offline-first architecture, Firebase integration, and cross-platform mobile development.',
      'Provides template for inspection apps, quality assurance workflows, and field data collection tools.',
    ],
    stack: [
      'Flutter',
      'Dart',
      'Firebase Firestore',
      'Firebase Cloud Messaging',
      'Firebase Storage',
      'SQLite',
      'Android',
      'Barcode Scanner',
    ],
  },
  amid: {
    eyebrow: 'Computer Vision, Mobile ML, Cultural Heritage Tech',
    summary:
      'An intelligent mobile application that uses on-device computer vision to identify historical monuments in real-time. Points your camera at landmarks to receive instant information, historical context, and augmented reality overlays enhancing cultural heritage exploration.',
    problem: [
      'Tourists visiting historical sites struggle to identify monuments and access relevant information without guided tours.',
      'Traditional audio guides and plaques provide limited, static information and require knowing what you\'re looking at.',
      'Manual text searches are cumbersome when you see a monument but don\'t know its name or historical significance.',
      'Travelers miss historical context and stories that make monuments meaningful because information is not readily accessible.',
      'Existing monument apps require internet connectivity and don\'t work well in areas with poor coverage or when roaming.',
    ],
    solution: [
      'Develop mobile app with real-time object detection using TensorFlow Lite for on-device monument recognition.',
      'Train custom monument detection model on dataset of historical landmarks with bounding box annotations.',
      'Implement camera-based interface with live video stream processing and AR overlays showing monument information.',
      'Store monument database and model on-device for offline operation without internet dependency.',
      'Build Flutter cross-platform app delivering consistent experience on iOS and Android.',
      'Integrate Firebase for cloud-synced favorites, visit history, and optional social features.',
    ],
    features: [
      'Real-time camera-based monument detection with bounding boxes and confidence scores displayed as AR overlay.',
      'On-device TensorFlow Lite inference enabling instant recognition without internet or cloud processing.',
      'Comprehensive monument database with historical facts, construction dates, architectural styles, and cultural significance.',
      'Photo capture with automatic monument tagging and metadata for building personal travel collections.',
      'Interactive AR information cards overlaying monument details directly in camera view.',
      'Offline-first operation with full monument recognition and information access without connectivity.',
      'Visit history tracking with maps showing previously identified monuments and discovery progress.',
      'Favorites and bookmarking system with cloud sync via Firebase.',
    ],
    architecture: [
      'Flutter UI manages camera stream access and renders AR overlays with monument information cards.',
      'TensorFlow Lite runs custom monument detection model (MobileNet-SSD or EfficientDet) on-device for sub-second inference.',
      'Monument classifier identifies specific landmark from detected bounding boxes using fine-tuned neural network.',
      'Local SQLite database stores monument metadata, descriptions, and historical facts for offline access.',
      'Firebase Authentication manages user accounts for syncing favorites and visit history across devices.',
      'Firebase Firestore syncs user data (favorites, visited monuments) and enables optional social features.',
      'Camera plugin provides optimized video stream processing with configurable resolution and frame rate.',
    ],
    results: [
      'Achieves 85%+ monument recognition accuracy on 50+ historical landmarks with sub-second inference time.',
      'Enables fully offline operation with on-device ML, providing seamless experience without internet dependency.',
      'Demonstrates expertise in mobile ML deployment, TensorFlow Lite optimization, and computer vision applications.',
      'Shows capabilities in AR/camera-based interfaces, offline-first architecture, and cultural heritage technology.',
      'Provides reference implementation for visual search, product recognition, real estate apps, and educational tools.',
    ],
    stack: [
      'Flutter',
      'TensorFlow Lite',
      'MobileNet-SSD / EfficientDet',
      'Firebase',
      'SQLite',
      'Camera Plugin',
      'AR Foundation',
      'Computer Vision',
      'On-Device ML',
    ],
  },
};

async function migrateProjectDetails() {
  try {
    console.log('🚀 Starting project details migration...\n');

    // Get all projects from the database
    const { data: projects, error: fetchError } = await supabase
      .from('projects')
      .select('id, slug, name');

    if (fetchError) {
      throw fetchError;
    }

    if (!projects || projects.length === 0) {
      console.log('⚠️  No projects found in the database');
      return;
    }

    console.log(`📦 Found ${projects.length} projects in the database\n`);

    let updated = 0;
    let skipped = 0;

    for (const project of projects) {
      const details = projectDetails[project.slug];

      if (!details) {
        console.log(`⏭️  Skipping "${project.name}" (${project.slug}) - no static data found`);
        skipped++;
        continue;
      }

      // Update the project with the detail fields
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          eyebrow: details.eyebrow,
          summary: details.summary,
          problem: details.problem,
          solution: details.solution,
          features: details.features,
          architecture: details.architecture,
          results: details.results,
          stack: details.stack,
        })
        .eq('id', project.id);

      if (updateError) {
        console.error(`❌ Error updating "${project.name}":`, updateError);
        continue;
      }

      console.log(`✅ Updated "${project.name}" (${project.slug})`);
      updated++;
    }

    console.log(`\n╔════════════════════════════════════════╗`);
    console.log(`║     Migration Complete!                ║`);
    console.log(`╚════════════════════════════════════════╝`);
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Updated: ${updated} projects`);
    console.log(`   ⏭️  Skipped: ${skipped} projects`);
    console.log(`   📦 Total: ${projects.length} projects\n`);

    if (skipped > 0) {
      console.log(`💡 Tip: You can add details for skipped projects through the admin dashboard\n`);
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateProjectDetails();
