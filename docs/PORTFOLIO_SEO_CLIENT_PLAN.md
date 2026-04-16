# Portfolio SEO and Client Acquisition Plan

## Context

The portfolio already has a strong technical foundation:

- Next.js app with dynamic metadata.
- Dynamic sitemap and robots routes.
- Per-project routes under `/projects/[slug]`.
- Supabase-backed CMS and admin dashboard.
- JSON-LD `Person` schema on the homepage.
- Published project, service, experience, technology, navigation, and settings models.

The biggest opportunity is not adding more visual effects. It is turning the site from a resume-style portfolio into a search-friendly, client-focused sales asset.

## Goals

- Rank for service and project keywords related to AI, RAG, NLP, automation, backend, and ML engineering.
- Make project pages crawlable, detailed, and internally linked.
- Help visitors understand what problems you solve and how to hire you.
- Add proof, outcomes, and conversion paths for freelance/client work.

## Priority 1: Make Project Pages Central to SEO

The homepage project cards currently emphasize external demo/source links. Since the site already has `/projects/[slug]` pages and includes them in the sitemap, route users and crawlers to internal project pages first.

Recommended changes:

- Make each project card link to `/projects/{slug}`.
- Keep GitHub and live demo links inside the project detail page.
- Add visible "View case study" text on each card.
- Add internal links from service sections to relevant projects.

Why it matters:

- Internal case-study pages create indexable content.
- Google can understand each project as a separate page.
- Visitors get more context before leaving to GitHub or another site.

## Priority 2: Expand Project Pages into Case Studies

The current project pages are too thin for SEO and client conversion. Each project should become a short case study.

Recommended sections:

- Problem: What business or technical problem did this solve?
- Context: Who was it for, or what scenario was it built for?
- Your role: What did you personally build?
- Tech stack: Tools, frameworks, models, APIs, databases, deployment.
- Architecture: Brief explanation of system design or workflow.
- Key features: 4-6 concrete features.
- Results: Metrics, performance, users, automation savings, deployment status, or concrete outcomes.
- Screenshots: UI, workflow, dashboard, model output, or architecture diagram.
- Lessons learned: Short technical reflection.
- CTAs: "Build a similar AI system", "View live demo", "View source code", "Contact me".
- Related projects: Internal links to similar case studies.

Target example pages:

- Medical Q/A Chatbot (RAG)
- WhatsApp Chatbot with Function Calling
- Trek Pal Nepal
- Continual Monument Detection
- PestPAD
- AMID

## Priority 3: Clarify Positioning and Hero CTA

The hero should immediately explain what clients can hire you for.

Recommended hero positioning:

> I build AI chatbots, RAG systems, document automation tools, and scalable backend services for businesses.

Recommended CTAs:

- Hire me for AI automation
- View AI case studies
- Book a 15-minute call
- Download resume

Implementation notes:

- Keep resume as a secondary CTA.
- Add a primary CTA that scrolls to contact or links to a booking page.
- Display your role explicitly. The component currently reads `role`, but it is not rendered.
- Standardize the CMS hero content field. The seed uses `subtitle`, while the hero component reads `tagline`.

## Priority 4: Add Service Pages or Rich Service Sections

The service cards are currently too short to rank for service-specific keywords. Add deeper content for each service.

Recommended services:

- AI chatbot development
- RAG system development
- WhatsApp automation
- OCR and document automation
- Django/FastAPI backend development
- ML model deployment and optimization

Each service should include:

- What problem it solves.
- Who it is for.
- Deliverables.
- Typical stack.
- Example projects.
- Estimated timeline.
- CTA to contact.

Example service keyword targets:

- AI chatbot developer
- RAG chatbot developer
- WhatsApp automation developer
- OCR automation engineer
- Django FastAPI backend developer
- ML engineer Nepal
- AI automation freelancer

## Priority 5: Add Proof and Trust

The database already has a testimonials table, but the frontend does not render a testimonials section.

Recommended additions:

- Testimonials from clients, collaborators, managers, or users.
- Logos for companies/projects where appropriate.
- Project outcome badges, for example:
  - "Deployed at Global IME Bank"
  - "30+ trekking destinations"
  - "RAG with cited document answers"
  - "WhatsApp Business automation"
- Short "Selected Results" section near the top of the homepage.

Avoid vague proof like "high quality" or "modern solutions". Use specific outcomes.

## Priority 6: Improve Structured Data

Current JSON-LD uses a basic `Person` schema. Add more schema where it maps to real page content.

Recommended structured data:

- `Person` on homepage.
- `ProfessionalService` or `LocalBusiness` style schema for freelance services.
- `WebSite` on homepage.
- `CreativeWork` or `SoftwareApplication` for project pages.
- `BreadcrumbList` on project pages.
- `FAQPage` only if a real FAQ section is added.

Do not add fake aggregate ratings or fake reviews.

## Priority 7: Fix Metadata and Open Graph Gaps

Recommended changes:

- Add a real `public/og-image.png` at 1200x630, or make all metadata defaults point to an existing image.
- Replace the placeholder Google verification code before deploying.
- Add canonical URLs to project page metadata.
- Add more descriptive project metadata titles, for example:
  - `Medical RAG Chatbot Case Study | Santosh Pandey`
  - `WhatsApp AI Automation Bot | Santosh Pandey`
- Use project-specific Open Graph images where available.

## Priority 8: Improve the Contact Flow

The contact form should qualify leads, not just collect a message.

Recommended fields:

- Name
- Email
- Company or website
- Project type
- Budget range
- Timeline
- Message

Recommended additions:

- Add a Calendly or booking CTA if you want calls.
- Add anti-spam protection or a server-side contact endpoint.
- Remove hardcoded fallback EmailJS service/template/public key values.
- Add a clear expectation, for example: "I usually respond within 1-2 business days."

## Priority 9: Add SEO Content Hub

Add a `/blog`, `/notes`, or `/writing` section for long-tail technical SEO.

Recommended article topics:

- How to build a RAG chatbot for business documents
- RAG vs fine-tuning for business chatbots
- WhatsApp automation for customer support
- OCR cheque processing with Django and React
- Deploying LLM apps with FastAPI
- Building document automation pipelines with Python
- How to choose between Pinecone, Postgres, and MongoDB for AI search

Each post should link to relevant services and projects.

## Priority 10: Accessibility, Content, and Performance Polish

Recommended improvements:

- Add visible text labels for icon-only project actions.
- Use more descriptive image alt text for screenshots and project images.
- Ensure canvas/3D elements do not hide important text on mobile.
- Add a non-animated fallback or reduced-motion behavior where needed.
- Add analytics such as Vercel Analytics, Plausible, or PostHog to measure leads and popular pages.
- Track contact form submissions, project page visits, CTA clicks, and resume downloads.

## Suggested Implementation Order

1. Fix CMS hero field mismatch and add a stronger hero CTA.
2. Make project cards link to internal project pages.
3. Expand project detail pages into reusable case-study layouts.
4. Add service-rich content and internal links to projects.
5. Add testimonials/proof section.
6. Fix OG image, canonical URLs, and project metadata.
7. Add project/service structured data.
8. Improve the contact form and lead qualification flow.
9. Add content hub for long-tail SEO.
10. Add analytics and conversion tracking.
