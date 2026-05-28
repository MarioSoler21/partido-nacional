"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFoto(data: { url: string; album: string; titulo?: string }) {
  const maxOrden = await prisma.foto.findFirst({
    where: { album: data.album },
    orderBy: { orden: "desc" },
    select: { orden: true },
  });
  await prisma.foto.create({
    data: { ...data, orden: (maxOrden?.orden ?? 0) + 1 },
  });
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
}

export async function deleteFoto(id: number) {
  await prisma.foto.delete({ where: { id } });
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
}

export async function reorderFotos(updates: { id: number; orden: number }[]) {
  await Promise.all(
    updates.map(({ id, orden }) => prisma.foto.update({ where: { id }, data: { orden } }))
  );
  revalidatePath("/galeria");
}
