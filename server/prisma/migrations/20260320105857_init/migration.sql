/*
  Warnings:

  - You are about to drop the `voucher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "voucher";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "vouchers" (
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
CREATE TABLE "new_flight_aircraft_type" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "aircraftTypeId" TEXT NOT NULL,
    CONSTRAINT "flight_aircraft_type_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "flight_aircraft_type_aircraftTypeId_fkey" FOREIGN KEY ("aircraftTypeId") REFERENCES "aircraft_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_flight_aircraft_type" ("aircraftTypeId", "flightId", "id") SELECT "aircraftTypeId", "flightId", "id" FROM "flight_aircraft_type";
DROP TABLE "flight_aircraft_type";
ALTER TABLE "new_flight_aircraft_type" RENAME TO "flight_aircraft_type";
CREATE TABLE "new_flight_crew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    CONSTRAINT "flight_crew_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "flight_crew_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_flight_crew" ("crewId", "flightId", "id") SELECT "crewId", "flightId", "id" FROM "flight_crew";
DROP TABLE "flight_crew";
ALTER TABLE "new_flight_crew" RENAME TO "flight_crew";
CREATE TABLE "new_flight_voucher_seat_numbers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    CONSTRAINT "flight_voucher_seat_numbers_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "flight_voucher_seat_numbers_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_flight_voucher_seat_numbers" ("flightId", "id", "seatId") SELECT "flightId", "id", "seatId" FROM "flight_voucher_seat_numbers";
DROP TABLE "flight_voucher_seat_numbers";
ALTER TABLE "new_flight_voucher_seat_numbers" RENAME TO "flight_voucher_seat_numbers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
