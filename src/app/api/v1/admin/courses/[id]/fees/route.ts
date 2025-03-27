// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// const prisma = new PrismaClient();

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const data = await req.json();

//     const updatedFees = await prisma.fee.updateMany({
//       where: { course_id: id },
//       data: data.map((fee: any) => ({
//         fee_id: fee.fee_id,
//         min_fee: fee.min_fee,
//         max_fee: fee.max_fee,
//         fee_year: fee.fee_year,
//         component: fee.component,
//         amount: fee.amount,
//         currency: fee.currency,
//       })),
//     });

//     return NextResponse.json(updatedFees, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
