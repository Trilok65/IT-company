import { NextResponse } from "next/server";
import { getInquiries } from "@/lib/db";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const configuredKey = process.env.ADMIN_KEY;
  const authorization = request.headers.get("authorization");

  return Boolean(
    configuredKey &&
      authorization &&
      authorization === `Bearer ${configuredKey}`
  );
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = getInquiries().sort(
      (first, second) => new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
    );

    const normalized = inquiries.map((inquiry) => {
      let projectTypes: string[] = [];

      try {
        const parsed = JSON.parse(inquiry.project_types);
        projectTypes = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
      } catch {
        projectTypes = inquiry.project_types ? [inquiry.project_types] : [];
      }

      return { ...inquiry, projectTypes };
    });

    const budgets = normalized.reduce<Record<string, number>>((counts, inquiry) => {
      counts[inquiry.budget] = (counts[inquiry.budget] ?? 0) + 1;
      return counts;
    }, {});

    return NextResponse.json({
      inquiries: normalized,
      stats: {
        total: normalized.length,
        thisMonth: normalized.filter((inquiry) => inquiry.created_at.startsWith(new Date().toISOString().slice(0, 7))).length,
        budgets,
      },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown database error";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? `Unable to load inquiries: ${detail}` : "Unable to load inquiries." },
      { status: 500 }
    );
  }
}
