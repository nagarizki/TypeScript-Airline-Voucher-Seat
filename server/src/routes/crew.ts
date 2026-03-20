// Crew routes - handles crew member operations
import { Hono } from "hono";
import { getAllCrew, getCrewByIds } from "../services/crew";

export const crewRouter = new Hono();

crewRouter.get("/", async (c) => {
  const crew = await getAllCrew();
  return c.json({ success: true, crew });
});

crewRouter.post("/by-ids", async (c) => {
  const { ids } = await c.req.json();

  const crew = await getCrewByIds(ids);

  return c.json({ success: true, crew });
});
