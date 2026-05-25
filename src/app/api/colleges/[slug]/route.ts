import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const college = await prisma.college.findUnique({
      where: { slug },
      include: {
        courses: true,
        placements: {
          orderBy: { year: 'desc' },
        },
        reviews: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!college) {
      return NextResponse.json(
        { message: 'College not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error('Error fetching college details:', error);
    return NextResponse.json(
      { message: 'Failed to fetch college details' },
      { status: 500 }
    );
  }
}
