import { NextResponse } from 'next/server';
import  prisma  from '../../../../../../../lib/prisma'; // Assuming Prisma setup

export async function PUT_moderation_status(
    req: Request
  ) {
    try {
      const body = await req.json();
      const updatedReview = await prisma.review.update({
        where: { review_id: body.review_id },
        data: {
          verified_reviews: body.moderation_status, 
        },
      });
  
      return NextResponse.json(updatedReview, { status: 200 });
    } catch (error) {
      console.error('Error updating moderation status:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }