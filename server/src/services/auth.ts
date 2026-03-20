// Auth service - handles crew authentication
import bcrypt from "bcryptjs";
import { prisma } from "../db";
import type { ApiResponse } from "@shared/types";
import { createErrorResponse, ErrorCode, HttpStatus } from "@shared/types";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  crew?: {
    id: string;
    email: string;
    name: string | null;
  };
  error?: ReturnType<typeof createErrorResponse>;
  status?: HttpStatus;
}

export async function login({ email, password }: LoginParams): Promise<LoginResult> {
  if (!email || !password) {
    return {
      success: false,
      error: createErrorResponse(ErrorCode.BAD_REQUEST, "Email and password are required", HttpStatus.BAD_REQUEST),
      status: HttpStatus.BAD_REQUEST,
    };
  }

  const crew = await prisma.crew.findUnique({
    where: { email },
  });

  if (!crew || !bcrypt.compareSync(password, crew.password)) {
    return {
      success: false,
      error: createErrorResponse(ErrorCode.UNAUTHORIZED, "Invalid credentials", HttpStatus.UNAUTHORIZED),
      status: HttpStatus.UNAUTHORIZED,
    };
  }

  return {
    success: true,
    crew: { id: crew.id, email: crew.email, name: crew.name },
  };
}
