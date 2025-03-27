import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Faculty ID is required",
        },
        { status: 400 }
      );
    }

    const faculty = await prisma.faculty.findUnique({
      where: { faculty_id: id },
    });

    if (!faculty) {
      return NextResponse.json(
        {
          success: false,
          error: "Faculty not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Faculty profile fetched successfully",
        data: faculty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching faculty profile.", error);
    return NextResponse.json(
      { error: "Error fetching faculty profile.", success: false },
      { status: 500 }
    );
  }
}
