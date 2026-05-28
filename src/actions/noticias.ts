"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

export async function createNoticia(data: {
  titulo: string;
  resumen: string;
  cuerpo: string;
  imagen: string;
  tags: string[];
  publicado: boolean;
}) {
  const slug = slugify(data.titulo);
  await prisma.noticia.create({
    data: { ...data, slug },
  });
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
}

export async function updateNoticia(id: number, data: {
  titulo?: string;
  resumen?: string;
  cuerpo?: string;
  imagen?: string;
  tags?: string[];
  publicado?: boolean;
}) {
  const update: typeof data & { slug?: string } = { ...data };
  if (data.titulo) update.slug = slugify(data.titulo);
  await prisma.noticia.update({ where: { id }, data: update });
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
}

export async function deleteNoticia(id: number) {
  await prisma.noticia.delete({ where: { id } });
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
}

export async function toggleNoticiaPublicado(id: number, publicado: boolean) {
  await prisma.noticia.update({ where: { id }, data: { publicado } });
  revalidatePath("/noticias");
  revalidatePath("/admin/noticias");
}
