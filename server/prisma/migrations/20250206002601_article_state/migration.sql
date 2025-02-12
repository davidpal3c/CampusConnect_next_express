/*
  Warnings:

  - Added the required column `state` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ArticleState" AS ENUM ('Draft', 'Published');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "state" "ArticleState" NOT NULL;
