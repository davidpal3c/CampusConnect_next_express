/*
  Warnings:

  - Added the required column `created_at` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "created_at" TEXT NOT NULL,
ADD COLUMN     "updated_at" TEXT NOT NULL;
