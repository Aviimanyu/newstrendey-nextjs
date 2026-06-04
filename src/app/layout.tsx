import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "../components/Header";
import React from "react";

// Custom inline SVG icons for social media brands
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NewsTrendey - USA Automobile News, Tech Reviews & Sports",
    template: "%s | NewsTrendey"
  },
  description: "Your ultimate destination for the latest USA automobile news, car reviews, tech innovations, and trending sports updates.",
  metadataBase: new URL("https://newstrendey.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-black font-sans selection:bg-brand/20 selection:text-brand">
        {/* Sticky Global Header */}
        <Header />
        
        {/* Main Workspace */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Global Premium Footer (Car and Driver Inspired) */}
        <footer className="bg-black text-white py-12 border-t-4 border-brand">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand Profile */}
              <div className="md:col-span-2">
                <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span 
                    className="text-white px-3 py-1 rounded-sm text-lg font-extrabold uppercase tracking-widest"
                    style={{ backgroundColor: "#991b1b" }}
                  >
                    NT
                  </span>
                  <span className="font-serif">NewsTrendey</span>
                </Link>
                <p className="mt-4 text-gray-400 max-w-sm text-sm">
                  Expert automotive journalism, breaking vehicle reviews, emerging tech trends, and comprehensive athletic scoreboards. Designed with absolute editorial integrity.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <a 
                    href="https://facebook.com/newstrendey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 text-gray-400 hover:bg-[#991b1b] hover:text-white rounded-full transition-all duration-200"
                    aria-label="Follow us on Facebook"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://www.instagram.com/newstrendey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 text-gray-400 hover:bg-[#991b1b] hover:text-white rounded-full transition-all duration-200"
                    aria-label="Follow us on Instagram"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://x.com/newstrendey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 text-gray-400 hover:bg-[#991b1b] hover:text-white rounded-full transition-all duration-200"
                    aria-label="Follow us on X (Twitter)"
                  >
                    <XIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Category Links */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-300 mb-4">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/autos" className="hover:text-brand transition-colors">Autos &amp; Vehicles</Link></li>
                  <li><Link href="/technology" className="hover:text-brand transition-colors">Technology</Link></li>
                  <li><Link href="/sports" className="hover:text-brand transition-colors">Sports</Link></li>
                  <li><Link href="/entertainment" className="hover:text-brand transition-colors">Entertainment</Link></li>
                </ul>
              </div>
              
              {/* Corporate Links */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-gray-300 mb-4">Corporate</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/about-us" className="hover:text-brand transition-colors">About Us</Link></li>
                  <li><Link href="/contact-us" className="hover:text-brand transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className="hover:text-brand transition-colors">Terms &amp; Conditions</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-brand transition-colors">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Fine Print */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
              <p>&copy; {new Date().getFullYear()} NewsTrendey.com. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
                <Link href="/terms-and-conditions" className="hover:underline">Terms</Link>
                <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
