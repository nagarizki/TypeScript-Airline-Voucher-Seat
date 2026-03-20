/*
  Warnings:

  - You are about to drop the `Voucher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `aircraftType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flightAircraftType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flightVoucherSeatNumbers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `crewId` on the `flight` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Voucher";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "aircraftType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "flightAircraftType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "flightVoucherSeatNumbers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "aircraft_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "seatType" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "flight_crew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    CONSTRAINT "flight_crew_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flight_crew_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "flight_voucher_seat_numbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    CONSTRAINT "flight_voucher_seat_numbers_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flight_voucher_seat_numbers_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "flight_aircraft_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "aircraftTypeId" TEXT NOT NULL,
    CONSTRAINT "flight_aircraft_type_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "flight_aircraft_type_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraft_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "crew_name" TEXT NOT NULL,
    "crew_id" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "flight_date" TEXT NOT NULL,
    "aircraft_type" TEXT NOT NULL,
    "seat1" TEXT NOT NULL,
    "seat2" TEXT NOT NULL,
    "seat3" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_flight" ("arrival", "date", "departure", "flightNumber", "id") SELECT "arrival", "date", "departure", "flightNumber", "id" FROM "flight";
DROP TABLE "flight";
ALTER TABLE "new_flight" RENAME TO "flight";
CREATE TABLE "new_seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatNumber" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "aircraftTypeId" TEXT NOT NULL,
    CONSTRAINT "seat_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraft_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_seat" ("aircraftTypeId", "class", "id", "isAvailable", "seatNumber") SELECT "aircraftTypeId", "class", "id", "isAvailable", "seatNumber" FROM "seat";
DROP TABLE "seat";
ALTER TABLE "new_seat" RENAME TO "seat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
