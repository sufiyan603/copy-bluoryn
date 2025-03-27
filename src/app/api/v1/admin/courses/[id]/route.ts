// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const data = await req.json();

//     const updatedCourse = await prisma.course.update({
//       where: { course_id: id },
//       data: {
//         institute_id: data.institute_id,
//         name: data.name,
//         description: data.description,
//         duration: data.duration,
//         level: data.level,
//         mode: data.mode,
//         specialization: data.specialization,
//         eligibility: data.eligibility,
//         // Handle related fields if provided
//         Fee: data.Fee ? {
//           upsert: data.Fee.map((fee: any) => ({
//             where: { fee_id: fee.fee_id ?? 0 },
//             update: fee,
//             create: fee,
//           })),
//         } : undefined,
//         AdmissionQuota: data.AdmissionQuota ? {
//           upsert: data.AdmissionQuota.map((quota: any) => ({
//             where: { quota_id: quota.quota_id ?? 0 },
//             update: quota,
//             create: quota,
//           })),
//         } : undefined,
//         Cutoff: data.Cutoff ? {
//           upsert: data.Cutoff.map((cutoff: any) => ({
//             where: { cutoff_id: cutoff.cutoff_id ?? 0 },
//             update: cutoff,
//             create: cutoff,
//           })),
//         } : undefined,
//         Placement: data.Placement ? {
//           upsert: data.Placement.map((placement: any) => ({
//             where: { placement_id: placement.placement_id ?? 0 },
//             update: placement,
//             create: placement,
//           })),
//         } : undefined,
//         Student: data.Student ? {
//           upsert: data.Student.map((student: any) => ({
//             where: { student_id: student.student_id ?? 0 },
//             update: student,
//             create: student,
//           })),
//         } : undefined,
//       },
//     });

//     return NextResponse.json(updatedCourse, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
