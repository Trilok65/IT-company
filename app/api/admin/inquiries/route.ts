import { NextResponse } from "next/server";

export const runtime = "nodejs";

const backendApiUrl =
  process.env.BACKEND_API_URL ||
  (process.env.NODE_ENV === "production" ? "http://backend:3001" : "http://localhost:3001");

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization") || "";

  try {
    const response = await fetch(`${backendApiUrl}/api/inquiries`, {
      headers: { Authorization: authorization },
    });

    const result = await response.json().catch(() => ({}));
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Unable to load inquiries." }, { status: 500 });
  }
}
