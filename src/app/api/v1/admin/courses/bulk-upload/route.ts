// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     if (!Array.isArray(data)) {
//       return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
//     }

//     const newCourses = await prisma.course.createMany({
//       data: data.map((course: any) => ({
//         institute_id: course.institute_id,
//         name: course.name,
//         description: course.description,
//         duration: course.duration,
//         level: course.level,
//         mode: course.mode,
//         specialization: course.specialization,
//         eligibility: course.eligibility,
//       })),
//       skipDuplicates: true,
//     });

//     return NextResponse.json(newCourses, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
