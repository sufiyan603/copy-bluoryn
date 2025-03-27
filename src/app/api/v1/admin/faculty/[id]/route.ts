import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../../../lib/prisma"; // Ensure Prisma client is configured

// Update Faculty (PUT /admin/faculty/:id)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const facultyId = params.id;
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

    // Check if faculty exists
    const existingFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: facultyId },
    });

    if (!existingFaculty) {
      return NextResponse.json(
        { error: "Faculty not found" },
        { status: 404 }
      );
    }

    // If department_id is provided, ensure it exists
    if (department_id) {
      const departmentExists = await prisma.department.findUnique({
        where: { department_id },
      });

      if (!departmentExists) {
        return NextResponse.json(
          { error: "Department not found" },
          { status: 404 }
        );
      }
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

    // Update faculty
    const updatedFaculty = await prisma.faculty.update({
      where: { faculty_id: facultyId },
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

    return NextResponse.json(updatedFaculty, { status: 200 });
  } catch (error) {
    console.error("Error updating faculty:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete Faculty (DELETE /admin/faculty/:id)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const facultyId = params.id;

    // Check if faculty exists
    const existingFaculty = await prisma.faculty.findUnique({
      where: { faculty_id: facultyId },
    });

    if (!existingFaculty) {
      return NextResponse.json(
        { error: "Faculty not found" },
        { status: 404 }
      );
    }

    // Delete faculty
    await prisma.faculty.delete({
      where: { faculty_id: facultyId },
    });

    return NextResponse.json(
      { message: "Faculty deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting faculty:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
