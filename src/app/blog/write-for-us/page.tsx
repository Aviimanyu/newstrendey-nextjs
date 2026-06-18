import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, 
  PenTool, 
  CheckCircle, 
  Mail, 
  HelpCircle, 
  DollarSign, 
  Award, 
  ArrowRight,
  ShieldAlert,
  Flame,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Write for Us: Submit a Guest Post (Auto, Tech, Sports & SEO)",
  description: "Submit a guest post or sponsored article to NewsTrendey. Write for us technology, automotive news, sports reviews, digital marketing, finance, and lifestyle.",
  alternates: {
    canonical: "https://newstrendey.com/blog/write-for-us/",
  },
};

export default function WriteForUsPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Visual Header Image Banner */}
      <div className="relative w-full h-[300px] md:h-[450px] bg-black overflow-hidden">
        <Image
          src="/images/typewriter.png"
          alt="Vintage Typewriter with Write for Us sheet"
          fill
          priority
          className="object-cover opacity-85 hover:scale-[1.01] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
          <div className="container-custom w-full">
            <span className="bg-[#991b1b] text-white text-xs uppercase tracking-widest font-extrabold px-3 py-1 rounded-sm w-fit mb-4 block">
              Editorial Guidelines
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight tracking-tight max-w-3xl">
              Write for Us: Submit a Guest Post
            </h1>
          </div>
        </div>
      </div>

      <div className="container-custom mt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Write for Us</span>
        </nav>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8 text-base text-gray-700 leading-relaxed">
            <section className="space-y-4">
              <p className="text-lg text-text-secondary leading-relaxed font-light">
                Do you have an expert perspective on automobiles, tech trends, athletic developments, or trending digital lifestyle sectors? We are actively seeking passionate writers, industry experts, and editorial thinkers to share high-quality insights with our audience.
              </p>
              <p>
                At <strong>NewsTrendey</strong>, we provide a premium editorial environment designed to give your voice authority. By submitting a guest post to our platform, you will get access to thousands of monthly readers, build your brand value, and gain high-quality exposure in your niche.
              </p>
            </section>

            {/* Monetization / Sponsored Placements Info */}
            <section className="bg-surface rounded-card p-6 border-l-4 border-brand border border-border shadow-low space-y-4">
              <div className="flex items-center gap-2 text-brand">
                <Flame className="h-6 w-6 text-brand" />
                <h3 className="font-serif text-xl font-bold text-black m-0">
                  Sponsored Post Opportunities & Fast Review
                </h3>
              </div>
              <p className="text-sm">
                We receive hundreds of editorial pitches daily. To help brand marketers, SEO agencies, and business owners looking to guarantee publication and secure quick, high-authority backlink placements, we offer a paid <strong>Sponsored Guest Post</strong> option:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-white p-4 rounded-md border border-border flex gap-3">
                  <CheckCircle className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-black mb-1">Standard Guest Post (Free)</h5>
                    <p className="text-xs text-gray-500">Subject to long queues, strict editorial veto, and links may be set to no-follow at our editors' discretion.</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-md border border-brand/20 flex gap-3">
                  <DollarSign className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm text-black mb-1">Sponsored Placement (Paid)</h5>
                    <p className="text-xs text-gray-500">Guaranteed 24-48 hour publishing, 1-2 permanent do-follow backlinks, and flexible promotional brand messaging.</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-secondary italic">
                * Note: If you are promoting a commercial product, SaaS company, or link-building client, your pitch falls under our Sponsored Placement tier. Email <a href="mailto:editor@newstrendey.com" className="text-brand hover:underline">editor@newstrendey.com</a> with the subject <strong>"Sponsored Placement Query"</strong> for pricing.
              </p>
            </section>

            {/* Accepted Niches & Keywords list for pSEO */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-black border-b-2 border-brand pb-2 inline-block">
                Niches & Categories We Accept
              </h2>
              <p>
                To provide our readers with diverse content, we welcome writers to write for us across our main programmatic channels. Below are the core topics we cover:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    Automotive & Vehicles
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    In-depth SUV comparisons, vehicle reviews, EV technologies, repair guides, and car purchasing tips. (Keywords: <em>write for us automotive</em>, <em>write for us auto</em>, <em>car write for us</em>)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    Technology & Software
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    SaaS reviews, AI developments, gadget roundups, and tech news. (Keywords: <em>write for us technology</em>, <em>write for us tech</em>, <em>write for us saas</em>, <em>write for us software</em>)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    SEO & Digital Marketing
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    Link building, keyword research, and digital branding. (Keywords: <em>write for us seo</em>, <em>seo write for us</em>, <em>digital marketing write for us</em>, <em>seo blog write for us</em>, <em>write for us blogging</em>)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    Sports, Gaming & Entertainment
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    NFL, athletic reviews, movie analysis, and game launches. (Keywords: <em>write for us sports</em>, <em>write for us entertainment</em>, <em>write for us games</em>)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    Finance & Business
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    Personal finance, commercial insurance, real estate tips, and corporate law. (Keywords: <em>finance write for us</em>, <em>write for us business</em>, <em>write for us real estate</em>, <em>write for us law</em>, <em>write for us insurance</em>)
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-black flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                    Lifestyle, Health & Home
                  </h4>
                  <p className="text-sm text-text-secondary pl-4">
                    Wellness, home improvement, interior design, fashion trends, and fitness. (Keywords: <em>write for us lifestyle</em>, <em>write for us fashion</em>, <em>write for us health</em>, <em>write for us home improvement</em>, <em>write for us gardening</em>, <em>write for us fitness</em>)
                  </p>
                </div>
              </div>
            </section>

            {/* Steps Section */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-black border-b-2 border-brand pb-2 inline-block">
                Steps to Submit Your Guest Post
              </h2>
              <div className="relative border-l-2 border-brand/20 pl-6 space-y-6 mt-4">
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 bg-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                  <h4 className="font-bold text-black text-sm mb-1">Pitch Your Topic</h4>
                  <p className="text-xs text-text-secondary">Send an email with your article title outline, reference links, and brief bio. Let us know if you want a free or paid sponsored tier.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 bg-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                  <h4 className="font-bold text-black text-sm mb-1">Write Your Draft</h4>
                  <p className="text-xs text-text-secondary">Once approved, write your article following our editorial guidelines, formatting standards, and linking rules.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 bg-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                  <h4 className="font-bold text-black text-sm mb-1">Editorial Review</h4>
                  <p className="text-xs text-text-secondary">Our editors will proofread, check for plagiarism, and format the structure. We will request edits if needed.</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 bg-brand text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                  <h4 className="font-bold text-black text-sm mb-1">Publication</h4>
                  <p className="text-xs text-text-secondary">Your article goes live! We will send you the live link, share it on our social feeds, and start indexation.</p>
                </div>
              </div>
            </section>

            {/* Editorial Guidelines */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-black border-b-2 border-brand pb-2 inline-block">
                Our Editorial Guidelines
              </h2>
              <p>
                To maintain the high quality of our platform, every <strong>write for us guest post</strong> must meet these specifications before publishing:
              </p>
              <ul className="space-y-3 pl-6 list-disc text-sm text-gray-700">
                <li><strong>Word Count:</strong> Articles must be between <strong>1,200 and 2,500 words</strong>. We do not accept short, thin, or low-value content.</li>
                <li><strong>Originality:</strong> Content must be 100% unique. We run automated plagiarism and AI checks. AI-spun content will be immediately blacklisted.</li>
                <li><strong>Formatting:</strong> Use standard hierarchy (H2, H3) with short paragraphs and bullet points to ensure readability.</li>
                <li><strong>Linking Rules:</strong> You may include 1 relevant external link to your own site and at least 2 links to authoritative external sources (Wikipedias, stats sites). All links must fit naturally within the context.</li>
                <li><strong>Media:</strong> Include at least 1 high-resolution featured image (copyright-free or owned by you) with credit.</li>
              </ul>
            </section>

            {/* Visual Plant Quote Card */}
            <div className="relative w-full h-[250px] bg-surface rounded-card overflow-hidden border border-border shadow-low mt-8">
              <Image
                src="/images/edit-mercy.png"
                alt="Workspace plant with framed text: Write without fear, edit without mercy"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-center">
                <p className="font-serif text-2xl md:text-3xl text-white font-extrabold italic drop-shadow-md">
                  "Write without fear. Edit without mercy."
                </p>
              </div>
            </div>

            {/* FAQ Accordion Section */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-black border-b-2 border-brand pb-2 inline-block">
                Frequently Asked Questions (FAQs)
              </h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-surface/50">
                  <h4 className="font-bold text-black text-sm flex gap-2 items-center">
                    <HelpCircle className="h-4 w-4 text-brand shrink-0" />
                    How long does it take for a free guest post review?
                  </h4>
                  <p className="text-xs text-text-secondary mt-2 pl-6">
                    Due to the high volume of daily submissions, review time for our standard free tier is typically <strong>2 to 4 weeks</strong>. We cannot guarantee publication if the content is not exceptionally detailed.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-surface/50">
                  <h4 className="font-bold text-black text-sm flex gap-2 items-center">
                    <HelpCircle className="h-4 w-4 text-brand shrink-0" />
                    Do you offer do-follow links for sponsored posts?
                  </h4>
                  <p className="text-xs text-text-secondary mt-2 pl-6">
                    Yes. Under our Sponsored Placement tier, we guarantee permanently active, <strong>do-follow backlink placements</strong>. These links are indexable by all search engine crawlers.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-surface/50">
                  <h4 className="font-bold text-black text-sm flex gap-2 items-center">
                    <HelpCircle className="h-4 w-4 text-brand shrink-0" />
                    Can I write for us if I am not a resident of the USA?
                  </h4>
                  <p className="text-xs text-text-secondary mt-2 pl-6">
                    Absolutely. We welcome global writers, experts, and agencies. However, the article must be written in fluent, grammatically correct English matching USA editorial standards.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Highlight Call to Action */}
          <div className="space-y-6">
            {/* Quick Contact Form Card */}
            <div className="bg-black text-white rounded-card p-6 border-t-4 border-[#991b1b] shadow-premium space-y-6">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#991b1b]" />
                Pitch Our Editors
              </h4>
              <div className="space-y-4">
                <p className="text-xs text-gray-400">
                  Ready to submit your article proposal? Get in touch with our editorial board today.
                </p>
                
                <div className="p-3 bg-white/5 rounded-md border border-white/10 space-y-2">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Direct Email</div>
                  <a 
                    href="mailto:editor@newstrendey.com" 
                    className="text-white hover:text-brand transition-colors text-sm font-bold block truncate"
                  >
                    editor@newstrendey.com
                  </a>
                </div>

                <div className="p-3 bg-white/5 rounded-md border border-white/10 space-y-2">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">What to Include</div>
                  <ul className="text-[11px] text-gray-400 space-y-1 pl-4 list-disc">
                    <li>3 proposed topics/headlines</li>
                    <li>Links to your previous writing samples</li>
                    <li>Indicate: standard guest post or sponsored inquiry</li>
                  </ul>
                </div>

                <a 
                  href="mailto:editor@newstrendey.com?subject=Guest%20Post%20Proposal%20-%20NewsTrendey" 
                  className="w-full bg-[#991b1b] hover:bg-red-800 text-white py-3 rounded-md text-xs font-bold flex items-center justify-center gap-2 transition-colors uppercase tracking-wider"
                >
                  Submit Your Pitch
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Keyword Search Helper (For SEO reference) */}
            <div className="bg-surface rounded-card p-6 border border-border space-y-4">
              <h4 className="text-sm font-extrabold uppercase tracking-widest text-black border-b border-border pb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-brand" />
                Opportunities List
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                If you are a freelance blogger, copywriter, or agency searching for portals to post on, we welcome submissions across:
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  "write for us technology", "seo write for us", "write for us sports", 
                  "write for us automotive", "digital marketing write for us", 
                  "write for us general", "finance write for us", "write for us guest post",
                  "write for us lifestyle", "write for us saas", "write for us blogging",
                  "seo blog write for us", "write for us seo", "write for us fashion"
                ].map((kw) => (
                  <span 
                    key={kw} 
                    className="text-[10px] bg-white text-gray-600 px-2 py-1 rounded-sm border border-border tracking-tight font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
