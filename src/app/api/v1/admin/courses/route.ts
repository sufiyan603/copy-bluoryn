// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     // Basic validation for required fields
//     if (!data.institute_id || !data.name || !data.description || !data.level || !data.mode) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Create the course with the associated data
//     const newCourse = await prisma.course.create({
//       data: {
//         institute_id: data.institute_id,
//         program_id: data.program_id,
//         name: data.name,
//         description: data.description,
//         duration: data.duration,
//         level: data.level,
//         mode: data.mode,
//         specialization: data.specialization,
//         eligibility: data.eligibility,
        
//         // Optionally create related entities if provided
//         Fee: data.Fee ? {
//           create: data.Fee.map((fee: any) => ({
//             min_fee: fee.min_fee,
//             max_fee: fee.max_fee,
//             fee_year: fee.fee_year,
//             component: fee.component,
//             amount: fee.amount,
//             currency: fee.currency,
//           })),
//         } : undefined,
        
//         AdmissionQuota: data.AdmissionQuota ? {
//           create: data.AdmissionQuota,
//         } : undefined,

//         Cutoff: data.Cutoff ? {
//           create: data.Cutoff.map((cutoff: any) => ({
//             exam_name: cutoff.exam_name,
//             category: cutoff.category,
//             opening_rank: cutoff.opening_rank,
//             closing_rank: cutoff.closing_rank,
//             exam_year: cutoff.exam_year,
//           })),
//         } : undefined,

//         Placement: data.Placement ? {
//           create: data.Placement.map((placement: any) => ({
//             company_id: placement.company_id,
//             top_recruiters: placement.top_recruiters,
//             year: placement.year,
//             placement_rate: placement.placement_rate,
//             offer_status: placement.offer_status,
//           })),
//         } : undefined,

//         Student: data.Student ? {
//           create: data.Student.map((student: any) => ({
//             user_id: student.user_id,
//             institute_id: student.institute_id,
//             enrollment_year: student.enrollment_year,
//             graduation_year: student.graduation_year,
//           })),
//         } : undefined,
//       },
//     });

//     // Return the created course with a 201 status code
//     return NextResponse.json(newCourse, { status: 201 });
//   } catch (error) {
//     console.error('Error creating course:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
