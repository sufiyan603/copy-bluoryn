-- CreateTable
CREATE TABLE "approval_body" (
    "approval_body_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(255),

    CONSTRAINT "approval_body_pkey" PRIMARY KEY ("approval_body_id")
);

-- CreateTable
CREATE TABLE "department" (
    "department_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "head" VARCHAR(255),

    CONSTRAINT "department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "institute" (
    "institute_id" TEXT NOT NULL,
    "institute_name" VARCHAR(255) NOT NULL,
    "about" TEXT,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "pincode" VARCHAR(20),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "establishment_year" INTEGER,
    "institute_type" VARCHAR(255),
    "campus_size" VARCHAR(255),
    "student_intake" INTEGER,
    "affiliation" VARCHAR(255),
    "last_updated_on" DATE,
    "last_updated_from" VARCHAR(255),
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(255),
    "website" VARCHAR(255),
    "accreditation" VARCHAR(255),
    "institution_type" VARCHAR(255),
    "url" VARCHAR(255),

    CONSTRAINT "institute_pkey" PRIMARY KEY ("institute_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "pincode" VARCHAR(20),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "affiliation" VARCHAR(255),

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "student_club" (
    "club_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "faculty_advisor" VARCHAR(255),
    "members_count" INTEGER,

    CONSTRAINT "student_club_pkey" PRIMARY KEY ("club_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "user_type" VARCHAR(50),
    "status" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "course" (
    "course_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" VARCHAR(255),
    "level" VARCHAR(255),
    "mode" VARCHAR(255),
    "specialization" VARCHAR(255),
    "eligibility" TEXT,

    CONSTRAINT "course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "faculty" (
    "faculty_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(255),
    "subject_expertise" VARCHAR(255),
    "rating" DOUBLE PRECISION,
    "tenure_start" DATE,
    "tenure_end" DATE,
    "employment_type" VARCHAR(255),

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "faculty_user" (
    "faculty_id" TEXT NOT NULL,
    "user_id" TEXT,
    "institute_id" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,

    CONSTRAINT "faculty_user_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "student" (
    "student_id" TEXT NOT NULL,
    "user_id" TEXT,
    "institute_id" TEXT,
    "course_id" TEXT,
    "enrollment_year" INTEGER,
    "graduation_year" INTEGER,

    CONSTRAINT "student_pkey" PRIMARY KEY ("student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "approval_body" ADD CONSTRAINT "approval_body_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_club" ADD CONSTRAINT "student_club_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faculty" ADD CONSTRAINT "faculty_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faculty_user" ADD CONSTRAINT "faculty_user_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faculty_user" ADD CONSTRAINT "faculty_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("institute_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
