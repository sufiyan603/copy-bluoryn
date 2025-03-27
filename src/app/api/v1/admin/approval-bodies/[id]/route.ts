import prisma from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const { name, contact_email, contact_phone } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Approval body ID is required",
        },
        { status: 400 }
      );
    }

    if(!name || !contact_email || !contact_phone) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Update the approval body with the given id
    const updatedApprovalBody = await prisma.approvalBody.update({
      where: { approval_body_id: id },
      data: {
        name,
        contact_email,
        contact_phone,
      },
    });

    if (!updatedApprovalBody) {
      return NextResponse.json(
        {
          error: "Approval body not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Approval body updated successfully",
        success: true,
        data: updatedApprovalBody,
      },
      { status: 200 }
    );
   
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error updating approval body",
        success: false,
      },
      { status: 500 }
    );
  }
}
