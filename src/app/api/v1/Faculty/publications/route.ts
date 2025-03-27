import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../../lib/prisma"; // Ensure Prisma client is configured

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { faculty_id, title, journal, year, doi } = body;

    // Validate required fields
    if (!faculty_id || !title) {
      return NextResponse.json(
        { error: "Faculty ID and title are required" },
        { status: 400 }
      );
    }

    // Ensure faculty exists before inserting publication
    const facultyExists = await prisma.faculty.findUnique({
      where: { faculty_id },
    });

    if (!facultyExists) {
      return NextResponse.json(
        { error: "Faculty not found" },
        { status: 404 }
      );
    }

    // Create new publication
    const newPublication = await prisma.facultyPublication.create({
      data: {
        faculty_id,
        title,
        journal,
        year,
        doi,
      },
    });

    return NextResponse.json(newPublication, { status: 201 });
  } catch (error) {
    console.error("Error adding faculty publication:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
