import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Log the id for debugging
  console.log('Fetching courses for institute with id:', id);

  try {
    // Fetch the institute along with its related courses
    const instituteWithCourses = await prisma.institute.findUnique({
      where: { institute_id: id },
      include: {
        Course: true, // Include related courses
      },
    });

    // If no institute is found, return a 404 error
    if (!instituteWithCourses) {
      console.error('Institute not found for id:', id);
      return NextResponse.json(
        { error: 'Institute not found' },
        { status: 404 }
      );
    }

    // Return the institute data along with its courses
    return NextResponse.json({
      data: instituteWithCourses,
    });
  } catch (error) {
    console.error('Error fetching institute with courses:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}