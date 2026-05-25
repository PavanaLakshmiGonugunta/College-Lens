import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;

    await prisma.college.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting college:', error);
    return NextResponse.json(
      { message: 'Failed to delete college' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const data = await req.json();

    const college = await prisma.college.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        location: data.location,
        city: data.city,
        state: data.state,
        type: data.type,
        establishedYear: parseInt(data.establishedYear),
        rating: parseFloat(data.rating) || 4.0,
        ranking: data.ranking ? parseInt(data.ranking) : null,
        feesMin: parseInt(data.feesMin),
        feesMax: parseInt(data.feesMax),
        description: data.description,
        image: data.image || undefined,
        logo: data.logo || undefined,
        website: data.website || null,
        accreditation: data.accreditation || null,
      },
    });

    return NextResponse.json(college);
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json(
      { message: 'Failed to update college' },
      { status: 500 }
    );
  }
}
