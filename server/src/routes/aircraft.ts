// Aircraft routes - handles aircraft type operations
import { Hono } from "hono";
import { getAllAircraftTypes } from "../services/aircraft";

export const aircraftRouter = new Hono();

aircraftRouter.get("/", async (c) => {
  const aircraftTypes = await getAllAircraftTypes();
  return c.json({ success: true, aircraftTypes });
});
