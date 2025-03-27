import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { institute_id, name, description, faculty_advisor } =
      await req.json();
      // console.log(institute_id, name, description, faculty_advisor);

    if (!institute_id || !name || !description || !faculty_advisor) {
      return NextResponse.json(
        {
          error: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const newStudentClub = await prisma.studentClub.create({
      data: {
        institute_id,
        name,
        description,
        faculty_advisor,
        members_count: 0,
      },
    });

    if (!newStudentClub) {
      return NextResponse.json(
        {
          success: false,
          error: "Student Club not created",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Student Club created successfully",
      data: newStudentClub,
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error creating student club",
        success: false,
      },
      { status: 500 }
    );
  }
}
