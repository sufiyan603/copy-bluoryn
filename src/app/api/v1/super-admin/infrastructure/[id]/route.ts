import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const infrastructure = await prisma.infrastructure.delete({
      where: {
        infrastructure_id: id,
      },
    });

    if (!infrastructure) {
      return NextResponse.json({ 
        error: "Infrastructure not found",
        success: false 
      }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Infrastructure deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in deleting infrastructure", error);
    return NextResponse.json(
      { error: "Error in deleting infrastructure", success: false },
      { status: 500 }
    );
  }
}
