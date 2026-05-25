"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

function CustomRangeSlider({ value, min, max, onChange, label, formatValue }: { value: number, min: number, max: number, onChange: (val: number) => void, label: string, formatValue: (val: number) => string }) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">{label}</h3>
        <span className="text-sm font-bold text-[var(--color-primary)]">{value > min ? formatValue(value) : 'Any'}</span>
      </div>
      <div className="relative w-full h-2.5 bg-gray-200 rounded-full flex items-center">
        {/* Track fill */}
        <div 
          className="absolute top-0 left-0 h-full bg-[var(--color-primary)] rounded-full pointer-events-none" 
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Thumb */}
        <div 
          className="absolute w-5 h-5 bg-[var(--color-primary)] rounded-full pointer-events-none shadow-md border-2 border-white transition-all" 
          style={{ left: `calc(${percentage}% - 10px)` }}
        ></div>
        
        {/* Actual Input */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2 font-medium">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}+</span>
      </div>
    </div>
  );
}

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedStreams, setSelectedStreams] = useState<string[]>(searchParams.get('stream')?.split(',').filter(Boolean) || []);
  const [selectedStates, setSelectedStates] = useState<string[]>(searchParams.get('state')?.split(',').filter(Boolean) || []);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get('type')?.split(',').filter(Boolean) || []);
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || '');
  const [selectedRecruiter, setSelectedRecruiter] = useState(searchParams.get('recruiter') || '');
  const [minAvgPackage, setMinAvgPackage] = useState(searchParams.get('minAvgPackage') || '');
  const [minHighestPackage, setMinHighestPackage] = useState(searchParams.get('minHighestPackage') || '');

  const streams = ['Engineering', 'Management', 'Medical', 'Science'];
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Telangana'];
  const types = ['Public', 'Private', 'Deemed'];
  const sortOptions = [
    { value: '', label: 'Highest Rating (Default)' },
    { value: 'fees_asc', label: 'Fees: Low to High' },
    { value: 'fees_desc', label: 'Fees: High to Low' },
    { value: 'ranking', label: 'Ranking' },
  ];

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedStreams.length > 0) params.set('stream', selectedStreams.join(','));
    else params.delete('stream');

    if (selectedStates.length > 0) params.set('state', selectedStates.join(','));
    else params.delete('state');
    
    if (selectedTypes.length > 0) params.set('type', selectedTypes.join(','));
    else params.delete('type');

    if (selectedSort) params.set('sort', selectedSort);
    else params.delete('sort');

    if (selectedRecruiter) params.set('recruiter', selectedRecruiter);
    else params.delete('recruiter');

    if (minAvgPackage) params.set('minAvgPackage', minAvgPackage);
    else params.delete('minAvgPackage');

    if (minHighestPackage) params.set('minHighestPackage', minHighestPackage);
    else params.delete('minHighestPackage');

    // Reset to page 1 when filtering
    params.delete('page');

    router.push(`/colleges?${params.toString()}`);
  };

  const clearFilters = () => {
    setSelectedStreams([]);
    setSelectedStates([]);
    setSelectedTypes([]);
    setSelectedSort('');
    setSelectedRecruiter('');
    setMinAvgPackage('');
    setMinHighestPackage('');
    router.push('/colleges');
  };

  const handleStreamChange = (stream: string) => {
    setSelectedStreams(prev => prev.includes(stream) ? prev.filter(s => s !== stream) : [...prev, stream]);
  };

  const handleStateChange = (state: string) => {
    setSelectedStates(prev => prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Filters</h2>
        {(selectedStreams.length > 0 || selectedStates.length > 0 || selectedTypes.length > 0 || selectedSort || selectedRecruiter || minAvgPackage || minHighestPackage) && (
          <button 
            onClick={clearFilters}
            className="text-sm text-[var(--color-primary)] font-medium hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Sort */}
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-3">Sort By</h3>
          <select 
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Stream Filter */}
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-3">Stream</h3>
          <div className="space-y-2">
            {streams.map((stream) => (
              <label key={stream} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="stream" 
                  value={stream}
                  checked={selectedStreams.includes(stream)}
                  onChange={() => handleStreamChange(stream)}
                  className="w-4 h-4 rounded text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{stream}</span>
              </label>
            ))}
          </div>
        </div>

        {/* State Filter */}
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-3">State</h3>
          <div className="space-y-2">
            {states.map((state) => (
              <label key={state} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="state" 
                  value={state}
                  checked={selectedStates.includes(state)}
                  onChange={() => handleStateChange(state)}
                  className="w-4 h-4 rounded text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{state}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Institution Type Filter */}
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-3">Institution Type</h3>
          <div className="space-y-2">
            {types.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  name="type" 
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 rounded text-[var(--color-primary)] border-[var(--color-border)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Recruiter Filter */}
        <div>
          <h3 className="font-semibold text-sm text-[var(--color-text-primary)] mb-3">Top Recruiter</h3>
          <input 
            type="text" 
            placeholder="e.g. Microsoft"
            value={selectedRecruiter}
            onChange={(e) => setSelectedRecruiter(e.target.value)}
            className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
          />
        </div>

        {/* Package Filters */}
        <div>
          <CustomRangeSlider 
            label="Min Avg Package"
            min={0}
            max={30}
            value={Number(minAvgPackage || 0)}
            onChange={(val) => setMinAvgPackage(val === 0 ? '' : val.toString())}
            formatValue={(val) => `₹${val} LPA`}
          />
          <CustomRangeSlider 
            label="Min Highest Package"
            min={0}
            max={60}
            value={Number(minHighestPackage || 0)}
            onChange={(val) => setMinHighestPackage(val === 0 ? '' : val.toString())}
            formatValue={(val) => `₹${val} LPA`}
          />
        </div>

        <button 
          onClick={applyFilters}
          className="w-full py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
