# Portfolio CMS API Documentation

Complete API reference for your portfolio CMS backend.

## 🔐 Authentication

All admin API routes require authentication. Include the session cookie in your requests (handled automatically by Supabase client).

**Authentication Check:**

```typescript
// All routes verify admin using:
const authResult = await verifyAdmin(request);
if (!authResult.authorized) {
  return unauthorizedResponse(authResult.error);
}
```

---

## 📚 API Endpoints

### Projects

#### `GET /api/admin/projects`

Get all projects (including unpublished).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "medical-qa-chatbot",
      "name": "Medical Q/A Chatbot (RAG)",
      "description": "...",
      "image_url": "https://...",
      "source_code_link": "https://github.com/...",
      "demo_url": "https://..." | null,
      "is_demo": true,
      "is_published": true,
      "display_order": 0,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "project_tags": [
        {
          "id": "uuid",
          "project_id": "uuid",
          "name": "Python",
          "color": "orange-text-gradient",
          "display_order": 0
        }
      ]
    }
  ]
}
```

#### `POST /api/admin/projects`

Create a new project.

**Request Body:**

```json
{
  "slug": "my-project",
  "name": "My Project",
  "description": "Project description (min 10 chars)",
  "image_url": "https://your-supabase-url.supabase.co/storage/v1/object/public/portfolio-images/projects/abc.webp",
  "source_code_link": "https://github.com/username/repo",
  "demo_url": "https://demo.com" | null,
  "is_demo": false,
  "is_published": true,
  "display_order": 0,
  "tags": [
    {
      "name": "React",
      "color": "blue-text-gradient"
    }
  ]
}
```

#### `GET /api/admin/projects/[id]`

Get a single project by ID.

#### `PUT /api/admin/projects/[id]`

Update a project. Same body as POST, all fields optional.

#### `DELETE /api/admin/projects/[id]`

Delete a project (and its tags via CASCADE).

#### `PUT /api/admin/projects/reorder`

Reorder projects for drag-and-drop.

**Request Body:**

```json
{
  "items": [
    { "id": "uuid-1", "display_order": 0 },
    { "id": "uuid-2", "display_order": 1 },
    { "id": "uuid-3", "display_order": 2 }
  ]
}
```

---

### Experiences

#### `GET /api/admin/experiences`

Get all experiences (including unpublished).

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Software Engineer",
      "company_name": "QuickFox Consulting",
      "icon_url": "/images/company/quickfox.png",
      "icon_bg_color": "#E6DEDD",
      "date": "Jan 2024 – Present",
      "is_published": true,
      "display_order": 0,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "experience_points": [
        {
          "id": "uuid",
          "experience_id": "uuid",
          "point": "Built Quick CCA...",
          "display_order": 0
        }
      ]
    }
  ]
}
```

#### `POST /api/admin/experiences`

Create a new experience.

**Request Body:**

```json
{
  "title": "Software Engineer",
  "company_name": "Company Name",
  "icon_url": "https://...",
  "icon_bg_color": "#E6DEDD",
  "date": "Jan 2024 – Present",
  "is_published": true,
  "display_order": 0,
  "points": [
    "Achievement 1",
    "Achievement 2"
  ]
}
```

#### `GET /api/admin/experiences/[id]`

Get a single experience by ID.

#### `PUT /api/admin/experiences/[id]`

Update an experience.

#### `DELETE /api/admin/experiences/[id]`

Delete an experience (and its points via CASCADE).

#### `PUT /api/admin/experiences/reorder`

Reorder experiences.

---

### Technologies

#### `GET /api/admin/technologies`

Get all technologies.

#### `POST /api/admin/technologies`

Create a new technology.

**Request Body:**

```json
{
  "name": "Python",
  "icon_url": "/images/tech/python.webp",
  "is_published": true,
  "display_order": 0
}
```

#### `GET /api/admin/technologies/[id]`

Get a single technology.

#### `PUT /api/admin/technologies/[id]`

Update a technology.

#### `DELETE /api/admin/technologies/[id]`

Delete a technology.

---

### Services

#### `GET /api/admin/services`

Get all services.

#### `POST /api/admin/services`

Create a new service.

**Request Body:**

```json
{
  "title": "ML Developer",
  "icon_url": "/images/creator.png",
  "is_published": true,
  "display_order": 0
}
```

#### `GET /api/admin/services/[id]`

Get a single service.

#### `PUT /api/admin/services/[id]`

Update a service.

#### `DELETE /api/admin/services/[id]`

Delete a service.

---

### Site Settings

All settings endpoints follow the same pattern:

#### `GET /api/admin/settings/hero`

Get hero section settings.

**Response:**

