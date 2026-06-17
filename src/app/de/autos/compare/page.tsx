import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("de");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="de" />;
}
