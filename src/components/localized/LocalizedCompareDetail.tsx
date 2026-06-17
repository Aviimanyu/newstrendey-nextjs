import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Award } from "lucide-react";
import vehiclesData from "../../data/vehicles.json";
import { SUPPORTED_LANGUAGES, translate } from "../../lib/translate";

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

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}



export async function generateStaticParamsHelper() {
  const paramsList = [];
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = i + 1; j < vehicles.length; j++) {
      paramsList.push({
        slug: `${vehicles[i].id}-vs-${vehicles[j].id}`,
      });
      paramsList.push({
        slug: `${vehicles[j].id}-vs-${vehicles[i].id}`,
      });
    }
  }
  return paramsList;
}

export async function generateMetadataHelper(slug: string, lang: string) {
  
  const resolved = resolveVehicles(slug);

  if (!resolved || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    return {
      title: "Comparison Not Found",
    };
  }

  const { v1, v2 } = resolved;
  const title = `${v1.name} vs ${v2.name} | ${translate("Compare", lang)} | NewsTrendey`;
  const description = translate(`Compare the ${v1.name} and ${v2.name} specs side-by-side. Analyze MSRP, horsepower, torque, ground clearance, cargo space, and off-road capability.`, lang);

  return {
    title,
    description,
    alternates: {
      canonical: `https://newstrendey.com/${lang}/autos/compare/${slug}/`,
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
  };
}

export default async function LocalizedCompareDetailPage({ slug, lang }: { slug: string; lang: string }) {
  
  const resolved = resolveVehicles(slug);

  if (!resolved || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    notFound();
  }

  const { v1, v2 } = resolved;

  // Analysis calculations
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

  return (
    <div className="bg-white min-h-screen py-8 pb-16 animate-in fade-in duration-200">
      <div className="container-custom">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-6 font-bold uppercase tracking-wider max-w-4xl mx-auto">
          <Link href={`/${lang}/`} className="hover:text-brand transition-colors">{translate("Home", lang)}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${lang}/autos/`} className="hover:text-brand transition-colors">{translate("Autos & Vehicles", lang)}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${lang}/autos/compare/`} className="hover:text-brand transition-colors">{translate("Compare SUVs", lang)}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">{v1.name} vs {v2.name}</span>
        </nav>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto mb-6">
          <Link href={`/${lang}/autos/compare/`} className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-brand hover:text-brand-hover transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            {translate("Compare SUVs", lang)}
          </Link>
        </div>

        {/* Header Title Section */}
        <header className="max-w-4xl mx-auto mb-10 text-center md:text-left">
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-sm text-xs font-extrabold uppercase tracking-widest mb-4 inline-block">
            {translate("Head-To-Head SUV Battle", lang)}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-4">
            {v1.name} vs {v2.name}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light max-w-3xl">
            {translate(`An in-depth specification and pricing breakdown comparing the ${v1.name} and ${v2.name}. Read our editorial analysis and verdict below.`, lang)}
          </p>
        </header>

        {/* Comparative Banner Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-surface rounded-card border border-border p-6 shadow-sm flex flex-col justify-between hover:border-brand/40 transition-colors duration-200">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-2">{translate("Participant A", lang)}</span>
              <h2 className="font-serif text-xl font-bold text-black mb-3">{v1.name}</h2>
              <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">{translate(v1.description, lang)}</p>
            </div>
            <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">{translate("Base MSRP", lang)}</span>
              <span className="font-serif text-lg font-extrabold text-black">${v1.msrp.toLocaleString()}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface rounded-card border border-border p-6 shadow-sm flex flex-col justify-between hover:border-brand/40 transition-colors duration-200">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-brand block mb-2">{translate("Participant B", lang)}</span>
              <h2 className="font-serif text-xl font-bold text-black mb-3">{v2.name}</h2>
              <p className="text-xs text-text-secondary leading-relaxed font-light mb-4">{translate(v2.description, lang)}</p>
            </div>
            <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
              <span className="text-xs text-text-secondary">{translate("Base MSRP", lang)}</span>
              <span className="font-serif text-lg font-extrabold text-black">${v2.msrp.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Core Specs Table */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="font-serif text-2xl font-bold text-black mb-6 border-b border-border pb-2">
            {translate("Specifications Comparison Grid", lang)}
          </h2>
          <div className="table-container bg-white border border-border rounded-card overflow-hidden">
            <table className="min-w-full divide-y divide-border text-xs">
              <thead className="bg-[#f1f7f7]">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-black uppercase tracking-wider">{translate("Feature Spec", lang)}</th>
                  <th className="px-6 py-4 text-left font-bold text-brand uppercase tracking-wider">{v1.name}</th>
                  <th className="px-6 py-4 text-left font-bold text-black uppercase tracking-wider">{v2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {/* MSRP */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Base MSRP", lang)}</td>
                  <td className={`px-6 py-4 ${v1.msrp < v2.msrp ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    ${v1.msrp.toLocaleString()} {v1.msrp < v2.msrp && `(${translate("Cheaper", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.msrp < v1.msrp ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    ${v2.msrp.toLocaleString()} {v2.msrp < v1.msrp && `(${translate("Cheaper", lang)})`}
                  </td>
                </tr>

                {/* Engine */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Engine Type", lang)}</td>
                  <td className="px-6 py-4 text-gray-700">{v1.engine}</td>
                  <td className="px-6 py-4 text-gray-700">{v2.engine}</td>
                </tr>

                {/* Horsepower */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Horsepower", lang)}</td>
                  <td className={`px-6 py-4 ${v1.horsepower > v2.horsepower ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.horsepower} hp {v1.horsepower > v2.horsepower && `(${translate("Higher", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.horsepower > v1.horsepower ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.horsepower} hp {v2.horsepower > v1.horsepower && `(${translate("Higher", lang)})`}
                  </td>
                </tr>

                {/* Torque */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Torque", lang)}</td>
                  <td className={`px-6 py-4 ${v1.torque > v2.torque ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.torque} lb-ft {v1.torque > v2.torque && `(${translate("Higher", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.torque > v1.torque ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.torque} lb-ft {v2.torque > v1.torque && `(${translate("Higher", lang)})`}
                  </td>
                </tr>

                {/* Fuel Economy City */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("City Fuel Economy", lang)}</td>
                  <td className={`px-6 py-4 ${v1.fuelEconomyCity > v2.fuelEconomyCity ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.fuelEconomyCity} mpg {v1.fuelEconomyCity > v2.fuelEconomyCity && `(${translate("More Efficient", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.fuelEconomyCity > v1.fuelEconomyCity ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.fuelEconomyCity} mpg {v2.fuelEconomyCity > v1.fuelEconomyCity && `(${translate("More Efficient", lang)})`}
                  </td>
                </tr>

                {/* Fuel Economy Highway */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Highway Fuel Economy", lang)}</td>
                  <td className={`px-6 py-4 ${v1.fuelEconomyHighway > v2.fuelEconomyHighway ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.fuelEconomyHighway} mpg {v1.fuelEconomyHighway > v2.fuelEconomyHighway && `(${translate("More Efficient", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.fuelEconomyHighway > v1.fuelEconomyHighway ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.fuelEconomyHighway} mpg {v2.fuelEconomyHighway > v1.fuelEconomyHighway && `(${translate("More Efficient", lang)})`}
                  </td>
                </tr>

                {/* Ground Clearance */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Ground Clearance", lang)}</td>
                  <td className={`px-6 py-4 ${v1.groundClearance > v2.groundClearance ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.groundClearance} Inches {v1.groundClearance > v2.groundClearance && `(${translate("Higher", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.groundClearance > v1.groundClearance ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.groundClearance} Inches {v2.groundClearance > v1.groundClearance && `(${translate("Higher", lang)})`}
                  </td>
                </tr>

                {/* Seating */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Seating Capacity", lang)}</td>
                  <td className="px-6 py-4 text-gray-700">{v1.seatingCapacity} Passengers</td>
                  <td className="px-6 py-4 text-gray-700">{v2.seatingCapacity} Passengers</td>
                </tr>

                {/* Cargo Space seats down */}
                <tr className="accessory-row">
                  <td className="px-6 py-4 font-bold text-black">{translate("Max Cargo Space", lang)}</td>
                  <td className={`px-6 py-4 ${v1.cargoSpaceSeatsDown > v2.cargoSpaceSeatsDown ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v1.cargoSpaceSeatsDown} cu-ft {v1.cargoSpaceSeatsDown > v2.cargoSpaceSeatsDown && `(${translate("Roomier", lang)})`}
                  </td>
                  <td className={`px-6 py-4 ${v2.cargoSpaceSeatsDown > v1.cargoSpaceSeatsDown ? 'text-brand font-bold bg-brand/5' : 'text-gray-700'}`}>
                    {v2.cargoSpaceSeatsDown} cu-ft {v2.cargoSpaceSeatsDown > v1.cargoSpaceSeatsDown && `(${translate("Roomier", lang)})`}
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
              {v1.name} {translate("Pros & Cons", lang)}
            </h3>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 block">Advantages</span>
              {v1.pros.map((pro, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{translate(pro, lang)}</span>
                </div>
              ))}
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 block pt-2">Drawbacks</span>
              {v1.cons.map((con, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{translate(con, lang)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* v2 Pros & Cons */}
          <div className="border border-border rounded-card p-6 bg-surface">
            <h3 className="font-serif text-lg font-bold text-black mb-4 pb-2 border-b border-border">
              {v2.name} {translate("Pros & Cons", lang)}
            </h3>
            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 block">Advantages</span>
              {v2.pros.map((pro, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{translate(pro, lang)}</span>
                </div>
              ))}
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 block pt-2">Drawbacks</span>
              {v2.cons.map((con, index) => (
                <div key={index} className="flex gap-2 items-start text-xs text-gray-700">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{translate(con, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial comparison paragraphs */}
        <section className="max-w-4xl mx-auto mb-16 space-y-8 text-base text-gray-700 leading-relaxed article-prose">
          <h2 className="font-serif text-2xl font-bold text-black border-b border-border pb-2 mb-6">
            {translate("Editorial Analysis & Verdict", lang)}
          </h2>
          
          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">1. {translate("Price and Value Assessment", lang)}</h3>
            <p>
              {translate(`Looking at pricing, the ${v1.name} starts at a base MSRP of $${v1.msrp.toLocaleString()}, whereas the ${v2.name} starts at $${v2.msrp.toLocaleString()}. This creates a financial difference of $${priceDiff.toLocaleString()}. The more budget-friendly pick is the ${cheaperVehicle.name}.`, lang)}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-black mb-2">2. {translate("Performance & Drivetrain Analysis", lang)}</h3>
            <p>
              {translate(`Under the hood, the ${v1.name} features a ${v1.engine} producing ${v1.horsepower} horsepower and ${v1.torque} lb-ft of torque. In comparison, the ${v2.name} has a ${v2.engine} delivering ${v2.horsepower} horsepower. The power lead goes to the ${powerfulVehicle.name} by a margin of ${powerDiff} horsepower.`, lang)}
            </p>
          </div>

          <div className="bg-[#f1f7f7] border-l-4 border-brand p-6 rounded-r-md my-8">
            <h4 className="font-bold text-black mb-2 flex items-center gap-1.5 text-sm uppercase tracking-wider">
              <Award className="h-5 w-5 text-brand" /> {translate("Editors' Final Verdict", lang)}
            </h4>
            <p className="text-sm italic">
              "{translate(`Choose the ${cheaperVehicle.name} if initial purchase savings and value-oriented ownership are your main targets. However, if your utility checklist demands premium capability, more horsepower, and superior trail clearance metrics, the ${v1.horsepower > v2.horsepower ? v1.name : v2.name} represents the elite choice.`, lang)}"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
