"use client";

import { useRouter } from 'next/navigation';
import { XCircle, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export function CompareButton({ collegeId, className, text = "Add to Compare" }: { collegeId: string, className?: string, text?: string }) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('compareIds');
      if (stored) {
        const ids = stored.split(',').filter(Boolean);
        if (ids.includes(collegeId)) {
          setIsAdded(true);
        }
      }
    } catch(e) {}
  }, [collegeId]);

  const handleCompare = () => {
    if (isAdded) {
      // If already added, just go to the compare page
      let currentIds = "";
      try { currentIds = localStorage.getItem('compareIds') || ""; } catch(e) {}
      router.push(`/compare?ids=${currentIds}`);
      return;
    }
    
    let ids: string[] = [];
    try {
      const stored = localStorage.getItem('compareIds');
      if (stored) ids = stored.split(',').filter(Boolean);
    } catch(e) {}
    
    if (!ids.includes(collegeId)) {
      ids.push(collegeId);
      if (ids.length > 4) ids.shift(); // keep max 4
      try {
        localStorage.setItem('compareIds', ids.join(','));
      } catch(e) {}
    }
    
    setIsAdded(true);
    router.push(`/compare?ids=${ids.join(',')}`);
  };

  return (
    <button 
      onClick={handleCompare} 
      className={`${className} ${isAdded ? 'opacity-70 bg-gray-50' : ''}`}
      title={isAdded ? "Go to Compare Page" : text}
    >
      {isAdded ? (
        <span className="flex items-center gap-1 justify-center">
          <Check className="w-4 h-4" /> Added to compare
        </span>
      ) : text}
    </button>
  );
}

export function RemoveCompareButton({ collegeId, currentIds }: { collegeId: string, currentIds: string }) {
  const router = useRouter();

  const handleRemove = () => {
    const newIds = currentIds.split(',').filter(id => id !== collegeId && id !== '');
    try {
      localStorage.setItem('compareIds', newIds.join(','));
    } catch(e) {}
    router.push(`/compare?ids=${newIds.join(',')}`);
  };

  return (
    <button onClick={handleRemove} className="absolute top-4 right-4 p-1 text-[var(--color-text-muted)] hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
      <XCircle className="w-5 h-5" />
    </button>
  );
}

export function CompareSync({ currentIds }: { currentIds: string }) {
  const router = useRouter();
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('compareIds');
      if (!currentIds && stored) {
        router.replace(`/compare?ids=${stored}`);
      } else if (currentIds) {
        localStorage.setItem('compareIds', currentIds);
      } else if (!currentIds && !stored) {
        localStorage.removeItem('compareIds');
      }
    } catch(e) {}
  }, [currentIds, router]);
  
  return null;
}
