import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.foto.delete({ where: { id } }).catch(() => null);
  revalidatePath("/galeria");
  return NextResponse.json({ ok: true });
}
