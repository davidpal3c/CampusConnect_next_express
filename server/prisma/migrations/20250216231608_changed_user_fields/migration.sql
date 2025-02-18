/*
  Warnings:

  - The values [Active,Inactive] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `intake_year` on the `Student` table. All the data in the column will be lost.
  - Made the column `program_id` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Current', 'Prospective');
ALTER TABLE "Student" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_program_id_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "intake_year",
ADD COLUMN     "intake" TEXT,
ALTER COLUMN "program_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;
