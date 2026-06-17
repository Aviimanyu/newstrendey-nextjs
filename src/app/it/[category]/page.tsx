import LocalizedCategoryPage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../components/localized/LocalizedCategory";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  return generateMetadataHelper(category, "it");
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <LocalizedCategoryPage category={category} lang="it" />;
}
