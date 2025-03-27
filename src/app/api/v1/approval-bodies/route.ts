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
          error: "instituteId is required",
        },
        { status: 400 }
      );
    }

    const approvalBodies = await prisma.approvalBody.findMany({
      where: {
        institute_id: instituteId,
      },
    });

    if (!approvalBodies.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Approval bodies not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Approval bodies fetched successfully",
        data: approvalBodies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching approval bodies",
      },
      { status: 500 }
    );
  }
}
