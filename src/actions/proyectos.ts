"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export async function createProyecto(data: {
  titulo: string;
  descripcion: string;
  cuerpo: string;
  categoria: string;
  imagen: string;
  galeria: string[];
  videoUrl?: string;
  publicado: boolean;
}) {
  const slug = slugify(data.titulo);
  await prisma.proyecto.create({ data: { ...data, slug } });
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");
}

export async function updateProyecto(id: number, data: {
  titulo?: string;
  descripcion?: string;
  cuerpo?: string;
  categoria?: string;
  imagen?: string;
  galeria?: string[];
  videoUrl?: string | null;
  publicado?: boolean;
}) {
  const update: typeof data & { slug?: string } = { ...data };
  if (data.titulo) update.slug = slugify(data.titulo);
  await prisma.proyecto.update({ where: { id }, data: update });
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");
}

export async function deleteProyecto(id: number) {
  await prisma.proyecto.delete({ where: { id } });
  revalidatePath("/proyectos");
  revalidatePath("/admin/proyectos");
}
