import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategoryById, getArticlesByCategory, categories } from "../../lib/db";
import { Calendar, ChevronRight } from "lucide-react";
import { SUPPORTED_LANGUAGES, translate } from "../../lib/translate";

interface PageProps {
  params: Promise<{ lang: string; category: string }>;
}



export async function generateStaticParamsHelper() {
  return categories.map((cat) => ({
    category: cat.id,
  }));
}

export async function generateMetadataHelper(category: string, lang: string) {
  
  const catInfo = getCategoryById(category);
  
  if (!catInfo || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `${translate(catInfo.name, lang)} | NewsTrendey`;
  const description = translate(catInfo.description, lang);

  return {
    title,
    description,
    alternates: {
      canonical: `https://newstrendey.com/${lang}/${catInfo.id}/`,
      languages: {
        "x-default": `https://newstrendey.com/${catInfo.id}/`,
        "en": `https://newstrendey.com/${catInfo.id}/`,
        "es": `https://newstrendey.com/es/${catInfo.id}/`,
        "fr": `https://newstrendey.com/fr/${catInfo.id}/`,
        "de": `https://newstrendey.com/de/${catInfo.id}/`,
        "pt": `https://newstrendey.com/pt/${catInfo.id}/`,
        "it": `https://newstrendey.com/it/${catInfo.id}/`,
      }
    },
  };
}

export default async function LocalizedCategoryPage({ category, lang }: { category: string; lang: string }) {
  
  const catInfo = getCategoryById(category);

  if (!catInfo || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    notFound();
  }

  const articles = await getArticlesByCategory(catInfo.id);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": translate("Home", lang),
        "item": `https://newstrendey.com/${lang}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": translate(catInfo.name, lang),
        "item": `https://newstrendey.com/${lang}/${catInfo.id}/`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen py-8">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href={`/${lang}/`} className="hover:text-brand transition-colors">{translate("Home", lang)}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">{translate(catInfo.name, lang)}</span>
        </nav>

        {/* Category Header */}
        <header
          className="p-8 rounded-card mb-12 relative overflow-hidden border border-border"
          style={{ borderLeftColor: catInfo.color, borderLeftWidth: "6px", backgroundColor: "#f1f7f7" }}
        >
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-extrabold mb-2 block" style={{ color: catInfo.color }}>
              {translate("Editorial Feed", lang)}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight text-black mb-4">
              {translate(catInfo.name, lang)}
            </h1>
            <p className="text-text-secondary leading-relaxed font-light text-sm md:text-base">
              {translate(catInfo.description, lang)}
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
                  href={`/${lang}/${article.category.toLowerCase()}/${article.slug}/`}
                  className="block overflow-hidden rounded-md h-[180px] mb-4 bg-surface relative"
                >
                  <Image
                    src={article.featuredImage}
                    alt={translate(article.title, lang)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-base font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                      <Link href={`/${lang}/${article.category.toLowerCase()}/${article.slug}/`}>{translate(article.title, lang)}</Link>
                    </h2>
                    <p className="mt-2 text-xs text-text-secondary line-clamp-3 leading-relaxed">
                      {translate(article.description, lang)}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-[10px] text-text-secondary font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brand" />
                      {formatDate(article.datePublished)}
                    </span>
                    <span>{translate("By", lang)} {article.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-surface rounded-card border border-border">
            <p className="text-text-secondary italic">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
