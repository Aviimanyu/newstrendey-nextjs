import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("pt");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="pt" />;
}
