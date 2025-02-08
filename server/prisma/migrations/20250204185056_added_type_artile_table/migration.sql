/*
  Warnings:

  - Added the required column `type` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "host" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Event_host_idx" ON "Event"("host");
