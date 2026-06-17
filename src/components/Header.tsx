"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES, translate } from "../lib/translate";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
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

  // Detect current language prefix from URL pathname
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const activeLang = SUPPORTED_LANGUAGES.includes(firstSegment as any) ? firstSegment : "en";

  // Construct localized navigation href
  const getLocalizedHref = (href: string) => {
    if (activeLang === "en") return href;
    if (href === "/") return `/${activeLang}/`;
    return `/${activeLang}${href}`;
  };

  const isActive = (href: string) => {
    const localized = getLocalizedHref(href);
    if (href === "/") {
      return pathname === localized;
    }
    return pathname.startsWith(localized);
  };

  // Rewrite current pathname for target language selection
  const getLanguagePath = (targetLang: string) => {
    let cleanPath = pathname;
    
    // Strip current language prefix if it exists
    if (activeLang !== "en") {
      cleanPath = pathname.replace(`/${activeLang}`, "");
    }
    
    // Ensure cleanPath starts with a slash
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    let targetPath = cleanPath;
    if (targetLang !== "en") {
      targetPath = `/${targetLang}${cleanPath}`;
    }

    // Clean up trailing slash
    if (!targetPath.endsWith("/")) {
      targetPath = targetPath + "/";
    }

    return targetPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm backdrop-blur-md bg-white/95">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <Link href={getLocalizedHref("/")} className="flex items-center gap-2 group">
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
                href={getLocalizedHref(item.href)}
                className={`py-2 border-b-2 transition-all ${
                  isActive(item.href)
                    ? "border-brand text-brand"
                    : "border-transparent text-black hover:text-brand hover:border-brand-hover"
                }`}
              >
                {translate(item.name, activeLang)}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Items */}
          <div className="hidden md:flex items-center gap-4 relative">
            <Link
              href={getLocalizedHref("/search/")}
              aria-label="Search articles"
              className="p-2 text-black hover:text-brand hover:bg-surface rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 text-black hover:text-brand hover:bg-surface rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="Select language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-xs font-bold uppercase">{activeLang}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-border rounded-md shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top duration-200">
                  <Link
                    href={getLanguagePath("en")}
                    onClick={() => setLangDropdownOpen(false)}
                    className={`block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-brand ${
                      activeLang === "en" ? "text-brand bg-brand/5" : "text-black"
                    }`}
                  >
                    English
                  </Link>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <Link
                      key={lang}
                      href={getLanguagePath(lang)}
                      onClick={() => setLangDropdownOpen(false)}
                      className={`block px-4 py-2 text-xs font-semibold hover:bg-surface hover:text-brand ${
                        activeLang === lang ? "text-brand bg-brand/5" : "text-black"
                      }`}
                    >
                      {LANGUAGE_NAMES[lang]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href={getLocalizedHref("/search/")}
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
                href={getLocalizedHref(item.href)}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "bg-surface text-brand"
                    : "text-black hover:bg-surface hover:text-brand"
                }`}
              >
                {translate(item.name, activeLang)}
              </Link>
            ))}

            {/* Mobile Language Selector */}
            <div className="border-t border-border mt-4 pt-4 px-4">
              <span className="text-[10px] text-text-secondary uppercase tracking-widest font-extrabold block mb-2">
                Language / Idioma
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href={getLanguagePath("en")}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-center py-2 border rounded text-xs font-bold ${
                    activeLang === "en" ? "border-brand text-brand bg-brand/5" : "border-border text-black"
                  }`}
                >
                  EN
                </Link>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <Link
                    key={lang}
                    href={getLanguagePath(lang)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-center py-2 border rounded text-xs font-bold ${
                      activeLang === lang ? "border-brand text-brand bg-brand/5" : "border-border text-black"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
