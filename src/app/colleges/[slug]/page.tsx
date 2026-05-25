import Link from 'next/link';
import { MapPin, Star, Building2, Globe, GraduationCap, ArrowLeft, Heart, BadgeCheck, Phone, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import SaveButton from '@/components/colleges/SaveButton';
import { CompareButton } from '@/components/colleges/CompareButtons';

export const dynamic = 'force-dynamic';

const RECRUITER_LINKS: Record<string, string> = {
  'Microsoft': 'https://careers.microsoft.com/',
  'Google': 'https://careers.google.com/',
  'Amazon': 'https://amazon.jobs/',
  'TCS': 'https://www.tcs.com/careers',
  'Infosys': 'https://www.infosys.com/careers/',
  'Wipro': 'https://careers.wipro.com/',
  'Accenture': 'https://www.accenture.com/in-en/careers',
  'IBM': 'https://www.ibm.com/careers/',
  'Cognizant': 'https://careers.cognizant.com/',
  'Capgemini': 'https://www.capgemini.com/careers/',
};

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const college = await prisma.college.findUnique({
    where: { slug },
    include: {
      courses: true,
      placements: {
        orderBy: { year: 'desc' },
      },
      reviews: {
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, image: true }
          }
        }
      }
    }
  });

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-surface-alt)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">College Not Found</h1>
          <Link href="/colleges" className="mt-4 text-[var(--color-primary)] hover:underline inline-block">
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  const latestPlacement = college.placements[0];

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)] pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-[var(--color-border)] pb-8 pt-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/colleges" className="inline-flex items-center text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-48 h-48 bg-white border border-[var(--color-border)] rounded-2xl shadow-sm p-4 flex items-center justify-center flex-shrink-0">
              <img src={college.logo} alt={`${college.name} Logo`} className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] leading-tight">
                    {college.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {college.location}</span>
                    <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {college.type}</span>
                    {college.accreditation && (
                      <span className="flex items-center gap-1 text-[var(--color-teal-700)] bg-[var(--color-teal-50)] px-2 py-0.5 rounded-md text-sm border border-[var(--color-teal-100)]">
                        <BadgeCheck className="w-4 h-4" /> {college.accreditation}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <a href="#reviews" className="bg-[var(--color-navy-50)] border border-[var(--color-navy-100)] px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-[var(--color-navy-100)] transition-colors group">
                    <div className="bg-[var(--color-primary)] text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-[var(--color-primary)]">{college.rating.toFixed(1)} <span className="text-sm text-[var(--color-text-muted)] font-normal">/ 5</span></div>
                      <div className="text-xs text-[var(--color-text-secondary)] group-hover:underline">{college.reviews.length} reviews</div>
                    </div>
                  </a>
                  <SaveButton collegeId={college.id} />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <CompareButton collegeId={college.id} className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-slate-50)] shadow-sm transition-colors" />
                {college.website && (
                  <a href={college.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-hover)] shadow-sm transition-colors flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview Section */}
          <section className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden" id="overview">
            <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-slate-50)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Overview</h2>
            </div>
            <div className="p-6">
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
              </div>
              <div className="prose prose-slate max-w-none text-[var(--color-text-secondary)]">
                {college.description.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-[var(--color-slate-50)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Established</p>
                  <p className="font-bold text-[var(--color-text-primary)]">{college.establishedYear}</p>
                </div>
                <div className="bg-[var(--color-slate-50)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Institution Type</p>
                  <p className="font-bold text-[var(--color-text-primary)]">{college.type}</p>
                </div>
                {college.ranking && (
                  <div className="bg-[var(--color-slate-50)] p-4 rounded-xl border border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">NIRF Ranking</p>
                    <p className="font-bold text-[var(--color-text-primary)]">#{college.ranking}</p>
                  </div>
                )}
                <div className="bg-[var(--color-slate-50)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold mb-1">Total Courses</p>
                  <p className="font-bold text-[var(--color-text-primary)]">{college.courses.length}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden" id="courses">
            <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-slate-50)] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--color-primary)]" /> Courses & Fees
              </h2>
            </div>
            <div className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-[var(--color-border)] text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Course Name</th>
                      <th className="px-6 py-4 font-semibold">Degree</th>
                      <th className="px-6 py-4 font-semibold">Duration</th>
                      <th className="px-6 py-4 font-semibold text-right">Total Fees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {college.courses.map((course) => (
                      <tr key={course.id} className="hover:bg-[var(--color-slate-50)] transition-colors">
                        <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">{course.name}</td>
                        <td className="px-6 py-4 text-[var(--color-text-secondary)]"><span className="bg-[var(--color-slate-100)] px-2 py-1 rounded text-xs">{course.degree}</span></td>
                        <td className="px-6 py-4 text-[var(--color-text-secondary)]">{course.duration}</td>
                        <td className="px-6 py-4 font-semibold text-[var(--color-text-primary)] text-right">₹{(course.fees / 100000).toFixed(2)} Lakhs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Placements Section */}
          <section className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden" id="placements">
            <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-slate-50)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" /> Placements
              </h2>
            </div>
            <div className="p-6">
              {latestPlacement ? (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Latest</span>
                    <span className="text-[var(--color-text-secondary)] font-medium">Batch {latestPlacement.year}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-[var(--color-teal-50)] to-[var(--color-teal-100)] p-6 rounded-2xl border border-[var(--color-teal-200)] text-center shadow-sm">
                      <p className="text-[var(--color-teal-800)] font-medium mb-1">Highest Package</p>
                      <p className="text-3xl font-extrabold text-[var(--color-teal-900)]">₹{(latestPlacement.highestPackage / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--color-navy-50)] to-[var(--color-navy-100)] p-6 rounded-2xl border border-[var(--color-navy-200)] text-center shadow-sm">
                      <p className="text-[var(--color-navy-800)] font-medium mb-1">Average Package</p>
                      <p className="text-3xl font-extrabold text-[var(--color-navy-900)]">₹{(latestPlacement.averagePackage / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="bg-[var(--color-orange-50)] p-6 rounded-2xl border border-[var(--color-orange-200)] text-center shadow-sm">
                      <p className="text-[var(--color-orange-800)] font-medium mb-1">Placement Rate</p>
                      <p className="text-3xl font-extrabold text-[var(--color-orange-900)]">{latestPlacement.placementRate}%</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-[var(--color-text-primary)] mb-4">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {latestPlacement.topRecruiters.map((recruiter, idx) => (
                        <a 
                          key={idx} 
                          href={RECRUITER_LINKS[recruiter] || `https://www.google.com/search?q=${encodeURIComponent(recruiter + " careers")}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-white border border-[var(--color-border)] shadow-sm px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all cursor-pointer"
                        >
                          {recruiter}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-[var(--color-text-secondary)]">Placement data not available.</p>
              )}
            </div>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] overflow-hidden" id="reviews">
            <div className="px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-slate-50)] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Star className="w-5 h-5 text-[var(--color-primary)]" /> Student Reviews
              </h2>
            </div>
            <div className="p-6">
              {college.reviews.length > 0 ? (
                <div className="space-y-6">
                  {college.reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-[var(--color-border)] last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--color-slate-200)] flex items-center justify-center text-[var(--color-text-primary)] font-bold">
                            {review.user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-[var(--color-text-primary)]">{review.user?.name || 'Anonymous User'}</p>
                            <p className="text-xs text-[var(--color-text-muted)]">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-[var(--color-primary)] text-white px-2 py-1 rounded text-sm font-bold">
                          <Star className="w-3 h-3 fill-current" /> {review.rating}
                        </div>
                      </div>
                      <h4 className="font-bold text-[var(--color-text-primary)] mb-2">{review.title}</h4>
                      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{review.content}</p>
                      <div className="mt-3 inline-block bg-[var(--color-slate-100)] text-[var(--color-text-secondary)] text-xs px-2 py-1 rounded">
                        Category: {review.category}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-text-secondary)]">No reviews yet. Be the first to review this college.</p>
              )}
            </div>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 sticky top-24 self-start">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-border)] p-6">
            <h3 className="font-bold text-lg text-[var(--color-text-primary)] mb-4">Quick Contact</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                <MapPin className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <p>{college.location}, {college.state}</p>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Phone className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <p>+91 (080) 222-3333</p>
              </div>
              <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                <Globe className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                <a href={college.website || '#'} className="hover:text-[var(--color-primary)] hover:underline truncate">{college.website?.replace(/^https?:\/\//, '') || 'Website not available'}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
