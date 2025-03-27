import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const instituteId = searchParams.get("instituteId");
    const departmentId = searchParams.get("department");
    const designation = searchParams.get("designation");

    // Build the where clause dynamically
    const filters: any = {};
    if (instituteId) filters.institute_id = instituteId;
    if (departmentId) filters.department_id = departmentId;
    if (designation) filters.designation = designation;

    const faculties = await prisma.faculty.findMany({
      where: filters,
    });

    if (!faculties.length) {
      return NextResponse.json(
        {
          success: false,
          error: "No faculty found with the given criteria",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Faculty list fetched successfully",
        data: faculties,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching faculty list.", error);
    return NextResponse.json(
      { error: "Error fetching faculty list.", success: false },
      { status: 500 }
    );
  }
}
