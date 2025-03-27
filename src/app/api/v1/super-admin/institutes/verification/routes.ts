// import { NextRequest, NextResponse } from 'next/server';
// import  prisma  from '../../../../../../../lib/prisma'  // Import your Prisma client

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { institute_id, verification_status, verified_by } = body;

//     // Validation
//     if (!institute_id || !verification_status) {
//       return NextResponse.json(
//         { error: 'Institute ID and verification status are required.' },
//         { status: 400 }
//       );
//     }

//     // Update the institute record
//     const updatedInstitute = await prisma.institute.update({
//       where: { institute_id },
//       data: {
//         verification_status,
//         verified_by,
//         verified_on: verification_status === 'approved' ? new Date() : null,
//         last_updated_on: new Date(),
//         last_updated_from: 'API', // Optional: Track source of update
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedInstitute });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: 'An error occurred while verifying the institute.' },
//       { status: 500 }
//     );
//   }
// }
