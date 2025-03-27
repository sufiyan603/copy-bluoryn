import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../../../lib/prisma"; // Ensure your Prisma client is set up

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const facultyId = params.id;

    // Fetch publications for the given faculty_id
    const publications = await prisma.facultyPublication.findMany({
      where: { faculty_id: facultyId },
      select: {
        publication_id: true,
        title: true,
        journal: true,
        year: true,
        doi: true,
      },
    });

    if (!publications.length) {
      return NextResponse.json({ message: "No publications found" }, { status: 404 });
    }

    return NextResponse.json(publications, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty publications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
