import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../../../lib/prisma"; // Ensure your Prisma client is set up

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const facultyId = params.id;

    // Fetch courses for the given faculty_id
    const courses = await prisma.course.findMany({
      where: {
        Faculty: {
          some: { faculty_id: facultyId },
        },
      },
      select: {
        course_id: true,
        name: true,
        description: true,
        duration: true,
        level: true,
        mode: true,
        specialization: true,
        eligibility: true,
        department_id: true,
      },
    });

    if (!courses.length) {
      return NextResponse.json({ message: "No courses found" }, { status: 404 });
    }

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
