import { NextResponse } from 'next/server';
import  prisma from '../../../../../../../../lib/prisma'; // Assuming Prisma setup

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updatedReview = await prisma.review.update({
      where: { review_id: params.id },
      data: {
        institute_id: body.institute_id,
        verified_reviews: body.verified_reviews,
        placements_rating: body.placements_rating,
        infrastructure_rating: body.infrastructure_rating,
        faculty_rating: body.faculty_rating,
        course_curriculum_rating: body.course_curriculum_rating,
        campus_life_rating: body.campus_life_rating,
        value_for_money_rating: body.value_for_money_rating,
        review_text: body.review_text,
        reviewer_name: body.reviewer_name,
        reviewer_email: body.reviewer_email,
        review_date: body.review_date ? new Date(body.review_date) : undefined,
      },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}