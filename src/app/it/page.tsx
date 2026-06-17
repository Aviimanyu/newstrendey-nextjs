import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("it");
}

export default function Page() {
  return <LocalizedHome lang="it" />;
}
