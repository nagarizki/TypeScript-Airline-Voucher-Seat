import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import type { ApiResponse } from "@shared/types";
// import { createHash } from 'crypto';
import { PrismaClient } from "../generated/prisma/client";
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
})

.post("/api/check", async (c) => {
  const { flightNumber, date } = await c.req.json();

  const existingVouchers = await prisma.voucher.findMany({
    where: {
      flight_number: flightNumber,
      flight_date: date,
    },
  });

  return c.json({ exists: existingVouchers.length > 0 });
})

.post("/api/generate", async (c) => {
  const { name, id, flightNumber, date, aircraft } = await c.req.json();

  // Get seat count based on aircraft type
  let seatCount = 0;
  switch (aircraft) {
    case "ATR":
      seatCount = 20;
      break;
    case "Airbus 320":
      seatCount = 150;
      break;
    case "Boeing 737 Max":
      seatCount = 180;
      break;
    default:
      seatCount = 20;
  }

  // Generate random seat numbers
  const rows = Math.ceil(seatCount / 6);
  const seats: string[] = [];
  for (let r = 1; r <= rows; r++) {
    for (let s = 0; s < 6; s++) {
      if (seats.length >= seatCount) break;
      const seatLetter = String.fromCharCode(65 + s); // A, B, C, D, E, F
      seats.push(`${r}${seatLetter}`);
    }
  }

  // Create voucher records (3 seats per voucher)
  const createdSeats: string[] = [];
  for (let i = 0; i < seats.length; i += 3) {
    const seat1 = seats[i] || "";
    const seat2 = seats[i + 1] || "";
    const seat3 = seats[i + 2] || "";

    await prisma.voucher.create({
      data: {
        crew_name: name,
        crew_id: id,
        flight_number: flightNumber,
        flight_date: date,
        aircraft_type: aircraft,
        seat1,
        seat2,
        seat3,
      },
    });

    if (seat1) createdSeats.push(seat1);
    if (seat2) createdSeats.push(seat2);
    if (seat3) createdSeats.push(seat3);
  }

  return c.json({ success: true, seats: createdSeats });
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