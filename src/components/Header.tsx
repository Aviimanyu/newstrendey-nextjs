"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShieldAlert } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Autos & Vehicles", href: "/autos/" },
    { name: "Compare SUVs", href: "/autos/compare/" },
    { name: "Technology", href: "/technology/" },
    { name: "Sports", href: "/sports/" },
    { name: "Entertainment", href: "/entertainment/" },
    { name: "Rankings", href: "/rankings/" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm backdrop-blur-md bg-white/95">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span 
                className="text-white px-3 py-1 rounded-sm text-lg font-extrabold uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#991b1b" }}
              >
                NT
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-black group-hover:text-brand transition-colors">
                NewsTrendey
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-bold uppercase tracking-wider">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`py-2 border-b-2 transition-all ${
                  isActive(item.href)
                    ? "border-brand text-brand"
                    : "border-transparent text-black hover:text-brand hover:border-brand-hover"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Items */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/search"
              aria-label="Search articles"
              className="p-2 text-black hover:text-brand hover:bg-surface rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/search"
              aria-label="Search articles"
              className="p-2 text-black hover:text-brand hover:bg-surface rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-surface rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-in slide-in-from-top duration-200">
          <div className="space-y-1 px-4 py-4 uppercase tracking-wider font-bold text-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-surface text-brand"
                    : "text-black hover:bg-surface hover:text-brand"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
