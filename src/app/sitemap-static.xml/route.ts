import { generateCategorySitemap } from "../../lib/sitemap-helper";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  return generateCategorySitemap("static");
}
