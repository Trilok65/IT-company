import { neon } from "@neondatabase/serverless";

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  project_types: string;
  budget: string;
  message: string;
  created_at: string;
};

type NewInquiry = Omit<Inquiry, "id" | "created_at">;

let database: ReturnType<typeof neon> | undefined;
let schemaReady: Promise<void> | undefined;

function getDatabase() {
  if (database) return database;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured.");
  }

  database = neon(connectionString);
  return database;
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await getDatabase()`
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
    })().catch((error: unknown) => {
      schemaReady = undefined;
      throw error;
    });
  }

  await schemaReady;
}

export async function getInquiries(): Promise<Inquiry[]> {
  await ensureSchema();

  const rows = await getDatabase()`
    SELECT id, name, email, project_types, budget, message,
      created_at::text AS created_at
    FROM inquiries
    ORDER BY created_at DESC
  `;

  return rows as unknown as Inquiry[];
}

export async function addInquiry(inquiry: NewInquiry): Promise<Inquiry> {
  await ensureSchema();

  const rows = await getDatabase()`
    INSERT INTO inquiries (name, email, project_types, budget, message)
    VALUES (
      ${inquiry.name},
      ${inquiry.email},
      ${inquiry.project_types},
      ${inquiry.budget},
      ${inquiry.message}
    )
    RETURNING id, name, email, project_types, budget, message,
      created_at::text AS created_at
  `;

  const records = rows as unknown as Inquiry[];
  return records[0];
}