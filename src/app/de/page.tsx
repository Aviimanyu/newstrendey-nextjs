import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("de");
}

export default function Page() {
  return <LocalizedHome lang="de" />;
}
