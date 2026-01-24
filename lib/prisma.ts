// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { URL } from "url"; // Built-in, no install needed

// Parse DATABASE_URL into PoolConfig shape expected by PrismaMariaDb
function getAdapterConfig() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set in .env file");
  }

  const parsed = new URL(dbUrl);

  const config = {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.slice(1) || undefined, // remove leading '/'; optional if not in URL
    // Add any extra options you need (these are standard mariadb PoolConfig properties)
    connectionLimit: 10, // Max connections
    minIdle: 2,
    idleTimeout: 30000, // ms
    waitForConnections: true,
    queueLimit: 0,
    // Optional: ssl: { rejectUnauthorized: false } if self-signed cert, etc.
  };

  // Optional: Handle query params if needed (e.g. ?ssl=true), but usually not required
  return config;
}

const adapterConfig = getAdapterConfig();
const adapter = new PrismaMariaDb(adapterConfig); // ← Pass config object directly

// Singleton for Next.js dev hot-reloading (unchanged & still essential)
const prismaGlobal = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = prismaGlobal.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prisma = prisma;
}

export { prisma };
