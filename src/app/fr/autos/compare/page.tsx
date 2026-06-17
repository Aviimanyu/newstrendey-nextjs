import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("fr");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="fr" />;
}
