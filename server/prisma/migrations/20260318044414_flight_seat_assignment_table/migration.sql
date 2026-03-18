/*
  Warnings:

  - You are about to drop the column `aircraftType` on the `flight` table. All the data in the column will be lost.
  - You are about to drop the column `flightId` on the `seat` table. All the data in the column will be lost.
  - Added the required column `aircraftTypeId` to the `seat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "aircraftType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "flightVoucherSeatNumbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    CONSTRAINT "flightVoucherSeatNumbers_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flightVoucherSeatNumbers_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "flightAircraftType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "aircraftTypeId" TEXT NOT NULL,
    CONSTRAINT "flightAircraftType_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flightAircraftType_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraftType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "crewId" TEXT NOT NULL,
    CONSTRAINT "flight_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_flight" ("arrival", "crewId", "date", "departure", "flightNumber", "id") SELECT "arrival", "crewId", "date", "departure", "flightNumber", "id" FROM "flight";
DROP TABLE "flight";
ALTER TABLE "new_flight" RENAME TO "flight";
CREATE TABLE "new_seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatNumber" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "aircraftTypeId" TEXT NOT NULL,
    CONSTRAINT "seat_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraftType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seat" ("class", "id", "isAvailable", "seatNumber") SELECT "class", "id", "isAvailable", "seatNumber" FROM "seat";
DROP TABLE "seat";
ALTER TABLE "new_seat" RENAME TO "seat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
