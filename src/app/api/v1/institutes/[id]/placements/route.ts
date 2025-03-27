import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

//fetching placements for the institute
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch placements related to the institute using the `id`
    const placements = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .Placement(); // Get related placements

    if (!placements || placements.length === 0) {
      return NextResponse.json(
        { error: 'No placements found for the given institute' },
        { status: 404 }
      );
    }

    // Return the placements data
    return NextResponse.json({
      data: placements,
    });
  } catch (error) {
    console.error('Error fetching placements for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
