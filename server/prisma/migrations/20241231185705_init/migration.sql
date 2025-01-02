-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Student', 'Alumni');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Active', 'Inactive', 'Preapproved');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "admin_id" TEXT NOT NULL,
    "user_id_fk" TEXT NOT NULL,
    "permissions" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "user_id_fk" TEXT NOT NULL,
    "program_id_fk" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Alumni" (
    "alumni_id" TEXT NOT NULL,
    "user_id_fk" TEXT NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "credentials" TEXT,
    "current_position" TEXT,
    "company" TEXT,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("alumni_id")
);

-- CreateTable
CREATE TABLE "Program" (
    "program_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department_id_fk" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("program_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_user_id_fk_key" ON "Admin"("user_id_fk");

-- CreateIndex
CREATE UNIQUE INDEX "Student_user_id_fk_key" ON "Student"("user_id_fk");

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_user_id_fk_key" ON "Alumni"("user_id_fk");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_program_id_fk_fkey" FOREIGN KEY ("program_id_fk") REFERENCES "Program"("program_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alumni" ADD CONSTRAINT "Alumni_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_department_id_fk_fkey" FOREIGN KEY ("department_id_fk") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
