import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Learn about the journalistic standards, ethics, and editorial values that guide the publishing process at NewsTrendey.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Editorial Policy</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            Editorial Policy &amp; Standards
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            At NewsTrendey, we are committed to maintaining the highest levels of editorial integrity, transparency, and accuracy across all our publications.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6 text-base text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-black mt-4">1. Journalistic Integrity and Objectivity</h2>
            <p>
              Our primary responsibility is to provide accurate, balanced, and unbiased information. We cover automotive journalism, emerging technology, sports highlights, and entertainment with professional distance and independent scrutiny.
            </p>
            <p>
              We do not shape or edit our reporting to suit advertisers, commercial partners, or political affiliations. Our testing metrics, comparison ratings, and opinions are driven strictly by evidence and thorough hands-on analysis.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">2. Sourcing Guidelines</h2>
            <p>
              Our writers rely on primary, verified sources whenever possible. This includes official automobile manufacturer data, accredited technology releases, direct athlete transcripts, and certified academic or research journals.
            </p>
            <p>
              We attribute all information gathered from external sources clearly. We do not engage in rumors or publish claims without verifying them through multiple independent corroborating channels.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">3. Conflict of Interest Policy</h2>
            <p>
              NewsTrendey editorial staff members are prohibited from accepting personal compensation, gifts, or favors that could influence the tone or outcomes of our reviews. Any sponsored content is explicitly identified as advertisements or promotional partnerships and is kept entirely separate from our editorial coverage.
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-surface rounded-card p-6 border border-border space-y-6">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
              Editorial Pillars
            </h4>
            <div className="flex gap-4 items-start">
              <ShieldCheck className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Independent Reviews</h5>
                <p className="text-xs text-text-secondary">Our vehicle tests and product evaluations are completely independent.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <FileText className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Primary Sourcing</h5>
                <p className="text-xs text-text-secondary">We prioritize official spec sheets and direct expert insights.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Trust Verification</h5>
                <p className="text-xs text-text-secondary">All articles go through our editorial review queue before publication.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
