import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
declare global {
  var prisma: PrismaClient | undefined;
  var prismaPool: Pool | undefined;
}

// Without this, during development when we perform hot-reload many prisma clients will
// be created and it will slow down the development server.
const pool =
  globalThis.prismaPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });
if (process.env.NODE_ENV !== "production") globalThis.prismaPool = pool;

const adapter = new PrismaPg(pool);
export const db = globalThis.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export enum PrismaClientErrorCode {
  UniqueConstraintViolation = "P2002",
  ForeignKeyConstraintViolation = "P2003",
  RecordDoesNotExist = "P2025",
}
