import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Crews
 * const crews = await prisma.crew.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model crew
 *
 */
export type crew = Prisma.crewModel;
/**
 * Model aircraftType
 *
 */
export type aircraftType = Prisma.aircraftTypeModel;
/**
 * Model flight
 *
 */
export type flight = Prisma.flightModel;
/**
 * Model flightVoucherSeatNumbers
 *
 */
export type flightVoucherSeatNumbers = Prisma.flightVoucherSeatNumbersModel;
/**
 * Model flightAircraftType
 *
 */
export type flightAircraftType = Prisma.flightAircraftTypeModel;
/**
 * Model seat
 *
 */
export type seat = Prisma.seatModel;
