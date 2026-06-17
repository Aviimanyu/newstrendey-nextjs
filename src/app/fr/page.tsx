import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("fr");
}

export default function Page() {
  return <LocalizedHome lang="fr" />;
}
