-- AlterTable
ALTER TABLE "course" ADD COLUMN     "department_id" TEXT;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("department_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
