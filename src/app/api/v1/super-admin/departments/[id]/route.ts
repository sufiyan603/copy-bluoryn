import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Department ID is required",
        },
        { status: 400 }
      );
    }
    const deletedDepartment = await prisma.department.delete({
      where: {
        department_id: id,
      },
    });

    if (!deletedDepartment) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete the department",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Department deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error deleting department",
      },
      { status: 500 }
    );
  }
}
