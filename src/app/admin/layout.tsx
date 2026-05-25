import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect the admin routes
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <div className="bg-white border-b border-[var(--color-border)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Admin Dashboard</h1>
          <div className="text-sm text-[var(--color-text-secondary)]">Logged in as <span className="font-semibold">{session.user.name}</span></div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
