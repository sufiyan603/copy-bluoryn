import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required", success: false },
        { status: 400 }
      );
    }

    const facility = await prisma.infrastructure.findFirst({
      where: { infrastructure_id: id },
      select: {
        facility: true,
      },
    });
    if (!facility) {
      return NextResponse.json(
        { error: "Facility not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Facility found",
        success: true,
        data: facility,
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
