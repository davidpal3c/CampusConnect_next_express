/*
  Warnings:

  - You are about to drop the column `isDomestic` on the `Student` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "StudentType" AS ENUM ('Domestic', 'International');

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "isDomestic",
ADD COLUMN     "student_type" "StudentType";
