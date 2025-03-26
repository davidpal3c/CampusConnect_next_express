-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "intake_year" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AlumniStudy" (
    "id" TEXT NOT NULL,
    "alumni_id" TEXT NOT NULL,
    "program_id" TEXT,
    "department_id" TEXT NOT NULL,
    "graduation_year" INTEGER,
    "degree_type" TEXT,

    CONSTRAINT "AlumniStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlumniStudy_id_key" ON "AlumniStudy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AlumniStudy_alumni_id_program_id_department_id_graduation_y_key" ON "AlumniStudy"("alumni_id", "program_id", "department_id", "graduation_year");

-- AddForeignKey
ALTER TABLE "AlumniStudy" ADD CONSTRAINT "AlumniStudy_alumni_id_fkey" FOREIGN KEY ("alumni_id") REFERENCES "Alumni"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniStudy" ADD CONSTRAINT "AlumniStudy_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("program_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlumniStudy" ADD CONSTRAINT "AlumniStudy_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
