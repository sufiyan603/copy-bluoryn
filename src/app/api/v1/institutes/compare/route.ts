import { NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prisma';

function isValidUUID(id: string): boolean {
  // Regular expression to check if the ID is a valid UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');

    // Parse the ids query parameter into an array of UUIDs
    if (!idsParam) {
      return NextResponse.json(
        { error: 'Missing "ids" query parameter' },
        { status: 400 }
      );
    }

    const ids = idsParam.split(',').map((id) => id.trim());

    // Validate if all IDs are valid UUIDs
    if (ids.some((id) => !isValidUUID(id))) {
      return NextResponse.json(
        { error: 'All IDs must be valid UUIDs' },
        { status: 400 }
      );
    }

    // Fetch institutes with the given ids from the database
    const institutes = await prisma.institute.findMany({
      where: {
        institute_id: { in: ids },
      },
    });

    if (institutes.length !== ids.length) {
      return NextResponse.json(
        { error: 'Some institutes not found' },
        { status: 404 }
      );
    }

    // Process the data and return the comparison (you can add more fields for comparison if needed)
    const instituteComparison = institutes.map((institute) => ({
      institute_id: institute.institute_id,
      institute_name: institute.institute_name,
      state: institute.state,
      city: institute.city,
      institute_type: institute.institute_type,
      accreditation: institute.accreditation,
      establishment_year: institute.establishment_year,
    }));

    return NextResponse.json({
      data: instituteComparison,
    });
  } catch (error) {
    console.error('Error comparing institutes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
