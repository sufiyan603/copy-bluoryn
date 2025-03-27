import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//admin post request to create a new institute
export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    // Destructure and validate the required fields
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
    } = body;

    if (!institute_name) {
      return NextResponse.json(
        { error: 'Institute name is required' },
        { status: 400 }
      );
    }

    // Create a new institute in the database
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
        last_updated_from: 'API', // Example value, update as needed
      },
    });

    // Respond with the newly created institute
    return NextResponse.json({ data: newInstitute }, { status: 201 });
  } catch (error) {
    console.error('Error creating institute:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
