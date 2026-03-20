// Auth routes - handles crew authentication
import { Hono } from "hono";
import { login } from "../services/auth";

export const authRouter = new Hono();

authRouter.post("", async (c) => {
  const { email, password } = await c.req.json();

  const result = await login({ email, password });

  if (!result.success || !result.crew) {
    return c.json(result.error, { status: result.status });
  }

  return c.json({ success: true, crew: result.crew });
});
