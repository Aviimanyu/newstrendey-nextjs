import { Metadata } from "next";
import CompareClient from "../../../components/CompareClientLocalized";

export const metadata: Metadata = {
  title: "Compare SUVs & Off-Road Vehicles: Prices & Specifications",
  description: "Select and compare specifications, pricing, horsepower, torque, fuel economy, ground clearance, and cargo spaces for top off-road SUVs and utility trucks.",
  alternates: {
    canonical: "https://newstrendey.com/autos/compare/",
    languages: {
      "x-default": "https://newstrendey.com/autos/compare/",
      "en": "https://newstrendey.com/autos/compare/",
      "es": "https://newstrendey.com/es/autos/compare/",
      "fr": "https://newstrendey.com/fr/autos/compare/",
      "de": "https://newstrendey.com/de/autos/compare/",
      "pt": "https://newstrendey.com/pt/autos/compare/",
      "it": "https://newstrendey.com/it/autos/compare/",
    }
  },
};

export default function CompareHubPage() {
  return <CompareClient lang="en" />;
}
