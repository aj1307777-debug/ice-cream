import React, { useState, useEffect } from 'react';
import { Flavor } from '../types';
import { updatePageSeo } from '../utils/seo';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface FlavorsPageProps {
  flavors: Flavor[];
  onAddToCart: (flavor: Flavor) => void;
  onNavigate: (path: string) => void;
}

export const FlavorsPage: React.FC<FlavorsPageProps> = ({
  flavors,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    updatePageSeo({
      title: 'Ice Cream Flavors – Handcrafted Gelato & Dairy-Free Pints | Crème Glacée',
      mainKeyword: 'Ice Cream Flavors',
      relatedKeyword1: 'Handcrafted Gelato',
      relatedKeyword2: 'Dairy-Free Pints',
      description: 'Explore all 8 artisanal ice cream flavors including handcrafted gelato and dairy-free pints. Order small-batch micro-creams delivered cold in dry ice today!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/artisan-ice-cream-flavors',
      ogImage: '/images/pistachio_gelato.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: flavors.map((f, idx) => ({
          '@type': 'Product',
          position: idx + 1,
          name: f.name,
          description: f.description,
          offers: {
            '@type': 'Offer',
            price: f.price,
            priceCurrency: 'INR',
          }
        }))
      }
    });
  }, [flavors]);

  const categories = ['All', 'Signature Churn', 'Classic Dairy', 'Plant-Based Gelato'];

  const filteredFlavors =
    selectedCategory === 'All'
      ? flavors
      : flavors.filter((f) => f.category === selectedCategory);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
          Handcrafted Small Batches
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Artisanal Ice Cream Flavors &amp; Churned Gelato Pints
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Every pint is slow-churned in 10-gallon micro-batches using 100% pasture-raised grass-fed Jersey cream, organic cane sugar, and raw single-origin botanicals.
        </p>

        {/* Category Filter Buttons (Functional Tabs per Design Constitution) */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat === 'All' ? 'All Flavors (8)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flavors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFlavors.map((flavor) => (
          <div
            key={flavor.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-64 bg-stone-100 overflow-hidden">
                <img
                  src={flavor.image}
                  alt={flavor.imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-stone-100 font-mono text-[10px] px-2 py-0.5 rounded">
                  {flavor.imageSizeKb} KB (WebP)
                </div>
                <div className="absolute bottom-3 left-3 bg-stone-900/90 text-stone-100 text-xs font-mono px-2.5 py-1 rounded">
                  {flavor.butterfatPercent}% Butterfat
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                    {flavor.category}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                    {flavor.name}
                  </h2>
                  <p className="text-xs text-amber-900 font-medium mt-1">
                    {flavor.tagline}
                  </p>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {flavor.description}
                </p>

                {/* Tasting notes as clean typography */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] text-stone-400 font-mono uppercase block mb-1">
                    Tasting Palette:
                  </span>
                  <p className="text-xs text-stone-700 font-medium">
                    {flavor.tastingNotes.join(' · ')}
                  </p>
                </div>

                {/* Ingredients snippet */}
                <div className="text-[11px] text-stone-500 font-mono">
                  <span className="text-stone-400">Allergens: </span>
                  <span>{flavor.allergens.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-stone-400 block font-mono">Price per Pint</span>
                <span className="text-xl font-serif font-bold text-stone-900 font-mono">
                  ₹{flavor.price.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => onAddToCart(flavor)}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Add to Cold Pack
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Q&A Section on Flavor Formulation for AEO */}
      <section className="bg-stone-100/70 p-8 rounded-3xl border border-stone-200 space-y-6">
        <p className="text-2xl font-serif font-bold text-stone-900">
          How We Formulate Ice Cream Flavors: Q&amp;A
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-stone-900 text-base">
              Why do you never use synthetic stabilizer gums or polysorbates?
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Industrial gums (guar, locust bean, carrageenan) make ice cream gummy and delay melt, leaving an artificial polymer film. We rely entirely on natural egg yolk lecithin, grass-fed dairy solids, and low-temperature vat pasteurization to bind water naturally.
            </p>
            <a
              href="/ice-cream-blog/ice-cream-sugar-freezing-point-science"
              onClick={(e) => handleNav(e, '/ice-cream-blog/ice-cream-sugar-freezing-point-science')}
              className="text-xs font-medium text-amber-800 hover:underline inline-block pt-1"
            >
              Learn more about freezing point science and clean stabilization
            </a>
          </div>
          <div className="space-y-2">
            <h2 className="font-serif font-bold text-stone-900 text-base">
              How are dairy-free pints formulated without cow butterfat?
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Our plant-based pints employ raw organic cashew milk and cold-pressed coconut cream. The resulting botanical lipids crystallize similarly to milk butterfat, achieving a clean melt without heavy coconut aftertastes.
            </p>
            <a
              href="/ice-cream-blog/dairy-free-vegan-frozen-dessert-trends"
              onClick={(e) => handleNav(e, '/ice-cream-blog/dairy-free-vegan-frozen-dessert-trends')}
              className="text-xs font-medium text-amber-800 hover:underline inline-block pt-1"
            >
              Read our full guide to dairy-free plant milk gelato trends
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
