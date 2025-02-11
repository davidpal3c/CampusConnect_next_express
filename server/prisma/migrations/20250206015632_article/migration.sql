/*
  Warnings:

  - The `created_at` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `updated_at` on the `Article` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "datePublished" DROP NOT NULL,
DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
