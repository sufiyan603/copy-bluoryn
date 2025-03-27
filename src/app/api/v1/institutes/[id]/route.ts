import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prisma';

//fetch isntitute details by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch detailed institute information by ID
    const institute = await prisma.institute.findUnique({
      where: { institute_id: id },
      include: {
        Course: true, // Include related courses
        Placement: true, // Include related placements
        Faculty: true, // Include related faculty
        Ranking: true, // Include related rankings
        Infrastructure: true, // Include related infrastructure
        Scholarship: true, // Include related scholarships
        Department: true, // Include related departments
        ApprovalBody: true, // Include related approval bodies
        Location: true, // Include related locations
        StudentClub: true, // Include related student clubs
      },
    });

    if (!institute) {
      return NextResponse.json(
        { error: 'Institute not found' },
        { status: 404 }
      );
    }

    // Return the institute data with related information
    return NextResponse.json({
      data: institute,
    });
  } catch (error) {
    console.error('Error fetching institute details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
