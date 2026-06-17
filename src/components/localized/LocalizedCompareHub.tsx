import { Metadata } from "next";
import { notFound } from "next/navigation";
import CompareClient from "../CompareClientLocalized";
import { SUPPORTED_LANGUAGES, translate } from "../../lib/translate";

interface PageProps {
  params: Promise<{ lang: string }>;
}



export async function generateMetadataHelper(lang: string) {
  
  if (!SUPPORTED_LANGUAGES.includes(lang as any)) {
    return {
      title: "Compare",
    };
  }

  const title = `${translate("Compare SUVs", lang)} | NewsTrendey`;
  const description = translate("Select and compare specifications, pricing, horsepower, torque, fuel economy, ground clearance, and cargo spaces for top off-road SUVs and utility trucks.", lang);

  return {
    title,
    description,
    alternates: {
      canonical: `https://newstrendey.com/${lang}/autos/compare/`,
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
}

export default async function LocalizedCompareHubPage({ lang }: { lang: string }) {
  
  if (!SUPPORTED_LANGUAGES.includes(lang as any)) {
    notFound();
  }

  return <CompareClient lang={lang} />;
}
