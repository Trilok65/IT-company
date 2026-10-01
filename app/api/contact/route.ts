import { NextResponse } from "next/server";

export const runtime = "nodejs";

const backendApiUrl =
  process.env.BACKEND_API_URL ||
  (process.env.NODE_ENV === "production" ? "http://backend:3001" : "http://localhost:3001");

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  projectTypes?: string[];
  budget?: string;
  message?: string;
  phone?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const response = await fetch(`${backendApiUrl}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name?.trim(),
        email: body.email?.trim(),
        company: body.company?.trim(),
        projectTypes: body.projectTypes ?? [],
        budget: body.budget?.trim(),
        phone: body.phone?.trim(),
        message: body.message?.trim(),
      }),
    });

    const result = (await response.json().catch(() => ({}))) as { error?: string };

    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to save your message right now." }, { status: 500 });
  }
}
