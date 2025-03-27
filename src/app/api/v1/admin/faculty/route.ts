import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      designation,
      subject_expertise,
      rating,
      tenure_start,
      tenure_end,
      employment_type,
      department_id,
      institute_id,
      course_id,
    } = body;

    // Validate required fields
    if (!name || !department_id) {
      return NextResponse.json(
        { error: "Name and Department ID are required" },
        { status: 400 }
      );
    }

    // Ensure department exists before creating faculty
    const departmentExists = await prisma.department.findUnique({
      where: { department_id },
    });

    if (!departmentExists) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }

    // If institute_id is provided, ensure it exists
    if (institute_id) {
      const instituteExists = await prisma.institute.findUnique({
        where: { institute_id },
      });

      if (!instituteExists) {
        return NextResponse.json(
          { error: "Institute not found" },
          { status: 404 }
        );
      }
    }

    // Create new faculty member
    const newFaculty = await prisma.faculty.create({
      data: {
        name,
        designation,
        subject_expertise,
        rating,
        tenure_start: tenure_start ? new Date(tenure_start) : null,
        tenure_end: tenure_end ? new Date(tenure_end) : null,
        employment_type,
        department_id,
        institute_id,
        course_id,
      },
    });

    return NextResponse.json(newFaculty, { status: 201 });
  } catch (error) {
    console.error("Error creating faculty:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
