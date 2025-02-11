/*
  Warnings:

  - You are about to drop the column `author` on the `Article` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "author",
ADD COLUMN     "author_id" TEXT NOT NULL;
