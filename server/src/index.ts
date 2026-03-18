import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import type { ApiResponse } from "shared";
import { createHash } from 'crypto';
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });

export const app = new Hono()

.use(cors())

.get("/", (c) => {
	return c.text("Hello Hono!");
})

.get("/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello World!",
    success: true,
  };

  return c.json(data, { status: 200 });
})

.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  const crew = await prisma.crew.findUnique({
    where: { email },
  });

  if (!crew || crew.password !== password) {
    return c.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  return c.json({ success: true, crew: { id: crew.id, email: crew.email, name: crew.name } });
});

export default app;

if (import.meta.main) {
  const port = 3000;
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}