import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const fotos = await prisma.foto.findMany({ orderBy: [{ album: "asc" }, { orden: "asc" }] });
    return NextResponse.json(fotos);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const { url, album, titulo } = await req.json();
  const maxOrden = await prisma.foto.findFirst({
    where: { album },
    orderBy: { orden: "desc" },
    select: { orden: true },
  }).catch(() => null);
  const foto = await prisma.foto.create({
    data: { url, album, titulo, orden: (maxOrden?.orden ?? 0) + 1 },
  });
  revalidatePath("/galeria");
  return NextResponse.json(foto);
}
