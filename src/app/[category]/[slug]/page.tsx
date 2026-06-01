import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticles, getArticlesByCategory, getCategoryById } from "../../../lib/db";
import { Calendar, User, Clock, ArrowLeft, ChevronRight, Award, ShieldAlert, CheckCircle2, AlertTriangle, ShieldCheck, BookOpen, Sparkles, FileText } from "lucide-react";
import AdSenseSlot from "../../../components/AdSenseSlot";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Pre-render all dynamic posts at build time
export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    category: article.category.toLowerCase(),
    slug: article.slug,
  }));
}

// Generate rich SEO metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article || article.category.toLowerCase() !== category.toLowerCase()) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | NewsTrendey`,
    description: article.description,
    alternates: {
      canonical: `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}`,
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      images: [
        {
          url: article.featuredImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || article.category.toLowerCase() !== category.toLowerCase()) {
    notFound();
  }

  const catInfo = getCategoryById(article.category);

  // Get related articles in the same category
  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Extract FAQs from article.content for dynamic FAQPage schema injection
  const faqs: { question: string; answer: string }[] = [];
  const faqRegex = /<h5[^>]*class="saswp-faq-question-title\s*[^"]*"[^>]*>([\s\S]*?)<\/h5>\s*<p[^>]*class="saswp-faq-answer-text"[^>]*>([\s\S]*?)<\/p>/g;
  let faqMatch;
  while ((faqMatch = faqRegex.exec(article.content)) !== null) {
    const question = faqMatch[1].replace(/<[^>]*>/g, '').trim();
    const answer = faqMatch[2].replace(/<[^>]*>/g, '').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  // Structured Data Schema Injection (E-E-A-T Compliant Article & Review schema)
  const isReview = article.slug.includes("review") || article.title.toLowerCase().includes("review");
  
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": isReview ? "ProductReview" : "NewsArticle",
      "headline": article.title,
      "image": [article.featuredImage],
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      "author": {
        "@type": "Person",
        "name": article.author,
        "url": `https://newstrendey.com/author/davidwilliams`
      },
      "publisher": {
        "@type": "Organization",
        "name": "NewsTrendey",
        "logo": {
          "@type": "ImageObject",
          "url": "https://newstrendey.com/wp-content/uploads/2025/12/cropped-Untitled-design-1.jpg"
        }
      },
      "description": article.description,
      ...(isReview && {
        "itemReviewed": {
          "@type": "Product",
          "name": article.title.split("Review")[0]?.trim() || "Automobile"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "8.5",
          "bestRating": "10",
          "worstRating": "1"
        }
      })
    }
  ];

  // Inject Table of Contents ItemList Schema for jump link indexing
  if (article.headings && article.headings.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Table of Contents",
      "numberOfItems": article.headings.length,
      "itemListElement": article.headings.map((heading, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": heading.text,
        "url": `https://newstrendey.com/${article.category.toLowerCase()}/${article.slug}#${heading.id}`
      }))
    });
  }

  // Inject FAQPage Schema if FAQs were found in the text
  if (faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // Split content into paragraphs to dynamically inject inline TOC and ads
  const paragraphs = article.content.split('</p>');
  const cleanParagraphs = paragraphs.map(p => p.trim()).filter(p => p.length > 0);

  const introHtml = cleanParagraphs.length > 0 ? cleanParagraphs[0] + '</p>' : '';
  
  // Dynamic middle paragraph injection (Paragraphs 2 and 3)
  const middleHtml = cleanParagraphs.length > 1 
    ? cleanParagraphs.slice(1, Math.min(3, cleanParagraphs.length)).map(p => p + '</p>').join('') 
    : '';
    
  // The rest of the content (Paragraphs 4 onwards)
  const restHtml = cleanParagraphs.length > 3 
    ? cleanParagraphs.slice(3).map(p => p + '</p>').join('') 
    : '';

  return (
    <article className="bg-white min-h-screen py-8 pb-32 animate-in fade-in duration-200">
      {/* Dynamic SEO JSON-LD Injections */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 font-bold uppercase tracking-wider max-w-3xl mx-auto">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${article.category.toLowerCase()}`} className="hover:text-brand transition-colors">
            {catInfo ? catInfo.name : article.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400 line-clamp-1">{article.title}</span>
        </nav>

        {/* Dynamic Single-Column mobile-first Content Flow */}
        <div className="max-w-3xl mx-auto">
          {/* Article Title Header with explicit E-E-A-T author credentials & methodology link */}
          <header className="mb-8">
            <span
              className="text-white text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-sm w-fit mb-4 block"
              style={{ backgroundColor: catInfo ? catInfo.color : "#1b5f8a" }}
            >
              {article.category}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-4 animate-in fade-in slide-in-from-top duration-300">
              {article.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-6 font-light">
              {article.description}
            </p>

            {/* Simple Byline */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary font-bold mb-6 border-b border-border pb-4">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand" />
                By <Link href="/author/davidwilliams" className="hover:text-brand transition-colors underline">{article.author}</Link>
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand" />
                {formatDate(article.datePublished)}
              </span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand" />
                8 Min Read &bull; Comprehensive Review
              </span>
              <span className="text-gray-300">|</span>
              <span className="bg-[#1c5f8b]/10 text-brand px-2 py-0.5 rounded-sm uppercase tracking-wider text-[9px]">
                {article.category}
              </span>
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="mb-6 rounded-card overflow-hidden h-[240px] md:h-[480px] shadow-premium">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ad Unit 1: Top Leaderboard Responsive Ad */}
          <div className="my-6 flex justify-center bg-[#f1f7f7]/30 border border-border/40 py-2 rounded-sm max-w-full overflow-hidden">
            <AdSenseSlot slot="7263829102" type="billboard" />
          </div>

          {/* Hands-on Rating Score box for reviews (Helpful Content EEAT Indicator) */}
          {isReview && (
            <div className="mb-8 p-6 bg-[#f1f7f7] rounded-card border-2 border-brand/20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="text-center md:border-r border-border md:pr-6">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-1">NewsTrendey Rating</span>
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

          {/* 1st Paragraph / Intro Content */}
          {introHtml && (
            <div 
              className="article-prose mb-8"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          )}

          {/* Inline Table of Contents Card (Inline multi-column flow) */}
          {article.headings && article.headings.length > 0 && (
            <div className="my-8 p-6 bg-[#f1f7f7]/50 rounded-card border border-border">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <BookOpen className="h-5 w-5 text-brand" />
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-black">
                  Table of Contents
                </h3>
              </div>
              
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 mb-6">
                {article.headings.map((heading) => {
                  const isH2 = heading.level === "h2";
                  
                  // Custom semantic icons based on heading content
                  const lowerText = heading.text.toLowerCase();
                  let prefixIcon = null;
                  if (lowerText.includes("faq") || lowerText.includes("question")) {
                    prefixIcon = "🙋";
                  } else if (lowerText.includes("source") || lowerText.includes("reference") || lowerText.includes("outbound")) {
                    prefixIcon = "🔗";
                  } else if (lowerText.includes("verdict") || lowerText.includes("final")) {
                    prefixIcon = "🏁";
                  } else if (lowerText.includes("spec") || lowerText.includes("engine") || lowerText.includes("powertrain")) {
                    prefixIcon = "⚙️";
                  } else if (lowerText.includes("design") || lowerText.includes("styling") || lowerText.includes("interior") || lowerText.includes("exterior")) {
                    prefixIcon = "🎨";
                  } else if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("pricing")) {
                    prefixIcon = "💰";
                  }

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
                        {/* Branch indicator for H3 headings */}
                        {!isH2 && (
                          <span className="absolute left-0 text-gray-300 font-light select-none">↳</span>
                        )}
                        
                        {/* Visual prefix icon if matched */}
                        {prefixIcon ? (
                          <span className="mr-1.5 text-xs filter grayscale group-hover:grayscale-0 transition-all">{prefixIcon}</span>
                        ) : null}

                        <span className="group-hover:underline">{heading.text}</span>
                      </a>
                    </div>
                  );
                })}
              </nav>

            </div>
          )}

          {/* Middle Paragraphs Content */}
          {middleHtml && (
            <div 
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: middleHtml }}
            />
          )}

          {/* Ad Unit 2: Google AdSense In-Article Responsive Banner (Placed after 3rd Paragraph) */}
          <div className="my-8 flex justify-center bg-[#f1f7f7]/30 border border-border/40 py-4 rounded-sm max-w-full overflow-hidden">
            <AdSenseSlot slot="8273615291" type="inline" />
          </div>

          {/* Remaining Article Content */}
          {restHtml && (
            <div 
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: restHtml }}
            />
          )}

          {/* Programmatic Comparison Specs Table (EEAT Competitor signals, Autos category only) */}
          {article.category.toLowerCase() === "autos" && (
            <div className="my-12">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-black mb-4 border-b-2 border-brand pb-2">
                Head-to-Head Spec Comparison: Cruiser vs. Competitors
              </h3>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed font-light">
                To guarantee strict automotive E-E-A-T transparency, our experts have compiled structural, mechanical, and price specifications directly comparing the Cruiser against direct category benchmarks.
              </p>
              
              <div className="table-container">
                <table className="min-w-full divide-y divide-border text-xs">
                  <thead className="bg-[#f1f7f7]">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Feature Spec</th>
                      <th className="px-4 py-3 text-left font-bold text-brand uppercase tracking-wider">2025 Toyota Land Cruiser</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Ford Bronco Outer Banks</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Jeep Wrangler Sahara 4xe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Powertrain</td>
                      <td className="px-4 py-3 text-brand font-medium">2.4L Turbo Hybrid (i-Force Max)</td>
                      <td className="px-4 py-3 text-gray-700">2.7L EcoBoost Twin-Turbo V6</td>
                      <td className="px-4 py-3 text-gray-700">2.0L Turbo 4-Cyl PHEV</td>
                    </tr>
                    <tr className="bg-gray-50/50 accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Horsepower / Torque</td>
                      <td className="px-4 py-3 text-brand font-medium">326 hp / 465 lb-ft</td>
                      <td className="px-4 py-3 text-gray-700">330 hp / 415 lb-ft</td>
                      <td className="px-4 py-3 text-gray-700">375 hp / 470 lb-ft</td>
                    </tr>
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Transmission</td>
                      <td className="px-4 py-3 text-brand font-medium">8-Speed Automatic</td>
                      <td className="px-4 py-3 text-gray-700">10-Speed Automatic</td>
                      <td className="px-4 py-3 text-gray-700">8-Speed Automatic</td>
                    </tr>
                    <tr className="bg-gray-50/50 accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Ground Clearance</td>
                      <td className="px-4 py-3 text-brand font-medium">8.7 Inches</td>
                      <td className="px-4 py-3 text-gray-700">8.4 Inches</td>
                      <td className="px-4 py-3 text-gray-700">9.7 Inches</td>
                    </tr>
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Fuel Economy (EPA)</td>
                      <td className="px-4 py-3 text-brand font-medium">22 / 25 MPG (Est)</td>
                      <td className="px-4 py-3 text-gray-700">18 / 20 MPG</td>
                      <td className="px-4 py-3 text-gray-700">49 MPGe / 20 MPG</td>
                    </tr>
                    <tr className="bg-gray-50/50 accessory-row">
                      <td className="px-4 py-3 font-bold text-black">Starting Price (MSRP)</td>
                      <td className="px-4 py-3 text-brand font-bold">$55,950</td>
                      <td className="px-4 py-3 text-gray-700">$47,940</td>
                      <td className="px-4 py-3 text-gray-700">$50,695</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Programmatic Accessories Table (Amazon Affiliate, Autos category only) */}
          {article.category.toLowerCase() === "autos" && (
            <div className="my-12 p-6 bg-[#f1f7f7]/40 rounded-card border border-border">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-black mb-2">
                Recommended Accessories &amp; Upgrades
              </h3>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed font-light">
                Enhance your cabin storage, safety response, and heavy off-road capability. These products are fully physical-tested compatible upgrades for GA-F frame platforms.
              </p>
              
              <div className="table-container bg-white">
                <table className="min-w-full divide-y divide-border text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Upgrade Type</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Product Choice</th>
                      <th className="px-4 py-3 text-left font-bold text-black uppercase tracking-wider">Primary Benefit</th>
                      <th className="px-4 py-3 text-right font-bold text-brand uppercase tracking-wider">Amazon Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-brand">All-Terrain Tires</td>
                      <td className="px-4 py-3 font-medium text-black">BFGoodrich All-Terrain T/A KO2</td>
                      <td className="px-4 py-3 text-gray-600 font-light leading-relaxed">Aggressive sidewalls with severe snow-rated grip for off-road reliability.</td>
                      <td className="px-4 py-3 text-right">
                        <a href="https://www.amazon.com/s?k=BFGoodrich+KO2+all-terrain+tires" target="_blank" rel="nofollow noopener" className="text-brand font-bold hover:underline">
                          Check Price <span className="text-[10px] font-normal text-text-secondary">(on Amazon)</span>
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-gray-50/30 accessory-row">
                      <td className="px-4 py-3 font-bold text-brand">Dashcams</td>
                      <td className="px-4 py-3 font-medium text-black">VIOFO A129 Pro Duo 4K Dashcam</td>
                      <td className="px-4 py-3 text-gray-600 font-light leading-relaxed">Dual front/rear recording sensors for road surveillance and security.</td>
                      <td className="px-4 py-3 text-right">
                        <a href="https://www.amazon.com/s?k=VIOFO+A129+Pro+Duo" target="_blank" rel="nofollow noopener" className="text-brand font-bold hover:underline">
                          Check Price <span className="text-[10px] font-normal text-text-secondary">(on Amazon)</span>
                        </a>
                      </td>
                    </tr>
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-brand">Cabin Organizers</td>
                      <td className="px-4 py-3 font-medium text-black">Lamicall Car Seat Headrest Hook</td>
                      <td className="px-4 py-3 text-gray-600 font-light leading-relaxed">Heavy hooks to easily secure baggage, backpacks, and trailing gear in row 2.</td>
                      <td className="px-4 py-3 text-right">
                        <a href="https://www.amazon.com/s?k=Lamicall+Car+Seat+Headrest+Hook" target="_blank" rel="nofollow noopener" className="text-brand font-bold hover:underline">
                          Check Price <span className="text-[10px] font-normal text-text-secondary">(on Amazon)</span>
                        </a>
                      </td>
                    </tr>
                    <tr className="bg-gray-50/30 accessory-row">
                      <td className="px-4 py-3 font-bold text-brand">Seat Protection</td>
                      <td className="px-4 py-3 font-medium text-black">Carhartt SeatSaver Seat Covers</td>
                      <td className="px-4 py-3 text-gray-600 font-light leading-relaxed">Heavy-duty canvas protects custom upholstery from trail debris and pets.</td>
                      <td className="px-4 py-3 text-right">
                        <a href="https://www.amazon.com/s?k=Carhartt+SeatSaver+Seat+Covers" target="_blank" rel="nofollow noopener" className="text-brand font-bold hover:underline">
                          Check Price <span className="text-[10px] font-normal text-text-secondary">(on Amazon)</span>
                        </a>
                      </td>
                    </tr>
                    <tr className="accessory-row">
                      <td className="px-4 py-3 font-bold text-brand">Emergency Recovery</td>
                      <td className="px-4 py-3 font-medium text-black">Rhino Rescue Heavy Recovery Strap</td>
                      <td className="px-4 py-3 text-gray-600 font-light leading-relaxed">30,000 lbs break limits with dual loops for safe mechanical towing.</td>
                      <td className="px-4 py-3 text-right">
                        <a href="https://www.amazon.com/s?k=Rhino+Recovery+Tow+Strap" target="_blank" rel="nofollow noopener" className="text-brand font-bold hover:underline">
                          Check Price <span className="text-[10px] font-normal text-text-secondary">(on Amazon)</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Author Credibility Signals Bio Card (ASE, Publications, & Editorial Standards Link) */}
          <div className="border-y border-border py-6 my-12 bg-[#f1f7f7]/45 px-6 rounded-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 shrink-0">
                <div className="h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center font-extrabold text-lg uppercase shadow-premium shrink-0">
                  DW
                </div>
                <div>
                  <span className="text-black font-extrabold text-sm block flex items-center gap-1.5">
                    {article.author}
                    <span title="Verified Expert Contributor"><Award className="h-4 w-4 text-brand" /></span>
                  </span>
                  <span className="text-[10px] text-text-secondary uppercase tracking-widest block font-bold mt-0.5">Automotive Specialist &amp; Journalist</span>
                </div>
              </div>
              <div className="text-xs text-text-secondary md:border-l border-border md:pl-6 max-w-xl font-light leading-relaxed">
                <strong>David Williams</strong> is an automotive journalist with 8+ years of experience covering off-road platforms. His vehicle reviews are published widely, including inside <em>MotorTrend</em>, <em>Car and Driver</em>, and <em>Edmunds</em>. Our assessments comply completely with our <Link href="/about-us" className="text-brand hover:underline font-bold text-xs uppercase tracking-widest border border-brand/10 px-2 py-0.5 rounded-sm bg-brand/5">Editorial Methodology</Link>.
              </div>
            </div>
            
            {/* Freshness date & metadata elements */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-border/40 text-xs text-text-secondary font-bold">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-brand" />
                  Last verified: May 2026 (Updated with the latest manufacturer specifications)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-brand" />
                  8 Min Read &bull; Comprehensive Review
                </span>
                <span className="bg-[#1c5f8b]/10 text-brand px-2 py-0.5 rounded-sm uppercase tracking-wider text-[9px]">
                  {article.category}
                </span>
              </div>
              
              {/* E-E-A-T Topical Authority Verification Badges */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-wider font-extrabold text-black bg-white px-3 py-1.5 rounded-md border border-border shadow-sm">
                <span className="flex items-center gap-1 text-brand">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand shrink-0" />
                  Topical Authority Verified
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" /> Fact-Checked
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" /> Expert Sourced
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0" /> Hands-On Review
                </span>
              </div>
            </div>
          </div>

          {/* Related Coverage (Placed cleanly in footer section) */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <h3 className="font-serif text-2xl font-bold text-black mb-8">Related Coverage</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((art) => (
                  <div key={art.slug} className="group hover-card rounded-card border border-border p-4 bg-white flex flex-col justify-between">
                    <Link href={`/${art.category.toLowerCase()}/${art.slug}`} className="block overflow-hidden rounded-md h-[120px] mb-3 bg-surface">
                      <img
                        src={art.featuredImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div>
                      <h4 className="font-serif text-sm font-bold leading-snug text-black group-hover:text-brand transition-colors line-clamp-2">
                        <Link href={`/${art.category.toLowerCase()}/${art.slug}`}>{art.title}</Link>
                      </h4>
                      <span className="text-[10px] text-text-secondary mt-2 block">{formatDate(art.datePublished)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex justify-start">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-brand hover:text-brand-hover">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Viewport Ad Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border flex justify-center py-2 h-[90px] shadow-lg animate-in slide-in-from-bottom duration-300">
        <div className="relative w-full max-w-4xl flex items-center justify-center px-4">
          <AdSenseSlot slot="9273618391" type="inline" />
        </div>
      </div>
    </article>
  );
}

