import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, HelpCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description: "Learn how NewsTrendey handles factual errors, correction logs, and editorial transparency.",
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Corrections Policy</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            Corrections Policy
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            We strive for 100% accuracy in our reporting. When factual errors occur, we commit to correcting them promptly and transparently.
          </p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          <div className="lg:col-span-2 space-y-6 text-base text-gray-700 leading-relaxed">
            <h2 className="font-serif text-2xl font-bold text-black mt-4">1. Prompt Rectification</h2>
            <p>
              When a factual error is brought to our attention, our editorial team immediately investigates the claim. If we confirm an error, we correct the article as quickly as possible. This applies to misstated figures, names, specs, dates, and spelling mistakes that alter the meaning of a sentence.
            </p>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">2. Transparency &amp; Clarification Notes</h2>
            <p>
              Minor typos, punctuation errors, or grammatical slips are corrected silently to maintain readability. However, major corrections that change the substance or facts of an article are marked clearly with a **Correction Note** at the bottom of the article.
            </p>
            <p>
              A correction note will explain:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The date the correction was made.</li>
              <li>What information was originally published.</li>
              <li>The corrected fact.</li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-black mt-6">3. Submitting a Correction</h2>
            <p>
              We welcome feedback from readers, manufacturers, and industry professionals. If you spot a factual error or believe a statement lacks necessary context, please contact us at:
            </p>
            <p className="font-bold">
              Email: contact@newstrendey.com
            </p>
            <p>
              Please include the URL of the article, the specific paragraph containing the error, and a link to a verified source or document demonstrating the correct facts.
            </p>
          </div>

          {/* Sidebar */}
          <div className="bg-surface rounded-card p-6 border border-border space-y-6">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
              Transparency Focus
            </h4>
            <div className="flex gap-4 items-start">
              <ShieldCheck className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Open Clarification</h5>
                <p className="text-xs text-text-secondary">We never hide errors; we clarify them in an open correction notice.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <AlertCircle className="h-6 w-6 text-brand shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-black mb-1">Factual Priority</h5>
                <p className="text-xs text-text-secondary">Correcting wrong vehicle specs or dates is prioritized by our team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
