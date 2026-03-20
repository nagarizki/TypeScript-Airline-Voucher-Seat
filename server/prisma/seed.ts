/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import bcrypt from 'bcryptjs';

import { PrismaClient } from '../generated/prisma/client';
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL || "" });
const prisma = new PrismaClient({ adapter });



async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);

  // Delete related records first due to foreign key constraints
  await prisma.flightCrew.deleteMany({});
  
  // Delete existing crew records to ensure fresh bcrypt hashes
  await prisma.crew.deleteMany({});

  // Create multiple crews with bcrypt hashed passwords
  for (const crewData of [
    { email: "alice@mail.com", name: "Alice", password: hashedPassword },
    { email: "bob@mail.com", name: "Bob", password: hashedPassword },
    { email: "charlie@mail.com", name: "Charlie", password: hashedPassword },
    { email: "diana@mail.com", name: "Diana", password: hashedPassword },
    { email: "eve@mail.com", name: "Eve", password: hashedPassword },
    { email: "frank@mail.com", name: "Frank", password: hashedPassword },
  ]) {
    await prisma.crew.create({
      data: crewData,
    });
  }

  // Create aircraft types
  const aircraftTypes = [];
  for (const data of [
    { name: "ATR", seatType: "2-2", seatNumber: 72 },
    { name: "Airbus 320", seatType: "3-3", seatNumber: 192 },
    { name: "Boeing 737 Max", seatType: "3-3", seatNumber: 192 },
  ]) {
    const at = await prisma.aircraftType.create({ data });
    aircraftTypes.push(at);
  }

  // Create seats for each aircraft type
  for (const aircraft of aircraftTypes) {
    const seats = [];
    const isATR = aircraft.name === "ATR";
    const seatsPerRow = isATR ? 4 : 6;
    const totalRows = Math.ceil(aircraft.seatNumber / seatsPerRow);
    
    for (let row = 1; row <= totalRows; row++) {
      if (isATR) {
        // ATR: A, C, D, F (4 seats per row, skipping B and E for aisle)
        for (const col of ['A', 'C', 'D', 'F']) {
          const seatNumber = `${row}${col}`;
          seats.push({
            seatNumber,
            class: aircraft.seatType,
            isAvailable: true,
            aircraftTypeId: aircraft.id,
          });
        }
      } else {
        // Airbus 320 / Boeing 737 Max: A-F (6 seats per row)
        for (let col = 0; col < 6; col++) {
          const seatLetter = String.fromCharCode(65 + col); // A, B, C, D, E, F
          const seatNumber = `${row}${seatLetter}`;
          seats.push({
            seatNumber,
            class: aircraft.seatType,
            isAvailable: true,
            aircraftTypeId: aircraft.id,
          });
        }
      }
    }
    await prisma.seat.createMany({ data: seats });
  }

  // Create flights
  const flights = [];
  for (const data of [
    { flightNumber: "GA102", departure: "CGK", arrival: "HND", date: new Date("2026-03-12") },
    { flightNumber: "ID102", departure: "CGK", arrival: "HND", date: new Date("2026-03-12") },
    { flightNumber: "GA103", departure: "CGK", arrival: "NRT", date: new Date("2026-03-13") },
  ]) {
    const flight = await prisma.flight.create({ data });
    flights.push(flight);
  }

  // Get all crews
  const allCrew = await prisma.crew.findMany();
  if (allCrew.length === 0) throw new Error("No crew found");

  // Associate crews with flights using flightCrew junction table
  for (const flight of flights) {
    // Assign first 2 crew members to each flight
    for (let i = 0; i < Math.min(2, allCrew.length); i++) {
      await prisma.flightCrew.create({
        data: {
          flightId: flight.id,
          crewId: allCrew[i].id,
        },
      });
    }
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