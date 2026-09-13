import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const rawDbUrl = process.env.DATABASE_URL || "file:./dev.db";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clientOptions: any = {
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  };

  // If running on Vercel/Serverless and using SQLite, copy seed DB to writable /tmp
  if (isServerless && (rawDbUrl.startsWith("file:") || !process.env.DATABASE_URL)) {
    const tmpDbPath = path.join("/tmp", "dev.db");
    const sourceDbPath = path.join(process.cwd(), "prisma", "dev.db");

    try {
      if (!fs.existsSync(tmpDbPath)) {
        if (fs.existsSync(sourceDbPath)) {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
        }
      }
      clientOptions.datasourceUrl = `file:${tmpDbPath}`;
    } catch (err) {
      console.warn("Notice: Could not copy dev.db to /tmp, using source path:", err);
      clientOptions.datasourceUrl = `file:${sourceDbPath}`;
    }
  }

  const client = new PrismaClient(clientOptions);

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = getPrismaClient();

