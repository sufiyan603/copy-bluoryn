import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {

    const { institute_id, name, contact_email, contact_phone } =
      await req.json();


    if(!institute_id || !name || !contact_email || !contact_phone) {
        return NextResponse.json(
            {
            error: "All fields are required",
            success: false,
            },
            { status: 400 }
        );
    }

    // Create a new approval body
    const approvalBody = await prisma.approvalBody.create({
      data: {
        institute_id,
        name,
        contact_email,
        contact_phone,
      },
    });

    if (!approvalBody) {
      return NextResponse.json(
        {
          error: "Approval body could not be created",
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Approval body created successfully",
        success: true,
        data: approvalBody,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error creating approval body",
        success: false,
      },
      { status: 500 }
    );
  }
}
