import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Department id is required",
        },
        { status: 400 }
      );
    }
    const faculty = await prisma.faculty.findMany({
      where: {
        department_id: id,
      },
    });

    if (!faculty.length) {
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
        message: "Faculties fetched successfully",
        data: faculty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fetching faculties",
        success: false,
      },
      { status: 500 }
    );
  }
}
