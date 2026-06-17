import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("it");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="it" />;
}
