import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckSquare, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Fact-Checking Policy",
  description: "Read the fact-checking process, guidelines, and source verification rules behind NewsTrendey's journalism.",
  alternates: {
    canonical: "https://newstrendey.com/fact-checking-policy/",
  },
};

export default function FactCheckingPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Fact-Checking Policy</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            Fact-Checking Policy
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            How we research, verify, and cross-reference information before sharing it with our readers to ensure maximum truthfulness.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6 text-base text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-black mt-4">1. Multi-Step Verification</h2>
            <p>
              Every post, review, and comparison table published on NewsTrendey undergoes a thorough verification process. This includes double-checking dates, brand claims, horsepower outputs, battery ranges, 5G signal speeds, and athlete match statistics.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">2. Reliable Sourcing Only</h2>
            <p>
              We prioritize primary sources like press kits, patent documents, manufacturer specs sheets, and peer-reviewed studies. If we must quote secondary sources or industry leaks, we clearly mark them as rumors or unverified insider reports. We do not treat speculation as fact.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">3. Expert Oversight</h2>
            <p>
              Our product and vehicle comparison pages are reviewed by writers with practical experience in the respective field. For technical or mechanical reviews, we cross-check recommendations against standards established by automotive associations, tech benchmark sites, and official athletic rules committees.
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-surface rounded-card p-6 border border-border space-y-6">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
              Fact-Checking Process
            </h4>
            <div className="flex gap-4 items-start">
              <ShieldCheck className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Source Authentication</h5>
                <p className="text-xs text-text-secondary">We trace all claims back to their official origin source.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckSquare className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Double Verification</h5>
                <p className="text-xs text-text-secondary">Every spec is verified against two independent sources.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Search className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Rumor Isolation</h5>
                <p className="text-xs text-text-secondary">Rumors are isolated and explicitly labeled to avoid confusion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
