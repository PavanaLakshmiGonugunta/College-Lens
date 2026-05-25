import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, Minus, GraduationCap } from 'lucide-react';
import { CompareSync, RemoveCompareButton } from '@/components/colleges/CompareButtons';
import SaveComparisonButton from '@/components/compare/SaveComparisonButton';

export const dynamic = 'force-dynamic';

async function getCompareColleges(ids: string) {
  if (!ids) return [];
  
  const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/compare?ids=${ids}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch colleges for comparison');
  }

  return res.json();
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const ids = resolvedSearchParams.ids || '';
  const colleges: any[] = await getCompareColleges(ids);

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)] py-8">
      <CompareSync currentIds={ids} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/colleges" className="inline-flex items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
          </Link>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[var(--color-text-primary)]">Compare Colleges</h1>
              <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Compare fees, placements, rankings and more side-by-side.</p>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              {colleges.length > 0 && colleges.length < 4 && (
                <Link href="/colleges" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-[var(--color-primary)] rounded-xl text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-slate-50)] hover:scale-105 transition-all shadow-sm">
                  <span className="text-xl leading-none">+</span> Add College
                </Link>
              )}
              {colleges.length >= 2 && (
                <SaveComparisonButton collegeIds={colleges.map(c => c.id)} />
              )}
            </div>
          </div>
        </div>

        {colleges.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-12 text-center border border-[var(--color-border)]">
            <div className="w-16 h-16 bg-[var(--color-slate-100)] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">No colleges selected</h3>
            <p className="mt-2 text-[var(--color-text-secondary)] mb-6">Select up to 4 colleges from the search page to compare them.</p>
            <Link href="/colleges" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-hover)] transition-colors inline-block">
              Find Colleges
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px] table-fixed">
                <thead>
                  <tr className="bg-[var(--color-slate-50)]">
                    <th className="p-6 w-56 border-b border-r border-[var(--color-border)] sticky left-0 bg-[var(--color-slate-50)] z-10">
                      <h3 className="font-bold text-[var(--color-text-primary)]">Parameters</h3>
                    </th>
                    {colleges.map((college) => (
                      <th key={college.id} className="p-6 border-b border-r border-[var(--color-border)] align-top relative">
                        <RemoveCompareButton collegeId={college.id} currentIds={ids} />
                        <div className="flex flex-col items-center text-center mt-4">
                          <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-[var(--color-border)] p-2 mb-3 flex items-center justify-center">
                            <img src={college.logo} alt={college.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          <Link href={`/colleges/${college.slug}`} className="font-bold text-lg text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors leading-tight mb-2">
                            {college.name}
                          </Link>
                          <span className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-slate-100)] px-2 py-1 rounded-md">{college.location}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {/* Basic Info */}
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Rating</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center">
                        <div className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-bold">
                          {college.rating.toFixed(1)} / 5.0
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-1">{college._count.reviews} reviews</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">NIRF Ranking</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center font-medium">
                        {college.ranking ? `#${college.ranking}` : <Minus className="w-5 h-5 mx-auto text-[var(--color-text-muted)]" />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Institution Type</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center">
                        {college.type}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Placements */}
                  <tr className="bg-[var(--color-navy-50)] border-y-2 border-[var(--color-border)]">
                    <td colSpan={colleges.length + 1} className="p-3 font-bold text-[var(--color-navy-800)] uppercase tracking-wider text-sm sticky left-0">Placement Statistics</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Highest Package</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center font-bold text-[var(--color-text-primary)]">
                        {college.placements[0] ? `₹${(college.placements[0].highestPackage / 100000).toFixed(1)} LPA` : <Minus className="w-5 h-5 mx-auto text-[var(--color-text-muted)]" />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Average Package</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center font-bold text-[var(--color-text-primary)]">
                        {college.placements[0] ? `₹${(college.placements[0].averagePackage / 100000).toFixed(1)} LPA` : <Minus className="w-5 h-5 mx-auto text-[var(--color-text-muted)]" />}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Fees & Courses */}
                  <tr className="bg-[var(--color-teal-50)] border-y-2 border-[var(--color-border)]">
                    <td colSpan={colleges.length + 1} className="p-3 font-bold text-[var(--color-teal-800)] uppercase tracking-wider text-sm sticky left-0">Fees & Courses</td>
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Fee Range</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center font-medium">
                        ₹{(college.feesMin / 100000).toFixed(1)}L - {(college.feesMax / 100000).toFixed(1)}L
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 border-r border-[var(--color-border)] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-slate-50)] sticky left-0 z-10">Total Courses</td>
                    {colleges.map((college) => (
                      <td key={college.id} className="p-4 border-r border-[var(--color-border)] text-center">
                        <span className="inline-flex items-center gap-1 bg-[var(--color-slate-100)] px-2 py-1 rounded font-medium">
                          <GraduationCap className="w-4 h-4 text-[var(--color-primary)]" /> {college.courses.length}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
