import prisma from "../../../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET({
  params,
}: {
  params: { id: string };
}): Promise<NextResponse> {
  try {
    const studentClubMembers = await prisma.studentClub.findMany({
      where: {
        club_id: params.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        error: "Student club members fetched successfully",
        data: studentClubMembers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error fetching student club members",
        success: false,
      },
      { status: 500 }
    );
  }
}
