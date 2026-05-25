import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const state = searchParams.get('state');
    const type = searchParams.get('type');
    const stream = searchParams.get('stream');
    const minFees = searchParams.get('minFees');
    const maxFees = searchParams.get('maxFees');
    const minRating = searchParams.get('minRating');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const minAvgPackage = searchParams.get('minAvgPackage');
    const minHighestPackage = searchParams.get('minHighestPackage');
    const recruiter = searchParams.get('recruiter');

    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { courses: { some: { degree: { contains: search, mode: 'insensitive' } } } },
        { courses: { some: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    if (state) where.state = { in: state.split(',') };
    if (type) where.type = { in: type.split(',') };
    if (minFees) where.feesMin = { gte: parseInt(minFees) };
    if (maxFees) where.feesMax = { lte: parseInt(maxFees) };
    if (minRating) where.rating = { gte: parseFloat(minRating) };

    if (stream) {
      const streams = stream.split(',');
      const streamKeywords = [];
      if (streams.includes('Engineering')) streamKeywords.push('Tech', 'B.E.', 'Engineering');
      if (streams.includes('Management')) streamKeywords.push('MBA', 'BBA', 'PGP', 'Management');
      if (streams.includes('Medical')) streamKeywords.push('MBBS', 'Medicine', 'Surgery', 'Medical');
      if (streams.includes('Science')) streamKeywords.push('B.Sc', 'M.Sc', 'Physics', 'Science');
      
      if (streamKeywords.length > 0) {
        where.courses = {
          some: {
            OR: streamKeywords.flatMap(kw => [
              { name: { contains: kw, mode: 'insensitive' } },
              { degree: { contains: kw, mode: 'insensitive' } }
            ])
          }
        };
      }
    }

    if (minAvgPackage || minHighestPackage || recruiter) {
      where.placements = {
        some: {
          ...(minAvgPackage && { averagePackage: { gte: parseFloat(minAvgPackage) * 100000 } }),
          ...(minHighestPackage && { highestPackage: { gte: parseFloat(minHighestPackage) * 100000 } }),
          ...(recruiter && { 
            topRecruiters: { 
              hasSome: [
                recruiter,
                recruiter.toLowerCase(),
                recruiter.toUpperCase(),
                recruiter.charAt(0).toUpperCase() + recruiter.slice(1).toLowerCase()
              ]
            } 
          }),
        }
      };
    }

    let orderBy: Prisma.CollegeOrderByWithRelationInput | Prisma.CollegeOrderByWithRelationInput[] = [{ rating: 'desc' }, { id: 'asc' }];
    
    if (sort === 'fees_asc') orderBy = [{ feesMin: 'asc' }, { id: 'asc' }];
    else if (sort === 'fees_desc') orderBy = [{ feesMax: 'desc' }, { id: 'asc' }];
    else if (sort === 'name') orderBy = [{ name: 'asc' }, { id: 'asc' }];
    else if (sort === 'established') orderBy = [{ establishedYear: 'desc' }, { id: 'asc' }];
    else if (sort === 'ranking') orderBy = [{ ranking: 'asc' }, { id: 'asc' }];

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          _count: {
            select: { reviews: true },
          },
          courses: {
            take: 3,
          }
        },
      }),
      prisma.college.count({ where }),
    ]);

    return NextResponse.json({
      data: colleges,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { message: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}
