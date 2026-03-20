// Main application entry point - composes all routes together
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import type { ApiResponse } from "@shared/types";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

import {
  authRouter,
  voucherRouter,
  flightRouter,
  seatRouter,
  crewRouter,
  aircraftRouter,
} from "./routes";
import { handleError } from "./utils";

// Create a base API router
const apiRouter = new Hono();

// Mount voucher router at /api - its routes /check and /generate become /api/check and /api/generate
apiRouter.route("", voucherRouter);
apiRouter.route("/flights", flightRouter);
apiRouter.route("/seats", seatRouter);
apiRouter.route("/crew", crewRouter);
apiRouter.route("/aircraft-types", aircraftRouter);

export const app = new Hono()
  .use(cors())

  // Health check endpoints
  .get("/", (c) => {
    return c.json<ApiResponse>({ message: "Hello Hono!", success: true });
  })

  .get("/hello", async (c) => {
    const data: ApiResponse = {
      message: "Hello World!",
      success: true,
    };
    return c.json(data, { status: HttpStatus.OK });
  })

  // Auth routes
  .route("/login", authRouter)

  // API routes
  .route("/api", apiRouter)

  // Global error handler - catches all unhandled errors
  .onError((err, c) => {
    console.error("Server error:", err);
    const error = handleError(err);
    return c.json(error, error.status as 500);
  });

// Not found handler
app.notFound((c) => {
  const error = createErrorResponse(ErrorCode.NOT_FOUND, "Endpoint not found", HttpStatus.NOT_FOUND);
  return c.json(error, HttpStatus.NOT_FOUND);
});

export default app;

if (import.meta.main) {
  const port = parseInt(process.env.PORT || process.env.BUN_PORT || "3000", 10);
  console.log(`Server is running on port ${port}`);
  serve({
    fetch: app.fetch,
    port,
  });
}
