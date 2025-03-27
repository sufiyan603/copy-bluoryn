import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Log the id for debugging
  console.log('Fetching approval bodies for institute with id:', id);

  try {
    // Fetch the institute along with its related approval bodies
    const instituteWithApprovalBodies = await prisma.institute.findUnique({
      where: { institute_id: id },
      include: {
        ApprovalBody: true, // Include related approval bodies
      },
    });

    // If no institute is found, return a 404 error
    if (!instituteWithApprovalBodies) {
      console.error('Institute not found for id:', id);
      return NextResponse.json(
        { error: 'Institute not found' },
        { status: 404 }
      );
    }

    // Return the institute data along with its approval bodies
    return NextResponse.json({
      data: instituteWithApprovalBodies,
    });
  } catch (error) {
    console.error('Error fetching institute with approval bodies:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}