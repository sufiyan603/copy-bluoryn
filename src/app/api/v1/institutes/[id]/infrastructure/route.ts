import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch faculty related to the institute using the `id`
    const faculty = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .Infrastructure(); // Get related infrastrucutre members

    if (!faculty || faculty.length === 0) {
      return NextResponse.json(
        { error: 'No Infrastrucre Info found for the given institute' },
        { status: 404 }
      );
    }

    // Return the faculty data
    return NextResponse.json({
      data: faculty,
    });
  } catch (error) {
    console.error('Error fetching faculty for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
