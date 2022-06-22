import { PrismaClient } from "@prisma/client";

// In development, the command `next dev` clears Node.js cache on run.
// This in turn initializes a new PrismaClient instance each time due to hot reloading
// that creates a connection to the database. This can quickly exhaust the
// database connections as each PrismaClient instance holds its own connection pool.
// To avoid this, we attach the PrismaClient instance to the global object.
// Learn more: https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
