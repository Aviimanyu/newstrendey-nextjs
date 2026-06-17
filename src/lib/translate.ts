export const SUPPORTED_LANGUAGES = ["es", "fr", "de", "pt", "it"] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_NAMES: Record<Language | "en", string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
};

// UI and Navigation dictionary
const DICTIONARY: Record<string, Record<string, string>> = {
  // Navigation
  "Home": {
    es: "Inicio",
    fr: "Accueil",
    de: "Startseite",
    pt: "Início",
    it: "Home"
  },
  "Autos & Vehicles": {
    es: "Autos y Vehículos",
    fr: "Autos et Véhicules",
    de: "Autos & Fahrzeuge",
    pt: "Autos e Veículos",
    it: "Auto e Veicoli"
  },
  "Compare SUVs": {
    es: "Comparar SUVs",
    fr: "Comparer les VUS",
    de: "SUVs vergleichen",
    pt: "Comparar SUVs",
    it: "Confronta i SUV"
  },
  "Technology": {
    es: "Tecnología",
    fr: "Technologie",
    de: "Technologie",
    pt: "Tecnologia",
    it: "Tecnologia"
  },
  "Sports": {
    es: "Deportes",
    fr: "Sports",
    de: "Sport",
    pt: "Esportes",
    it: "Sport"
  },
  "Entertainment": {
    es: "Entretenimiento",
    fr: "Divertissement",
    de: "Unterhaltung",
    pt: "Entretenimento",
    it: "Intrattenimento"
  },
  "Rankings": {
    es: "Clasificaciones",
    fr: "Classements",
    de: "Rankings",
    pt: "Classificações",
    it: "Classifiche"
  },
  // Subheadings & Sections
  "Trending Now": {
    es: "Tendencias de Hoy",
    fr: "Tendances Actuelles",
    de: "Aktuelle Trends",
    pt: "Tendências Atuais",
    it: "Tendenze Attuali"
  },
  "Tested: Deep Editorial Reviews & Analyses": {
    es: "Probado: Reseñas y Análisis Editoriales Profundos",
    fr: "Testé : Avis et analyses éditoriaux approfondis",
    de: "Getestet: Tiefgehende redaktionelle Testberichte & Analysen",
    pt: "Testado: Avaliações e Análises Editoriais Aprofundadas",
    it: "Testato: Recensioni e analisi editoriali approfondite"
  },
  "Reader Disclosure & Affiliate Transparency": {
    es: "Divulgación para el lector y transparencia de afiliados",
    fr: "Divulgation du lecteur et transparence des affiliés",
    de: "Leser-Offenlegung & Affiliate-Transparenz",
    pt: "Divulgação ao leitor e transparência de afiliados",
    it: "Informativa per i lettori e trasparenza delle affiliazioni"
  },
  "Check Local Deals": {
    es: "Ver ofertas locales",
    fr: "Consulter les offres locales",
    de: "Lokale Angebote prüfen",
    pt: "Verificar ofertas locais",
    it: "Controlla le offerte locali"
  },
  "Read Analysis Report": {
    es: "Leer reporte de análisis",
    fr: "Lire le rapport d'analyse",
    de: "Analysebericht lesen",
    pt: "Ler relatório de análise",
    it: "Leggi il rapporto di analisi"
  },
  "Read Analysis": {
    es: "Leer Análisis",
    fr: "Lire l'analyse",
    de: "Analyse lesen",
    pt: "Ler Análise",
    it: "Leggi l'analisi"
  },
  "By": {
    es: "Por",
    fr: "Par",
    de: "Von",
    pt: "Por",
    it: "Di"
  },
  // Specs Comparison UI
  "Specifications Comparison Grid": {
    es: "Cuadrícula de comparación de especificaciones",
    fr: "Grille de comparaison des spécifications",
    de: "Spezifikationsvergleich",
    pt: "Grade de comparação de especificações",
    it: "Griglia di confronto delle specifiche"
  },
  "Feature Spec": {
    es: "Especificación",
    fr: "Spécification",
    de: "Eigenschaft",
    pt: "Especificação",
    it: "Specifica"
  },
  "Base MSRP": {
    es: "MSRP Base",
    fr: "PDSF de base",
    de: "Basis-UVP",
    pt: "MSRP Base",
    it: "MSRP di base"
  },
  "Engine Type": {
    es: "Tipo de motor",
    fr: "Type de moteur",
    de: "Motortyp",
    pt: "Tipo de motor",
    it: "Tipo di motore"
  },
  "Horsepower": {
    es: "Caballos de fuerza",
    fr: "Puissance (ch)",
    de: "Pferdestärken (PS)",
    pt: "Cavalos de potência",
    it: "Cavalli (CV)"
  },
  "Torque": {
    es: "Torque",
    fr: "Couple",
    de: "Drehmoment",
    pt: "Torque",
    it: "Coppia"
  },
  "City Fuel Economy": {
    es: "Consumo en ciudad",
    fr: "Consommation urbaine",
    de: "Kraftstoffverbrauch Stadt",
    pt: "Consumo na cidade",
    it: "Consumo urbano"
  },
  "Highway Fuel Economy": {
    es: "Consumo en carretera",
    fr: "Consommation autoroute",
    de: "Kraftstoffverbrauch Autobahn",
    pt: "Consumo na estrada",
    it: "Consumo autostradale"
  },
  "Ground Clearance": {
    es: "Altura libre al suelo",
    fr: "Garde au sol",
    de: "Bodenfreiheit",
    pt: "Distância ao solo",
    it: "Altezza da terra"
  },
  "Seating Capacity": {
    es: "Capacidad de asientos",
    fr: "Nombre de places",
    de: "Sitzplatzkapazität",
    pt: "Capacidade de assentos",
    it: "Posti a sedere"
  },
  "Max Cargo Space": {
    es: "Espacio máximo de carga",
    fr: "Espace de chargement max",
    de: "Maximaler Laderaum",
    pt: "Espaço máximo de carga",
    it: "Spazio massimo di carico"
  },
  "Cheaper": {
    es: "Más barato",
    fr: "Moins cher",
    de: "Günstiger",
    pt: "Mais barato",
    it: "Più economico"
  },
  "Higher": {
    es: "Mayor",
    fr: "Plus élevée",
    de: "Höher",
    pt: "Maior",
    it: "Maggiore"
  },
  "Roomier": {
    es: "Más espacioso",
    fr: "Plus spacieux",
    de: "Geräumiger",
    pt: "Mais espaçoso",
    it: "Più spazioso"
  },
  "More Efficient": {
    es: "Más eficiente",
    fr: "Plus économe",
    de: "Effizienter",
    pt: "Mais eficiente",
    it: "Più efficiente"
  },
  "Run Head-to-Head Battle": {
    es: "Ejecutar comparativa directa",
    fr: "Lancer le duel face à face",
    de: "Direkten Vergleich starten",
    pt: "Executar comparativo direto",
    it: "Avvia il confronto diretto"
  },
  "Select Vehicles to Compare": {
    es: "Seleccione vehículos para comparar",
    fr: "Sélectionnez les véhicules à comparer",
    de: "Fahrzeuge zum Vergleichen auswählen",
    pt: "Selecione os veículos para comparar",
    it: "Seleziona i veicoli da confrontare"
  },
  "Popular Head-to-Head Matchups": {
    es: "Comparativas populares",
    fr: "Duels populaires",
    de: "Beliebte Duelle",
    pt: "Comparativos populares",
    it: "Confronti popolari"
  },
  "Compare Specs": {
    es: "Comparar especificaciones",
    fr: "Comparer les fiches",
    de: "Daten vergleichen",
    pt: "Comparar especificações",
    it: "Confronta le specifiche"
  },
};

