import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          error: "Id is required",
        },
        { status: 400 }
      );
    }

    const {
      institute_id,
      facility,
      hostel_type,
      hostel_details,
      library_details,
      facility_rating,
      total_reviews,
      timings,
    } = await req.json();

    if (
      !institute_id ||
      !facility ||
      !hostel_type ||
      !hostel_details ||
      !library_details ||
      !facility_rating ||
      !total_reviews ||
      !timings
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const infrastructure = await prisma.infrastructure.update({
      where: {
        infrastructure_id: id,
      },
      data: {
        institute_id,
        facility,
        hostel_type,
        hostel_details,
        library_details,
        facility_rating,
        total_reviews,
        timings,
      },
    });

    if (!infrastructure) {
      return NextResponse.json({ error: "Failed updating infrastructure" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: "Infrastructure updated successfully",
        data: infrastructure,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating infrastructure", error);
    return NextResponse.json(
      {
        error: "Failed updating infrastructure",
        success: false,
      },
      { status: 500 }
    );
  }
}
