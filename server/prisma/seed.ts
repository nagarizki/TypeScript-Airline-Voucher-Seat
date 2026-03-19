/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import { createHash } from 'crypto';

import { PrismaClient } from '../generated/prisma/client';
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });



async function main() {
  const hashedPassword = createHash('sha256').update('password').digest('hex');

  // Create multiple crews
  for (const crewData of [
    { email: "alice@mail.com", name: "Alice", password: hashedPassword },
    { email: "bob@mail.com", name: "Bob", password: hashedPassword },
    { email: "charlie@mail.com", name: "Charlie", password: hashedPassword },
    { email: "diana@mail.com", name: "Diana", password: hashedPassword },
    { email: "eve@mail.com", name: "Eve", password: hashedPassword },
    { email: "frank@mail.com", name: "Frank", password: hashedPassword },
  ]) {
    await prisma.crew.upsert({
      where: { email: crewData.email },
      update: {},
      create: crewData,
    });
  }

  // Create aircraft types
  const aircraftTypes = [];
  for (const data of [
    { name: "ATR", seatType: "economy", seatNumber: 70 },
    { name: "Airbus 320", seatType: "economy", seatNumber: 150 },
    { name: "Boeing 737 Max", seatType: "economy", seatNumber: 160 },
  ]) {
    const at = await prisma.aircraftType.create({ data });
    aircraftTypes.push(at);
  }

  // Create seats for each aircraft type
  for (const aircraft of aircraftTypes) {
    const seats = [];
    for (let i = 1; i <= aircraft.seatNumber; i++) {
      seats.push({
        seatNumber: `${Math.floor((i-1)/6) + 1}${String.fromCharCode(65 + ((i-1) % 6))}`, // e.g. 1A, 1B, ..., 12A for ATR
        class: aircraft.seatType,
        isAvailable: true,
        aircraftTypeId: aircraft.id,
      });
    }
    await prisma.seat.createMany({ data: seats });
  }

  // Get a crew for flights
  const crew = await prisma.crew.findFirst();
  if (!crew) throw new Error("No crew found");

  // Create flights
  const flights = [];
  for (const data of [
    { flightNumber: "GA102", departure: "CGK", arrival: "HND", date: new Date("2025-07-12"), crewId: crew.id },
    { flightNumber: "ID102", departure: "CGK", arrival: "HND", date: new Date("2025-07-12"), crewId: crew.id },
    { flightNumber: "GA103", departure: "CGK", arrival: "NRT", date: new Date("2025-07-13"), crewId: crew.id },
  ]) {
    const flight = await prisma.flight.create({ data });
    flights.push(flight);
  }

  // Associate flights with aircraft types (assuming Airbus 320 for these)
  const airbus320 = aircraftTypes.find(at => at.name === "Airbus 320");
  if (airbus320) {
    for (const flight of flights) {
      await prisma.flightAircraftType.create({
        data: {
          flightId: flight.id,
          aircraftTypeId: airbus320.id,
        },
      });
    }
  }

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