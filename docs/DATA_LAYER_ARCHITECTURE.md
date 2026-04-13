# Data Layer Architecture

This document explains the data layer architecture and the separation of concerns between database types and frontend types.

## Table of Contents

- [Overview](#overview)
- [Types Organization](#types-organization)
- [Mapper Organization](#mapper-organization)
- [Data Flow](#data-flow)
- [Why Two Type Systems?](#why-two-type-systems)
- [Adding New Entities](#adding-new-entities)

---

## Overview

The portfolio uses a **three-layer architecture** to separate database concerns from frontend concerns:

```
┌─────────────────────────────────────────────────────┐
│  Frontend Layer (React Components)                  │
│  Types: src/types/frontend.ts                       │
│  Uses: Project, Experience, Technology (camelCase)  │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  Mapping Layer (Data Transformers)                  │
│  Location: src/mappers/                             │
│  • Transforms field names (snake_case → camelCase)  │
│  • Provides default values                          │
│  • Validates data structure                         │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│  Database Layer (Supabase Queries)                  │
│  Types: src/lib/types.ts                            │
│  Uses: DBProject, DBExperience (snake_case)         │
└─────────────────────────────────────────────────────┘
```

---

## Types Organization

### **Two Separate Type Systems** (This is intentional!)

#### 1. **Database Types** (`src/lib/types.ts`)

These types represent the **database schema** exactly as it exists in Supabase.

```typescript
// src/lib/types.ts
export interface DBProject {
  id: string;
  slug: string;
  name: string;
  image_url: string;          // snake_case (database convention)
  source_code_link: string;   // snake_case
  demo_url: string | null;
  is_demo: boolean;
  is_published: boolean;
  // ... more fields
}
```

**Purpose:**
- Match the database schema exactly
- Used in API routes and server-side code
- Used in admin dashboard forms
- Follow PostgreSQL/Supabase naming conventions (snake_case)

#### 2. **Frontend Types** (`src/types/frontend.ts`)

These types represent the **UI domain model** optimized for React components.

```typescript
// src/types/frontend.ts
export interface Project {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;         // camelCase (JavaScript convention)
  sourceCodeLink: string;   // camelCase
  demoUrl: string | null;
  isDemo: boolean;
  tags: ProjectTag[];
  details: ProjectDetail;
}
```

**Purpose:**
- Optimized for frontend consumption
- Follow JavaScript naming conventions (camelCase)
- Include computed/derived fields (like `details`)
- Used in all React components
- Stable interface for UI (doesn't change when DB changes)

---

## Mapper Organization

Mappers are organized by domain in separate files for better maintainability:

```
src/mappers/
├── index.ts                  # Barrel export (re-exports all mappers)
├── project.mapper.ts         # Project-related mappers
├── experience.mapper.ts      # Experience-related mappers
├── technology.mapper.ts      # Technology-related mappers
├── service.mapper.ts         # Service-related mappers
├── navigation.mapper.ts      # Navigation-related mappers
└── settings.mapper.ts        # Site settings mappers
```

### Example Mapper

```typescript
// src/mappers/project.mapper.ts
export function mapProject(dbProject: DBProject): Project {
  return {
    id: dbProject.id,
    slug: dbProject.slug,
    name: dbProject.name,
    imageUrl: dbProject.image_url,              // Transform snake_case → camelCase
    sourceCodeLink: dbProject.source_code_link, // Transform
    demoUrl: dbProject.demo_url,
    isDemo: dbProject.is_demo,
    tags: dbProject.tags.map(mapProjectTag),
    details: buildProjectDetails(dbProject),    // Compute derived data
  };
}
```

### Barrel Export Pattern

The `index.ts` file re-exports all mapper functions for clean imports:

```typescript
// Instead of:
import { mapProject } from '@/mappers/project.mapper';
import { mapExperience } from '@/mappers/experience.mapper';

// You can do:
import { mapProject, mapExperience } from '@/mappers';
```

---

## Data Flow

### 1. **Data Fetching** (Database Layer)

```typescript
// src/lib/data.ts
export async function getPublishedProjects(): Promise<Project[]> {
  // Step 1: Fetch from database (returns DBProject[])
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true);

  // Step 2: Transform to frontend format
  return mapProjects(data);  // DBProject[] → Project[]
}
```

### 2. **Component Usage** (Frontend Layer)

```typescript
// src/app/page.tsx
import type { Project } from '@/types/frontend';

export default async function HomePage() {
  const projects = await getPublishedProjects(); // Returns Project[]

  return (
    <div>
      {projects.map(project => (
        <img src={project.imageUrl} />  {/* camelCase - clean! */}
      ))}
    </div>
  );
}
```

---

## Why Two Type Systems?

### ❌ **Without Separation** (Bad)

```typescript
// Component tightly coupled to database schema
<img src={project.image_url} />  // snake_case in React? Weird!

// If you rename database column: image_url → thumbnail_url
// EVERY component breaks! 💥
```

### ✅ **With Separation** (Good)

```typescript
// Component uses clean frontend types
<img src={project.imageUrl} />  // camelCase - JavaScript-friendly!

// If you rename database column: image_url → thumbnail_url
// Only the mapper changes:
imageUrl: dbProject.thumbnail_url,  // One line change
// All components continue working! ✅
```

### Benefits

1. **Database Evolution**: Rename columns, change schema, add fields—components don't break
2. **Naming Conventions**: Database uses snake_case, JavaScript uses camelCase (both idiomatic)
3. **Computed Fields**: Add derived data (like `details`) without touching the database
4. **Testing**: Mock frontend types easily without database structure knowledge
5. **Team Collaboration**: Frontend developers work with `Project`, backend with `DBProject`
6. **API Versioning**: Multiple frontends can have different view models from same DB

---

## Adding New Entities

When adding a new data type (e.g., `Testimonials`), follow this pattern:

### 1. **Define Database Type**

```typescript
// src/lib/types.ts
export interface DBTestimonial {
  id: string;
  testimonial: string;
  author_name: string;      // snake_case
  author_title: string;
  company_logo_url: string;
  is_published: boolean;
  display_order: number;
}
```

### 2. **Define Frontend Type**

```typescript
// src/types/frontend.ts
export interface Testimonial {
  id: string;
  text: string;           // Different field name for clarity
  authorName: string;     // camelCase
  authorTitle: string;
  companyLogoUrl: string; // camelCase
}
```

### 3. **Create Mapper**

```typescript
// src/mappers/testimonial.mapper.ts
import type { DBTestimonial } from '@/lib/types';
import type { Testimonial } from '@/types/frontend';

export function mapTestimonial(db: DBTestimonial): Testimonial {
  return {
    id: db.id,
    text: db.testimonial,              // Rename for clarity
    authorName: db.author_name,        // Transform naming
    authorTitle: db.author_title,
    companyLogoUrl: db.company_logo_url,
  };
}

export function mapTestimonials(dbs: DBTestimonial[]): Testimonial[] {
  return dbs.map(mapTestimonial);
}
```

### 4. **Export from Barrel**

```typescript
// src/mappers/index.ts
export { mapTestimonial, mapTestimonials } from './testimonial.mapper';
```

### 5. **Use in Data Fetching**

```typescript
// src/lib/data.ts
import { mapTestimonials } from '@/mappers';

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase.from('testimonials').select('*');
  return mapTestimonials(data || []);
}
```

### 6. **Use in Components**

```typescript
// src/components/Testimonials.tsx
import type { Testimonial } from '@/types/frontend';

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>              {/* camelCase */}
          <img src={item.companyLogoUrl} /> {/* camelCase */}
        </div>
      ))}
    </div>
  );
}
```

---

## Summary

| Aspect | Database Types | Frontend Types |
|--------|---------------|----------------|
| **Location** | `src/lib/types.ts` | `src/types/frontend.ts` |
| **Naming** | snake_case | camelCase |
| **Purpose** | Match DB schema | Optimize for UI |
| **Used By** | API routes, mappers | React components |
| **Changes When** | Database schema changes | UI requirements change |
| **Examples** | `DBProject`, `DBExperience` | `Project`, `Experience` |

**Golden Rule**: Database types describe **what is stored**, frontend types describe **what is displayed**.

The mapper layer is the bridge that protects each side from the other's changes.
