"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CollegeForm({ initialData, collegeId }: { initialData?: any, collegeId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    location: initialData?.location || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    type: initialData?.type || 'Public',
    establishedYear: initialData?.establishedYear || '',
    rating: initialData?.rating || '',
    ranking: initialData?.ranking || '',
    feesMin: initialData?.feesMin || '',
    feesMax: initialData?.feesMax || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    logo: initialData?.logo || '',
    website: initialData?.website || '',
    accreditation: initialData?.accreditation || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = collegeId ? `/api/admin/colleges/${collegeId}` : '/api/admin/colleges';
      const method = collegeId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Failed to save college');
      }
    } catch (e) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/admin" className="text-[var(--color-primary)] hover:underline flex items-center gap-1 text-sm font-medium mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          {collegeId ? 'Edit College' : 'Add New College'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">College Name *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Institution Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl">
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Deemed">Deemed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Location *</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Powai, Mumbai" className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">City *</label>
              <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">State *</label>
              <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Est. Year *</label>
              <input required type="number" name="establishedYear" value={formData.establishedYear} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Rating</label>
              <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Ranking</label>
              <input type="number" name="ranking" value={formData.ranking} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Min Fees *</label>
              <input required type="number" name="feesMin" value={formData.feesMin} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Max Fees *</label>
              <input required type="number" name="feesMax" value={formData.feesMax} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Description *</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border rounded-xl"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Website URL</label>
            <input type="url" name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Accreditation</label>
            <input type="text" name="accreditation" value={formData.accreditation} onChange={handleChange} placeholder="e.g. NAAC A++" className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Cover Image URL *</label>
            <input required type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">Logo URL (Optional)</label>
            <input type="url" name="logo" value={formData.logo} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
          <button 
            type="submit" 
            disabled={loading}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" /> {loading ? 'Saving...' : 'Save College'}
          </button>
        </div>
      </form>
    </div>
  );
}