// Word-level automotive translation replacements (programmatic SEO translations)
const AUTO_GLOSSARY: Record<string, Record<string, string>> = {
  es: {
    "Review": "Reseña",
    "vs": "contra",
    "vs.": "contra",
    "Vs": "Contra",
    "Comparison": "Comparación",
    "Head-to-Head": "Cara a Cara",
    "Guide": "Guía",
    "Buyer's Guide": "Guía de compra",
    "Best": "Mejores",
    "SUV": "SUV",
    "SUVs": "SUVs",
    "Off-Road": "Todoterreno",
    "Tires": "Neumáticos",
    "Engine": "Motor",
    "Price": "Precio",
    "Specs": "Especificaciones",
    "Rankings": "Clasificaciones",
    "features": "características",
    "specs": "especificaciones",
    "release date": "fecha de lanzamiento",
    "price": "precio",
    "reborn": "renacido",
    "return": "regreso",
    "shocks the world": "sorprende al mundo",
    "reclaims a throne": "reclama un trono",
    "luxury": "lujo",
    "performance": "rendimiento",
  },
  fr: {
    "Review": "Avis",
    "vs": "contre",
    "vs.": "contre",
    "Vs": "Contre",
    "Comparison": "Comparaison",
    "Head-to-Head": "Face à Face",
    "Guide": "Guide",
    "Buyer's Guide": "Guide d'achat",
    "Best": "Meilleurs",
    "SUV": "VUS",
    "SUVs": "VUS",
    "Off-Road": "Tout-terrain",
    "Tires": "Pneus",
    "Engine": "Moteur",
    "Price": "Prix",
    "Specs": "Fiches techniques",
    "Rankings": "Classements",
    "features": "caractéristiques",
    "specs": "spécifications",
    "release date": "date de sortie",
    "price": "prix",
    "reborn": "renaissance",
    "return": "retour",
    "shocks the world": "choque le monde",
    "reclaims a throne": "récupère un trône",
    "luxury": "luxe",
    "performance": "performance",
  },
  de: {
    "Review": "Testbericht",
    "vs": "gegen",
    "vs.": "gegen",
    "Vs": "Gegen",
    "Comparison": "Vergleich",
    "Head-to-Head": "Kopf-an-Kopf",
    "Guide": "Ratgeber",
    "Buyer's Guide": "Kaufratgeber",
    "Best": "Beste",
    "SUV": "SUV",
    "SUVs": "SUVs",
    "Off-Road": "Gelände",
    "Tires": "Reifen",
    "Engine": "Motor",
    "Price": "Preis",
    "Specs": "Daten",
    "Rankings": "Rankings",
    "features": "Eigenschaften",
    "specs": "Spezifikationen",
    "release date": "Erscheinungsdatum",
    "price": "Preis",
    "reborn": "wiedergeboren",
    "return": "Rückkehr",
    "shocks the world": "schockiert die Welt",
    "reclaims a throne": "fordert einen Thron zurück",
    "luxury": "Luxus",
    "performance": "Leistung",
  },
  pt: {
    "Review": "Avaliação",
    "vs": "contra",
    "vs.": "contra",
    "Vs": "Contra",
    "Comparison": "Comparação",
    "Head-to-Head": "Frente a Frente",
    "Guide": "Guia",
    "Buyer's Guide": "Guia de compra",
    "Best": "Melhores",
    "SUV": "SUV",
    "SUVs": "SUVs",
    "Off-Road": "Fora de estrada",
    "Tires": "Pneus",
    "Engine": "Motor",
    "Price": "Preço",
    "Specs": "Especificações",
    "Rankings": "Classificações",
    "features": "recursos",
    "specs": "especificações",
    "release date": "data de lançamento",
    "price": "preço",
    "reborn": "renascido",
    "return": "retorno",
    "shocks the world": "choca o mundo",
    "reclaims a throne": "reclama um trono",
    "luxury": "luxo",
    "performance": "desempenho",
  },
  it: {
    "Review": "Recensione",
    "vs": "contro",
    "vs.": "contro",
    "Vs": "Contro",
    "Comparison": "Confronto",
    "Head-to-Head": "Testa a Testa",
    "Guide": "Guida",
    "Buyer's Guide": "Guida all'acquisto",
    "Best": "Migliori",
    "SUV": "SUV",
    "SUVs": "SUV",
    "Off-Road": "Fuoristrada",
    "Tires": "Pneumatici",
    "Engine": "Motore",
    "Price": "Prezzo",
    "Specs": "Specifiche",
    "Rankings": "Classifiche",
    "features": "caratteristiche",
    "specs": "specifiche",
    "release date": "data di rilascio",
    "price": "prezzo",
    "reborn": "rinato",
    "return": "ritorno",
    "shocks the world": "sconvolge il mondo",
    "reclaims a throne": "rivendica un trono",
    "luxury": "lusso",
    "performance": "prestazioni",
  }
};

