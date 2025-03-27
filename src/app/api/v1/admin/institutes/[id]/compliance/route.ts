import { NextResponse } from 'next/server';
import prisma from '../../../../../../../../lib/prisma';

// Fetching compliance data for a specific institute
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Validate the `id` parameter (ensure it's a non-empty string)
    if (!id || typeof id !== 'string') {
      return NextResponse.json({ message: 'Invalid institute ID' }, { status: 400 });
    }

    // Fetch compliance data for the specified institute
    const instituteCompliance = await prisma.institute.findUnique({
      where: {
        institute_id: id, // Use the UUID string directly
      },
      select: {
        institute_name: true,
        accreditation: true,
        institution_type: true,
        ApprovalBody: {
          select: {
            name: true,
            contact_email: true,
            contact_phone: true,
          },
        },
      },
    });

    // If the institute is not found, return a 404 response
    if (!instituteCompliance) {
      return NextResponse.json({ message: 'Institute not found' }, { status: 404 });
    }

    // Format the compliance data
    const complianceData = {
      institute_name: instituteCompliance.institute_name,
      accreditation: instituteCompliance.accreditation,
      institution_type: instituteCompliance.institution_type,
      approval_bodies: instituteCompliance.ApprovalBody.map((body) => ({
        name: body.name,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone,
      })),
    };

    // Return the compliance data as JSON
    return NextResponse.json(complianceData);
  } catch (error) {
    console.error('Error fetching institute compliance:', error);

    // Return a 500 error in case of unexpected issues
    return NextResponse.json(
      { message: 'An error occurred while fetching compliance data' },
      { status: 500 }
    );
  }
}
