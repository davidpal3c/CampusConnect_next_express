/*
  Warnings:

  - Added the required column `type` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('Article', 'Event', 'Group');

-- CreateEnum
CREATE TYPE "ArticleType" AS ENUM ('Campus', 'General', 'News', 'PreArrivals');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "author" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "ArticleType" NOT NULL;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "middle_name" TEXT;

-- DropEnum
DROP TYPE "Type";

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
