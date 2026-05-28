import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL ?? "";
  return url.length > 0 && !url.startsWith("your_") && url !== "postgresql://";
}

function createPrismaClient(): PrismaClient | undefined {
  if (!isDbConfigured()) return undefined;
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error"] : [],
    });
  } catch {
    return undefined;
  }
}

const _prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;

// Proxy that throws a descriptive error on every call if DB is not configured
export const prisma = (_prisma ??
  new Proxy({} as PrismaClient, {
    get() {
      throw new Error("DATABASE_URL not configured — using mock data");
    },
  })) as PrismaClient;
