import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: {
          include: {
            _count: { select: { reviews: true } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(savedColleges);
  } catch (error) {
    console.error('Error fetching saved colleges:', error);
    return NextResponse.json({ message: 'Failed to fetch saved colleges' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { collegeId } = await req.json();

    if (!collegeId) {
      return NextResponse.json({ message: 'College ID is required' }, { status: 400 });
    }

    const saved = await prisma.savedCollege.create({
      data: {
        userId: session.user.id,
        collegeId
      }
    });

    return NextResponse.json({ message: 'College saved successfully', saved }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ message: 'College already saved' }, { status: 409 });
    }
    console.error('Error saving college:', error);
    return NextResponse.json({ message: 'Failed to save college' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get('collegeId');

    if (!collegeId) {
      return NextResponse.json({ message: 'College ID is required' }, { status: 400 });
    }

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId: session.user.id,
          collegeId
        }
      }
    });

    return NextResponse.json({ message: 'College removed from saved' }, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Saved college not found' }, { status: 404 });
    }
    console.error('Error unsaving college:', error);
    return NextResponse.json({ message: 'Failed to unsave college' }, { status: 500 });
  }
}
