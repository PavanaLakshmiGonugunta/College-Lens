"use client";

import Link from 'next/link';
import { MapPin, Star, GraduationCap } from 'lucide-react';
import type { CollegeListItem } from '@/types';
import { CompareButton } from '@/components/colleges/CompareButtons';

interface CollegeCardProps {
  college: CollegeListItem;
}

export default function CollegeCard({ college }: CollegeCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all overflow-hidden border border-[var(--color-border)] flex flex-col h-full hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x400/e2e8f0/64748b?text=${encodeURIComponent(college.name)}`;
          }}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-current" /> {college.rating.toFixed(1)}
        </div>
        {college.ranking && (
          <div className="absolute top-4 right-4 bg-[var(--color-navy-900)]/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            #{college.ranking} Ranked
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <img src={college.logo} alt="Logo" className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-100 p-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] leading-tight line-clamp-2 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
              <Link href={`/colleges/${college.slug}`} className="before:absolute before:inset-0 before:z-10">
                {college.name}
              </Link>
            </h3>
            <div className="flex items-center text-sm text-[var(--color-text-secondary)] mb-2">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{college.location}</span>
            </div>
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="px-2 py-1 bg-[var(--color-navy-50)] text-[var(--color-navy-700)] rounded-md font-medium border border-[var(--color-navy-100)]">
                {college.type}
              </span>
              <span className="px-2 py-1 bg-[var(--color-teal-50)] text-[var(--color-teal-700)] rounded-md font-medium border border-[var(--color-teal-100)] flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                Est. {college.establishedYear}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--color-border)] grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Avg Fees</p>
            <p className="font-medium text-[var(--color-text-primary)] text-sm">
              ₹{(college.feesMin / 100000).toFixed(1)}L - {(college.feesMax / 100000).toFixed(1)}L
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Reviews</p>
            <p className="font-medium text-[var(--color-text-primary)] text-sm">
              {college._count?.reviews || 0} student reviews
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] flex justify-between items-center relative z-20">
        <span className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors">
          View Details
        </span>
        <CompareButton
          collegeId={college.id}
          className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors relative z-20"
        />
      </div>
    </div>
  );
}
