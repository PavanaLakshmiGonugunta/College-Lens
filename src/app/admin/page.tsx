import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Plus, Edit, Trash2 } from 'lucide-react';
import DeleteCollegeButton from './DeleteCollegeButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const colleges = await prisma.college.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Manage Colleges</h2>
        <Link 
          href="/admin/colleges/new"
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          <Plus className="w-4 h-4" /> Add College
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-slate-50)] border-b border-[var(--color-border)] text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {colleges.map((college) => (
                <tr key={college.id} className="hover:bg-[var(--color-slate-50)] transition-colors">
                  <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">{college.name}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{college.city}, {college.state}</td>
                  <td className="px-6 py-4 text-[var(--color-text-secondary)]">{college.type}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/colleges/${college.id}`}
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] p-1"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteCollegeButton collegeId={college.id} collegeName={college.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {colleges.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-[var(--color-text-secondary)]">
                    No colleges found. Add your first college to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
