"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if ((session?.user as any)?.role === 'ADMIN') {
    return null;
  }

  useEffect(() => {
    if (session?.user) {
      fetch(`/api/saved/check?ids=${collegeId}`)
        .then(res => res.json())
        .then(data => {
          if (data[collegeId]) {
            setIsSaved(true);
          }
        })
        .catch(console.error);
    }
  }, [collegeId, session]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent triggering parent links if any
    if (!session) {
      setShowModal(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await fetch(`/api/saved?collegeId=${collegeId}`, { method: 'DELETE' });
        setIsSaved(false);
      } else {
        await fetch('/api/saved', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collegeId }),
        });
        setIsSaved(true);
      }
      router.refresh();
    } catch (error) {
      console.error('Error toggling save status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleSave}
        disabled={isLoading}
        className={`p-2 rounded-full border shadow-sm transition-all z-20 relative ${
          isSaved 
            ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
            : 'bg-white border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-red-500 hover:border-red-200 hover:bg-red-50'
        }`}
        title={isSaved ? "Remove from saved" : "Save college"}
      >
        <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Login Required</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">Please log in to save colleges to your shortlist.</p>
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
