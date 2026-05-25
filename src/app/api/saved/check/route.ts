import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json({ message: 'College IDs are required' }, { status: 400 });
    }

    const ids = idsParam.split(',').filter(Boolean);

    const savedColleges = await prisma.savedCollege.findMany({
      where: {
        userId: session.user.id!,
        collegeId: { in: ids }
      },
      select: { collegeId: true }
    });

    const savedIds = savedColleges.map(sc => sc.collegeId);
    
    // Return a map of id -> boolean
    const result = ids.reduce((acc, id) => {
      acc[id] = savedIds.includes(id);
      return acc;
    }, {} as Record<string, boolean>);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error checking saved colleges:', error);
    return NextResponse.json({ message: 'Failed to check saved colleges' }, { status: 500 });
  }
}
