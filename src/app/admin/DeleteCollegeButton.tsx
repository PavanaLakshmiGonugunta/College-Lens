"use client";

import { useState } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteCollegeButton({ collegeId, collegeName }: { collegeId: string; collegeName: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        const res = await fetch(`/api/admin/colleges/${collegeId}`, {
          method: 'DELETE',
        });
        
      if (res.ok) {
        setShowModal(false);
        router.refresh();
      } else {
        alert('Failed to delete college.');
      }
    } catch (e) {
      alert('An error occurred.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="text-red-500 hover:text-red-700 p-1 transition-colors"
        title="Delete"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-left">
            <h3 className="text-xl font-bold text-red-600 mb-2">Delete College</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm">
              Are you sure you want to delete <span className="font-semibold text-[var(--color-text-primary)]">{collegeName}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-slate-50)] rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center min-w-[80px] px-4 py-2 text-sm bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
