/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";

import { PrismaClient } from '../../generated/prisma/client';
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });



async function main() {
  // Create multiple users
  await prisma.user.createMany({
    data: [
      { email: "alice@example.com", name: "Alice" },
      { email: "bob@example.com", name: "Bob" },
      { email: "charlie@example.com", name: "Charlie" },
      { email: "diana@example.com", name: "Diana" },
      { email: "eve@example.com", name: "Eve" },
      { email: "frank@example.com", name: "Frank" },
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