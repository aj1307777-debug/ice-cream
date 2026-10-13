export interface Article {
  id: string;
  slug: string;
  url: string;
  // SEO title must include 1 main keyword and 2 related keywords
  seoTitle: string;
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  // Meta description: 120-160 chars, active voice, CTA
  metaDescription: string;
  category: 'Churning Craft' | 'Dairy Sourcing' | 'Flavor Science' | 'Storage & Care' | 'Plant-Based' | 'Heritage Recipes';
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  // Photo under 100kb
  image: string;
  imageAlt: string;
  imageSizeKb: number; // strictly < 100kb
  excerpt: string;
  // Subheadings in Question & Answer format for Google search engine snippet ranking
  qaSections: {
    question: string;
    answer: string;
    keyTakeaway?: string;
  }[];
  contentIntro: string;
  contentBody: string;
  relatedArticleSlugs: string[];
}

export interface Flavor {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'Classic Dairy' | 'Signature Churn' | 'Plant-Based Gelato' | 'Seasonal Sorbet';
  butterfatPercent: number;
  description: string;
  tastingNotes: string[];
  ingredients: string[];
  allergens: string[];
  price: number;
  image: string;
  imageAlt: string;
  imageSizeKb: number;
  featured?: boolean;
}

export interface CartItem {
  flavor: Flavor;
  quantity: number;
}
