import prisma from "../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = req.nextUrl.searchParams;
    const { instituteId, facilityType } = Object.fromEntries(
      searchParams.entries()
    );
    if (!instituteId || !facilityType) {
      return NextResponse.json(
        { error: "Missing required parameters", success: false },
        { status: 400 }
      );
    }

    // Fetch infrastructure data from the database
    const infrastructure = await prisma.infrastructure.findMany({
      where: {
        institute_id: instituteId.trim(),
        facility: facilityType.trim(),
      },
    });

    if (!infrastructure.length) {
      return NextResponse.json(
        { error: "Infrastructure not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: infrastructure,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching infrastructure", error);
    return NextResponse.json(
      { error: "Error fetching infrastructure", success: false },
      { status: 500 }
    );
  }
}
