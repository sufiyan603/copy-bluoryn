import { NextResponse } from 'next/server';
import  prisma  from '../../../../../../lib/prisma'; // Assuming you have Prisma setup

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const instituteId = searchParams.get('instituteId');
    const rating = searchParams.get('rating');
    const verified = searchParams.get('verified');

    const whereClause: any = {};
    if (instituteId) whereClause.institute_id = instituteId;
    if (rating) whereClause.value_for_money_rating = parseFloat(rating);
    if (verified !== null) whereClause.verified_reviews = parseInt(verified);

    const reviews = await prisma.review.findMany({
      where: whereClause,
      orderBy: { review_date: 'desc' },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newReview = await prisma.review.create({
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
        review_date: new Date(),
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
