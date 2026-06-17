import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare SUVs & Off-Road Vehicles: Prices & Specifications",
  description: "Select and compare specifications, pricing, horsepower, torque, fuel economy, ground clearance, and cargo spaces for top off-road SUVs and utility trucks.",
  alternates: {
    canonical: "https://newstrendey.com/autos/compare/",
  },
};

export default function CompareHubPage() {
  return <CompareClient />;
}
