import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const instituteId = searchParams.get("instituteId");
    if (!instituteId) {
      return NextResponse.json(
        {
          success: false,
          error: "Institute id is required",
        },
        { status: 400 }
      );
    }
    const studentClubs = await prisma.studentClub.findMany({
      where: {
        institute_id: instituteId,
      },
    });
    if (!studentClubs.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Student clubs not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Student clubs fetched successfully",
        data: studentClubs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching student clubs", error);
    return NextResponse.json(
      {
        error: "Error fetching student clubs",
        success: false,
      },
      { status: 500 }
    );
  }
}
