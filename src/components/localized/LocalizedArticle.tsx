import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "../../lib/posts";
import { getCategoryById, getArticles } from "../../lib/db";
import { Calendar, User, Clock, ArrowLeft, ChevronRight, Award, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck, BookOpen } from "lucide-react";
import { SUPPORTED_LANGUAGES, translate, translateHtml } from "../../lib/translate";

interface PageProps {
  params: Promise<{ lang: string; category: string; slug: string }>;
}



export async function generateStaticParamsHelper() {
  const articles = await getArticles();
  const paths = [];
  for (const art of articles) {
    if (art.slug && art.category) {
      paths.push({
        category: art.category.toLowerCase(),
        slug: art.slug,
      });
    }
  }
  return paths;
}

export async function generateMetadataHelper(category: string, slug: string, lang: string) {
  
  const article = await getPostBySlug(slug);
  
  if (!article || article.category !== category.toLowerCase() || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    return {
      title: "Article Not Found",
    };
  }

  const title = `${translate(article.title, lang)} | NewsTrendey`;
  const description = translate(article.seo?.metaDesc || article.description, lang);
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://newstrendey.com/${lang}/${article.category}/${article.slug}/`,
      languages: {
        "x-default": `https://newstrendey.com/${article.category}/${article.slug}/`,
        "en": `https://newstrendey.com/${article.category}/${article.slug}/`,
        "es": `https://newstrendey.com/es/${article.category}/${article.slug}/`,
        "fr": `https://newstrendey.com/fr/${article.category}/${article.slug}/`,
        "de": `https://newstrendey.com/de/${article.category}/${article.slug}/`,
        "pt": `https://newstrendey.com/pt/${article.category}/${article.slug}/`,
        "it": `https://newstrendey.com/it/${article.category}/${article.slug}/`,
      }
    },
  };
}

