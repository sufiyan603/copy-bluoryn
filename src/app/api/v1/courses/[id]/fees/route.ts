import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

//get courses fees with id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const fees = await prisma.fee.findMany({
      where: { course_id: id },
    });

    if (!fees || fees.length === 0) {
      return NextResponse.json({ error: 'Fees not found for the course' }, { status: 404 });
    }

    return NextResponse.json(fees, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
