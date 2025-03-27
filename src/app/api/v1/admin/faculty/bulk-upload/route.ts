import { NextRequest, NextResponse } from "next/server";
import prisma  from "../../../../../../../lib/prisma"; // Ensure Prisma client is configured
import { z } from "zod"; // Validation library

// Define Faculty Schema for Validation
const facultySchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().optional(),
  subject_expertise: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  tenure_start: z.string().optional(),
  tenure_end: z.string().optional(),
  employment_type: z.string().optional(),
  department_id: z.string().min(1, "Department ID is required"),
  institute_id: z.string().optional(),
  course_id: z.string().optional(),
});

// Bulk Upload API
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const facultyData = body.faculty || [];

    if (facultyData.length === 0) {
      return NextResponse.json(
        { error: "No data provided for bulk upload" },
        { status: 400 }
      );
    }

    // Validate each entry
    const validatedData = [];
    const errors = [];

    for (let i = 0; i < facultyData.length; i++) {
      const faculty = facultyData[i];
      const validationResult = facultySchema.safeParse(faculty);

      if (!validationResult.success) {
        errors.push({
          row: i + 1,
          error: validationResult.error.format(),
        });
      } else {
        validatedData.push(validationResult.data);
      }
    }

    if (validatedData.length === 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Insert faculty records into database
    const createdFaculty = await prisma.faculty.createMany({
      data: validatedData.map((faculty) => ({
        name: faculty.name,
        designation: faculty.designation,
        subject_expertise: faculty.subject_expertise,
        rating: faculty.rating,
        tenure_start: faculty.tenure_start ? new Date(faculty.tenure_start) : null,
        tenure_end: faculty.tenure_end ? new Date(faculty.tenure_end) : null,
        employment_type: faculty.employment_type,
        department_id: faculty.department_id,
        institute_id: faculty.institute_id,
        course_id: faculty.course_id,
      })),
      skipDuplicates: true, // Avoid duplicate insertions
    });

    return NextResponse.json({
      message: "Bulk upload completed",
      totalRecords: facultyData.length,
      insertedRecords: createdFaculty.count,
      failedRecords: errors.length,
      errors,
    });
  } catch (error) {
    console.error("Error in bulk upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
