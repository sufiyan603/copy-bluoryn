import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Student club id is required",
        },
        { status: 400 }
      );
    }
    const studentClub = await prisma.studentClub.findUnique({
      where: {
        club_id: id,
      },
    });

    if (!studentClub) {
      return NextResponse.json(
        {
          success: false,
          error: "Student club not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Student club fetched successfully",
        data: studentClub,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fetching student club",
        success: false,
      },
      { status: 500 }
    );
  }
}
