import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../../lib/prisma"; // Ensure Prisma client is properly configured

export async function GET(req: NextRequest) {
  try {
    // Extract faculty_id from query params (or authentication middleware)
    const facultyId = req.nextUrl.searchParams.get("id");

    if (!facultyId) {
      return NextResponse.json({ error: "Faculty ID is required" }, { status: 400 });
    }

    // Fetch faculty profile
    const faculty = await prisma.faculty.findUnique({
      where: { faculty_id: facultyId },
      select: {
        faculty_id: true,
        name: true,
        designation: true,
        subject_expertise: true,
        rating: true,
        tenure_start: true,
        tenure_end: true,
        employment_type: true,
        department_id: true,
        institute_id: true,
      },
    });

    if (!faculty) {
      return NextResponse.json({ message: "Faculty not found" }, { status: 404 });
    }

    return NextResponse.json(faculty, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
    try {
      const body = await req.json();
      const { faculty_id, name, designation, subject_expertise, rating, tenure_start, tenure_end, employment_type } = body;
  
      if (!faculty_id) {
        return NextResponse.json({ error: "Faculty ID is required" }, { status: 400 });
      }
  
      // Update faculty profile
      const updatedFaculty = await prisma.faculty.update({
        where: { faculty_id },
        data: {
          name,
          designation,
          subject_expertise,
          rating,
          tenure_start: tenure_start ? new Date(tenure_start) : null,
          tenure_end: tenure_end ? new Date(tenure_end) : null,
          employment_type,
        },
        select: {
          faculty_id: true,
          name: true,
          designation: true,
          subject_expertise: true,
          rating: true,
          tenure_start: true,
          tenure_end: true,
          employment_type: true,
        },
      });
  
      return NextResponse.json(updatedFaculty, { status: 200 });
    } catch (error) {
      console.error("Error updating faculty profile:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
