import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          error: "Student club id is required",
          success: false,
        },
        { status: 400 }
      );
    }

  
    const { name, description, faculty_advisor } = await req.json();

    if (!name || !description || !faculty_advisor) {
      return NextResponse.json(
        {
          error: "All fields are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const studentClub = await prisma.studentClub.update({
      where: {
        club_id: id,
      },
      data: {
        name,
        description,
        faculty_advisor,
      },
    });

    return NextResponse.json(
      {
        message: "Student club updated successfully",
        success: true,
        data: studentClub,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error updating student club",
        success: false,
      },
      { status: 500 }
    );
  }
}
