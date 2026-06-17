export const revalidate = 3600;
export const dynamicParams = true;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Award, Star } from "lucide-react";
import vehiclesData from "../../../../data/vehicles.json";

interface Vehicle {
  id: string;
  name: string;
  msrp: number;
  engine: string;
  horsepower: number;
  torque: number;
  fuelEconomyCity: number;
  fuelEconomyHighway: number;
  groundClearance: number;
  cargoSpaceSeatsUp: number;
  cargoSpaceSeatsDown: number;
  seatingCapacity: number;
  pros: string[];
  cons: string[];
  description: string;
  image: string;
}

const vehicles = vehiclesData as Vehicle[];

function resolveVehicles(slug: string) {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const v1 = vehicles.find((v) => v.id === parts[0]);
  const v2 = vehicles.find((v) => v.id === parts[1]);
  if (!v1 || !v2) return null;
  return { v1, v2 };
}

// Dynamic dynamic page metadata
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = resolveVehicles(slug);

  if (!resolved) {
    return {
      title: "Comparison Not Found",
    };
  }

  const { v1, v2 } = resolved;
  const title = `${v1.name} vs ${v2.name} Head-to-Head Comparison | NewsTrendey`;
  const description = `Compare the ${v1.name} and ${v2.name} specs side-by-side. Analyze MSRP, horsepower, torque, ground clearance, cargo space, and off-road capability.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://newstrendey.com/autos/compare/${slug}/`,
      languages: {
        "x-default": `https://newstrendey.com/autos/compare/${slug}/`,
        "en": `https://newstrendey.com/autos/compare/${slug}/`,
        "es": `https://newstrendey.com/es/autos/compare/${slug}/`,
        "fr": `https://newstrendey.com/fr/autos/compare/${slug}/`,
        "de": `https://newstrendey.com/de/autos/compare/${slug}/`,
        "pt": `https://newstrendey.com/pt/autos/compare/${slug}/`,
        "it": `https://newstrendey.com/it/autos/compare/${slug}/`,
      }
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://newstrendey.com/autos/compare/${slug}/`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CompareDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resolved = resolveVehicles(slug);

  if (!resolved) {
    notFound();
  }

  const { v1, v2 } = resolved;

  // Analysis variables
  const priceDiff = Math.abs(v1.msrp - v2.msrp);
  const cheaperVehicle = v1.msrp < v2.msrp ? v1 : v2;
  const expensiveVehicle = v1.msrp > v2.msrp ? v1 : v2;

  const powerDiff = Math.abs(v1.horsepower - v2.horsepower);
  const powerfulVehicle = v1.horsepower > v2.horsepower ? v1 : v2;

  const torqueDiff = Math.abs(v1.torque - v2.torque);
  const torqueyVehicle = v1.torque > v2.torque ? v1 : v2;

  const clearanceDiff = Math.abs(v1.groundClearance - v2.groundClearance);
  const higherVehicle = v1.groundClearance > v2.groundClearance ? v1 : v2;

  const cargoDiff = Math.abs(v1.cargoSpaceSeatsDown - v2.cargoSpaceSeatsDown);
  const roomyVehicle = v1.cargoSpaceSeatsDown > v2.cargoSpaceSeatsDown ? v1 : v2;

  // Schema Injections
  const compareSchema = {
    "@context": "https://schema.org",
    "@type": "CompareAction",
    "name": `${v1.name} vs ${v2.name} Comparison`,
    "description": `Specs and pricing comparison between ${v1.name} and ${v2.name}.`,
    "actionStatus": "CompletedActionStatus",
    "target": `https://newstrendey.com/autos/compare/${slug}/`,
    "participant": [
      {
        "@type": "Product",
        "name": v1.name,
        "description": v1.description,
        "offers": {
          "@type": "Offer",
          "price": v1.msrp,
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Product",
        "name": v2.name,
        "description": v2.description,
        "offers": {
          "@type": "Offer",
          "price": v2.msrp,
          "priceCurrency": "USD"
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://newstrendey.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Autos",
        "item": "https://newstrendey.com/autos/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Compare",
        "item": "https://newstrendey.com/autos/compare/"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": `${v1.name} vs ${v2.name}`,
        "item": `https://newstrendey.com/autos/compare/${slug}/`
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen py-8 pb-32 animate-in fade-in duration-200">
      {/* Inject schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 font-bold uppercase tracking-wider max-w-4xl mx-auto">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/autos/" className="hover:text-brand transition-colors">Autos</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/autos/compare/" className="hover:text-brand transition-colors">Compare</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">{v1.name} vs {v2.name}</span>
        </nav>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto mb-6">
          <Link href="/autos/compare/" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand hover:text-brand-hover transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Comparison Hub
          </Link>
        </div>

        {/* Header Title Section */}
        <header className="max-w-4xl mx-auto mb-10 text-center md:text-left">
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-sm text-xs font-extrabold uppercase tracking-widest mb-4 inline-block">
            Head-To-Head SUV Battle
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-4">
            {v1.name} vs {v2.name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light max-w-3xl">
            An in-depth specification and pricing breakdown comparing the {v1.name} and {v2.name}. Read our editorial analysis and verdict below.
          </p>
        </header>

        {/* Comparative Banner Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-surface rounded-card border border-border p-6 shadow-sm flex flex-col justify-between hover:border-brand/40 transition-colors duration-200">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-2">Participant A</span>
              <h2 className="font-serif text-xl font-bold text-black mb-3">{v1.name}</h2>
              <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">{v1.description}</p>
            </div>
            <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">Base MSRP</span>
              <span className="font-serif text-lg font-extrabold text-black">${v1.msrp.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-card border border-border p-6 shadow-sm flex flex-col justify-between hover:border-brand/40 transition-colors duration-200">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-2">Participant B</span>
              <h2 className="font-serif text-xl font-bold text-black mb-3">{v2.name}</h2>
              <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">{v2.description}</p>
            </div>
            <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">Base MSRP</span>
              <span className="font-serif text-lg font-extrabold text-black">${v2.msrp.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Core Specs Table */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-bold text-black mb-6 border-b border-border pb-2">
            Specifications Comparison Grid
          </h2>
          <div className="table-container bg-white border border-border rounded-card overflow-hidden">
            <table className="min-w-full divide-y divide-border text-xs">
              <thead className="bg-[#f1f7f7]">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-black uppercase tracking-wider">Metric Spec</th>
                  <th className="px-6 py-4 text-left font-bold text-brand uppercase tracking-wider">{v1.name}</th>
                  <th className="px-6 py-4 text-left font-bold text-black uppercase tracking-wider">{v2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {/* MSRP */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Base MSRP</td>
                  <td className={`px-6 py-4 ${v1.msrp < v2.msrp ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    ${v1.msrp.toLocaleString()} {v1.msrp < v2.msrp && "(Cheaper)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.msrp < v1.msrp ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    ${v2.msrp.toLocaleString()} {v2.msrp < v1.msrp && "(Cheaper)"}
                  </td>
                </tr>

                {/* Engine */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Engine Type</td>
                  <td className="px-6 py-4 text-gray-700">{v1.engine}</td>
                  <td className="px-6 py-4 text-gray-700">{v2.engine}</td>
                </tr>

                {/* Horsepower */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Horsepower</td>
                  <td className={`px-6 py-4 ${v1.horsepower > v2.horsepower ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.horsepower} hp {v1.horsepower > v2.horsepower && "(Higher)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.horsepower > v1.horsepower ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.horsepower} hp {v2.horsepower > v1.horsepower && "(Higher)"}
                  </td>
                </tr>

                {/* Torque */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Torque</td>
                  <td className={`px-6 py-4 ${v1.torque > v2.torque ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.torque} lb-ft {v1.torque > v2.torque && "(Higher)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.torque > v1.torque ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.torque} lb-ft {v2.torque > v1.torque && "(Higher)"}
                  </td>
                </tr>

                {/* Fuel Economy City */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">City Fuel Economy</td>
                  <td className={`px-6 py-4 ${v1.fuelEconomyCity > v2.fuelEconomyCity ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.fuelEconomyCity} mpg {v1.fuelEconomyCity > v2.fuelEconomyCity && "(More Efficient)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.fuelEconomyCity > v1.fuelEconomyCity ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.fuelEconomyCity} mpg {v2.fuelEconomyCity > v1.fuelEconomyCity && "(More Efficient)"}
                  </td>
                </tr>

                {/* Fuel Economy Highway */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Highway Fuel Economy</td>
                  <td className={`px-6 py-4 ${v1.fuelEconomyHighway > v2.fuelEconomyHighway ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.fuelEconomyHighway} mpg {v1.fuelEconomyHighway > v2.fuelEconomyHighway && "(More Efficient)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.fuelEconomyHighway > v1.fuelEconomyHighway ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.fuelEconomyHighway} mpg {v2.fuelEconomyHighway > v1.fuelEconomyHighway && "(More Efficient)"}
                  </td>
                </tr>

                {/* Ground Clearance */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Ground Clearance</td>
                  <td className={`px-6 py-4 ${v1.groundClearance > v2.groundClearance ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.groundClearance} Inches {v1.groundClearance > v2.groundClearance && "(Higher)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.groundClearance > v1.groundClearance ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.groundClearance} Inches {v2.groundClearance > v1.groundClearance && "(Higher)"}
                  </td>
                </tr>

                {/* Seating */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Seating Capacity</td>
                  <td className="px-6 py-4 text-gray-700">{v1.seatingCapacity} Passengers</td>
                  <td className="px-6 py-4 text-gray-700">{v2.seatingCapacity} Passengers</td>
                </tr>

                {/* Cargo Space seats down */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">Max Cargo Space</td>
                  <td className={`px-6 py-4 ${v1.cargoSpaceSeatsDown > v2.cargoSpaceSeatsDown ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.cargoSpaceSeatsDown} cu-ft {v1.cargoSpaceSeatsDown > v2.cargoSpaceSeatsDown && "(Roomier)"}
                  </td>
                  <td className={`px-6 py-4 ${v2.cargoSpaceSeatsDown > v1.cargoSpaceSeatsDown ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.cargoSpaceSeatsDown} cu-ft {v2.cargoSpaceSeatsDown > v1.cargoSpaceSeatsDown && "(Roomier)"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons side-by-side */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* v1 Pros & Cons */}
          <div className="border border-border rounded-card p-6 bg-surface">
            <h3 className="font-serif text-lg font-bold text-black mb-4 pb-2 border-b border-border">
              {v1.name} Pros &amp; Cons
            </h3>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 block">Advantages</span>
              {v1.pros.map((pro, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 block pt-2">Drawbacks</span>
              {v1.cons.map((con, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>

          {/* v2 Pros & Cons */}
          <div className="border border-border rounded-card p-6 bg-surface">
            <h3 className="font-serif text-lg font-bold text-black mb-4 pb-2 border-b border-border">
              {v2.name} Pros &amp; Cons
            </h3>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 block">Advantages</span>
              {v2.pros.map((pro, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 block pt-2">Drawbacks</span>
              {v2.cons.map((con, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial comparison paragraphs */}
        <section className="max-w-4xl mx-auto mb-16 space-y-8 text-base text-gray-700 leading-relaxed article-prose">
          <h2 className="font-serif text-2xl font-bold text-black border-b border-border pb-2 mb-6">
            Editorial Analysis &amp; Verdict
          </h2>
          
          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">1. Price and Value Assessment</h3>
            <p>
              Looking at pricing, the <strong>{v1.name}</strong> starts at a base MSRP of <strong>${v1.msrp.toLocaleString()}</strong>, whereas the <strong>{v2.name}</strong> starts at <strong>${v2.msrp.toLocaleString()}</strong>. This creates a financial difference of <strong>${priceDiff.toLocaleString()}</strong>. The more budget-friendly pick is the <strong>{cheaperVehicle.name}</strong>, which allows buyers to save on initial acquisition costs or allocate those resources toward optional recovery gear and luxury packages.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">2. Performance &amp; Drivetrain Analysis</h3>
            <p>
              Under the hood, the <strong>{v1.name}</strong> features a {v1.engine} producing <strong>{v1.horsepower} horsepower</strong> and <strong>{v1.torque} lb-ft of torque</strong>. In comparison, the <strong>{v2.name}</strong> has a {v2.engine} delivering <strong>{v2.horsepower} horsepower</strong> and <strong>{v2.torque} lb-ft of torque</strong>. The power lead goes to the <strong>{powerfulVehicle.name}</strong> by a margin of <strong>{powerDiff} horsepower</strong>. If your priorities lie in raw pulling torque, the <strong>{torqueyVehicle.name}</strong> offers the mechanical advantage with <strong>{torqueDiff} lb-ft</strong> of extra twisting force.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">3. Fuel Economy &amp; Efficiency Breakdown</h3>
            <p>
              Analyzing real-world efficiency, the <strong>{v1.name}</strong> yields an EPA rating of <strong>{v1.fuelEconomyCity} mpg city / {v1.fuelEconomyHighway} mpg highway</strong>. The <strong>{v2.name}</strong> stands at <strong>{v2.fuelEconomyCity} mpg city / {v2.fuelEconomyHighway} mpg highway</strong>. Over a typical 5-year ownership cycle, the more efficient choice will significantly reduce fuel operating expenses, favoring the vehicle with standard hybrid or forced-induction tech integrations.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">4. Trail Metrics &amp; Cargo Capacity</h3>
            <p>
              For utility, ground clearance is a vital factor for avoiding trail obstacles. The <strong>{v1.name}</strong> offers <strong>{v1.groundClearance} inches</strong> of clearance, compared to <strong>{v2.name}</strong>'s <strong>{v2.groundClearance} inches</strong>, giving the <strong>{higherVehicle.name}</strong> a <strong>{clearanceDiff} inch</strong> clearance advantage. For cargo packing, the <strong>{v1.name}</strong> provides <strong>{v1.cargoSpaceSeatsDown} cu-ft</strong> of total seats-down space, while the <strong>{v2.name}</strong> holds <strong>{v2.cargoSpaceSeatsDown} cu-ft</strong>, showing that the <strong>{roomyVehicle.name}</strong> is the more spacious interior utility option.
            </p>
          </div>

          <div className="bg-[#f1f7f7] border-l-4 border-brand p-6 rounded-r-md my-8">
            <h4 className="font-bold text-black mb-2 flex items-center gap-1.5 text-sm uppercase tracking-wider">
              <Award className="h-5 w-5 text-brand" /> Editors' Final Verdict
            </h4>
            <p className="text-sm italic">
              "Choose the <strong>{cheaperVehicle.name}</strong> if initial purchase savings and value-oriented ownership are your main targets. However, if your utility checklist demands premium capability, more horsepower, and superior trail clearance metrics, the <strong>{v1.horsepower > v2.horsepower ? v1.name : v2.name}</strong> represents the elite choice for vehicle enthusiasts."
            </p>
          </div>
        </section>

        {/* Dynamic FAQ Accordions */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-bold text-black mb-6 border-b border-border pb-2">
            Frequently Asked Questions
          </h2>
          <div className="faq-accordion-container space-y-4">
            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-black select-none list-none outline-none">
                <span className="text-sm font-bold">Which vehicle is more affordable, the {v1.name} or {v2.name}?</span>
                <span className="transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4 text-brand">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-xs text-gray-600 leading-relaxed">
                The <strong>{cheaperVehicle.name}</strong> is more affordable, with a starting MSRP of <strong>${cheaperVehicle.msrp.toLocaleString()}</strong>, which is <strong>${priceDiff.toLocaleString()}</strong> less than the <strong>{expensiveVehicle.name}</strong>.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-black select-none list-none outline-none">
                <span className="text-sm font-bold">Which has higher horsepower and performance outputs?</span>
                <span className="transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4 text-brand">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-xs text-gray-600 leading-relaxed">
                The <strong>{powerfulVehicle.name}</strong> has higher horsepower, outputting <strong>{powerfulVehicle.horsepower} hp</strong> compared to <strong>{v1.id === powerfulVehicle.id ? v2.name : v1.name}</strong>'s <strong>{v1.id === powerfulVehicle.id ? v2.horsepower : v1.horsepower} hp</strong>.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-black select-none list-none outline-none">
                <span className="text-sm font-bold">Which vehicle is better for off-road ground clearance?</span>
                <span className="transition group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4 text-brand">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                  </svg>
                </span>
              </summary>
              <div className="mt-3 text-xs text-gray-600 leading-relaxed">
                The <strong>{higherVehicle.name}</strong> offers superior ground clearance of <strong>{higherVehicle.groundClearance} inches</strong>, giving it a trail obstacle clearance benefit of <strong>{clearanceDiff.toFixed(1)} inches</strong> over the <strong>{v1.id === higherVehicle.id ? v2.name : v1.name}</strong>.
              </div>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}

// Generate static routes for all pairs
export async function generateStaticParams() {
  const paramsList = [];
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = i + 1; j < vehicles.length; j++) {
      paramsList.push({
        slug: `${vehicles[i].id}-vs-${vehicles[j].id}`,
      });
      // Add the reverse direction as well to handle all user query typing orders
      paramsList.push({
        slug: `${vehicles[j].id}-vs-${vehicles[i].id}`,
      });
    }
  }
  return paramsList;
}
