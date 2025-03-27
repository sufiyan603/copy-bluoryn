import { NextResponse } from 'next/server';
import prisma from '../../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid institute ID' }, { status: 400 });
    }

    const institute = await prisma.institute.findUnique({
      where: { institute_id: id },
    });

    if (!institute) {
      return NextResponse.json({ message: 'Institute not found' }, { status: 404 });
    }

    // Fetch metrics
    const [courseCount, facultyCount, studentCount, reviewCount, reviewMetrics] = await Promise.all([
      prisma.course.count({ where: { institute_id: id } }),
      prisma.facultyUser.count({ where: { institute_id: id } }),
      prisma.student.count({ where: { institute_id: id } }),
      prisma.review.count({ where: { institute_id: id } }),
      prisma.review.aggregate({
        where: { institute_id: id },
        _avg: {
          placements_rating: true,
          infrastructure_rating: true,
          faculty_rating: true,
          course_curriculum_rating: true,
          campus_life_rating: true,
          value_for_money_rating: true,
        },
        _count: {
          _all: true,
        },
      }),
    ]);

    // Calculate overall rating dynamically
    const ratings = [
      reviewMetrics._avg?.placements_rating,
      reviewMetrics._avg?.infrastructure_rating,
      reviewMetrics._avg?.faculty_rating,
      reviewMetrics._avg?.course_curriculum_rating,
      reviewMetrics._avg?.campus_life_rating,
      reviewMetrics._avg?.value_for_money_rating,
    ];

    const overallRating =
      ratings.filter((rating) => rating !== null).reduce((acc, curr) => acc + (curr || 0), 0) /
      ratings.filter((rating) => rating !== null).length;

    const metricsData = {
      institute_name: institute.institute_name,
      total_courses: courseCount,
      total_faculty: facultyCount,
      total_students: studentCount,
      total_reviews: reviewCount,
      total_verified_reviews: reviewMetrics._count?._all || 0,
      average_ratings: {
        overall: isNaN(overallRating) ? null : overallRating,
        placements: reviewMetrics._avg?.placements_rating || null,
        infrastructure: reviewMetrics._avg?.infrastructure_rating || null,
        faculty: reviewMetrics._avg?.faculty_rating || null,
        course_curriculum: reviewMetrics._avg?.course_curriculum_rating || null,
        campus_life: reviewMetrics._avg?.campus_life_rating || null,
        value_for_money: reviewMetrics._avg?.value_for_money_rating || null,
      },
    };

    return NextResponse.json(metricsData);
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching metrics' },
      { status: 500 }
    );
  }
}
