import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    // Create the college and nested records
    const college = await prisma.college.create({
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
        image: data.image || '',
        logo: data.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&size=100&background=random`,
        website: data.website || null,
        accreditation: data.accreditation || null,
      },
    });

    return NextResponse.json(college, { status: 201 });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json(
      { message: 'Failed to create college' },
      { status: 500 }
    );
  }
}
