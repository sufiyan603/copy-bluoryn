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
          message: "Department id is required",
        },
        { status: 400 }
      );
    }
    const course = await prisma.course.findMany({
      where: {
        department_id: id,
      },
    });

    if (!course.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Courses fetched successfully",
        data: course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error fetching courses",
        success: false,
      },
      { status: 500 }
    );
  }
}
