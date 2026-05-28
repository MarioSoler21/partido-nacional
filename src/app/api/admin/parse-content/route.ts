import { NextRequest, NextResponse } from "next/server";
import { parseQuickContent } from "@/lib/anthropic";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

  try {
    const parsed = await parseQuickContent(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Parse error:", err);
    return NextResponse.json({ error: "Error parsing content" }, { status: 500 });
  }
}
