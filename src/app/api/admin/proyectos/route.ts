import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const proyecto = await prisma.proyecto.create({
    data: {
      slug: data.slug || slugify(data.titulo),
      titulo: data.titulo,
      descripcion: data.resumen || data.descripcion || "",
      cuerpo: data.cuerpo || "",
      categoria: data.categoria || "Social",
      imagen: data.imagen || "",
      galeria: data.galeria || [],
      videoUrl: data.videoUrl || null,
      publicado: data.publicado ?? false,
    },
  });
  revalidatePath("/proyectos");
  return NextResponse.json(proyecto);
}
