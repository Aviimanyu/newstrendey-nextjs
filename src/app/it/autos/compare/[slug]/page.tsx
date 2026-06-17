import LocalizedCompareDetailPage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../../../components/localized/LocalizedCompareDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateMetadataHelper(slug, "it");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <LocalizedCompareDetailPage slug={slug} lang="it" />;
}
