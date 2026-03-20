export type ApiResponse<T = unknown> = {
  message: string;
  success: true;
  data?: T;
};

export type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  status: number;
};

// HTTP Status code mappings
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Error codes
export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CONFLICT = "CONFLICT",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
}

// Helper function to create error response
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  status: HttpStatus,
  details?: Record<string, string[]>
): ApiError {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    status,
  };
}