```json
{
  "success": true,
  "data": {
    "heading": "Hi, I'm",
    "name": "Santosh",
    "subtitle": "a machine learning engineer...",
    "resume_url": "/cv.pdf"
  }
}
```

#### `PUT /api/admin/settings/hero`

Update hero settings.

**Request Body:**

```json
{
  "heading": "Hi, I'm",
  "name": "Santosh",
  "subtitle": "a machine learning engineer...",
  "resume_url": "https://supabase.co/storage/.../cv.pdf"
}
```

#### `GET/PUT /api/admin/settings/bio`

**Data Structure:**

```json
{
  "paragraphs": [
    "Paragraph 1...",
    "Paragraph 2...",
    "Paragraph 3..."
  ]
}
```

#### `GET/PUT /api/admin/settings/seo`

**Data Structure:**

```json
{
  "title": "Santosh Pandey | ML Engineer",
  "description": "Machine Learning Engineer...",
  "keywords": ["ML", "AI", "Python"],
  "og_image": "https://..."
}
```

#### `GET/PUT /api/admin/settings/contact`

**Data Structure:**

```json
{
  "email": "suntoss.pandey@gmail.com"
}
```

#### `GET/PUT /api/admin/settings/social`

**Data Structure:**

```json
{
  "github": "https://github.com/suntoss",
  "linkedin": "https://linkedin.com/in/santosh-pandey",
  "twitter": "https://twitter.com/..."
}
```

---

### File Upload

#### `POST /api/admin/upload`

Upload a file to Supabase Storage.

**Request:**

- Content-Type: `multipart/form-data`
- Body:
  - `file`: File (max 5MB)
  - `bucket`: string (optional, defaults to 'projects')

**Allowed file types:**

- `image/jpeg`, `image/jpg`, `image/png`
- `image/webp`, `image/svg+xml`
- `application/pdf`

**Response:**

```json
{
  "success": true,
  "data": {
    "url": "https://your-project.supabase.co/storage/v1/object/public/portfolio-images/projects/uuid.webp",
    "path": "projects/uuid.webp",
    "fileName": "uuid.webp"
  }
}
```

**Bucket options:**

- `projects` - Project screenshots
- `companies` - Company logos
- `technologies` - Technology icons
- `services` - Service icons
- `testimonials` - Testimonial images
- `meta` - OG images, favicons
- `resume` - Resume PDF

#### `DELETE /api/admin/upload`

Delete a file from storage.

**Request Body:**

```json
{
  "filePath": "projects/uuid.webp"
}
```

---

### Revalidation

#### `POST /api/revalidate`

Manually trigger ISR revalidation.

**Request Body (option 1 - by path):**

```json
{
  "path": "/"
}
```

**Request Body (option 2 - by tag):**

```json
{
  "tag": "projects"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "message": "Path \"/\" revalidated successfully",
    "revalidated": true
  }
}
```

---

## 🔒 Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common Error Codes:**

- `401` - Unauthorized (not logged in)
- `400` - Validation error or bad request
- `404` - Resource not found
- `500` - Internal server error

**Validation Error Response:**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "code": "too_small",
      "minimum": 10,
      "path": ["description"],
      "message": "Description must be at least 10 characters"
    }
  ]
}
```

---

## 🧪 Testing API Routes

You can test API routes using:

### cURL Example

```bash
# Get projects (requires authentication)
curl -X GET http://localhost:3000/api/admin/projects \
  -H "Cookie: your-session-cookie"

# Create a project
curl -X POST http://localhost:3000/api/admin/projects \
  -H "Cookie: your-session-cookie" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-project",
    "name": "Test Project",
    "description": "This is a test project",
    "image_url": "https://...",
    "source_code_link": "https://github.com/...",
    "is_published": true,
    "display_order": 0,
    "tags": [{"name": "Test", "color": "blue-text-gradient"}]
  }'
```

### Using Postman/Insomnia

1. Login via your admin dashboard first
2. Copy the session cookie from browser DevTools
3. Add cookie to your requests
4. Make API calls

### Using the Admin Dashboard

The admin dashboard (which we'll build next) will handle all API calls for you with proper authentication.

---

## 📊 ISR (Incremental Static Regeneration)

Pages are automatically revalidated when you:

- Create/update/delete projects → Revalidates `/`, `/projects`
- Create/update/delete experiences → Revalidates `/`
- Create/update/delete technologies → Revalidates `/`
- Create/update/delete services → Revalidates `/`
- Update site settings → Revalidates `/`

Manual revalidation available via `/api/revalidate` endpoint.

---

## 🚀 Next Steps

With the backend complete, you can now:

1. Build the admin dashboard UI
2. Update the frontend to fetch from API
3. Deploy to production

See `CMS_SETUP_GUIDE.md` for the complete implementation roadmap.
