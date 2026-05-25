import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const savedComparisons = await prisma.savedComparison.findMany({
      where: { userId: session.user.id! },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(savedComparisons);
  } catch (error) {
    console.error('Error fetching saved comparisons:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { collegeIds, name } = body;

    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length === 0) {
      return NextResponse.json({ message: 'Invalid college IDs' }, { status: 400 });
    }

    // Optional: limit to 4
    if (collegeIds.length > 4) {
      return NextResponse.json({ message: 'Cannot compare more than 4 colleges' }, { status: 400 });
    }

    // Check if identical comparison already exists to avoid clutter
    const existing = await prisma.savedComparison.findFirst({
      where: {
        userId: session.user.id!,
        collegeIds: {
          equals: collegeIds
        }
      }
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const comparison = await prisma.savedComparison.create({
      data: {
        user: { connect: { id: session.user.id! } },
        collegeIds,
        name: name || null,
      },
    });

    return NextResponse.json(comparison, { status: 201 });
  } catch (error) {
    console.error('Error saving comparison:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
