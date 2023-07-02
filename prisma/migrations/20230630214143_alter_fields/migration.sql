/*
  Warnings:

  - You are about to drop the column `roles` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourcePermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carImage` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyRate` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fineAmount` to the `Cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResourcePermission" DROP CONSTRAINT "ResourcePermission_resourceName_fkey";

-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "carImage" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dailyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "fineAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "licensePlate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roles",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "ResourcePermission";

-- DropEnum
DROP TYPE "Permission";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Rentals" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "expectedReturnDate" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rentals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
