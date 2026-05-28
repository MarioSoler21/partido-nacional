import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const noticia = await prisma.noticia.create({
    data: {
      slug: data.slug || slugify(data.titulo),
      titulo: data.titulo,
      resumen: data.resumen || "",
      cuerpo: data.cuerpo || "",
      imagen: data.imagen || "",
      tags: data.tags || [],
      publicado: data.publicado ?? false,
    },
  });
  revalidatePath("/noticias");
  return NextResponse.json(noticia);
}
