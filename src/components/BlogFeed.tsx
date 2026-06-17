"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Article } from "../types";
import { Calendar, User, Search, BookOpen, ShieldCheck, CheckCircle2, Award, Clock, ArrowRight, ExternalLink } from "lucide-react";


interface BlogFeedProps {
  initialArticles: Article[];
}

export default function BlogFeed({ initialArticles }: BlogFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categoriesList = [
    { id: "all", name: "All Analysis" },
    { id: "autos", name: "Autos & Vehicles" },
    { id: "technology", name: "Technology" },
    { id: "sports", name: "Sports" },
    { id: "entertainment", name: "Entertainment" },
  ];

  // Filter articles by category and search query
  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0] || initialArticles[0];
  const gridArticles = filteredArticles.slice(1);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container-custom">
        {/* ================= TESTED HERO BRAND BANNER ================= */}
        <div className="border-b border-[#f1f7f7] pb-8 mb-8">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1c5f8b] mb-2 block bg-[#f1f7f7] px-3 py-1 rounded-sm w-fit">
            Tested &amp; Evaluated
          </span>
          <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tight text-black leading-tight mb-4">
            Tested: Deep Editorial Reviews &amp; Analyses
          </h1>
          <p className="text-sm md:text-base text-[#666666] max-w-3xl leading-relaxed">
            We put cars, consumer electronics, athletic scoreboards, and entertainment systems through rigorous, real-world evaluations. Transparent data, verified references, and strict adherence to editorial integrity.
          </p>
        </div>

        {/* ================= AFFILIATE TRANSPARENCY DISCLOSURE ================= */}
        <div className="bg-[#f1f7f7] border border-[#e5e5e5] rounded-md p-4 mb-10 text-[11px] text-[#666666] leading-relaxed flex items-start gap-2.5">
          <ShieldCheck className="h-4.5 w-4.5 text-[#1c5f8b] shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-black block mb-0.5 uppercase tracking-wide text-[10px]">Reader Disclosure &amp; Affiliate Transparency</span>
            NewsTrendey is supported by our readers. When you purchase or click through links on our platform, we may earn an affiliate commission from our partners (such as Edmunds, Amazon, or Kelley Blue Book) at no extra cost to you. This directly funds our independent testing and expert automotive evaluations.
          </div>
        </div>

        {/* ================= FEATURED "TESTED" HERO ARTICLE ================= */}
        {featuredArticle && searchQuery === "" && (
          <div className="bg-white rounded-md border border-[#f1f7f7] overflow-hidden shadow-low p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 hover:border-[#1c5f8b]/30 transition-all duration-300">
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#1c5f8b] mb-3 block">
                  Featured Review
                </span>
                <Link href={`/${featuredArticle.category.toLowerCase()}/${featuredArticle.slug}/`}>
                  <h2 className="font-serif text-2xl md:text-4xl font-bold text-black hover:text-[#1c5f8b] transition-colors leading-tight mb-4">
                    Tested: {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-xs md:text-sm text-[#666666] leading-relaxed mb-6 font-light">
                  {featuredArticle.description}
                </p>
              </div>

              <div className="space-y-6">
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-[10px] text-[#666666] font-bold border-t border-[#f1f7f7] pt-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#1c5f8b]" />
                    {formatDate(featuredArticle.datePublished)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-[#1c5f8b]" />
                    By {featuredArticle.author}
                  </span>
                  <span className="bg-[#1c5f8b]/10 text-[#1c5f8b] px-2 py-0.5 rounded-sm uppercase tracking-wider text-[9px]">
                    {featuredArticle.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/${featuredArticle.category.toLowerCase()}/${featuredArticle.slug}/`}>
                    <button 
                      className="btn-filled cursor-pointer inline-flex items-center gap-2 hover:bg-[#1b5f8a] transition-all"
                      style={{
                        background: "#1c5f8b",
                        color: "#ffffff",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        fontSize: "12px",
                        fontWeight: 500,
                        border: "1px solid rgb(255, 255, 255)"
                      }}
                    >
                      Read Analysis Report <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                  
                  {/* Affiliate Link Deal Button */}
                  <a 
                    href="https://www.edmunds.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <button 
                      className="cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#f1f7f7] transition-all"
                      style={{
                        background: "#ffffff",
                        color: "#1c5f8b",
                        borderRadius: "4px",
                        padding: "12px 20px",
                        fontSize: "12px",
                        fontWeight: 700,
                        border: "1px solid #1c5f8b"
                      }}
                    >
                      Check Local Deals <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </a>
                </div>
              </div>
            </div>
            
            <Link 
              href={`/${featuredArticle.category.toLowerCase()}/${featuredArticle.slug}/`}
              className="block overflow-hidden rounded-md h-[240px] md:h-[380px] w-full relative bg-[#f1f7f7]"
            >
              <Image
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover hover:scale-[1.02] transition-transform duration-500"
              />
            </Link>
          </div>
        )}



        {/* ================= INTERACTIVE FILTER & SEARCH BAR ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-[#f1f7f7] pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#1c5f8b] text-white shadow-low"
                    : "bg-[#f1f7f7] text-[#666666] hover:bg-[#e2eeee] hover:text-black"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search evaluations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#f1f7f7] rounded-md bg-[#f1f7f7] text-xs text-black placeholder-[#666666] focus:outline-none focus:border-[#1c5f8b]/50 focus:bg-white transition-all"
            />
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#666666]" />
          </div>
        </div>

        {/* ================= ARTICLES FEED GRID ================= */}
        {filteredArticles.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* If it's a search result, show all, otherwise show grid starting from 2nd item */}
              {(searchQuery !== "" ? filteredArticles : gridArticles).map((article, idx) => (
                <Fragment key={article.slug}>
                  <article
                    className="group bg-white rounded-md border border-[#f1f7f7] p-4 flex flex-col justify-between hover:border-[#1c5f8b]/20 hover:shadow-low transition-all duration-300"
                  >
                    <Link
                      href={`/${article.category.toLowerCase()}/${article.slug}/`}
                      className="block overflow-hidden rounded-md h-[180px] mb-4 bg-[#f1f7f7] relative"
                    >
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-white/90 text-[#1c5f8b] text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-sm shadow-low">
                        {article.category}
                      </span>
                    </Link>

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <Link href={`/${article.category.toLowerCase()}/${article.slug}/`}>
                          <h3 className="font-serif text-base font-bold leading-snug text-black group-hover:text-[#1c5f8b] transition-colors line-clamp-2 mb-2">
                            {article.title}
                          </h3>
                        </Link>
                        <p className="text-[11px] text-[#666666] line-clamp-3 leading-relaxed mb-4">
                          {article.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#f1f7f7] flex flex-col gap-3 text-[10px] text-[#666666] font-bold">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-[#1c5f8b]" />
                            {formatDate(article.datePublished)}
                          </span>
                          
                          <Link 
                            href={`/${article.category.toLowerCase()}/${article.slug}/`}
                            className="text-[#1c5f8b] hover:underline inline-flex items-center gap-0.5 hover:text-[#1b5f8a] font-bold"
                          >
                            Read Analysis →
                          </Link>
                        </div>
                        
                        {/* Affiliate CTA for each individual card */}
                        <a 
                          href="https://www.edmunds.com/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full text-center py-2 bg-[#f1f7f7] hover:bg-[#1c5f8b] hover:text-white rounded-sm text-[#1c5f8b] font-extrabold uppercase tracking-wider text-[9px] border border-[#1c5f8b]/10 hover:border-transparent transition-all"
                        >
                          Check Inventory Deals &rarr;
                        </a>
                      </div>
                    </div>
                  </article>
                  

                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#f1f7f7] rounded-md border border-[#f1f7f7] mb-16">
            <p className="text-[#666666] italic text-xs mb-4">No reviews or evaluation reports match your current search.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="px-4 py-2 bg-[#1c5f8b] text-white text-xs font-bold rounded-md hover:bg-[#1b5f8a] transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ================= E-E-A-T EDITORIAL STANDARDS CARD ================= */}
        <div className="bg-[#f1f7f7] rounded-md border border-[#f1f7f7] p-8 mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-[#1c5f8b] font-bold text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="h-5 w-5 text-[#1c5f8b]" />
              <span>Tested Quality Guidelines</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-black mb-3">
              Rigorous Standards. Uncompromising Integrity.
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed max-w-2xl font-light">
              Unlike traditional clickbait feeds, NewsTrendey focuses strictly on E-E-A-T criteria. Every review featured on this index undergoes strict validation against official crash-test scores, detailed manufacturer engineering diagrams, and hands-on assessments. Our lead contributor David Williams reviews all specifications prior to publication.
            </p>
          </div>
          
          <div className="space-y-3 lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="flex items-center gap-2 text-xs font-bold text-black">
              <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
              <span>100% Fact-Checked Content</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-black">
              <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
              <span>Zero Generated Filler Text</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-black">
              <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
              <span>Verified Outbound References</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-black">
              <CheckCircle2 className="h-4.5 w-4.5 text-green-600 shrink-0" />
              <span>Transparent Testing Methods</span>
            </div>
          </div>
        </div>

        {/* ================= PREMIUM NEWSLETTER SIGNUP ================= */}
        <div className="border border-[#f1f7f7] rounded-md p-8 md:p-12 text-center max-w-3xl mx-auto bg-white shadow-low">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#1c5f8b] mb-2 block">
            Stay Ahead of the Curve
          </span>
          <h3 className="font-serif text-xl md:text-3xl font-bold text-black mb-4">
            Subscribe to Our "Tested" Weekly Newsletter
          </h3>
          <p className="text-xs text-[#666666] leading-relaxed mb-6 max-w-xl mx-auto">
            Get early access to high-performance vehicle reviews, tech breakdowns, and sports analyses directly in your inbox. No spam. Just expert insight.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-3 border border-[#f1f7f7] rounded-md text-xs text-black placeholder-[#666666] bg-[#f1f7f7] focus:outline-none focus:border-[#1c5f8b]/50 focus:bg-white transition-all"
              required
            />
            <button
              type="submit"
              className="cursor-pointer transition-all hover:bg-neutral-800"
              style={{
                background: "#000000",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "12px 20px",
                fontSize: "12px",
                fontWeight: 700,
                border: "none"
              }}
            >
              Subscribe to Analysis
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
