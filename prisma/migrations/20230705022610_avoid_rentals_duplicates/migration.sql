/*
  Warnings:

  - A unique constraint covering the columns `[carId,startDate]` on the table `Rentals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rentals_carId_startDate_key" ON "Rentals"("carId", "startDate");
