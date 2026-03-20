// Seat routes - handles seat assignment operations
import { Hono } from "hono";
import { assignSeat } from "../services/seat";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

export const seatRouter = new Hono();

seatRouter.post("/assign", async (c) => {
  const { flightId, seatId } = await c.req.json();

  if (!flightId || !seatId) {
    const error = createErrorResponse(
      ErrorCode.BAD_REQUEST,
      "Flight ID and seat ID are required",
      HttpStatus.BAD_REQUEST
    );
    return c.json(error, { status: HttpStatus.BAD_REQUEST });
  }

  const result = await assignSeat({ flightId, seatId });

  if (!result.success) {
    const error = createErrorResponse(
      ErrorCode.BAD_REQUEST,
      result.error || "Failed to assign seat",
      HttpStatus.BAD_REQUEST
    );
    return c.json(error, { status: HttpStatus.BAD_REQUEST });
  }

  return c.json({ success: true, assigned: result.assigned });
});
