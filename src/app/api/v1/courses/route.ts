
import { NextResponse } from 'next/server';
import prisma from "../../../../../lib/prisma"

//get courses of an institute
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const instituteId = searchParams.get('instituteId');
  const level = searchParams.get('level');
  const duration = searchParams.get('duration');
  const mode = searchParams.get('mode');
  const specialization = searchParams.get('specialization');

  // Construct filtering object for Prisma
  const filters: any = {};
  if (instituteId) filters.institute_id = parseInt(instituteId, 10);
  if (level) filters.level = level;
  if (duration) filters.duration = duration;
  if (mode) filters.mode = mode;
  if (specialization) filters.specialization = specialization;

  try {
    // Query database with filters
    const courses = await prisma.course.findMany({
      where: filters,
      include: {
        institute: true, // Include related institute data
        Fee: true,       // Include fee data
        AdmissionQuota: true,
        Cutoff: true,
        Placement: true,
      },
    });

    return NextResponse.json({
      data: courses,
      message: 'Courses fetched successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching courses' },
      { status: 500 }
    );
  }
}
