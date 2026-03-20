// Seat service - handles seat assignment operations
import { prisma } from "../db";

export interface AssignSeatParams {
  flightId: string;
  seatId: string;
}

export interface AssignSeatResult {
  success: boolean;
  assigned: boolean;
  error?: string;
}

export async function assignSeat({ flightId, seatId }: AssignSeatParams): Promise<AssignSeatResult> {
  if (!flightId || !seatId) {
    return {
      success: false,
      assigned: false,
      error: "Flight ID and seat ID are required",
    };
  }

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
    return { success: true, assigned: false };
  }

  // Assign the seat
  await prisma.flightVoucherSeatNumbers.create({
    data: {
      flightId,
      seatId,
    },
  });

  return { success: true, assigned: true };
}
