import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const docs = await prisma.documento.findMany({ orderBy: { creadoEn: "desc" } });
    return NextResponse.json(docs);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const { nombre, url, categoria } = await req.json();
  const doc = await prisma.documento.create({ data: { nombre, url, categoria } });
  revalidatePath("/transparencia");
  return NextResponse.json(doc);
}
