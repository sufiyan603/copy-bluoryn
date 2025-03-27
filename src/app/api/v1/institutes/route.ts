import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { Prisma } from '@prisma/client';

// Fetching list of institutes with pagination and filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || undefined;
    const state = searchParams.get('state') || undefined;
    const city = searchParams.get('city') || undefined;
    const type = searchParams.get('type') || undefined;
    const accreditation = searchParams.get('accreditation') || undefined;
    const establishmentYear = searchParams.get('establishmentYear')
      ? parseInt(searchParams.get('establishmentYear')!, 10)
      : undefined;
    const sort = searchParams.get('sort') || 'institute_name';
    const affiliation = searchParams.get('affiliation') || undefined;
    const approvalBody = searchParams.get('approval_body') || undefined;
    const verificationStatus = searchParams.get('verification_status') || undefined;
    const systemStatus = searchParams.get('system_status') || undefined;

    // Validate `page` and `limit`
    const offset = (page - 1) * limit;

    // Build `where` filter for Prisma
    const where: Prisma.InstituteWhereInput = {
      AND: [
        search
          ? { institute_name: { contains: search, mode: Prisma.QueryMode.insensitive } }
          : {},
        state
          ? { state: { equals: state, mode: Prisma.QueryMode.insensitive } }
          : {},
        city
          ? { city: { equals: city, mode: Prisma.QueryMode.insensitive } }
          : {},
        type
          ? { institute_type: { equals: type, mode: Prisma.QueryMode.insensitive } }
          : {},
        accreditation
          ? { accreditation: { equals: accreditation, mode: Prisma.QueryMode.insensitive } }
          : {},
        establishmentYear
          ? { establishment_year: { equals: establishmentYear } }
          : {},
        affiliation
          ? { affiliation: { equals: affiliation, mode: Prisma.QueryMode.insensitive } }
          : {},
        approvalBody
          ? {
              ApprovalBody: {
                some: { name: { equals: approvalBody, mode: Prisma.QueryMode.insensitive } },
              },
            }
          : {},
        verificationStatus
          ? { verification_status: { equals: verificationStatus, mode: Prisma.QueryMode.insensitive } }
          : {},
        systemStatus
          ? { system_status: { equals: systemStatus, mode: Prisma.QueryMode.insensitive } }
          : {},
      ].filter((filter) => Object.keys(filter).length > 0), // Only include non-empty filters
    };

    // Determine the sort field and direction
    const validSortFields: Array<keyof Prisma.InstituteOrderByWithRelationInput> = [
      'institute_name',
      'establishment_year',
      'city',
      'state',
      'accreditation',
      'verification_status',
      'system_status',
    ];
    const sortField = validSortFields.includes(sort as keyof Prisma.InstituteOrderByWithRelationInput)
      ? (sort as keyof Prisma.InstituteOrderByWithRelationInput)
      : 'institute_name';

    // Fetch data with Prisma
    const institutes = await prisma.institute.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { [sortField]: 'asc' },
      include: {
        ApprovalBody: true, // Include related ApprovalBody data
        Ranking: true,      // Include related Ranking data
        Location: true,     // Include related Location data
      },
    });

    // Fetch total count for pagination
    const total = await prisma.institute.count({ where });

    // Response
    return NextResponse.json({
      data: institutes,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching institutes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}