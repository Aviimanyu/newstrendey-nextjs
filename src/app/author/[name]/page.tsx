import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "../../../lib/db";
import { Calendar, User, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  return [
    { name: "davidwilliams" },
    { name: "iavifitnessbusinessgmail-com" }
  ];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "David Williams, Editorial Contributor",
    description: "Read the latest auto news, vehicle assessments, tech reviews, and sports recaps from journalist David Williams on NewsTrendey.",
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const articles = getArticles();

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
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Author</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">David Williams</span>
        </nav>

        {/* Journalist Bio Banner */}
        <div className="p-8 rounded-card mb-12 border border-border bg-surface flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="h-24 w-24 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-4xl uppercase shadow-premium shrink-0">
            DW
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-brand mb-1 block">
              Editorial Contributor &amp; Journalist
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              David Williams
            </h1>
            <p className="text-text-secondary leading-relaxed font-light text-sm md:text-base max-w-4xl">
              David Williams is a veteran automotive journalist and engineering consultant. Over the past 12 years, he has reviewed over 250 vehicles, specialized in high-performance powertrain architecture, and tracked emerging technologies like autonomous driving, multi-row EVs, and advanced driver-assist systems.
            </p>
          </div>
        </div>

        {/* Author Articles Grid */}
        <h3 className="font-serif text-2xl font-bold text-black mb-8 border-b-2 border-brand pb-2 inline-block">
          Recent Articles By David
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group hover-card rounded-card border border-border p-4 bg-white flex flex-col justify-between"
            >
              <Link
                href={`/${article.category.toLowerCase()}/${article.slug}`}
                className="block overflow-hidden rounded-md h-[180px] mb-4 bg-surface"
              >
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand mb-1 block">
                    {article.category}
                  </span>
                  <h2 className="font-serif text-base font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                    <Link href={`/${article.category.toLowerCase()}/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <p className="mt-2 text-xs text-text-secondary line-clamp-3 leading-relaxed">
                    {article.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-secondary font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-brand" />
                    {formatDate(article.datePublished)}
                  </span>
                  <span>{article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
