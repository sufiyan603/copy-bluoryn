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
          error: "Approval body ID is required",
        },
        { status: 400 }
      );
    }

    const deletedApprovalBody = await prisma.approvalBody.delete({
      where: {
        approval_body_id: id,
      },
    });

    if (!deletedApprovalBody) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to delete the approval body",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        error: "Approval body deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error deleting approval body",
      },
      { status: 500 }
    );
  }
}
