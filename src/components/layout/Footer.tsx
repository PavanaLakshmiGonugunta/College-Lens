import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy-900)] text-white border-t border-[var(--color-navy-800)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-[var(--color-teal-400)]" />
              <span className="font-bold text-2xl tracking-tight">CollegeLens</span>
            </Link>
            <p className="text-[var(--color-slate-400)] text-sm">
              India's most intelligent college discovery platform. Search, compare, and find the right college with data-driven insights.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-[var(--color-slate-400)] hover:text-white transition-colors text-sm">
                Facebook
              </a>
              <a href="#" className="text-[var(--color-slate-400)] hover:text-white transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-[var(--color-slate-400)] hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-[var(--color-slate-400)] hover:text-white transition-colors text-sm">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[var(--color-slate-400)]">
              <li><Link href="/colleges" className="hover:text-[var(--color-teal-400)] transition-colors">Top Colleges</Link></li>
              <li><Link href="/colleges?type=Public" className="hover:text-[var(--color-teal-400)] transition-colors">Government Colleges</Link></li>
              <li><Link href="/colleges?type=Private" className="hover:text-[var(--color-teal-400)] transition-colors">Private Colleges</Link></li>
              <li><Link href="/compare" className="hover:text-[var(--color-teal-400)] transition-colors">Compare Colleges</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">Top States</h3>
            <ul className="space-y-2 text-sm text-[var(--color-slate-400)]">
              <li><Link href="/colleges?state=Maharashtra" className="hover:text-[var(--color-teal-400)] transition-colors">Maharashtra</Link></li>
              <li><Link href="/colleges?state=Delhi" className="hover:text-[var(--color-teal-400)] transition-colors">Delhi NCR</Link></li>
              <li><Link href="/colleges?state=Karnataka" className="hover:text-[var(--color-teal-400)] transition-colors">Karnataka</Link></li>
              <li><Link href="/colleges?state=Tamil+Nadu" className="hover:text-[var(--color-teal-400)] transition-colors">Tamil Nadu</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white tracking-wide">Contact Us</h3>
            <ul className="space-y-3 text-sm text-[var(--color-slate-400)]">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-teal-400)] flex-shrink-0" />
                <span>123 Education Hub, Tech Park, Bangalore 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--color-teal-400)] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                <span>hello@collegelens.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--color-navy-800)] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--color-slate-400)] text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} CollegeLens. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-[var(--color-slate-400)]">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
