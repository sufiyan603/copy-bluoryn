import { NextResponse } from 'next/server';
import  prisma  from '../../../../../lib/prisma';

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
