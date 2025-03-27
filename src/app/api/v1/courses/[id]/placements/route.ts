import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const placements = await prisma.placement.findMany({
      where: { course_id:id },
    });

    if (!placements || placements.length === 0) {
      return NextResponse.json({ error: 'Placements not found for the course' }, { status: 404 });
    }

    return NextResponse.json(placements, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
