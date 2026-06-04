import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "../components/Header";

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
              <p>&copy; {new Date().getFullYear()} NewsTrendey.com. All rights reserved. Rebuilt with Next.js &amp; Headless WordPress.</p>
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
