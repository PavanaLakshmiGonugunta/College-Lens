import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const comparison = await prisma.savedComparison.findUnique({
      where: { id },
    });

    if (!comparison) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    if (comparison.userId !== session.user.id) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await prisma.savedComparison.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting comparison:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
