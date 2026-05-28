"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDocumento(data: { nombre: string; url: string; categoria: string }) {
  await prisma.documento.create({ data });
  revalidatePath("/transparencia");
  revalidatePath("/admin/documentos");
}

export async function deleteDocumento(id: number) {
  await prisma.documento.delete({ where: { id } });
  revalidatePath("/transparencia");
  revalidatePath("/admin/documentos");
}
