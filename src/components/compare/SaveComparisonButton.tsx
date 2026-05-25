"use client";

import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SaveComparisonButton({ collegeIds }: { collegeIds: string[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user?.role === 'ADMIN') {
    return null;
  }

  const handleSave = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/saved/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collegeIds }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      } else {
        alert("Failed to save comparison");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSave}
        disabled={isSaving || saved || collegeIds.length < 2}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${
          saved 
            ? 'bg-green-50 text-green-700 border-2 border-green-500' 
            : 'bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-slate-50)] hover:scale-105'
        } disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed`}
      >
        {saved ? (
          <>
            <BookmarkCheck className="w-5 h-5" /> Saved!
          </>
        ) : (
          <>
            <Bookmark className="w-5 h-5" /> Save Comparison
          </>
        )}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-left">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Login Required</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">Please log in to save comparisons.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={(e) => { e.preventDefault(); setShowModal(false); }} className="px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-50)] rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button onClick={(e) => { 
                e.preventDefault(); 
                setShowModal(false);
                const params = new URLSearchParams(window.location.search);
                params.set('login', 'true');
                router.push(`?${params.toString()}`); 
              }} className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
