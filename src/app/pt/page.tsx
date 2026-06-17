import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("pt");
}

export default function Page() {
  return <LocalizedHome lang="pt" />;
}
