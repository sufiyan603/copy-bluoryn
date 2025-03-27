import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Institute } from '@prisma/client';

const prisma = new PrismaClient();

// Define a type for the incoming request body
type InstituteInput = {
  institute_name: string;
  about?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  establishment_year?: number;
  institute_type?: string;
  campus_size?: string;
  student_intake?: number;
  affiliation?: string;
  contact_email?: string;
  contact_phone?: string;
  website?: string;
  accreditation?: string;
  institution_type?: string;
  url?: string;
};

type BulkUploadResult = {
  success: Institute[];
  failed: { index: number; reason: string }[];
};

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = (await request.json()) as InstituteInput[];

    // Validate the body is an array
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Request body must be an array of institutes' },
        { status: 400 }
      );
    }

    const results: BulkUploadResult = {
      success: [],
      failed: [],
    };

    // Iterate through the list of institutes
    for (let i = 0; i < body.length; i++) {
      const institute = body[i];

      const {
        institute_name,
        about,
        address,
        city,
        state,
        pincode,
        latitude,
        longitude,
        establishment_year,
        institute_type,
        campus_size,
        student_intake,
        affiliation,
        contact_email,
        contact_phone,
        website,
        accreditation,
        institution_type,
        url,
      } = institute;

      // Validate required fields
      if (!institute_name) {
        results.failed.push({ index: i, reason: 'Institute name is required' });
        continue;
      }

      try {
        // Insert into the database
        const newInstitute = await prisma.institute.create({
          data: {
            institute_name,
            about,
            address,
            city,
            state,
            pincode,
            latitude,
            longitude,
            establishment_year,
            institute_type,
            campus_size,
            student_intake,
            affiliation,
            contact_email,
            contact_phone,
            website,
            accreditation,
            institution_type,
            url,
            last_updated_on: new Date(),
            last_updated_from: 'Bulk Upload API',
          },
        });

        // Add to success results
        results.success.push(newInstitute);
      } catch (error) {
        console.error(`Error adding institute at index ${i}:`, error);
        results.failed.push({ index: i, reason: 'Database error' });
      }
    }

    // Return the results
    return NextResponse.json({ results }, { status: 201 });
  } catch (error) {
    console.error('Error in bulk upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
