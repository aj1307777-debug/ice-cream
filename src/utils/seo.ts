export interface SeoPageConfig {
  title: string;
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

export function updatePageSeo(config: SeoPageConfig) {
  // 1. Update Document Title
  document.title = config.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Update Canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', config.canonicalUrl);

  // 4. Update OpenGraph Tags
  updateMetaTag('og:title', config.title, 'property');
  updateMetaTag('og:description', config.description, 'property');
  updateMetaTag('og:url', config.canonicalUrl, 'property');
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage, 'property');
    updateMetaTag('twitter:image', config.ogImage, 'name');
  }

  // 5. Update Twitter Card Tags
  updateMetaTag('twitter:title', config.title, 'name');
  updateMetaTag('twitter:description', config.description, 'name');

  // 6. Structured Data JSON-LD
  let schemaScript = document.getElementById('seo-schema-ld-json') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'seo-schema-ld-json';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'IceCreamShop',
    name: 'Crème Glacée Artisanal Ice Cream & Gelato',
    url: config.canonicalUrl,
    description: config.description,
    priceRange: '$$',
    servesCuisine: ['Ice Cream', 'Gelato', 'Artisanal Desserts'],
    image: config.ogImage || '/images/hero_artisanal_churn.webp',
  };

  schemaScript.textContent = JSON.stringify(config.schema || defaultSchema, null, 2);
}

function updateMetaTag(key: string, value: string, attributeType: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attributeType}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeType, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}
