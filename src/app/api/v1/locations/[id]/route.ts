import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const locations = await prisma.location.findMany({
      where: { institute_id: id },
    });

    if (!locations) {
      return NextResponse.json(
        { message: "Location not found" },
        { status: 404 }
      );
    }
    // console.log(locations);
    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Error fetching location" },
      { status: 500 }
    );
  }
}
