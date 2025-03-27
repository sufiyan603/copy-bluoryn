import prisma from "../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { institute_id, name, head } = await req.json();

    if (!institute_id || !name || !head) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const department = await prisma.department.create({
      data: {
        institute_id,
        name,
        head,
      },
    });

    if (!department) {
      return NextResponse.json(
        { error: "Error creating department" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "department created successfully",
        department,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error creating department",
      },
      { status: 500 }
    );
  }
}
