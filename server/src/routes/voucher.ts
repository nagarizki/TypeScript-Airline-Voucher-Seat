// Voucher routes - handles voucher generation and checking
import { Hono } from "hono";
import { checkVoucherExists, generateVoucher } from "../services/voucher";

export const voucherRouter = new Hono();

voucherRouter.post("/check", async (c) => {
  const { flightNumber, date } = await c.req.json();

  if (!flightNumber || !date) {
    return c.json(
      { success: false, error: { message: "Flight number and date are required" } },
      { status: 400 }
    );
  }

  const exists = await checkVoucherExists(flightNumber, date);

  return c.json({ exists });
});

voucherRouter.post("/generate", async (c) => {
  const { name, id, flightNumber, date, aircraft, departure, arrival } = await c.req.json();

  const result = await generateVoucher({
    name,
    id,
    flightNumber,
    date,
    aircraft,
    departure,
    arrival,
  });

  if (!result.success) {
    return c.json(result.error, { status: result.status });
  }

  return c.json({ success: true, seats: result.seats });
});
