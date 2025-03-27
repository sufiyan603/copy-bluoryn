import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

//get cousres with id 
const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const course = await prisma.course.findUnique({
      where: { course_id: id },
      include: {
        institute: true,
        Fee: true,
        AdmissionQuota: true,
        Cutoff: true,
        Placement: true,
        Student: true,
      },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
