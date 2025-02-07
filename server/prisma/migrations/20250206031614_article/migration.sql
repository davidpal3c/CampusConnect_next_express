/*
  Warnings:

  - You are about to drop the column `state` on the `Article` table. All the data in the column will be lost.
  - Added the required column `status` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('Draft', 'Published');

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "state",
ADD COLUMN     "status" "ArticleStatus" NOT NULL;

-- DropEnum
DROP TYPE "ArticleState";
