import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const config = await prisma.configuracion.findMany();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(req: NextRequest) {
  const values: Record<string, string> = await req.json();

  try {
    await Promise.all(
      Object.entries(values).map(([clave, valor]) =>
        prisma.configuracion.upsert({
          where: { clave },
          update: { valor },
          create: { clave, valor },
        })
      )
    );
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
