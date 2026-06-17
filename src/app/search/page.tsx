import { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search news, reviews, and insights across NewsTrendey.",
  alternates: {
    canonical: "https://newstrendey.com/search/",
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
