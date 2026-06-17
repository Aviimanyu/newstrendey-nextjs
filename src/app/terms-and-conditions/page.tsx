import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Read the terms of use governing your access to and interactions with NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/terms-and-conditions/",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Terms &amp; Conditions</span>
        </nav>

        {/* Content Area */}
        <div className="max-w-4xl">
          <header className="mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-extrabold">
              Last Updated: May 31, 2026
            </p>
          </header>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed border-t border-border pt-8">
            <p>
              Welcome to NewsTrendey! These Terms and Conditions govern your use of the NewsTrendey website, located at <strong>https://newstrendey.com</strong>.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use NewsTrendey if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Intellectual Property Rights</h3>
            <p>
              Unless otherwise stated, NewsTrendey and/or its licensors own the intellectual property rights for all material on NewsTrendey. All intellectual property rights are reserved. You may access this from NewsTrendey for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p>You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Republish material, tables, specs, or reviews from NewsTrendey without explicit written attribution.</li>
              <li>Sell, rent, or sub-license material from the site.</li>
              <li>Reproduce, duplicate, or copy material for commercial syndication.</li>
            </ul>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">User Comments</h3>
            <p>
              Parts of this website may offer users the opportunity to post and exchange opinions and information. NewsTrendey does not filter, edit, publish, or review comments prior to their presence on the website. Comments do not reflect the views of NewsTrendey, its agents, or affiliates.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Disclaimer &amp; Liability</h3>
            <p>
              We do not guarantee that the information on this website is correct, complete, or accurate; nor do we promise that the website remains available or that the material on the website is kept up to date. Any reliance on automotive reviews, prices, or technical specs is at your own risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
