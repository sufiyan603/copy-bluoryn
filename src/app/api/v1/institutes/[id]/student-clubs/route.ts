import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

//fetch student clubs related to the institute
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch student clubs related to the institute using the `id`
    const studentClubs = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .StudentClub(); // Get related student clubs

    if (!studentClubs || studentClubs.length === 0) {
      return NextResponse.json(
        { error: 'No student clubs found for the given institute' },
        { status: 404 }
      );
    }

    // Return the student clubs data
    return NextResponse.json({
      data: studentClubs,
    });
  } catch (error) {
    console.error('Error fetching student clubs for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
