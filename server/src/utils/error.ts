// Utility functions for error handling
import type { ApiError } from "@shared/types";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

export function handleError(error: unknown, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): ApiError {
  const message = error instanceof Error ? error.message : "An unexpected error occurred";
  let code: ErrorCode = ErrorCode.INTERNAL_ERROR;

  if (status === HttpStatus.BAD_REQUEST) code = ErrorCode.BAD_REQUEST;
  else if (status === HttpStatus.UNAUTHORIZED) code = ErrorCode.UNAUTHORIZED;
  else if (status === HttpStatus.FORBIDDEN) code = ErrorCode.FORBIDDEN;
  else if (status === HttpStatus.NOT_FOUND) code = ErrorCode.NOT_FOUND;
  else if (status === HttpStatus.CONFLICT) code = ErrorCode.CONFLICT;

  return createErrorResponse(code, message, status);
}

export function requireFields<T extends Record<string, unknown>>(
  obj: T,
  fields: (keyof T)[]
): { valid: boolean; missing?: string[] } {
  const missing = fields.filter((field) => !obj[field]).map(String);
  return { valid: missing.length === 0, missing: missing.length > 0 ? missing : undefined };
}
