import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how NewsTrendey collects, uses, protects, and discloses personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Privacy Policy</span>
        </nav>

        {/* Content Area */}
        <div className="max-w-4xl">
          <header className="mb-12">
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-text-secondary uppercase tracking-widest font-extrabold">
              Last Updated: May 31, 2026
            </p>
          </header>

          <div className="space-y-6 text-base text-gray-700 leading-relaxed border-t border-border pt-8">
            <p>
              At NewsTrendey, accessible from <strong>https://newstrendey.com</strong>, the privacy of our visitors is one of our top priorities. This Privacy Policy document explains how we collect, use, and safeguard your personal data when you browse our website.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Information We Collect</h3>
            <p>
              When you visit NewsTrendey, we may collect certain standard information automatically, such as your IP address, browser type, operating system, referring URL, pages viewed, and access timestamps.
            </p>
            <p>
              If you contact us directly via email or the contact form, we may collect your name, email address, phone number, and any other details you provide in your message.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">How We Use Your Information</h3>
            <p>We use the collected details to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain, operate, and optimize our website for speed.</li>
              <li>Analyze reader behavior to improve our automobile news and tech review coverage.</li>
              <li>Communicate with you regarding updates, newsletters, or customer support queries.</li>
              <li>Detect, prevent, and address technical or security issues.</li>
            </ul>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Cookies and Web Beacons</h3>
            <p>
              Like most websites, NewsTrendey utilizes &apos;cookies&apos; to store information about visitors&apos; preferences and history. This enables us to customize web page content based on browser types and user patterns. Third-party advertising partners (such as Google AdSense) may also use cookies to serve personalized ads based on your visits.
            </p>

            <h3 className="font-serif text-xl font-bold text-black mt-8 mb-4">Contact Information</h3>
            <p>
              If you have any questions or require more details regarding our privacy guidelines, please reach out to us at <strong>privacy@newstrendey.com</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
