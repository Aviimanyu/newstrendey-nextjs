const fs = require('fs');
const path = require('path');

const srcDir = 'd:/Productive_Drive_Structure/Productive_Drive_Structure/04_Development/Development_Project_Structure/Project_Newstrendey/Newstrendey/src';
const compDir = path.join(srcDir, 'components', 'localized');
const appDir = path.join(srcDir, 'app');

const languages = ['es', 'fr', 'de', 'pt', 'it'];

// Ensure components/localized directory exists
if (!fs.existsSync(compDir)) {
  fs.mkdirSync(compDir, { recursive: true });
}

// 1. Process Home Page
let homeContent = fs.readFileSync(path.join(appDir, '[lang]', 'page.tsx'), 'utf8');

// Replace relative imports (already correct at '../../' depth)
// Change export defaults and params
homeContent = homeContent.replace(
  'export default async function LocalizedHome({ params }: PageProps)',
  'export default async function LocalizedHome({ lang }: { lang: string })'
);
homeContent = homeContent.replace(
  'const { lang } = await params;',
  ''
);
// Remove generateStaticParams
homeContent = homeContent.replace(/export async function generateStaticParams\(\)[\s\S]*?return SUPPORTED_LANGUAGES\.map\(\(lang\) => \(\{ lang \}\)\);\s*\}/, '');
// Add metadata helper
homeContent = homeContent.replace(
  'interface PageProps {',
  '// Helper metadata\nexport async function generateMetadataHelper(lang: string) {\n  return {\n    title: "NewsTrendey - USA Automobile News, Tech Reviews & Sports",\n    description: "Your ultimate destination for the latest USA automobile news, car reviews, tech innovations, and trending sports updates.",\n    alternates: {\n      canonical: `https://newstrendey.com/${lang}/`,\n      languages: {\n        "x-default": "https://newstrendey.com/",\n        "en": "https://newstrendey.com/",\n        "es": "https://newstrendey.com/es/",\n        "fr": "https://newstrendey.com/fr/",\n        "de": "https://newstrendey.com/de/",\n        "pt": "https://newstrendey.com/pt/",\n        "it": "https://newstrendey.com/it/",\n      }\n    }\n  };\n}\n\ninterface PageProps {'
);
fs.writeFileSync(path.join(compDir, 'LocalizedHome.tsx'), homeContent);

// 2. Process Category Page
let categoryContent = fs.readFileSync(path.join(appDir, '[lang]', '[category]', 'page.tsx'), 'utf8');

// Adjust imports
categoryContent = categoryContent.replace(/\.\.\/\.\.\/\.\.\/lib\/db/g, '../../lib/db');
categoryContent = categoryContent.replace(/\.\.\/\.\.\/\.\.\/lib\/translate/g, '../../lib/translate');

// Change export defaults and params
categoryContent = categoryContent.replace(
  'export default async function LocalizedCategoryPage({ params }: PageProps)',
  'export default async function LocalizedCategoryPage({ category, lang }: { category: string; lang: string })'
);
categoryContent = categoryContent.replace(
  'const { lang, category } = await params;',
  ''
);
// Remove generateStaticParams
categoryContent = categoryContent.replace(/export async function generateStaticParams\(\)[\s\S]*?return paths;\s*\}/, '');
// Rename generateMetadata to generateMetadataHelper
categoryContent = categoryContent.replace(
  'export async function generateMetadata({ params }: PageProps): Promise<Metadata>',
  'export async function generateMetadataHelper(category: string, lang: string)'
);
categoryContent = categoryContent.replace(
  'const { lang, category } = await params;',
  ''
);
// Remove metadata import if it causes conflicts in helper
categoryContent = categoryContent.replace(
  ': Promise<Metadata>',
  ''
);

fs.writeFileSync(path.join(compDir, 'LocalizedCategory.tsx'), categoryContent);

// 3. Process Article Detail Page
let articleContent = fs.readFileSync(path.join(appDir, '[lang]', '[category]', '[slug]', 'page.tsx'), 'utf8');

// Adjust imports
articleContent = articleContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/posts/g, '../../lib/posts');
articleContent = articleContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/db/g, '../../lib/db');
articleContent = articleContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/translate/g, '../../lib/translate');

// Change export defaults and params
articleContent = articleContent.replace(
  'export default async function LocalizedArticlePage({ params }: PageProps)',
  'export default async function LocalizedArticlePage({ category, slug, lang }: { category: string; slug: string; lang: string })'
);
articleContent = articleContent.replace(
  'const { lang, category, slug } = await params;',
  ''
);
// Remove generateStaticParams
articleContent = articleContent.replace(/export async function generateStaticParams\(\)[\s\S]*?return paths;\s*\}/, '');
// Rename generateMetadata to generateMetadataHelper
articleContent = articleContent.replace(
  'export async function generateMetadata({ params }: PageProps): Promise<Metadata>',
  'export async function generateMetadataHelper(category: string, slug: string, lang: string)'
);
articleContent = articleContent.replace(
  'const { lang, category, slug } = await params;',
  ''
);

fs.writeFileSync(path.join(compDir, 'LocalizedArticle.tsx'), articleContent);

// 4. Process Compare Hub
let compareHubContent = fs.readFileSync(path.join(appDir, '[lang]', 'autos', 'compare', 'page.tsx'), 'utf8');

// Adjust imports
compareHubContent = compareHubContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/components\/CompareClientLocalized/g, '../CompareClientLocalized');
compareHubContent = compareHubContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/translate/g, '../../lib/translate');

