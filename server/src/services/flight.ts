// Flight service - handles flight CRUD operations
import { prisma } from "../db";
import { convertToDbDate } from "../utils/date";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

export interface FlightWithDetails {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: Date;
  hasVouchers: boolean;
}

export interface FlightDetails {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  aircraftType: string | null;
  seatType: string | null;
  seats: Array<{
    id: string;
    seatNumber: string;
    class: string;
    isAvailable: boolean;
    isVoucherWinner: boolean;
  }>;
  voucherWinners: Array<{ seats: string[] }>;
}

export interface CreateFlightParams {
  flightNumber: string;
  departure: string;
  arrival: string;
  date: string;
  aircraftTypeId?: string;
  crewIds?: string[];
}

export async function getAllFlights(): Promise<FlightWithDetails[]> {
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
      date: "asc",
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

  return flightsWithVoucherStatus;
}

export async function getFlightByNumberAndDate(
  flightNumber: string,
  date: string
): Promise<FlightDetails | null> {
  const dbDate = convertToDbDate(date);

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
    return null;
  }

  // Get voucher winner seats for this flight
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
  const seatNumberToIdMap = new Map(allSeats.map((s) => [s.seatNumber, s.id]));

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
  const seats = flight.flightAircraftType[0]?.aircraftType.seats.map((seat) => ({
    id: seat.id,
    seatNumber: seat.seatNumber,
    class: seat.class,
    isAvailable: voucherWinnerSeatIds.includes(seat.id),
    isVoucherWinner: voucherWinnerSeats.includes(seat.seatNumber),
  })) || [];

  return {
    id: flight.id,
    flightNumber: flight.flightNumber,
    departure: flight.departure,
    arrival: flight.arrival,
    date: flight.date.toISOString(),
    aircraftType: flight.flightAircraftType[0]?.aircraftType.name ?? null,
    seatType: flight.flightAircraftType[0]?.aircraftType.seatType ?? null,
    seats,
    voucherWinners,
  };
}

export async function searchFlights(query: string) {
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

  return flights;
}

export async function getFlightByNumber(flightNumber: string) {
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

  return flight;
}

export async function createFlight({
  flightNumber,
  departure,
  arrival,
  date,
  aircraftTypeId,
  crewIds,
}: CreateFlightParams): Promise<{
  success: boolean;
  flight?: Awaited<ReturnType<typeof prisma.flight.create>>;
  error?: ReturnType<typeof createErrorResponse>;
  status?: HttpStatus;
}> {
  if (!flightNumber || !departure || !arrival || !date) {
    return {
      success: false,
      error: createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        "Missing required fields: flightNumber, departure, arrival, date",
        HttpStatus.BAD_REQUEST
      ),
      status: HttpStatus.BAD_REQUEST,
    };
  }

  // Convert DD-MM-YYYY to YYYY-MM-DD for database storage
  const dbDate = convertToDbDate(date);

  // Check if flight already exists
  const existingFlight = await prisma.flight.findFirst({
    where: {
      flightNumber,
      date: new Date(dbDate),
    },
  });

  if (existingFlight) {
    return {
      success: false,
      error: createErrorResponse(ErrorCode.CONFLICT, "Flight already exists", HttpStatus.CONFLICT),
      status: HttpStatus.CONFLICT,
    };
  }

  // Create the flight
  const newFlight = await prisma.flight.create({
    data: {
      flightNumber,
      departure,
      arrival,
      date: new Date(dbDate),
    },
  });

  // If aircraftTypeId is provided, create flightAircraftType relation
  if (aircraftTypeId) {
    await prisma.flightAircraftType.create({
      data: {
        flightId: newFlight.id,
        aircraftTypeId,
      },
    });
  }

  // If crewIds are provided, create flightCrew relations
  if (crewIds && Array.isArray(crewIds)) {
    for (const crewId of crewIds) {
      await prisma.flightCrew.create({
        data: {
          flightId: newFlight.id,
          crewId,
        },
      });
    }
  }

  return { success: true, flight: newFlight };
}
