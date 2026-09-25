import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/db";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  projectTypes?: string[];
  budget?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const projectTypes = body.projectTypes?.filter(Boolean) ?? [];
    const budget = body.budget?.trim();
    const message = body.message?.trim();

    if (!name || !email || !budget || !message || projectTypes.length === 0) {
      return NextResponse.json(
        { error: "Please complete every field and select at least one project type." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const result = addInquiry({
      name,
      email,
      project_types: JSON.stringify(projectTypes),
      budget,
      message,
    });

    return NextResponse.json({ id: result.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save your message right now." }, { status: 500 });
  }
}
