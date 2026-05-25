import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idsParam = searchParams.get('ids');

    if (!idsParam) {
      return NextResponse.json(
        { message: 'No college IDs provided' },
        { status: 400 }
      );
    }

    const ids = idsParam.split(',').filter(Boolean);

    if (ids.length === 0) {
      return NextResponse.json(
        { message: 'Invalid college IDs provided' },
        { status: 400 }
      );
    }

    if (ids.length > 4) {
      return NextResponse.json(
        { message: 'Cannot compare more than 4 colleges at once' },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        courses: true,
        placements: {
          orderBy: { year: 'desc' },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    // Sort to match the order of IDs provided
    const sortedColleges = ids
      .map(id => colleges.find(c => c.id === id))
      .filter(Boolean);

    return NextResponse.json(sortedColleges);
  } catch (error) {
    console.error('Error fetching colleges for comparison:', error);
    return NextResponse.json(
      { message: 'Failed to fetch comparison data' },
      { status: 500 }
    );
  }
}
