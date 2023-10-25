/*
  Warnings:

  - Added the required column `displayName` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "displayName" TEXT NOT NULL;
