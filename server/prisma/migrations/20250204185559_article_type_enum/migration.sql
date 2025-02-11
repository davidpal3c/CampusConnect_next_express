/*
  Warnings:

  - Changed the type of `type` on the `Article` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('General', 'Campus', 'PreArrival');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "type",
ADD COLUMN     "type" "ArticleType" NOT NULL;
