// app/admin/institutes/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../../../../../lib/prisma'; // Assuming Prisma setup

// API for deleting an institute with id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const institute_id = params.id;

    // Validation: Check if the institute_id is provided and is a valid string
    if (!institute_id || typeof institute_id !== 'string') {
      return NextResponse.json(
        { message: 'Invalid institute ID' },
        { status: 400 }
      );
    }

    // Fetch the institute to ensure it exists
    const institute = await prisma.institute.findUnique({
      where: { institute_id }, // Ensure this matches the type in the schema (string)
    });

    if (!institute) {
      return NextResponse.json(
        { message: 'Institute not found' },
        { status: 404 }
      );
    }

    // Delete the institute
    await prisma.institute.delete({
      where: { institute_id },
    });

    return NextResponse.json(
      { message: 'Institute deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting institute:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Something went wrong', error: errorMessage },
      { status: 500 }
    );
  }
}
