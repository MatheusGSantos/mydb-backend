/*
  Warnings:

  - You are about to drop the `CategoriesOnCars` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Cars` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnCars" DROP CONSTRAINT "CategoriesOnCars_carId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnCars" DROP CONSTRAINT "CategoriesOnCars_categoryId_fkey";

-- AlterTable
ALTER TABLE "Cars" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CategoriesOnCars";

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
