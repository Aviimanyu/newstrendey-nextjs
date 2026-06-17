import LocalizedArticlePage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedArticle";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  return generateMetadataHelper(category, slug, "es");
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;
  return <LocalizedArticlePage category={category} slug={slug} lang="es" />;
}
