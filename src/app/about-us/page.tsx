import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Award, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, journalistic values, and editorial process behind NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/about-us/",
  },
};

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">About Us</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            About NewsTrendey
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            Welcome to NewsTrendey, your trusted source for timely, accurate, and unbiased news coverage.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6 text-base text-gray-700 leading-relaxed">
            <p>
              At NewsTrendey, our mission is to deliver high-quality, relevant updates across the global landscape, specialized in USA automobile news, emerging technology highlights, sports updates, and popular culture trends.
            </p>
            <p>
              We believe in the power of stories to inform, inspire, and connect communities. Our dedicated editorial team combines seasoned research, hands-on reviews, and thorough assessments to present articles that carry true authority.
            </p>
            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Our Commitment</h3>
            <p>
              Whether we are comparing three-row SUV models, detailing AT&amp;T vs T-Mobile 5G performance speeds, or covering Pro Bowl snubs, our readers are always our first priority. We focus on clear layouts, zero decorative bloat, and highly digestible information matrices.
            </p>
          </div>

          {/* Sidebar Highlights */}
          <div className="bg-surface rounded-card p-6 border border-border space-y-6">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
              Editorial Pillars
            </h4>
            <div className="flex gap-4 items-start">
              <ShieldCheck className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Absolute Integrity</h5>
                <p className="text-xs text-text-secondary">Unbiased vehicle tests, commercial-free ratings, and fact-checked specifications.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Award className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Journalistic Authority</h5>
                <p className="text-xs text-text-secondary">Our contributors carry years of mechanical, technical, and analytical background.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Heart className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Reader First Focus</h5>
                <p className="text-xs text-text-secondary">Creating structured tables, rich FAQ schema, and fast-loading dynamic layout structures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
