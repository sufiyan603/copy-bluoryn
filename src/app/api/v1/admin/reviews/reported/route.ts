import { NextResponse } from 'next/server';
import  prisma from '../../../../../../../lib/prisma'; // Assuming Prisma setup

export async function GET_reported(
    req: Request
  ) {
    try {
      const reportedReviews = await prisma.review.findMany({
        where: {
          verified_reviews: 0, // Assuming 0 means reported/unverified
        },
      });
  
      return NextResponse.json(reportedReviews, { status: 200 });
    } catch (error) {
      console.error('Error fetching reported reviews:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }