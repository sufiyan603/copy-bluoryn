import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Approval body id is required",
        },
        { status: 400 }
      );
    }

    const approvalBody = await prisma.approvalBody.findUnique({
      where: {
        approval_body_id: id,
      },
    });

    if (!approvalBody) {
      return NextResponse.json(
        {
          success: false,
          error: "Approval bodies not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Approval body fetched successfully",
        data: approvalBody,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error fetching approval body",
      },
      { status: 500 }
    );
  }
}
