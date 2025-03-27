import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params;
  console.log(id);
  try {
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Department id is required",
        },
        { status: 400 }
      );
    }
    const departments = await prisma.department.findMany({
      where: {
        department_id: id,
      },
    });

    if (!departments.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Department not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Department fetched successfully",
        data: departments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fetching department",
        success: false,
      },
      { status: 500 }
    );
  }
}
