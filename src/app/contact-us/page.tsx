import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the editorial, press, and advertising teams at NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/contact-us/",
  },
};

export default function ContactUsPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Contact Us</span>
        </nav>

        {/* Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
            Contact NewsTrendey
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light">
            We value feedback from our readers and partners. Select the appropriate channel below to get in touch.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-surface rounded-card p-8 border border-border">
            <h3 className="font-serif text-xl font-bold text-black mb-6">Send A Message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-extrabold text-black mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-extrabold text-black mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-extrabold text-black mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-extrabold text-black mb-2">Message</label>
                <textarea
                  rows={6}
                  required
                  className="w-full bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none"
                ></textarea>
              </div>
              <button
                type="button"
                className="btn-filled hover:bg-brand-hover transition-colors font-bold uppercase tracking-wider text-xs px-6 py-3 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Directory Sidebar */}
          <div className="space-y-8">
            <div className="bg-surface rounded-card p-6 border border-border space-y-6">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
                Corporate Directory
              </h4>
              <div className="flex gap-4 items-start">
                <Mail className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">Editorial Team</h5>
                  <p className="text-xs text-text-secondary mt-1">editor@newstrendey.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">General Press</h5>
                  <p className="text-xs text-text-secondary mt-1">info@newstrendey.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">Advertising &amp; Sales</h5>
                  <p className="text-xs text-text-secondary mt-1">sales@newstrendey.com</p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-card p-6 border border-border space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3">
                Headquarters
              </h4>
              <div className="flex gap-4 items-start text-xs text-text-secondary">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>100 Motor City Blvd, Detroit, MI 48201</span>
              </div>
              <div className="flex gap-4 items-start text-xs text-text-secondary">
                <Phone className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>+1 (800) 555-AUTO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
