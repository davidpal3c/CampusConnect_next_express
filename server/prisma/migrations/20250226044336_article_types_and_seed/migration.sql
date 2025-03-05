/*
  Warnings:

  - The values [Current] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `Article` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intake_year` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Active', 'Inactive', 'Prospective');
ALTER TABLE "Student" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_program_id_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "type",
ADD COLUMN     "type_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "intake_year" INTEGER NOT NULL,
ALTER COLUMN "program_id" DROP NOT NULL;

-- DropEnum
DROP TYPE "ArticleType";

-- CreateTable
CREATE TABLE "ArticleType" (
    "type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleType_pkey" PRIMARY KEY ("type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleType_type_id_key" ON "ArticleType"("type_id");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleType_name_key" ON "ArticleType"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("program_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ArticleType"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
