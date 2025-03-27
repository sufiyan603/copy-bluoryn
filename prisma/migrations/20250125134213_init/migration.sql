-- CreateTable
CREATE TABLE "Institute" (
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
    "last_updated_on" TIMESTAMP(3),
    "last_updated_from" VARCHAR(255),
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(255),
    "website" VARCHAR(255),
    "accreditation" VARCHAR(255),
    "institution_type" VARCHAR(255),
    "url" VARCHAR(255),
    "verification_status" VARCHAR(50),
    "system_status" VARCHAR(50),

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("institute_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "program_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" VARCHAR(255),
    "level" VARCHAR(255),
    "mode" VARCHAR(255),
    "specialization" VARCHAR(255),
    "eligibility" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "fee_id" TEXT NOT NULL,
    "course_id" TEXT,
    "min_fee" DOUBLE PRECISION,
    "max_fee" DOUBLE PRECISION,
    "fee_year" INTEGER,
    "component" VARCHAR(255),
    "amount" DOUBLE PRECISION,
    "currency" VARCHAR(10),

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("fee_id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "verified_reviews" INTEGER,
    "placements_rating" DOUBLE PRECISION,
    "infrastructure_rating" DOUBLE PRECISION,
    "faculty_rating" DOUBLE PRECISION,
    "course_curriculum_rating" DOUBLE PRECISION,
    "campus_life_rating" DOUBLE PRECISION,
    "value_for_money_rating" DOUBLE PRECISION,
    "review_text" TEXT,
    "reviewer_name" VARCHAR(255),
    "reviewer_email" VARCHAR(255),
    "review_date" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Company" (
    "company_id" TEXT NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "industry" VARCHAR(255),
    "location" VARCHAR(255),
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(255),

    CONSTRAINT "Company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "FacultyCourse" (
    "faculty_course_id" TEXT NOT NULL,
    "faculty_id" TEXT,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "FacultyCourse_pkey" PRIMARY KEY ("faculty_course_id")
);

-- CreateTable
CREATE TABLE "AdmissionQuota" (
    "quota_id" TEXT NOT NULL,
    "course_id" TEXT,
    "category" VARCHAR(255),
    "percentage" DOUBLE PRECISION,

    CONSTRAINT "AdmissionQuota_pkey" PRIMARY KEY ("quota_id")
);

-- CreateTable
CREATE TABLE "Cutoff" (
    "cutoff_id" TEXT NOT NULL,
    "course_id" TEXT,
    "exam_name" VARCHAR(255),
    "category" VARCHAR(255),
    "opening_rank" INTEGER,
    "closing_rank" INTEGER,
    "exam_year" INTEGER,

    CONSTRAINT "Cutoff_pkey" PRIMARY KEY ("cutoff_id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "placement_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "company_id" TEXT,
    "top_recruiters" VARCHAR(255),
    "year" INTEGER,
    "course_id" TEXT,
    "placement_rate" DOUBLE PRECISION,
    "offer_status" VARCHAR(255),

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("placement_id")
);

-- CreateTable
CREATE TABLE "PlacementSpecializationStats" (
    "stat_id" TEXT NOT NULL,
    "placement_id" TEXT,
    "specialization" VARCHAR(255),
    "average_package" DOUBLE PRECISION,
    "median_package" DOUBLE PRECISION,
    "highest_package" DOUBLE PRECISION,

    CONSTRAINT "PlacementSpecializationStats_pkey" PRIMARY KEY ("stat_id")
);

-- CreateTable
CREATE TABLE "Program" (
    "program_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" VARCHAR(255),
    "level" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("program_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user_type" VARCHAR(50) NOT NULL,
    "status" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "FacultyUser" (
    "faculty_user_id" TEXT NOT NULL,
    "user_id" TEXT,
    "institute_id" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,

    CONSTRAINT "FacultyUser_pkey" PRIMARY KEY ("faculty_user_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" TEXT NOT NULL,
    "user_id" TEXT,
    "institute_id" TEXT,
    "course_id" TEXT,
    "enrollment_year" INTEGER,
    "graduation_year" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "ranking_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "ranking_body" VARCHAR(255),
    "ranking_year" INTEGER,
    "institute_rank" INTEGER,
    "category" VARCHAR(255),
    "country" VARCHAR(255),

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("ranking_id")
);

-- CreateTable
CREATE TABLE "Infrastructure" (
    "infrastructure_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "facility" VARCHAR(255),
    "hostel_type" VARCHAR(255),
    "hostel_details" TEXT,
    "library_details" TEXT,
    "facility_rating" DOUBLE PRECISION,
    "total_reviews" INTEGER,
    "timings" VARCHAR(255),

    CONSTRAINT "Infrastructure_pkey" PRIMARY KEY ("infrastructure_id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "scholarship_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "eligibility" TEXT,
    "amount" DOUBLE PRECISION,
    "deadline" TIMESTAMP(3),
    "application_process" TEXT,
    "required_documents" TEXT,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("scholarship_id")
);

-- CreateTable
CREATE TABLE "Department" (
    "department_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "head" VARCHAR(255),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "faculty_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "course_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(255),
    "subject_expertise" VARCHAR(255),
    "rating" DOUBLE PRECISION,
    "tenure_start" TIMESTAMP(3),
    "tenure_end" TIMESTAMP(3),
    "employment_type" VARCHAR(255),
    "department_id" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("faculty_id")
);

-- CreateTable
CREATE TABLE "FacultyPublication" (
    "publication_id" TEXT NOT NULL,
    "faculty_id" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "journal" VARCHAR(255),
    "year" INTEGER,
    "doi" VARCHAR(255),

    CONSTRAINT "FacultyPublication_pkey" PRIMARY KEY ("publication_id")
);

-- CreateTable
CREATE TABLE "StudentFacultyRating" (
    "rating_id" TEXT NOT NULL,
    "student_id" TEXT,
    "faculty_id" TEXT,
    "institute_id" TEXT,
    "rating" DOUBLE PRECISION,
    "rating_date" TIMESTAMP(3),

    CONSTRAINT "StudentFacultyRating_pkey" PRIMARY KEY ("rating_id")
);

-- CreateTable
CREATE TABLE "ApprovalBody" (
    "approval_body_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "contact_email" VARCHAR(255),
    "contact_phone" VARCHAR(255),

    CONSTRAINT "ApprovalBody_pkey" PRIMARY KEY ("approval_body_id")
);

-- CreateTable
CREATE TABLE "Location" (
    "location_id" TEXT NOT NULL,
    "institute_id" TEXT,
    "address" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "pincode" VARCHAR(20),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "affiliation" VARCHAR(255),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "StudentClub" (
    "club_id" TEXT NOT NULL,
    "institute_id" TEXT NOT NULL,
    "student_id" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "faculty_advisor" VARCHAR(255),
    "members_count" INTEGER,

    CONSTRAINT "StudentClub_pkey" PRIMARY KEY ("club_id")
);

-- CreateTable
CREATE TABLE "SuperAdminUser" (
    "super_admin_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "special_privileges" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuperAdminUser_pkey" PRIMARY KEY ("super_admin_user_id")
);

-- CreateTable
CREATE TABLE "SystemConfiguration" (
    "config_id" TEXT NOT NULL,
    "config_key" VARCHAR(255) NOT NULL,
    "config_value" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "managed_by" TEXT,

    CONSTRAINT "SystemConfiguration_pkey" PRIMARY KEY ("config_id")
);

-- CreateTable
CREATE TABLE "SystemLog" (
    "log_id" TEXT NOT NULL,
    "log_type" VARCHAR(50),
    "log_level" VARCHAR(20),
    "message" TEXT,
    "source" VARCHAR(255),
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "audit_id" TEXT NOT NULL,
    "entity_type" VARCHAR(50),
    "entity_id" TEXT NOT NULL,
    "action" VARCHAR(50),
    "changes" JSONB,
    "performed_by" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "UserPermission" (
    "permission_id" TEXT NOT NULL,
    "role_name" VARCHAR(50),
    "permissions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserPermission_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "EditorUser" (
    "editor_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "content_area" TEXT,
    "access_level" TEXT,

    CONSTRAINT "EditorUser_pkey" PRIMARY KEY ("editor_user_id")
);

-- CreateTable
CREATE TABLE "RegisteredUser" (
    "registered_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegisteredUser_pkey" PRIMARY KEY ("registered_user_id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "admin_user_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "admin_level" VARCHAR(50),
    "responsibilities" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("admin_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_contact_email_key" ON "Company"("contact_email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyCourse" ADD CONSTRAINT "FacultyCourse_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyCourse" ADD CONSTRAINT "FacultyCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionQuota" ADD CONSTRAINT "AdmissionQuota_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cutoff" ADD CONSTRAINT "Cutoff_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementSpecializationStats" ADD CONSTRAINT "PlacementSpecializationStats_placement_id_fkey" FOREIGN KEY ("placement_id") REFERENCES "Placement"("placement_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyUser" ADD CONSTRAINT "FacultyUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyUser" ADD CONSTRAINT "FacultyUser_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infrastructure" ADD CONSTRAINT "Infrastructure_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacultyPublication" ADD CONSTRAINT "FacultyPublication_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFacultyRating" ADD CONSTRAINT "StudentFacultyRating_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFacultyRating" ADD CONSTRAINT "StudentFacultyRating_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("faculty_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFacultyRating" ADD CONSTRAINT "StudentFacultyRating_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalBody" ADD CONSTRAINT "ApprovalBody_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClub" ADD CONSTRAINT "StudentClub_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "Institute"("institute_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuperAdminUser" ADD CONSTRAINT "SuperAdminUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemConfiguration" ADD CONSTRAINT "SystemConfiguration_managed_by_fkey" FOREIGN KEY ("managed_by") REFERENCES "SuperAdminUser"("super_admin_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemLog" ADD CONSTRAINT "SystemLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "SuperAdminUser"("super_admin_user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "SuperAdminUser"("super_admin_user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorUser" ADD CONSTRAINT "EditorUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegisteredUser" ADD CONSTRAINT "RegisteredUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
