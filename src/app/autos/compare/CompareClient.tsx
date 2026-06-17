"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ChevronRight, HelpCircle, GitCompare } from "lucide-react";
import vehiclesData from "../../../data/vehicles.json";

interface Vehicle {
  id: string;
  name: string;
  msrp: number;
  engine: string;
  image: string;
}

const vehicles = vehiclesData as Vehicle[];

export default function CompareClient() {
  const router = useRouter();
  const [vehicle1, setVehicle1] = useState(vehicles[0].id);
  const [vehicle2, setVehicle2] = useState(vehicles[1].id);
  const [error, setError] = useState("");

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicle1 === vehicle2) {
      setError("Please select two different vehicles to compare.");
      return;
    }
    setError("");
    router.push(`/autos/compare/${vehicle1}-vs-${vehicle2}/`);
  };

  // Generate popular comparisons list
  const popularComparisons = [
    { id1: "toyota-land-cruiser", id2: "ford-bronco", name1: "Land Cruiser", name2: "Bronco" },
    { id1: "toyota-land-cruiser", id2: "jeep-wrangler", name1: "Land Cruiser", name2: "Wrangler" },
    { id1: "ford-bronco", id2: "jeep-wrangler", name1: "Bronco", name2: "Wrangler" },
    { id1: "toyota-tundra", id2: "ford-f150-raptor", name1: "Tundra TRD Pro", name2: "F-150 Raptor" },
    { id1: "land-rover-defender", id2: "toyota-land-cruiser", name1: "Defender 110", name2: "Land Cruiser" },
    { id1: "land-rover-defender", id2: "ford-bronco", name1: "Defender 110", name2: "Bronco" }
  ];

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-text-secondary mb-8 font-bold uppercase tracking-wider max-w-4xl mx-auto">
          <Link href="/" className="hover:text-brand transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/autos/" className="hover:text-brand transition-colors">Autos</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">Compare SUVs</span>
        </nav>

        {/* Portal Header */}
        <header className="max-w-4xl mx-auto mb-12 text-center">
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-sm text-xs font-extrabold uppercase tracking-widest mb-4 inline-block">
            Vehicle Specs Portal
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-4">
            SUV &amp; Off-Road Comparison Portal
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed font-light max-w-2xl mx-auto">
            Select any two premium off-road vehicles or utility trucks below to evaluate pricing, horsepower torque output, ground clearance, and EPA efficiency ratings.
          </p>
        </header>

        {/* Interactive Selector Card */}
        <div className="max-w-xl mx-auto bg-surface rounded-card border border-border p-8 shadow-premium mb-16">
          <div className="flex items-center gap-2 border-b border-border pb-4 mb-6">
            <GitCompare className="h-5 w-5 text-brand" />
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-black">
              Select Vehicles to Compare
            </h2>
          </div>

          <form onSubmit={handleCompare} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Dropdown 1 */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-extrabold text-black mb-2">
                  First Vehicle
                </label>
                <select
                  value={vehicle1}
                  onChange={(e) => setVehicle1(e.target.value)}
                  className="w-full bg-white border border-border rounded-md px-3 py-2 text-xs text-black focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown 2 */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-extrabold text-black mb-2">
                  Second Vehicle
                </label>
                <select
                  value={vehicle2}
                  onChange={(e) => setVehicle2(e.target.value)}
                  className="w-full bg-white border border-border rounded-md px-3 py-2 text-xs text-black focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="text-xs text-brand font-bold bg-brand/5 p-2 rounded-sm border border-brand/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full btn-filled hover:bg-brand-hover transition-colors font-bold uppercase tracking-wider text-xs py-3.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <GitCompare className="h-4 w-4" />
              Run Head-to-Head Battle
            </button>
          </form>
        </div>

        {/* Pre-generated comparison links (Crawling entrypoints) */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-serif text-xl font-bold text-black mb-6 text-center border-b border-border pb-3">
            Popular Head-to-Head Matchups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularComparisons.map((comp, idx) => (
              <Link
                key={idx}
                href={`/autos/compare/${comp.id1}-vs-${comp.id2}/`}
                className="group p-5 bg-surface border border-border rounded-card hover:border-brand/40 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] uppercase font-extrabold tracking-widest text-brand mb-1 block">Spec Battle</span>
                  <h3 className="font-serif text-sm font-bold text-black group-hover:text-brand transition-colors leading-snug">
                    {comp.name1} vs {comp.name2}
                  </h3>
                  <p className="text-[11px] text-text-secondary mt-1 font-light">
                    Head-to-head comparison: price, recovery clearance, and horsepower.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-brand group-hover:translate-x-1 transition-transform">
                  <span>Compare Specs</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
