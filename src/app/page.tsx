import Link from "next/link";
import { getFeaturedArticles, getTrendingArticles, categories, getArticles } from "../lib/db";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Home() {
  const featured = getFeaturedArticles(4);
  const trending = getTrendingArticles(5);
  const allArticles = getArticles();

  // Pick the absolute main hero article (first one)
  const heroArticle = featured[0];
  const secondaryFeatured = featured.slice(1, 4);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* ================= HERO SECTION (Car and Driver Style) ================= */}
        {heroArticle && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Hero Card (2 columns) */}
            <div className="lg:col-span-2 flex flex-col justify-between group">
              <Link href={`/${heroArticle.category.toLowerCase()}/${heroArticle.slug}`} className="block overflow-hidden rounded-card relative h-[300px] lg:h-[500px] shadow-premium bg-surface">
                <img
                  src={heroArticle.featuredImage}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <span className="bg-brand text-white text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-sm w-fit mb-3">
                    {heroArticle.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-4xl text-white font-bold leading-tight tracking-tight group-hover:text-gray-300 transition-colors">
                    {heroArticle.title}
                  </h2>
                  <p className="mt-2 text-gray-300 line-clamp-2 text-sm max-w-2xl font-light">
                    {heroArticle.description}
                  </p>
                  <div className="mt-4 flex items-center text-xs text-gray-400 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(heroArticle.datePublished)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {heroArticle.author}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trending Sidebar widget (1 column) */}
            <div className="bg-surface rounded-card p-6 shadow-premium border border-border">
              <h3 className="text-lg font-extrabold uppercase tracking-widest text-brand border-b-2 border-brand pb-2 mb-6 flex items-center justify-between">
                <span>Trending Now</span>
                <span className="text-xs text-brand font-bold bg-brand/10 px-2 py-0.5 rounded-full">Hot</span>
              </h3>
              <div className="space-y-6">
                {trending.map((article, idx) => (
                  <div key={article.slug} className="flex gap-4 items-start group">
                    <span className="font-serif text-3xl font-extrabold text-brand/30 leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-grow">
                      <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand mb-1 block">
                        {article.category}
                      </span>
                      <Link
                        href={`/${article.category.toLowerCase()}/${article.slug}`}
                        className="font-bold text-sm text-black leading-tight block group-hover:text-brand transition-colors line-clamp-2"
                      >
                        {article.title}
                      </Link>
                      <span className="text-[10px] text-text-secondary mt-1 block">
                        {formatDate(article.datePublished)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SECONDARY HERO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {secondaryFeatured.map((article) => (
            <div key={article.slug} className="flex flex-col justify-between group hover-card rounded-card border border-border p-4 bg-white">
              <Link href={`/${article.category.toLowerCase()}/${article.slug}`} className="block overflow-hidden rounded-md h-[180px] mb-4 bg-surface relative">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-sm">
                  {article.category}
                </span>
              </Link>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/${article.category.toLowerCase()}/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-text-secondary line-clamp-3">
                    {article.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.datePublished)}
                  </span>
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= CATEGORY SEGMENTS (GeneratePress layout) ================= */}
        <div className="space-y-16">
          {categories.map((category) => {
            // Get newest 3 articles in this category
            const catArticles = allArticles
              .filter((art) => art.category.toLowerCase() === category.id.toLowerCase())
              .slice(0, 3);

            if (catArticles.length === 0) return null;

            return (
              <section key={category.id} className="border-t border-border pt-10">
                <div className="flex items-center justify-between mb-8">
                  <h3
                    className="font-serif text-2xl font-bold uppercase tracking-tight relative pl-4 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1"
                    style={{ borderLeftColor: category.color, borderLeftWidth: "4px" }}
                  >
                    {category.name}
                  </h3>
                  <Link
                    href={`/${category.id}`}
                    className="text-xs uppercase tracking-widest font-extrabold text-brand hover:text-brand-hover flex items-center gap-1 group"
                  >
                    <span>View All {category.name}</span>
                    <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {catArticles.map((article) => (
                    <article key={article.slug} className="group hover-card rounded-card border border-border p-4 bg-white flex flex-col justify-between">
                      <Link href={`/${article.category.toLowerCase()}/${article.slug}`} className="block overflow-hidden rounded-md h-[160px] mb-4 bg-surface">
                        <img
                          src={article.featuredImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-base font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                            <Link href={`/${article.category.toLowerCase()}/${article.slug}`}>{article.title}</Link>
                          </h4>
                          <p className="mt-2 text-xs text-text-secondary line-clamp-3">
                            {article.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.datePublished)}
                          </span>
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
