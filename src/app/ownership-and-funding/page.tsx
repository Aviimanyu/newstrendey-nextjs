import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, DollarSign, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Ownership & Funding Info",
  description: "Get transparent details about the ownership, operating group, and funding structure behind NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/ownership-and-funding/",
  },
};

export default function OwnershipAndFundingPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Ownership &amp; Funding</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            Ownership &amp; Funding Info
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            NewsTrendey is dedicated to editorial transparency. Learn who owns, operates, and funds our website.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6 text-base text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-black mt-4">1. Ownership &amp; Operation</h2>
            <p>
              NewsTrendey.com is an independent digital news and review publication owned and operated by **NewsTrendey Media Group**. 
            </p>
            <p>
              Our operations are entirely directed by our core editorial staff. We do not have parent corporations, venture backing, or holding conglomerates that dictate our publication schedule, content choices, or ratings.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">2. Funding Model</h2>
            <p>
              To keep our journalism and reviews free and accessible to all readers without a paywall, NewsTrendey is funded primarily through:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>**Display Advertising**: We display ads provided by networks such as Google AdSense. These ads are automatically served and marked clearly.</li>
              <li>**Affiliate Links**: When you click a link to a merchant site and purchase a product or service, we may earn a small referral commission. This does not increase the price you pay.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">3. Advertising Independence</h2>
            <p>
              Our funding partners have zero influence on our reviews. If a vehicle or device receives a low rating, that rating remains unchanged regardless of any advertising campaigns that merchant runs on our pages. Our editorial staff does not know which ads are showing to individual users.
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-surface rounded-card p-6 border border-border space-y-6">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
              Trust Principles
            </h4>
            <div className="flex gap-4 items-start">
              <ShieldCheck className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Independent Voice</h5>
                <p className="text-xs text-text-secondary">We are privately owned and operate with complete independence.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <DollarSign className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Clear Funding</h5>
                <p className="text-xs text-text-secondary">Supported entirely through standard ads and affiliate partnerships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
