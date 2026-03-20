// Voucher service - handles voucher generation and seat generation logic
import { prisma } from "../db";
import { convertToDbDate } from "../utils/date";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

// Seat layout configuration based on aircraft type
export const AIRCRAFT_CONFIG: Record<string, { rows: number; seats: string[] }> = {
  ATR: { rows: 18, seats: ['A', 'C', 'D', 'F'] },  // 4 seats per row (no B, E)
  "Airbus 320": { rows: 32, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },  // 6 seats per row
  "Boeing 737 Max": { rows: 32, seats: ['A', 'B', 'C', 'D', 'E', 'F'] },  // 6 seats per row
};

export interface GenerateVoucherParams {
  name: string;
  id: string;
  flightNumber: string;
  date: string;
  aircraft: string;
  departure?: string;
  arrival?: string;
}

export interface GenerateVoucherResult {
  success: boolean;
  seats?: string[];
  error?: ReturnType<typeof createErrorResponse>;
  status?: HttpStatus;
}

/**
 * Generate all possible seat numbers based on aircraft layout
 */
export function generateAllSeats(aircraftType: string): string[] {
  const config = AIRCRAFT_CONFIG[aircraftType];
  if (!config) {
    // Fallback to Airbus 320 config if aircraft type not found
    const defaultConfig = AIRCRAFT_CONFIG["Airbus 320"]!;
    const allSeats: string[] = [];
    for (let r = 1; r <= defaultConfig.rows; r++) {
      for (const seatLetter of defaultConfig.seats) {
        allSeats.push(`${r}${seatLetter}`);
      }
    }
    return allSeats;
  }

  const allSeats: string[] = [];
  for (let r = 1; r <= config.rows; r++) {
    for (const seatLetter of config.seats) {
      allSeats.push(`${r}${seatLetter}`);
    }
  }
  
  return allSeats;
}

/**
 * Generate exactly 3 random non-repeating seats
 */
export function generateRandomSeats(allSeats: string[], count: number = 3): string[] {
  const shuffled = [...allSeats].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function checkVoucherExists(flightNumber: string, date: string): Promise<boolean> {
  const dbDate = convertToDbDate(date);
  
  const existingVouchers = await prisma.voucher.findMany({
    where: {
      flight_number: flightNumber,
      flight_date: dbDate,
    },
  });

  return existingVouchers.length > 0;
}

export async function generateVoucher({
  name,
  id,
  flightNumber,
  date,
  aircraft,
  departure,
  arrival,
}: GenerateVoucherParams): Promise<GenerateVoucherResult> {
  // Validate required fields
  if (!name || !id || !flightNumber || !date || !aircraft) {
    return {
      success: false,
      error: createErrorResponse(
        ErrorCode.BAD_REQUEST,
        "Missing required fields: name, id, flightNumber, date, aircraft",
        HttpStatus.BAD_REQUEST
      ),
      status: HttpStatus.BAD_REQUEST,
    };
  }

  // Convert DD-MM-YYYY to YYYY-MM-DD for database storage
  const dbDate = convertToDbDate(date);

  // Get seat configuration based on aircraft type
  const allSeats = generateAllSeats(aircraft);

  // Generate exactly 3 random non-repeating seats
  const selectedSeats = generateRandomSeats(allSeats, 3);

  // Parse crew IDs and names
  const crewIds = typeof id === "string" ? id.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const crewNames = typeof name === "string" ? name.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

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
      return {
        success: false,
        error: createErrorResponse(ErrorCode.NOT_FOUND, "Aircraft type not found", HttpStatus.NOT_FOUND),
        status: HttpStatus.NOT_FOUND,
      };
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

  return { success: true, seats: selectedSeats };
}
