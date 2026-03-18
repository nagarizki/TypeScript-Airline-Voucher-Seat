/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import { createHash } from 'crypto';

import { PrismaClient } from '../../generated/prisma/client';
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });



async function main() {
  const hashedPassword = createHash('sha256').update('password').digest('hex');

  // Create multiple crews
  await prisma.crew.createMany({
    data: [
      { email: "alice@example.com", name: "Alice", password: hashedPassword },
      { email: "bob@example.com", name: "Bob", password: hashedPassword },
      { email: "charlie@example.com", name: "Charlie", password: hashedPassword },
      { email: "diana@example.com", name: "Diana", password: hashedPassword },
      { email: "eve@example.com", name: "Eve", password: hashedPassword },
      { email: "frank@example.com", name: "Frank", password: hashedPassword },
    ],
  });
  console.log("Seed data inserted!");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });