import { Suspense } from 'react';
import FilterSidebar from '@/components/colleges/FilterSidebar';
import CollegeCard from '@/components/colleges/CollegeCard';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getColleges(searchParams: { [key: string]: string | undefined }) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/colleges?${params.toString()}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch colleges');
  }

  return res.json();
}

function CollegeListSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] h-[400px] flex flex-col overflow-hidden">
          <div className="h-48 skeleton w-full"></div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg skeleton"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 skeleton w-3/4"></div>
                <div className="h-4 skeleton w-1/2"></div>
              </div>
            </div>
            <div className="mt-auto grid grid-cols-2 gap-4">
              <div className="h-10 skeleton w-full"></div>
              <div className="h-10 skeleton w-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function CollegeList({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  try {
    const data = await getColleges(searchParams);
    
    if (data.data.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] p-12 text-center">
          <div className="w-16 h-16 bg-[var(--color-slate-100)] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--color-text-primary)]">No colleges found</h3>
          <p className="mt-2 text-[var(--color-text-secondary)]">Try adjusting your filters or search query.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-[var(--color-border)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            Showing <span className="text-[var(--color-text-primary)] font-bold">{data.total}</span> colleges
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.data.map((college: any) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        {data.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 mb-8 pt-8 border-t border-[var(--color-border)]">
            {data.page > 1 ? (
              <Link 
                href={`/colleges?${new URLSearchParams({...searchParams, page: (data.page - 1).toString()}).toString()}`}
                className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors shadow-sm"
              >
                Previous
              </Link>
            ) : (
              <button disabled className="px-4 py-2 bg-gray-50 border border-[var(--color-border)] rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                Previous
              </button>
            )}
            
            <div className="flex items-center gap-1.5">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/colleges?${new URLSearchParams({...searchParams, page: p.toString()}).toString()}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all shadow-sm ${
                    p === data.page 
                      ? 'bg-[var(--color-primary)] text-white border border-[var(--color-primary)] scale-105' 
                      : 'bg-white border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] hover:border-gray-300'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>

            {data.page < data.totalPages ? (
              <Link 
                href={`/colleges?${new URLSearchParams({...searchParams, page: (data.page + 1).toString()}).toString()}`}
                className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors shadow-sm"
              >
                Next
              </Link>
            ) : (
              <button disabled className="px-4 py-2 bg-gray-50 border border-[var(--color-border)] rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed">
                Next
              </button>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">
        <p>Failed to load colleges. Please try again later.</p>
      </div>
    );
  }
}

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">Explore Colleges</h1>
          <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Find and compare the best colleges based on your preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 lg:w-80 flex-shrink-0">
            <Suspense fallback={<div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] h-[500px] skeleton"></div>}>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Suspense fallback={<CollegeListSkeleton />}>
              <CollegeList searchParams={resolvedSearchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
