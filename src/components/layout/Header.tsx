"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Menu, X, User as UserIcon, BookOpen, GraduationCap } from 'lucide-react';
import LoginModal from '@/components/auth/LoginModal';
import SearchBar from '@/components/layout/SearchBar';

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('login') === 'true') {
      setIsLoginModalOpen(true);
      // Clean up the URL after opening modal
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('login');
      const newUrl = newParams.toString() ? `?${newParams.toString()}` : window.location.pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, router]);

  const navLinks = [
    { name: 'Colleges', href: '/colleges' },
    { name: 'Compare', href: '/compare' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-br from-[var(--color-navy-600)] to-[var(--color-teal-500)] p-2 rounded-lg group-hover:shadow-lg transition-all">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight text-[var(--color-navy-900)] dark:text-white">
                  CollegeLens
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <SearchBar />

              {session ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[var(--color-slate-100)] transition-colors">
                    <div className="h-8 w-8 rounded-full bg-[var(--color-teal-100)] text-[var(--color-teal-700)] flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {session.user?.name}
                    </span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-[var(--color-border)]">
                    {(session.user as any)?.role !== 'ADMIN' && (
                      <Link href="/saved" className="block px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-50)] hover:text-[var(--color-primary)]">
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: window.location.href })}
                      className="block w-full text-left px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-50)] hover:text-red-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] h-10 px-4 py-2"
                >
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-slate-100)] focus:outline-none transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-[var(--color-border)] animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-slate-50)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {session ? (
                <>
                  {(session.user as any)?.role !== 'ADMIN' && (
                    <Link
                      href="/saved"
                      className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-slate-50)]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: window.location.href });
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--color-primary)] hover:bg-[var(--color-navy-50)]"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
