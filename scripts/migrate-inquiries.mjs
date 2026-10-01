import fs from "node:fs";
import path from "node:path";
import nextEnv from "@next/env";
import { neon } from "@neondatabase/serverless";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");
const inquiries = JSON.parse(fs.readFileSync(inquiriesPath, "utf8"));
if (!Array.isArray(inquiries)) {
  throw new Error("The legacy inquiry file must contain an array.");
}

const sql = neon(connectionString);

await sql`
  CREATE TABLE IF NOT EXISTS inquiries (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_types TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

for (const inquiry of inquiries) {
  await sql`
    INSERT INTO inquiries (id, name, email, project_types, budget, message, created_at)
    VALUES (
      ${inquiry.id},
      ${inquiry.name},
      ${inquiry.email},
      ${inquiry.project_types},
      ${inquiry.budget},
      ${inquiry.message},
      ${inquiry.created_at}
    )
    ON CONFLICT (id) DO NOTHING
  `;
}

await sql`
  SELECT setval(
    pg_get_serial_sequence(${"inquiries"}, ${"id"}),
    COALESCE((SELECT MAX(id) FROM inquiries), 1),
    EXISTS(SELECT 1 FROM inquiries)
  )
`;

console.log(`Migrated ${inquiries.length} existing inquiry record(s).`);