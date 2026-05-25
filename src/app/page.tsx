import Link from 'next/link';
import { Search, MapPin, Star, GraduationCap, Building2, TrendingUp, Filter } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Ensures this is rendered dynamically for latest data

export default async function Home() {
  // Fetch some stats
  const totalColleges = await prisma.college.count();
  const topColleges = await prisma.college.findMany({
    orderBy: { rating: 'desc' },
    take: 6,
    include: {
      courses: { take: 1 }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-navy-900)] text-white pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-teal-900)] opacity-90"></div>
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-teal-200)] text-sm font-medium mb-8 animate-fade-in">
            <SparklesIcon className="w-4 h-4" />
            <span>Discover {totalColleges > 0 ? totalColleges + '+' : 'Top'} Premium Colleges in India</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-teal-400)] to-[var(--color-teal-200)]">Dream College</span>
          </h1>
          
          <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Data-driven insights, verified reviews, and comprehensive comparisons to help you make the most important decision of your life.
          </p>

          <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <form action="/colleges" method="GET" className="relative flex items-center bg-white rounded-2xl p-2 shadow-[var(--shadow-elevated)]">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-[var(--color-text-muted)]" />
                </div>
                <input
                  type="text"
                  name="search"
                  className="block w-full pl-12 pr-4 py-4 text-lg text-[var(--color-text-primary)] rounded-xl border-0 focus:ring-0 placeholder:text-[var(--color-text-muted)]"
                  placeholder="Search for colleges, exams, or courses..."
                />
              </div>
              <button
                type="submit"
                className="hidden sm:inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] transition-all shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Feature Stats */}
      <section className="py-10 bg-white border-b border-[var(--color-border)] relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--color-border)]">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[var(--color-primary)]">{totalColleges || 500}+</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Colleges</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[var(--color-primary)]">25k+</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[var(--color-primary)]">120+</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Exams</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-[var(--color-primary)]">2M+</p>
              <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider">Students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-16 bg-[var(--color-surface-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Explore by Stream</h2>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)]">Find the best colleges for your preferred field of study</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/colleges?stream=${category.query}`} className="group relative bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all text-center flex flex-col items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:-translate-y-1">
                <div className={`p-4 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)]">{category.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{category.count} Colleges</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Top Rated Colleges</h2>
              <p className="mt-2 text-lg text-[var(--color-text-secondary)]">Discover institutions with the highest student ratings</p>
            </div>
            <Link href="/colleges" className="hidden md:inline-flex items-center text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-hover)]">
              View All <span aria-hidden="true" className="ml-1">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topColleges.map((college) => (
              <div key={college.id} className="group bg-white rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all overflow-hidden border border-[var(--color-border)] flex flex-col h-full hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                    <img src={college.logo} alt="Logo" className="w-12 h-12 rounded-lg object-contain bg-gray-50 border border-gray-100 p-1" />
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] leading-tight line-clamp-2 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                        <Link href={`/colleges/${college.slug}`}>
                          {college.name}
                        </Link>
                      </h3>
                      <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{college.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[var(--color-border)] grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Avg Fees</p>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        ₹{(college.feesMin / 100000).toFixed(1)}L - {(college.feesMax / 100000).toFixed(1)}L
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Course</p>
                      <p className="font-medium text-[var(--color-text-primary)] truncate">
                        {college.courses[0]?.degree || college.type}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-[var(--color-surface-alt)] border-t border-[var(--color-border)] flex justify-between items-center">
                  <Link 
                    href={`/colleges/${college.slug}`}
                    className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/compare?ids=${college.id}`}
                    className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    Add to Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/colleges" className="inline-flex items-center justify-center px-6 py-3 border border-[var(--color-border)] rounded-xl text-base font-medium text-[var(--color-text-primary)] bg-white hover:bg-[var(--color-surface-alt)] transition-colors shadow-sm">
              View All Colleges
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[var(--color-teal-500)] to-[var(--color-teal-700)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to find your perfect college match?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
            Create a free account to save your favorite colleges, compare them side-by-side, and get personalized recommendations based on your profile.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/colleges" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-[var(--color-teal-700)] bg-white hover:bg-teal-50 shadow-lg transition-all hover:scale-105">
              Browse Colleges
            </Link>
            <Link href="/compare" className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-base font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
              Compare Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

const categories = [
  { name: 'Engineering', count: '15+', query: 'Engineering', icon: <Building2 className="w-8 h-8 text-[var(--color-navy-600)]" />, color: 'bg-[var(--color-navy-100)] text-[var(--color-navy-600)]' },
  { name: 'Management', count: '6+', query: 'Management', icon: <TrendingUp className="w-8 h-8 text-[var(--color-teal-600)]" />, color: 'bg-[var(--color-teal-100)] text-[var(--color-teal-600)]' },
  { name: 'Medical', count: '2+', query: 'Medical', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, color: 'bg-rose-100 text-rose-600' },
  { name: 'Science', count: '1+', query: 'Science', icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, color: 'bg-purple-100 text-purple-600' },
];
