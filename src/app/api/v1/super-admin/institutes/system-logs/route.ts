
// import { NextResponse } from 'next/server';
// import prisma from '../../../../../../../lib/prisma'  

// // PUT /admin/institutes/system-status
// export async function PUT(request: Request) {
//   try {
//     const data = await request.json(); 
    
//     // Extract parameters from the incoming request
//     const { institute_id, system_status } = data;

//     // Validation
//     if (!institute_id || !system_status) {
//       return NextResponse.json(
//         { message: 'Institute ID and system status are required' },
//         { status: 400 }
//       );
//     }

//     // Check if the institute exists
//     const institute = await prisma.institute.findUnique({
//       where: { institute_id },
//     });

//     if (!institute) {
//       return NextResponse.json(
//         { message: 'Institute not found' },
//         { status: 404 }
//       );
//     }

//     // Update the system status of the institute
//     const updatedInstitute = await prisma.institute.update({
//       where: { institute_id },
//       data: {
//         // system_status, // Update the system status field
//         last_updated_on: new Date(), // Current timestamp
//         last_updated_from: 'Admin', // This can be dynamic based on who is making the request
//       },
//     });

//     // Return success response with the updated institute details
//     return NextResponse.json(
//       { 
//         message: 'Institute system status updated successfully', 
//         data: updatedInstitute 
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating institute system status:', error);
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { message: 'Something went wrong', error: errorMessage },
//       { status: 500 }
//     );
//   }
// }
