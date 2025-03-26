/*
  Warnings:

  - You are about to drop the column `credentials` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `graduation_year` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `degree_type` on the `AlumniStudy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "credentials",
DROP COLUMN "graduation_year";

-- AlterTable
ALTER TABLE "AlumniStudy" DROP COLUMN "degree_type";
