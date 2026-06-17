import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("es");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="es" />;
}