export default async function LocalizedArticlePage({ category, slug, lang }: { category: string; slug: string; lang: string }) {
  
  const article = await getPostBySlug(slug);
  
  if (!article || article.category !== category.toLowerCase() || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    notFound();
  }

  const catInfo = getCategoryById(article.category);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const isReview = article.slug.includes("review") || article.title.toLowerCase().includes("review");
  const translatedTitle = translate(article.title, lang);
  const translatedDesc = translate(article.description, lang);

  // Schema Injection
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": isReview ? "Review" : "NewsArticle",
      "headline": translatedTitle,
      "image": [article.featuredImage],
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      "url": `https://newstrendey.com/${lang}/${article.category}/${article.slug}/`,
      "author": {
        "@type": "Person",
        "name": article.author,
        "url": "https://newstrendey.com/author/davidwilliams/"
      },
      "publisher": {
        "@type": "Organization",
        "name": "NewsTrendey",
        "logo": {
          "@type": "ImageObject",
          "url": "https://newstrendey.com/favicon.ico"
        }
      },
      "description": translatedDesc
    }
  ];

  // Pre-process body content for lazy loading and language translations
  let processedContent = article.content || "";
  processedContent = translateHtml(processedContent, lang);
  processedContent = processedContent.replace(/<img\s+(?![^>]*loading=)/gi, '<img loading="lazy" decoding="async" ');

  const paragraphs: string[] = processedContent.split('</p>');
  const cleanParagraphs = paragraphs.map(p => p.trim()).filter(p => p.length > 0);

  const introHtml = cleanParagraphs.length > 0 ? cleanParagraphs[0] + '</p>' : '';
  const middleHtml = cleanParagraphs.length > 1 
    ? cleanParagraphs.slice(1, Math.min(3, cleanParagraphs.length)).map(p => p + '</p>').join('') 
    : '';
  const restHtml = cleanParagraphs.length > 3 
    ? cleanParagraphs.slice(3).map(p => p + '</p>').join('') 
    : '';

  return (
    <article className="bg-white min-h-screen py-8 pb-16 animate-in fade-in duration-200">
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 font-bold uppercase tracking-wider max-w-3xl mx-auto">
          <Link href={`/${lang}/`} className="hover:text-brand transition-colors">{translate("Home", lang)}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${lang}/${article.category}/`} className="hover:text-brand transition-colors">
            {catInfo ? translate(catInfo.name, lang) : translate(article.category, lang)}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400 line-clamp-1">{translatedTitle}</span>
        </nav>

        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <span
              className="text-white text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-sm w-fit mb-4 block"
              style={{ backgroundColor: catInfo ? catInfo.color : "#1b5f8a" }}
            >
              {translate(article.category, lang)}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-4">
              {translatedTitle}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6 font-light">
              {translatedDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary font-bold mb-6 border-b border-border pb-4">
              <span>{translate("By", lang)} {article.author}</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(article.datePublished)}
              </span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="mb-6 rounded-card overflow-hidden h-[240px] md:h-[480px] shadow-premium relative">
            <Image
              src={article.featuredImage || "/placeholder.jpg"}
              alt={translatedTitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          </div>

          {/* Rating box */}
          {isReview && (
            <div className="mb-8 p-6 bg-[#f1f7f7] rounded-card border-2 border-brand/20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center md:border-r border-border md:pr-6">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-1">Rating</span>
                <span className="font-serif text-5xl font-black text-brand">8.5<span className="text-2xl text-text-secondary">/10</span></span>
              </div>
              <div className="md:col-span-2 space-y-2">
                <h4 className="font-bold text-sm text-black flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Pros: Outstanding powertrain torque, premium tech interface.
                </h4>
                <h4 className="font-bold text-sm text-black flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  Cons: Base pricing trim compromises, restricted rear headroom.
                </h4>
              </div>
            </div>
          )}

          {/* Intro paragraph */}
          {introHtml && (
            <div 
              className="article-prose mb-8"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          )}

          {/* Table of Contents */}
          {article.headings && article.headings.length > 0 && (
            <div className="my-8 p-6 bg-[#f1f7f7]/50 rounded-card border border-border">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">
                  {translate("Table of Contents", lang)}
                </h3>
              </div>
              
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 mb-6">
                {article.headings.map((heading: any) => {
                  const isH2 = heading.level === "h2";
                  return (
                    <div key={heading.id} className="relative group">
                      <a
                        href={`#${heading.id}`}
                        className={`flex items-start transition-all duration-200 group-hover:text-brand ${
                          isH2 
                            ? "font-bold text-black uppercase tracking-wider text-[10px] leading-tight" 
                            : "font-normal text-text-secondary pl-3.5 text-[11px] leading-snug"
                        }`}
                      >
                        {!isH2 && <span className="absolute left-0 text-gray-300 select-none">↳</span>}
                        <span className="group-hover:underline">{translate(heading.text, lang)}</span>
                      </a>
                    </div>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Middle Content */}
          {middleHtml && (
            <div 
              className="article-prose mb-8"
              dangerouslySetInnerHTML={{ __html: middleHtml }}
            />
          )}

          {/* Rest Content */}
          {restHtml && (
            <div 
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: restHtml }}
            />
          )}

          {/* Localized Spec Comparison Table (Autos only) */}
          {article.category === "autos" && (
            <div className="my-12">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-black mb-4 border-b-2 border-brand pb-2">
                {translate("Specifications Comparison Grid", lang)}: Cruiser vs. Competitors
              </h3>
              <div className="table-container">
                <table className="min-w-full divide-y divide-border text-xs">
                  <thead className="bg-[#f1f7f7]">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">{translate("Feature Spec", lang)}</th>
                      <th className="px-4 py-3 text-left font-bold text-brand uppercase tracking-wider">2025 Toyota Land Cruiser</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Ford Bronco Outer Banks</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Jeep Wrangler Sahara 4xe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-black">{translate("Engine Type", lang)}</td>
                      <td className="px-4 py-3 text-brand font-medium">2.4L Turbo Hybrid (i-Force Max)</td>
                      <td className="px-4 py-3 text-gray-700">2.7L EcoBoost Twin-Turbo V6</td>
                      <td className="px-4 py-3 text-gray-700">2.0L Turbo 4-Cyl PHEV</td>
                    </tr>
                    <tr className="bg-gray-50/50 accessory-row">
                      <td className="px-4 py-3 font-bold text-black">{translate("Horsepower", lang)} / {translate("Torque", lang)}</td>
                      <td className="px-4 py-3 text-brand font-medium">326 hp / 465 lb-ft</td>
                      <td className="px-4 py-3 text-gray-700">330 hp / 415 lb-ft</td>
                      <td className="px-4 py-3 text-gray-700">375 hp / 470 lb-ft</td>
                    </tr>
                    <tr className="bg-gray-50/50 accessory-row">
                      <td className="px-4 py-3 font-bold text-black">{translate("Ground Clearance", lang)}</td>
                      <td className="px-4 py-3 text-brand font-medium">8.7 Inches</td>
                      <td className="px-4 py-3 text-gray-700">8.4 Inches</td>
                      <td className="px-4 py-3 text-gray-700">9.7 Inches</td>
                    </tr>
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-black">{translate("Base MSRP", lang)}</td>
                      <td className="px-4 py-3 text-brand font-bold">$55,950</td>
                      <td className="px-4 py-3 text-gray-700">$47,940</td>
                      <td className="px-4 py-3 text-gray-700">$50,695</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Author Card */}
          <div className="border-y border-border py-6 my-12 bg-[#f1f7f7]/45 px-6 rounded-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 shrink-0">
                <div className="h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-lg uppercase shadow-premium shrink-0">
                  DW
                </div>
                <div>
                  <span className="text-black font-extrabold text-sm block">
                    {article.author}
                  </span>
                </div>
              </div>
              <div className="text-xs text-text-secondary md:border-l border-border md:pl-6 max-w-xl font-light leading-relaxed">
                David Williams is an automotive journalist review editor at NewsTrendey.
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-start">
            <Link href={`/${lang}/`} className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand hover:text-brand-hover">
              <ArrowLeft className="h-4 w-4" />
              <span>{translate("Home", lang)}</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
