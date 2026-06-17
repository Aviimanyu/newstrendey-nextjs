import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("es");
}

export default function Page() {
  return <LocalizedHome lang="es" />;
}
