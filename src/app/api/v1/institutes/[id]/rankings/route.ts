import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch rankings related to the institute using the `id`
    const rankings = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .Ranking(); // Get related rankings

    if (!rankings || rankings.length === 0) {
      return NextResponse.json(
        { error: 'No rankings found for the given institute' },
        { status: 404 }
      );
    }

    // Return the rankings data
    return NextResponse.json({
      data: rankings,
    });
  } catch (error) {
    console.error('Error fetching rankings for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
