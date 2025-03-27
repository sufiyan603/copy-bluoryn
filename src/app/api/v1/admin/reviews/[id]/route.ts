import { NextResponse } from 'next/server';
import  prisma  from '../../../../../../../lib/prisma'; // Assuming Prisma setup

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await prisma.review.delete({
        where: { review_id: params.id },
      });
  
      return NextResponse.json(
        { message: 'Review deleted successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting review:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }