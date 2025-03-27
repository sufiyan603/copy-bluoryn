import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //check if the request is coming from an admin
  try {
    const { id } = params;
    const { name, head } = await req.json();

    if(!id) {
      return NextResponse.json(
        { error: "Department ID is required" },
        { status: 400 }
      );
    }

    if (!name || !head) {
      return NextResponse.json(
        { error: "Name and head are required fields" },
        { status: 400 }
      );
    }

    const updatedDepartment = await prisma.department.update({
      where: { department_id: id },
      data: { name, head },
    });

    if (!updatedDepartment) {
      return NextResponse.json(
        { error: "Error updating department" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Department updated successfully",
        department: updatedDepartment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Error updating department",
      },
      { status: 500 }
    );
  }
}
