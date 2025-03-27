import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch scholarships related to the institute using the `id`
    const scholarships = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .Scholarship(); // Get related scholarships

    if (!scholarships || scholarships.length === 0) {
      return NextResponse.json(
        { error: 'No scholarships found for the given institute' },
        { status: 404 }
      );
    }

    // Return the scholarships data
    return NextResponse.json({
      data: scholarships,
    });
  } catch (error) {
    console.error('Error fetching scholarships for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
