/*
  Warnings:

  - Made the column `carImage` on table `Cars` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fineAmount` on table `Cars` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Rentals" DROP CONSTRAINT "Rentals_carId_fkey";

-- DropForeignKey
ALTER TABLE "Rentals" DROP CONSTRAINT "Rentals_userId_fkey";

-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "carImage" SET NOT NULL,
ALTER COLUMN "fineAmount" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rentals" ALTER COLUMN "id" SET DEFAULT gen_random_uuid(),
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