// Main dynamic translator helper
export function translate(text: string, lang: string): string {
  if (!lang || lang === "en" || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    return text;
  }

  const l = lang as Language;

  // 1. Direct dictionary match
  if (DICTIONARY[text] && DICTIONARY[text][l]) {
    return DICTIONARY[text][l];
  }

  // 2. Phrase/Heuristic mappings
  let translated = text;

  // Helper dictionary replacements (case-insensitive)
  const glossary = AUTO_GLOSSARY[l] || {};
  
  // Sort keys by length descending to match longer phrases first
  const keys = Object.keys(glossary).sort((a, b) => b.length - a.length);

  for (const key of keys) {
    const replacement = glossary[key];
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    translated = translated.replace(regex, (match) => {
      // Preserve uppercase first letter if present
      if (match[0] === match[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  return translated;
}

// Translates HTML content headings and terms
export function translateHtml(html: string, lang: string): string {
  if (!html) return "";
  if (!lang || lang === "en" || !SUPPORTED_LANGUAGES.includes(lang as any)) {
    return html;
  }

  const l = lang as Language;
  let translated = html;

  // Replace heading tags text
  translated = translated.replace(/(<h[1-6][^>]*>)([\s\S]*?)(<\/h[1-6]>)/gi, (match, open, content, close) => {
    return `${open}${translate(content, l)}${close}`;
  });

  // Replace common table header labels in content
  translated = translated.replace(/(<th[^>]*>)([\s\S]*?)(<\/th>)/gi, (match, open, content, close) => {
    return `${open}${translate(content, l)}${close}`;
  });

  // Replace common strong terms in content
  translated = translated.replace(/(<strong[^>]*>)([\s\S]*?)(<\/strong>)/gi, (match, open, content, close) => {
    return `${open}${translate(content, l)}${close}`;
  });

  return translated;
}
