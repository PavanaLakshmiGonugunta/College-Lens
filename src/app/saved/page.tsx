import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CollegeCard from '@/components/colleges/CollegeCard';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SavedCollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const resolvedSearchParams = await searchParams;
  const activeTab = resolvedSearchParams.tab === 'comparisons' ? 'comparisons' : 'colleges';

  const savedColleges = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: {
      college: {
        include: {
          _count: { select: { reviews: true } },
          courses: { take: 3 }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  let savedComparisons = [];
  if (activeTab === 'comparisons') {
    savedComparisons = await prisma.savedComparison.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    });
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-[var(--color-border)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">My Dashboard</h1>
            <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Manage your shortlisted colleges and comparisons.</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
            <Link 
              href="/saved?tab=colleges"
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'colleges' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Saved Colleges
            </Link>
            <Link 
              href="/saved?tab=comparisons"
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'comparisons' ? 'bg-white text-[var(--color-primary)] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Saved Comparisons
            </Link>
          </div>
        </div>

        {activeTab === 'colleges' ? (
          savedColleges.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-16 text-center border border-[var(--color-border)]">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartCrack className="w-10 h-10 text-red-300" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">No saved colleges yet</h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8">
                You haven't saved any colleges to your shortlist. Explore colleges and click the heart icon to save them here.
              </p>
              <Link 
                href="/colleges" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-md transition-colors"
              >
                Explore Colleges
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedColleges.map(({ college }) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )
        ) : (
          savedComparisons.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-16 text-center border border-[var(--color-border)]">
              <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">No saved comparisons</h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mx-auto mb-8">
                You haven't saved any side-by-side comparisons yet. Head to the comparison tool to save one!
              </p>
              <Link 
                href="/compare" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-md transition-colors"
              >
                Compare Colleges
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedComparisons.map((comparison) => (
                <div key={comparison.id} className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[var(--color-text-primary)]">
                      {comparison.name || `Comparison (${new Date(comparison.createdAt).toLocaleDateString()})`}
                    </h3>
                    <span className="bg-[var(--color-slate-100)] text-[var(--color-text-secondary)] text-xs font-bold px-2 py-1 rounded-md">
                      {comparison.collegeIds.length} Colleges
                    </span>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap mb-6">
                    {/* Displaying raw IDs since we'd need another query to get the names, 
                        or we could resolve them. For simplicity, we just link to it. */}
                    <p className="text-sm text-[var(--color-text-muted)] italic">
                      Click view to see the full side-by-side comparison.
                    </p>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
                    <Link 
                      href={`/compare?ids=${comparison.collegeIds.join(',')}`}
                      className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                    >
                      View Comparison &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
