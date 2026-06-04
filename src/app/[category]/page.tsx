import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getArticlesByCategory, categories } from "../../lib/db";
import { Calendar, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const catInfo = getCategoryById(category);
  
  if (!catInfo) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${catInfo.name} | NewsTrendey`,
    description: catInfo.description,
    alternates: {
      canonical: `https://newstrendey.com/${catInfo.id}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const catInfo = getCategoryById(category);

  if (!catInfo) {
    notFound();
  }

  const articles = await getArticlesByCategory(catInfo.id);

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
          <span className="text-gray-400">{catInfo.name}</span>
        </nav>

        {/* Category Header (Car and Driver Style) */}
        <header
          className="p-8 rounded-card mb-12 relative overflow-hidden border border-border"
          style={{ borderLeftColor: catInfo.color, borderLeftWidth: "6px", backgroundColor: "#f1f7f7" }}
        >
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-extrabold mb-2 block" style={{ color: catInfo.color }}>
              Editorial Feed
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              {catInfo.name}
            </h1>
            <p className="text-text-secondary leading-relaxed font-light text-sm md:text-base">
              {catInfo.description}
            </p>
          </div>
        </header>

        {/* Grid Card Listing */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group hover-card rounded-card border border-border p-4 bg-white flex flex-col justify-between"
              >
                <Link
                  href={`/${article.category}/${article.slug}`}
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
                    <h2 className="font-serif text-base font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                      <Link href={`/${article.category}/${article.slug}`}>{article.title}</Link>
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
                    <span>By {article.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-card border border-border">
            <p className="text-text-secondary italic">No articles found in this category at this moment.</p>
            <Link href="/" className="mt-4 inline-block text-xs uppercase tracking-widest font-extrabold text-brand hover:underline">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
