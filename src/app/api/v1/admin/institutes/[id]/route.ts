
import { NextResponse } from 'next/server';
import prisma  from '../../../../../../../lib/prisma';

//put method to update the institute with id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    // Parse the incoming request data
    const data = await req.json();

    // Manually validate the data
    if (!data.institute_name || typeof data.institute_name !== 'string' || data.institute_name.trim().length === 0) {
      return NextResponse.json({ message: 'Invalid institute name provided.' }, { status: 400 });
    }
    
    // You can add additional validation checks here for other fields if necessary
    if (data.about && typeof data.about !== 'string') {
      return NextResponse.json({ message: 'Invalid about description provided.' }, { status: 400 });
    }

    // Proceed to update the institute
    const updatedInstitute = await prisma.institute.update({
      where: { institute_id: id }, // Use `institute_id` as the unique identifier
      data: {
        institute_name: data.institute_name, // Map to `institute_name` in your schema
        about: data.about || undefined, // Optional field, handle null or undefined values
        // Add other fields as necessary
      },
    });

    // Return the updated institute in the response
    return NextResponse.json(updatedInstitute);
  } catch (error) {
    console.error('Error updating institute:', error);

    // Handle unexpected errors
    return NextResponse.error();
  }
}
