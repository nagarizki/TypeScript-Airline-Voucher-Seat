// Crew service - handles crew member operations
import { prisma } from "../db";

export interface CrewMember {
  id: string;
  name: string | null;
  email: string;
}

export async function getAllCrew(): Promise<CrewMember[]> {
  const crew = await prisma.crew.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return crew;
}

export async function getCrewByIds(ids: string[]): Promise<CrewMember[]> {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  const crew = await prisma.crew.findMany({
    where: {
      id: { in: ids },
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return crew;
}
