# IT Company 3-Tier Docker Application

This project is a Docker-ready, multi-tier IT company website built from the existing Next.js frontend and adapted for a DevOps assignment. It keeps the current presentation and styling intact while separating the app into a frontend tier, backend API tier, and PostgreSQL data tier.

## Project overview

The application follows this architecture:

Browser
↓
Frontend / Presentation Tier
↓
HTTP REST API
↓
Backend / Application Tier
↓
PostgreSQL
↓
Database / Data Tier

## Architecture

```text
+------------------+        HTTP        +-------------------+        SQL        +------------------+
| Browser          | -----------------> | Next.js Frontend  | ----------------> | PostgreSQL       |
|                  |                     | (presentation)    |                  | (database)       |
+------------------+                     +-------------------+                  +------------------+
                                              |
                                              |
                                              v
                                      +-------------------+
                                      | Express backend   |
                                      | /api/inquiries    |
                                      +-------------------+
```

## Frontend, backend and database

- Frontend: Next.js app using the existing website pages and components
- Backend: Node.js + Express API in the backend folder
- Database: PostgreSQL with a dedicated schema and persistent volume

The frontend contact form sends submissions to the backend API instead of saving to a local JSON file. The admin dashboard reads inquiries from the backend through GET /api/inquiries.

## Directory structure

```text
IT-company/
├── app/
├── components/
├── data/
├── lib/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   └── .dockerignore
├── database/
│   └── schema.sql
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── .env.example
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── ...
```

## Environment variables

Copy the example environment file and adjust values for your environment:

```powershell
copy .env.example .env
```

Required variables:

- REGISTRY: registry prefix for Harbor-compatible images
- VERSION: version tag for application images
- NEXT_PUBLIC_API_URL: browser-facing backend URL, usually http://localhost:3001
- DB_HOST: database hostname, typically postgres in Docker Compose
- DB_PORT: PostgreSQL port, usually 5432
- DB_NAME: database name
- DB_USER: database username
- DB_PASSWORD: strong database password
- ADMIN_KEY: admin authentication key for inquiry dashboard access

## Dockerfiles

The project uses multi-stage builds for both the frontend and backend.

- Frontend Dockerfile: builds Next.js in one stage and runs the production server in a second stage
- Backend Dockerfile: installs production dependencies and runs the Express app as a non-root user
- Both images are optimized to be small and suitable for later use in a private Harbor registry

## Docker Compose

The root docker-compose.yml defines the full stack:

```powershell
docker compose up -d --build
```

The stack includes:

1. frontend
2. backend
3. postgres

All services communicate through the custom Docker network app-network.

## Network and volume explanation

- Network: app-network allows backend and frontend services to reach each other without hardcoded IPs
- PostgreSQL volume: postgres_data persists database content across container recreation
- Backend uses postgres:5432 as the database host inside the Docker network
- Frontend reaches the backend through NEXT_PUBLIC_API_URL, usually http://localhost:3001 from the host browser

## Health checks

The project includes:

- PostgreSQL: pg_isready health check
- Backend: /api/health endpoint that validates the database connection
- Docker Compose dependency conditions ensure the backend waits for PostgreSQL to become healthy before starting

## Local deployment instructions

### Start the full stack

```powershell
docker compose up -d --build
```

### Check running containers

```powershell
docker compose ps
```

### View logs

```powershell
docker compose logs
docker compose logs backend
docker compose logs frontend
docker compose logs postgres
```

### Stop the stack

```powershell
docker compose down
docker compose down -v
```

> docker compose down -v removes the database volume and deletes persisted data.

## Smoke test script

A quick validation script is included in the backend folder to verify the API responds correctly.

### Bash

```powershell
cd backend
chmod +x smoke-test.sh
BASE_URL=http://localhost:3001 ADMIN_KEY=change_this_admin_key ./smoke-test.sh
```

### PowerShell

```powershell
cd backend
$env:BASE_URL = "http://localhost:3001"
$env:ADMIN_KEY = "change_this_admin_key"
.\smoke-test.ps1
```

The script checks:

- backend health at /api/health
- a sample inquiry POST
- admin access to GET /api/inquiries

## API endpoints

### Health check

GET /api/health

Returns backend health and database connectivity status.

### Create inquiry

POST /api/inquiries

Request body:

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "projectTypes": ["Cloud & DevOps"],
  "budget": "5-15k",
  "message": "We need a containerized deployment workflow."
}
```

### Get inquiries

GET /api/inquiries

Requires the Authorization header when ADMIN_KEY is configured:

```http
Authorization: Bearer <ADMIN_KEY>
```

## Database schema

The PostgreSQL table is initialized from the schema file in database/schema.sql:

```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  project_types JSONB NOT NULL DEFAULT '[]'::jsonb,
  budget VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## How the frontend communicates with the backend

The browser calls the backend through the NEXT_PUBLIC_API_URL environment variable.

Example:

```ts
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
fetch(`${apiBaseUrl}/api/inquiries`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane", email: "jane@example.com", projectTypes: ["Cloud & DevOps"], budget: "5-15k", message: "Need help." }),
});
```

## How the backend communicates with PostgreSQL

The Express backend uses the pg library and environment variables:

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

The Docker Compose service name is postgres, so the backend connects to postgres:5432 instead of a hardcoded IP.

## Troubleshooting

### Frontend cannot reach the backend

Check that NEXT_PUBLIC_API_URL matches the host port mapping.

### Backend cannot connect to PostgreSQL

Verify the DB environment variables and confirm the postgres service is healthy:

```powershell
docker compose ps
docker compose logs postgres
docker compose logs backend
```

### Admin dashboard login fails

Set a strong ADMIN_KEY in the environment and use the same key in the browser login form.

### Database volume still exists

Run:

```powershell
docker compose down -v
```

This removes the database volume and resets tables.

## DevOps / Enterprise Practices Demonstrated

- Containerization
- Multi-stage Docker builds
- Image optimization
- Docker networking
- Persistent volumes
- Environment-based configuration
- Health checks
- Non-root containers
- Private registry readiness
- Versioned images
- Separation of application tiers
- Reproducible deployment

## Harbor compatibility

The example image naming uses registry-friendly tags such as:

```text
HARBOR_HOST/it-company/frontend:1.0
HARBOR_HOST/it-company/backend:1.0
```

The Compose file allows straightforward replacement of local images with Harbor images by updating the REGISTRY and VERSION environment variables.

## Local development with Node.js

If you want to run the app outside Docker for development:

```powershell
npm install
npm run dev
```

Then run the backend in a separate terminal from the backend folder:

```powershell
cd backend
npm install
npm run dev
```

Make sure the database is running or use Docker Compose for the full stack.
