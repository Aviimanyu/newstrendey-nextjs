import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Read the legal disclaimer governing the informational content and reviews provided on NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/disclaimer/",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Disclaimer</span>
        </nav>

        {/* Content Area */}
        <div className="max-w-4xl">
          <header className="mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              Disclaimer
            </h1>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-extrabold">
              Last Updated: May 31, 2026
            </p>
          </header>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed border-t border-border pt-8">
            <p>
              If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at <strong>info@newstrendey.com</strong>.
            </p>
            <p>
              All the information on this website — <strong>https://newstrendey.com</strong> — is published in good faith and for general informational and entertainment purposes only. NewsTrendey does not make any warranties about the completeness, reliability, and accuracy of this information.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">No Professional Automotive Advice</h3>
            <p>
              The automotive assessments, specifications lists, pricing indices, and comparisons on NewsTrendey are written based on manufacturer specifications, crash tests, and third-party data. They are not intended as official buying, mechanical, or structural engineering advice. Any action you take upon the information you find on this website is strictly at your own risk.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Affiliate &amp; Advertising Disclosure</h3>
            <p>
              This site may contain advertising links, banners, or affiliate product associations. We may receive commissions or referral fees if you purchase products or request insurance quotes through these links. This comes at no additional cost to you and helps us fund our editorial staff and news reporting.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Consent</h3>
            <p>
              By using our website, you hereby consent to our disclaimer and agree to its terms in full.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Reader Disclosure &amp; Affiliate Transparency</h3>
            <p className="bg-[#f1f7f7]/60 border border-border p-5 rounded-md text-sm text-text-secondary leading-relaxed font-light">
              We earn commission from Amazon purchases, at no cost to you. NewsTrendey is supported by our readers. When you click through our affiliate links to make purchases (such as Amazon accessories), we earn a commission. This directly funds our hands-on off-road trials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
