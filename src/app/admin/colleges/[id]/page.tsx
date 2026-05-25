import { prisma } from '@/lib/prisma';
import CollegeForm from '../CollegeForm';
import { notFound } from 'next/navigation';

export default async function EditCollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const college = await prisma.college.findUnique({
    where: { id },
  });

  if (!college) {
    notFound();
  }

  return <CollegeForm initialData={college} collegeId={college.id} />;
}
