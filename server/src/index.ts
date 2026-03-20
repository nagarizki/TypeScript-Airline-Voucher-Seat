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

  // Convert DD-MM-YYYY to YYYY-MM-DD for database query
  let dbDate = date;
  if (date && date.includes('-')) {
    const parts = date.split('-');
    if (parts.length === 3 && parts[0] && parts[0].length === 2) {
      // DD-MM-YYYY format - convert to YYYY-MM-DD
      dbDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  const existingVouchers = await prisma.voucher.findMany({
    where: {
      flight_number: flightNumber,
      flight_date: dbDate,
    },
  });

  return c.json({ exists: existingVouchers.length > 0 });
})

.post("/api/generate", async (c) => {
  const { name, id, flightNumber, date, aircraft, departure, arrival } = await c.req.json();

  // Convert DD-MM-YYYY to YYYY-MM-DD for database storage
  let dbDate = date;
  if (date && date.includes('-')) {
    const parts = date.split('-');
    if (parts.length === 3 && parts[0].length === 2) {
      // DD-MM-YYYY format - convert to YYYY-MM-DD
      dbDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

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

  // Generate all possible seat numbers based on aircraft layout
  const rows = Math.ceil(seatCount / 6);
  const allSeats: string[] = [];
  for (let r = 1; r <= rows; r++) {
    for (let s = 0; s < 6; s++) {
      if (allSeats.length >= seatCount) break;
      const seatLetter = String.fromCharCode(65 + s); // A, B, C, D, E, F
      allSeats.push(`${r}${seatLetter}`);
    }
  }

  // Generate exactly 3 random non-repeating seats
  const shuffled = [...allSeats].sort(() => Math.random() - 0.5);
  const selectedSeats = shuffled.slice(0, 3);

  // Parse crew IDs and names
  const crewIds = typeof id === 'string' ? id.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
  const crewNames = typeof name === 'string' ? name.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

  // Check if flight exists
  const existingFlight = await prisma.flight.findFirst({
    where: {
      flightNumber,
      date: new Date(dbDate),
    },
  });

  let flightId: string;

  if (!existingFlight) {
    // Create new flight with flight_aircraft_type and flight_crew
    // First, get or create the aircraft type
    const aircraftType = await prisma.aircraftType.findFirst({
      where: { name: aircraft },
    });

    if (!aircraftType) {
      return c.json({ success: false, message: "Aircraft type not found" }, { status: 400 });
    }

    // Create the flight
    const newFlight = await prisma.flight.create({
      data: {
        flightNumber,
        departure: departure || "CGK",
        arrival: arrival || "UNKNOWN",
        date: new Date(dbDate),
      },
    });
    flightId = newFlight.id;

    // Create flight_aircraft_type relation
    await prisma.flightAircraftType.create({
      data: {
        flightId,
        aircraftTypeId: aircraftType.id,
      },
    });

    // Create flight_crew relations for each crew member
    for (const crewId of crewIds) {
      const crew = await prisma.crew.findUnique({
        where: { id: crewId },
      });

      if (crew) {
        await prisma.flightCrew.create({
          data: {
            flightId,
            crewId: crew.id,
          },
        });
      }
    }
  } else {
    // Existing flight - update flight_aircraft_type and flight_crew
    flightId = existingFlight.id;

    // Update departure and arrival if provided
    await prisma.flight.update({
      where: { id: flightId },
      data: {
        departure: departure || existingFlight.departure,
        arrival: arrival || existingFlight.arrival,
      },
    });

    // Get aircraft type
    const aircraftType = await prisma.aircraftType.findFirst({
      where: { name: aircraft },
    });

    if (aircraftType) {
      // Delete existing flight_aircraft_type and create new one
      await prisma.flightAircraftType.deleteMany({
        where: { flightId },
      });

      await prisma.flightAircraftType.create({
        data: {
          flightId,
          aircraftTypeId: aircraftType.id,
        },
      });
    }

    // Delete existing flight_crew and create new ones
    await prisma.flightCrew.deleteMany({
      where: { flightId },
    });

    for (const crewId of crewIds) {
      const crew = await prisma.crew.findUnique({
        where: { id: crewId },
      });

      if (crew) {
        await prisma.flightCrew.create({
          data: {
            flightId,
            crewId: crew.id,
          },
        });
      }
    }
  }

  // Create a single voucher record with exactly 3 seats
  const seat1 = selectedSeats[0] || "";
  const seat2 = selectedSeats[1] || "";
  const seat3 = selectedSeats[2] || "";

  await prisma.voucher.create({
    data: {
      crew_name: name,
      crew_id: id,
      flight_number: flightNumber,
      flight_date: dbDate,
      aircraft_type: aircraft,
      seat1,
      seat2,
      seat3,
    },
  });

  return c.json({ success: true, seats: selectedSeats });
})

.get("/api/flights", async (c) => {
  const flights = await prisma.flight.findMany({
    include: {
      flightCrew: {
        include: {
          crew: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      flightAircraftType: {
        include: {
          aircraftType: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  // Check if vouchers exist for each flight
  const flightsWithVoucherStatus = await Promise.all(
    flights.map(async (flight) => {
      const vouchers = await prisma.voucher.findMany({
        where: {
          flight_number: flight.flightNumber,
        },
      });
      
      return {
        ...flight,
        hasVouchers: vouchers.length > 0,
      };
    })
  );

  return c.json({ success: true, flights: flightsWithVoucherStatus });
})

.get("/api/flights/:flightNumber/:date", async (c) => {
  const { flightNumber, date } = c.req.param();
  
  // Convert DD-MM-YYYY to YYYY-MM-DD for database query
  let dbDate = date;
  if (date && date.includes('-')) {
    const parts = date.split('-');
    if (parts.length === 3 && parts[0] && parts[0].length === 2) {
      // DD-MM-YYYY format - convert to YYYY-MM-DD
      dbDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  const flight = await prisma.flight.findFirst({
    where: {
      flightNumber,
      date: new Date(dbDate),
    },
    include: {
      flightCrew: {
        include: {
          crew: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      flightAircraftType: {
        include: {
          aircraftType: {
            include: {
              seats: true,
            },
          },
        },
      },
      flightVoucherSeatNumbers: true,
    },
  });

  if (!flight) {
    return c.json({ success: false, message: "Flight not found" }, { status: 404 });
  }

  // Get voucher winner seats for this flight
  // Query all vouchers for this flight to handle any date format issues
  const vouchers = await prisma.voucher.findMany({
    where: {
      flight_number: flightNumber,
    },
  });

  // Extract all voucher winner seat numbers
  const voucherWinnerSeats: string[] = [];
  const voucherWinnerSeatIds: string[] = [];
  const voucherWinners: Array<{ seats: string[] }> = [];
  
  // Get all seat numbers from aircraft type to map seat numbers to IDs
  const allSeats = flight.flightAircraftType[0]?.aircraftType.seats || [];
  const seatNumberToIdMap = new Map(allSeats.map(s => [s.seatNumber, s.id]));

  for (const voucher of vouchers) {
    const seats: string[] = [];
    if (voucher.seat1) {
      voucherWinnerSeats.push(voucher.seat1);
      const seatId = seatNumberToIdMap.get(voucher.seat1);
      if (seatId) voucherWinnerSeatIds.push(seatId);
      seats.push(voucher.seat1);
    }
    if (voucher.seat2) {
      voucherWinnerSeats.push(voucher.seat2);
      const seatId = seatNumberToIdMap.get(voucher.seat2);
      if (seatId) voucherWinnerSeatIds.push(seatId);
      seats.push(voucher.seat2);
    }
    if (voucher.seat3) {
      voucherWinnerSeats.push(voucher.seat3);
      const seatId = seatNumberToIdMap.get(voucher.seat3);
      if (seatId) voucherWinnerSeatIds.push(seatId);
      seats.push(voucher.seat3);
    }
    if (seats.length > 0) {
      voucherWinners.push({
        seats,
      });
    }
  }

  // Default: all seats are occupied (not available)
  // Only voucher winner seats are available
  const seats = flight.flightAircraftType[0]?.aircraftType.seats.map(seat => ({
    id: seat.id,
    seatNumber: seat.seatNumber,
    class: seat.class,
    isAvailable: voucherWinnerSeatIds.includes(seat.id),
    isVoucherWinner: voucherWinnerSeats.includes(seat.seatNumber),
  })) || [];

  return c.json({
    success: true,
    flight: {
      id: flight.id,
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      arrival: flight.arrival,
      date: flight.date.toISOString(),
      aircraftType: flight.flightAircraftType[0]?.aircraftType.name,
      seatType: flight.flightAircraftType[0]?.aircraftType.seatType,
      seats,
      voucherWinners,
    },
  });
})

.get("/api/crew", async (c) => {
  const crew = await prisma.crew.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return c.json({ success: true, crew });
})

.get("/api/flights/search", async (c) => {
  const query = c.req.query('q') || '';
  
  const flights = await prisma.flight.findMany({
    where: {
      flightNumber: {
        contains: query,
      },
    },
    include: {
      flightCrew: {
        include: {
          crew: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      flightAircraftType: {
        include: {
          aircraftType: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    take: 10,
  });

  return c.json({ success: true, flights });
})

.post("/api/crew/by-ids", async (c) => {
  const { ids } = await c.req.json();
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return c.json({ success: true, crew: [] });
  }

  const crew = await prisma.crew.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return c.json({ success: true, crew });
})

.get("/api/flights/:flightNumber", async (c) => {
  const { flightNumber } = c.req.param();
  
  const flight = await prisma.flight.findFirst({
    where: {
      flightNumber,
    },
    select: {
      id: true,
      flightNumber: true,
      departure: true,
      arrival: true,
      date: true,
    },
  });

  if (!flight) {
    return c.json({ success: false, message: "Flight not found" }, { status: 404 });
  }

  return c.json({ success: true, flight });
})

.post("/api/seats/assign", async (c) => {
  const { flightId, seatId } = await c.req.json();

  // Check if seat is already assigned
  const existing = await prisma.flightVoucherSeatNumbers.findFirst({
    where: {
      flightId,
      seatId,
    },
  });

  if (existing) {
    // Unassign (remove) the seat
    await prisma.flightVoucherSeatNumbers.delete({
      where: { id: existing.id },
    });
    return c.json({ success: true, assigned: false });
  }

  // Assign the seat
  await prisma.flightVoucherSeatNumbers.create({
    data: {
      flightId,
      seatId,
    },
  });

  return c.json({ success: true, assigned: true });
})

// Catch-all route for client-side routing (must be last)
app.get('*', (c) => {
  return c.text('Not Found', 404);
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
