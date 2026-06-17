"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getArticles, categories } from "../../lib/db";
import { Article } from "../../types";
import { Search, Calendar, ChevronRight } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [results, setResults] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load all articles on client mount
    getArticles().then((articles) => {
      setAllArticles(articles);
    });
  }, []);

  useEffect(() => {
    let filtered = allArticles;

    // Filter by query
    if (query.trim()) {
      const cleanQuery = query.toLowerCase().trim();
      filtered = filtered.filter(
        (art) =>
          (art.title && art.title.toLowerCase().includes(cleanQuery)) ||
          (art.description && art.description.toLowerCase().includes(cleanQuery)) ||
          (art.content && art.content.toLowerCase().includes(cleanQuery))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (art) => art.category && art.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setResults(filtered);
  }, [query, selectedCategory, allArticles]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white min-h-screen py-8 animate-in fade-in duration-200">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Search</span>
        </nav>

        {/* Search Header Banner */}
        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-6">
            Search Coverage
          </h1>
          
          {/* Main Search Input Form */}
          <div className="relative max-w-2xl bg-surface rounded-full border border-border p-1 flex items-center shadow-premium focus-within:ring-2 focus-within:ring-brand/40 focus-within:border-brand transition-all">
            <Search className="h-5 w-5 text-gray-400 ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search by keywords, models, or topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-black px-4 py-3 text-base placeholder-gray-400"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-surface rounded-card border border-border sticky top-24">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3 mb-4">
                Categories
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-colors ${
                    selectedCategory === "all"
                      ? "bg-brand text-white"
                      : "text-black hover:bg-white"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-brand text-white"
                        : "text-black hover:bg-white hover:text-brand"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <main className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center text-xs uppercase tracking-wider font-extrabold text-text-secondary">
              <span>Results</span>
              <span>{results.length} articles found</span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.map((article) => (
                  <article
                    key={article.slug}
                    className="group hover-card rounded-card border border-border p-4 bg-white flex flex-col justify-between"
                  >
                    <Link
                      href={`/${article.category.toLowerCase()}/${article.slug}/`}
                      className="block overflow-hidden rounded-md h-[160px] mb-4 bg-surface relative"
                    >
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand mb-1 block">
                          {article.category}
                        </span>
                        <h2 className="font-serif text-sm font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                          <Link href={`/${article.category.toLowerCase()}/${article.slug}/`}>{article.title}</Link>
                        </h2>
                        <p className="mt-2 text-xs text-text-secondary line-clamp-3">
                          {article.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-secondary font-bold">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-brand" />
                          {formatDate(article.datePublished)}
                        </span>
                        <span>By {article.author}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-surface rounded-card border border-border">
                <p className="text-text-secondary italic">No articles match your search criteria. Try different keywords.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchClient() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen py-8 text-center uppercase tracking-widest text-xs font-bold text-gray-400">
        Loading search coverage...
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
