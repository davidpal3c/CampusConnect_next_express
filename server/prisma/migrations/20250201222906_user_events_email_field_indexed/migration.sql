/*
  Warnings:

  - Added the required column `user_email` to the `UserEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEvent" ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "User_email_user_id_idx" ON "User"("email", "user_id");

-- CreateIndex
CREATE INDEX "UserEvent_user_email_idx" ON "UserEvent"("user_email");