// Change export defaults and params
compareHubContent = compareHubContent.replace(
  'export default async function LocalizedCompareHubPage({ params }: PageProps)',
  'export default async function LocalizedCompareHubPage({ lang }: { lang: string })'
);
compareHubContent = compareHubContent.replace(
  'const { lang } = await params;',
  ''
);
// Remove generateStaticParams
compareHubContent = compareHubContent.replace(/export async function generateStaticParams\(\)[\s\S]*?return SUPPORTED_LANGUAGES\.map\(\(lang\) => \(\{ lang \}\)\);\s*\}/, '');
// Rename generateMetadata to generateMetadataHelper
compareHubContent = compareHubContent.replace(
  'export async function generateMetadata({ params }: PageProps): Promise<Metadata>',
  'export async function generateMetadataHelper(lang: string)'
);
compareHubContent = compareHubContent.replace(
  'const { lang } = await params;',
  ''
);

fs.writeFileSync(path.join(compDir, 'LocalizedCompareHub.tsx'), compareHubContent);

// 5. Process Compare Detail
let compareDetailContent = fs.readFileSync(path.join(appDir, '[lang]', 'autos', 'compare', '[slug]', 'page.tsx'), 'utf8');

// Adjust imports
compareDetailContent = compareDetailContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/data\/vehicles\.json/g, '../../data/vehicles.json');
compareDetailContent = compareDetailContent.replace(/\.\.\/\.\.\/\.\.\/\.\.\/lib\/translate/g, '../../lib/translate');

// Change export defaults and params
compareDetailContent = compareDetailContent.replace(
  'export default async function LocalizedCompareDetailPage({ params }: PageProps)',
  'export default async function LocalizedCompareDetailPage({ slug, lang }: { slug: string; lang: string })'
);
compareDetailContent = compareDetailContent.replace(
  'const { lang, slug } = await params;',
  ''
);
// Remove generateStaticParams
compareDetailContent = compareDetailContent.replace(/export async function generateStaticParams\(\)[\s\S]*?return paramsList;\s*\}/, '');
// Rename generateMetadata to generateMetadataHelper
compareDetailContent = compareDetailContent.replace(
  'export async function generateMetadata({ params }: PageProps): Promise<Metadata>',
  'export async function generateMetadataHelper(slug: string, lang: string)'
);
compareDetailContent = compareDetailContent.replace(
  'const { lang, slug } = await params;',
  ''
);

fs.writeFileSync(path.join(compDir, 'LocalizedCompareDetail.tsx'), compareDetailContent);

// 6. Generate Static Folder Wrappers
languages.forEach((lang) => {
  const langAppDir = path.join(appDir, lang);
  
  // Create folders recursively
  fs.mkdirSync(langAppDir, { recursive: true });
  fs.mkdirSync(path.join(langAppDir, '[category]', '[slug]'), { recursive: true });
  fs.mkdirSync(path.join(langAppDir, 'autos', 'compare', '[slug]'), { recursive: true });

  // Home wrapper (page.tsx)
  const homeWrapper = `import LocalizedHome, { generateMetadataHelper } from "../../components/localized/LocalizedHome";

export async function generateMetadata() {
  return generateMetadataHelper("${lang}");
}

export default function Page() {
  return <LocalizedHome lang="${lang}" />;
}
`;
  fs.writeFileSync(path.join(langAppDir, 'page.tsx'), homeWrapper);

  // Category wrapper ([category]/page.tsx)
  const categoryWrapper = `import LocalizedCategoryPage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../components/localized/LocalizedCategory";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  return generateMetadataHelper(category, "${lang}");
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <LocalizedCategoryPage category={category} lang="${lang}" />;
}
`;
  fs.writeFileSync(path.join(langAppDir, '[category]', 'page.tsx'), categoryWrapper);

  // Article wrapper ([category]/[slug]/page.tsx)
  const articleWrapper = `import LocalizedArticlePage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedArticle";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params;
  return generateMetadataHelper(category, slug, "${lang}");
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;
  return <LocalizedArticlePage category={category} slug={slug} lang="${lang}" />;
}
`;
  fs.writeFileSync(path.join(langAppDir, '[category]', '[slug]', 'page.tsx'), articleWrapper);

  // Compare hub wrapper (autos/compare/page.tsx)
  const compareHubWrapper = `import LocalizedCompareHubPage, {
  generateMetadataHelper,
} from "../../../../components/localized/LocalizedCompareHub";

export async function generateMetadata() {
  return generateMetadataHelper("${lang}");
}

export default function Page() {
  return <LocalizedCompareHubPage lang="${lang}" />;
}
`;
  fs.writeFileSync(path.join(langAppDir, 'autos', 'compare', 'page.tsx'), compareHubWrapper);

  // Compare detail wrapper (autos/compare/[slug]/page.tsx)
  const compareDetailWrapper = `import LocalizedCompareDetailPage, {
  generateStaticParamsHelper,
  generateMetadataHelper,
} from "../../../../../components/localized/LocalizedCompareDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticParamsHelper();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generateMetadataHelper(slug, "${lang}");
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <LocalizedCompareDetailPage slug={slug} lang="${lang}" />;
}
`;
  fs.writeFileSync(path.join(langAppDir, 'autos', 'compare', '[slug]', 'page.tsx'), compareDetailWrapper);
});

console.log("Localized wrappers and shared components created successfully!");
