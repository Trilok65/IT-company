import fs from "node:fs";
import path from "node:path";

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  project_types: string;
  budget: string;
  message: string;
  created_at: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const inquiriesPath = path.join(dataDirectory, "inquiries.json");

function ensureStore() {
  fs.mkdirSync(dataDirectory, { recursive: true });

  if (!fs.existsSync(inquiriesPath)) {
    fs.writeFileSync(inquiriesPath, "[]", "utf8");
  }
}

export function getInquiries(): Inquiry[] {
  ensureStore();
  const contents = fs.readFileSync(inquiriesPath, "utf8");

  try {
    const parsed = JSON.parse(contents) as unknown;
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

export function addInquiry(inquiry: Omit<Inquiry, "id" | "created_at">) {
  const inquiries = getInquiries();
  const nextId = inquiries.reduce((highestId, item) => Math.max(highestId, item.id), 0) + 1;
  const record: Inquiry = {
    ...inquiry,
    id: nextId,
    created_at: new Date().toISOString(),
  };

  fs.writeFileSync(inquiriesPath, JSON.stringify([...inquiries, record], null, 2), "utf8");
  return record;
}
