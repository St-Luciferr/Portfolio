/**
 * @deprecated This file is deprecated. Project details are now handled by the mapper layer.
 * Use the Project type from '@/types/frontend' and mappers from './mappers' instead.
 *
 * This file is kept for backward compatibility during transition.
 */

import type { Project, ProjectDetail } from '@/types/frontend';

export interface ProjectDetailSection {
  title: string;
  body?: string;
  items?: string[];
}

/** @deprecated Use ProjectDetail from '@/types/frontend' instead */
export interface ProjectDetailContent {
  eyebrow: string;
  summary: string;
  problem: string[];
  solution: string[];
  features: string[];
  architecture: string[];
  results: string[];
  stack: string[];
}

const projectDetails: Record<string, ProjectDetailContent> = {
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
    eyebrow: 'RAG, medical documents, cited answers',
    summary:
      'A context-aware medical Q/A chatbot that answers health-related questions using retrieved evidence from ingested documents.',
    problem: [
      'Medical question answering needs grounded, traceable responses instead of unsupported generation.',
      'PDF-based source material is difficult for users to search manually.',
      'General-purpose chatbots can miss domain-specific evidence or answer without citations.',
    ],
    solution: [
      'Build a Retrieval-Augmented Generation flow over medical documents.',
      'Use embeddings and vector search to retrieve relevant passages before generation.',
      'Return answers with source-aware context so users can inspect where the response came from.',
    ],
    features: [
      'PDF ingestion for domain knowledge.',
      'RAG-based answer generation.',
      'OpenAI, LlamaIndex, and Pinecone integration.',
      'Medical-document-focused embeddings.',
      'Streamlit interface for interaction.',
    ],
    architecture: [
      'Documents are ingested and embedded into a vector index.',
      'User questions retrieve relevant chunks from the index.',
      'The LLM generates a response from the retrieved context.',
    ],
    results: [
      'Demonstrates practical RAG for domain-specific medical document Q/A.',
      'Improves answer grounding by retrieving relevant source passages before generation.',
    ],
    stack: ['Python', 'OpenAI', 'LlamaIndex', 'Pinecone', 'Streamlit', 'RAG'],
  },
  'whatsapp-chatbot': {
    eyebrow: 'WhatsApp automation, function calling, backend actions',
    summary:
      'An AI chat agent for WhatsApp Business that handles user queries and triggers backend logic through function calling.',
    problem: [
      'Businesses need automated WhatsApp support without losing the ability to trigger real backend actions.',
      'Basic chatbots can answer questions but struggle to call tools or execute workflows reliably.',
    ],
    solution: [
      'Use OpenAI function calling to map user intent to backend operations.',
      'Expose the assistant through WhatsApp Business for customer-facing conversations.',
      'Use Django to manage backend logic and integrations.',
    ],
    features: [
      'WhatsApp Business integration.',
      'OpenAI-powered conversational responses.',
      'Function calling for backend actions.',
      'Django backend for business logic.',
    ],
    architecture: [
      'WhatsApp messages are routed to the backend.',
      'The LLM interprets intent and selects the relevant function when needed.',
      'Backend handlers execute the requested action and return a response.',
    ],
    results: [
      'Shows how LLM assistants can move beyond chat into workflow automation.',
      'Useful foundation for customer support, booking, and business-process bots.',
    ],
    stack: ['Django', 'OpenAI', 'WhatsApp API', 'Python', 'Function Calling'],
  },
  'trek-pal-nepal': {
    eyebrow: 'Tourism platform, booking, payments',
    summary:
      'A trekking platform for Nepal with destinations, booking flows, an admin dashboard, and PACO payment integration.',
    problem: [
      'Tourism operators need a structured way to showcase destinations and receive bookings online.',
      'Manual booking flows create friction for travelers and administrators.',
    ],
    solution: [
      'Build a React and Django platform with destination listings, booking features, and payment support.',
      'Provide an admin dashboard to manage platform content and operations.',
    ],
    features: [
      '30+ trekking destination listings.',
      'Booking workflow.',
      'Admin dashboard.',
      'PACO payment integration.',
      'React frontend and Django backend.',
    ],
    architecture: [
      'React handles the public user experience.',
      'Django powers backend APIs and administrative workflows.',
      'MongoDB stores application data.',
      'PACO integration supports payment flow requirements.',
    ],
    results: [
      'Public tourism platform with live destination and booking functionality.',
      'Connects content, booking, administration, and payments in one product.',
    ],
    stack: ['React', 'Django', 'MongoDB', 'PACO', 'Booking System'],
  },
  'continual-monument-detection': {
    eyebrow: 'Computer vision, continual learning, object detection',
    summary:
      'A computer vision project applying knowledge distillation and meta-learning techniques with Faster R-CNN for continual monument detection.',
    problem: [
      'Object detection systems can forget previously learned classes when trained incrementally.',
      'Monument detection needs stable recognition as new data and categories are introduced.',
    ],
    solution: [
      'Use continual learning techniques to reduce catastrophic forgetting.',
      'Apply knowledge distillation and meta-learning with Faster R-CNN.',
    ],
    features: [
      'Faster R-CNN object detection pipeline.',
      'Knowledge distillation.',
      'Meta-learning experiments.',
      'Continual learning focus for monument detection.',
    ],
    architecture: [
      'A detection model learns monument classes across incremental tasks.',
      'Distillation preserves useful behavior from earlier training stages.',
      'Meta-learning techniques help the model adapt to new detection tasks.',
    ],
    results: [
      'Explores robust object detection under continual learning constraints.',
      'Demonstrates applied research skills in PyTorch-based computer vision.',
    ],
    stack: ['PyTorch', 'Faster R-CNN', 'Computer Vision', 'Meta-Learning'],
  },
  pestpad: {
    eyebrow: 'Mobile app, pesticide detection, field workflow',
    summary:
      'An Android application designed to optimize pesticide detection workflows for vegetable samples.',
    problem: [
      'Pesticide detection workflows can be slow and difficult to manage without a dedicated mobile tool.',
      'Users need a faster way to record and understand sample detection outcomes.',
    ],
    solution: [
      'Build a mobile application focused on pesticide detection workflow support.',
      'Use Firebase-backed app features to support data handling and user flows.',
    ],
    features: [
      'Android mobile interface.',
      'Vegetable sample pesticide detection workflow.',
      'Firebase integration.',
      'Flutter-based implementation.',
    ],
    architecture: [
      'Flutter powers the mobile UI.',
      'Firebase supports backend services and data workflows.',
    ],
    results: [
      'Provides a practical mobile workflow for pesticide detection processes.',
      'Shows applied mobile development for agriculture and food-safety use cases.',
    ],
    stack: ['Flutter', 'Firebase', 'Android'],
  },
  amid: {
    eyebrow: 'Mobile app, object detection, cultural heritage',
    summary:
      'A mobile app that helps users explore historical landmarks using object detection for monument identification.',
    problem: [
      'Travelers and learners may struggle to identify historical landmarks while exploring.',
      'Cultural heritage discovery benefits from fast, mobile-first identification tools.',
    ],
    solution: [
      'Use object detection in a mobile app to identify landmarks.',
      'Provide a smoother way to connect users with monument information.',
    ],
    features: [
      'Mobile landmark exploration.',
      'Object detection for monument identification.',
      'Flutter app experience.',
      'Firebase-backed data support.',
    ],
    architecture: [
      'TensorFlow powers detection capabilities.',
      'Flutter provides the cross-platform app interface.',
      'Firebase supports app data and services.',
    ],
    results: [
      'Simplifies discovery of historical landmarks through a mobile-first experience.',
      'Connects computer vision with cultural heritage exploration.',
    ],
    stack: ['TensorFlow', 'Flutter', 'Firebase', 'Computer Vision'],
  },
};

/**
 * Get project detail content
 * @deprecated This function is no longer needed. Use project.details directly from mapped data.
 *
 * The mapper layer now handles all transformations and provides safe defaults.
 * This function is kept for backward compatibility.
 *
 * @param project - Frontend project object (from mappers)
 * @returns Project details
 */
export function getProjectDetailContent(project: Project): ProjectDetailContent {
  // Simply return the details from the mapped project
  // The mapper already handles all the fallback logic
  return project.details;
}
