/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "crew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flightNumber" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "aircraftType" TEXT NOT NULL,
    "crewId" TEXT NOT NULL,
    CONSTRAINT "flight_crewId_fkey" FOREIGN KEY ("crewId") REFERENCES "crew" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatNumber" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "flightId" TEXT NOT NULL,
    CONSTRAINT "seat_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "crew_email_key" ON "crew"("email");
