// Aircraft service - handles aircraft type operations
import { prisma } from "../db";

export interface AircraftType {
  id: string;
  name: string;
  seatNumber: number;
  seatType: string;
}

export async function getAllAircraftTypes(): Promise<AircraftType[]> {
  const aircraftTypes = await prisma.aircraftType.findMany({
    select: {
      id: true,
      name: true,
      seatNumber: true,
      seatType: true,
    },
  });

  return aircraftTypes;
}
