// app/admin/institutes/[id]/overview/route.ts
import { NextResponse } from 'next/server';
import prisma  from '../../../../../../../../lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch the institute's overview data by the institute's ID
    const instituteOverview = await prisma.institute.findUnique({
      where: {
        institute_id: id, // Assuming `id` is a string
      },
      select: {
        institute_name: true,
        about: true,
        city: true,
        state: true,
        pincode: true,
        contact_email: true,
        contact_phone: true,
        website: true,
        // Add more fields as necessary for the "overview"
      },
    });

    // If the institute is not found, return a 404 response
    if (!instituteOverview) {
      return NextResponse.json({ message: 'Institute not found' }, { status: 404 });
    }

    // Return the institute's overview data as JSON
    return NextResponse.json(instituteOverview);
  } catch (error) {
    console.error('Error fetching institute overview:', error);

    // Return a 500 error in case of unexpected issues
    return NextResponse.error();
  }
}
