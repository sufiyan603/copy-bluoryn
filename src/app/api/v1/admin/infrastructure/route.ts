import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
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

    const infrastructure = await prisma.infrastructure.create({
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
      return NextResponse.json(
        {
          error: "Error creating infrastructure",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Infrastructure created successfully",
        data: infrastructure,
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating infrastructure", error);
    return NextResponse.json(
      {
        error: "Failed creating infrastructure",
        success: false,
      },
      { status: 500 }
    );
  }
}
