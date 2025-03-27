import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch reviews related to the institute using the `id`
    const reviews = await prisma.institute
      .findUnique({
        where: { institute_id: id },
      })
      .Review();

    if (!reviews || reviews.length === 0) {
      return NextResponse.json(
        { error: 'No reviews found for the given institute' },
        { status: 404 }
      );
    }

    // Return the reviews data
    return NextResponse.json({
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews for institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
