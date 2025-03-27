import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const instituteId = searchParams.get("instituteId");

    // console.log("Institute id: ", instituteId);
    if (!instituteId) {
      return NextResponse.json(
        {
          success: false,
          error: "Institute id is required",
        },
        { status: 400 }
      );
    }
    const departments = await prisma.department.findMany({
      where: {
        institute_id: instituteId,
      },
    });

    if (!departments.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Departments not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Departments fetched successfully",
        data: departments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching departments.", error);
    return NextResponse.json(
      { error: "Error fetching departments.", success: false },
      { status: 500 }
    );
  }
}
