import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Student Club ID is required",
        },
        { status: 400 }
      );
    }

    const deletedStudentClub = await prisma.studentClub.delete({
      where: {
        club_id: id,
      },
    });

    if (!deletedStudentClub) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete the student club",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Student club deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error deleting student club",
      },
      { status: 500 }
    );
  }
}
