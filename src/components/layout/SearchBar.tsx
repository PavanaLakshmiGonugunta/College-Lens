"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/colleges?search=${encodeURIComponent(query)}&limit=5`);
          const data = await res.json();
          setResults(data.data || []);
          setIsOpen(true);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/colleges?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm ml-4">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim().length > 1) setIsOpen(true) }}
          placeholder="Search colleges, cities..."
          className="w-full pl-10 pr-4 py-2 bg-[var(--color-slate-50)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-4 w-4 text-[var(--color-text-muted)] animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-[var(--color-text-muted)]" />
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[var(--color-border)] overflow-hidden z-50">
          <ul className="max-h-80 overflow-y-auto divide-y divide-[var(--color-border)]">
            {results.map((college) => (
              <li key={college.id}>
                <Link 
                  href={`/colleges/${college.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-slate-50)] transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded-lg border border-[var(--color-border)] p-1 flex-shrink-0 flex items-center justify-center">
                    <img src={college.logo} alt={college.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">{college.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)] truncate">{college.city}, {college.state}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            href={`/colleges?search=${encodeURIComponent(query)}`}
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-3 bg-[var(--color-slate-50)] text-sm font-bold text-[var(--color-primary)] hover:bg-[var(--color-slate-100)] transition-colors"
          >
            View all results
          </Link>
        </div>
      )}

      {isOpen && query.trim().length > 1 && results.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[var(--color-border)] p-4 text-center z-50">
          <p className="text-sm text-[var(--color-text-secondary)]">No colleges found matching "{query}"</p>
        </div>
      )}
    </div>
  );
}
