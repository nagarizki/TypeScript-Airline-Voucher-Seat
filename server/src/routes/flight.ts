// Flight routes - handles flight operations
import { Hono } from "hono";
import {
  getAllFlights,
  getFlightByNumberAndDate,
  searchFlights,
  getFlightByNumber,
  createFlight,
} from "../services/flight";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

export const flightRouter = new Hono();

// GET /api/flights - Get all flights
flightRouter.get("/", async (c) => {
  const flights = await getAllFlights();
  return c.json({ success: true, flights });
});

// GET /api/flights/search - Search flights
flightRouter.get("/search", async (c) => {
  const query = c.req.query("q") || "";
  const flights = await searchFlights(query);
  return c.json({ success: true, flights });
});

flightRouter.get("/search", async (c) => {
  const query = c.req.query("q") || "";
  const flights = await searchFlights(query);
  return c.json({ success: true, flights });
});

flightRouter.post("/", async (c) => {
  const { flightNumber, departure, arrival, date, aircraftTypeId, crewIds } = await c.req.json();

  const result = await createFlight({
    flightNumber,
    departure,
    arrival,
    date,
    aircraftTypeId,
    crewIds,
  });

  if (!result.success) {
    return c.json(result.error, { status: result.status });
  }

  return c.json({ success: true, flight: result.flight });
});

flightRouter.get("/:flightNumber/:date", async (c) => {
  const { flightNumber, date } = c.req.param();

  const flight = await getFlightByNumberAndDate(flightNumber, date);

  if (!flight) {
    const error = createErrorResponse(ErrorCode.NOT_FOUND, "Flight not found", HttpStatus.NOT_FOUND);
    return c.json(error, { status: HttpStatus.NOT_FOUND });
  }

  return c.json({
    success: true,
    flight: {
      id: flight.id,
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      arrival: flight.arrival,
      date: flight.date,
      aircraftType: flight.aircraftType,
      seatType: flight.seatType,
      seats: flight.seats,
      voucherWinners: flight.voucherWinners,
    },
  });
});

flightRouter.get("/:flightNumber", async (c) => {
  const { flightNumber } = c.req.param();

  const flight = await getFlightByNumber(flightNumber);

  if (!flight) {
    const error = createErrorResponse(ErrorCode.NOT_FOUND, "Flight not found", HttpStatus.NOT_FOUND);
    return c.json(error, { status: HttpStatus.NOT_FOUND });
  }

  return c.json({ success: true, flight });
});
