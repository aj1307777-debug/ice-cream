import React, { useEffect } from 'react';
import { Flavor } from '../types';
import { articles } from '../data/articles';
import { updatePageSeo } from '../utils/seo';
import { ArrowRight, Sparkles, Check, Droplets, Snowflake } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  featuredFlavors: Flavor[];
  onAddToCart: (flavor: Flavor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  featuredFlavors,
  onAddToCart,
}) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Artisan Ice Cream – Organic Gelato & Gourmet Pints | Crème Glacée',
      mainKeyword: 'Artisan Ice Cream',
      relatedKeyword1: 'Organic Gelato',
      relatedKeyword2: 'Gourmet Pints',
      description: 'Taste award-winning artisan ice cream and organic gelato churned in small batches with grass-fed dairy. Order fresh gourmet pints online with dry-ice delivery!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/',
      ogImage: '/images/hero_artisanal_churn.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'IceCreamShop',
        name: 'Crème Glacée Artisanal Ice Cream & Gelato',
        description: 'Taste award-winning artisan ice cream and organic gelato churned in small batches with grass-fed dairy.',
        url: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/',
        priceRange: '$$',
        servesCuisine: ['Artisan Ice Cream', 'Italian Gelato', 'Gourmet Pints'],
      }
    });
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200/80">
                <span>Small Batch Churned</span>
                <span>·</span>
                <span>100% Pasture-Raised Cream</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12] text-balance">
                Artisan ice cream crafted from pure grass-fed cream and slow-churned gelato traditions.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                We believe true creamery decadence begins in the pasture. Slow-churned at 22% overrun with zero synthetic stabilizers, our pints deliver pure, dense, melt-in-your-mouth luxury.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/artisan-ice-cream-flavors"
                  onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
                  className="px-6 py-3.5 bg-stone-900 text-stone-50 hover:bg-stone-800 text-sm font-medium rounded-xl shadow-md transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Explore handcrafted ice cream pints</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/ice-cream-blog"
                  onClick={(e) => handleNav(e, '/ice-cream-blog')}
                  className="px-6 py-3.5 bg-white text-stone-800 hover:bg-stone-100 border border-stone-300 text-sm font-medium rounded-xl transition-all inline-flex items-center gap-2"
                >
                  <span>Read our 10 culinary churning guides</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-3 gap-4 text-xs text-stone-600 font-mono">
                <div>
                  <span className="block text-stone-900 font-bold text-sm">15.5%</span>
                  <span>Pure Butterfat</span>
                </div>
                <div>
                  <span className="block text-stone-900 font-bold text-sm">22%</span>
                  <span>Low Overrun Air</span>
                </div>
                <div>
                  <span className="block text-stone-900 font-bold text-sm">-18°C</span>
                  <span>Dry Ice Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Media Focal Anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-100">
                <img
                  src="/images/hero_artisanal_churn.webp"
                  alt="Artisanal ice cream shop counter with scoops of gourmet pistachio and strawberry ice cream in ceramic bowls"
                  className="w-full h-[460px] object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md p-4 rounded-2xl border border-stone-700/60 text-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-serif font-semibold text-sm text-amber-200">
                      Signature Tasting Flight
                    </p>
                    <p className="text-stone-300 text-[11px]">
                      Pistachio, Bourbon Vanilla &amp; Roasted Strawberry
                    </p>
                  </div>
                  <span className="font-mono text-emerald-400 bg-stone-950 px-2.5 py-1 rounded-md border border-emerald-900 text-[10px]">
                    77 KB (WebP)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pints Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
              Current Micro-Batch Rotation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Featured Artisanal Ice Cream Flavors
            </h2>
          </div>
          <a
            href="/artisan-ice-cream-flavors"
            onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
            className="text-sm font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>View complete 8-flavor seasonal collection</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFlavors.map((flavor) => (
            <div
              key={flavor.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-56 bg-stone-100 overflow-hidden">
                <img
                  src={flavor.image}
                  alt={flavor.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-stone-100 font-mono text-[10px] px-2 py-0.5 rounded">
                  {flavor.imageSizeKb} KB
                </div>
                <div className="absolute bottom-3 left-3 bg-stone-900/90 text-stone-100 text-xs font-mono px-2 py-1 rounded">
                  {flavor.butterfatPercent}% Butterfat
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">
                    {flavor.category}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {flavor.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {flavor.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-500 block font-mono">Pint Price</span>
                    <span className="text-base font-serif font-bold text-stone-900 font-mono">
                      ₹{flavor.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(flavor)}
                    className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Structured Q&A Search Subheading Section */}
      <section className="bg-stone-100/80 border-y border-stone-200 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
              Search Engine Knowledge Base
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              The Science of Artisanal Churning: Frequently Answered Questions
            </h2>
            <p className="text-sm text-stone-600">
              Direct, transparent answers addressing how our ingredients and thermodynamic batch freezing differentiate genuine craft from industrial ice cream.
            </p>
          </div>

          <div className="space-y-6">
            {/* Q&A Item 1 */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-start gap-3">
                <span className="text-amber-700 font-mono text-sm uppercase pt-1">Q1:</span>
                <span>Why does pasture-raised Jersey cow cream create superior ice cream mouthfeel?</span>
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed pl-8">
                Jersey cow milk naturally carries a richer fat-to-protein ratio and higher levels of beta-carotene, resulting in an authentic ivory-golden hue. Because their diet consists of rotational perennial pastures rather than fermented feedlot grain, the resulting butterfat melts at a lower threshold (35°C), releasing delicate volatile aromatics across the palate without leaving a waxy coating.
              </p>
              <div className="pl-8 pt-1 text-xs">
                <a
                  href="/ice-cream-blog/organic-dairy-sourcing-grass-fed-cream"
                  onClick={(e) => handleNav(e, '/ice-cream-blog/organic-dairy-sourcing-grass-fed-cream')}
                  className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                >
                  <span>Read our complete farm investigation on organic grass-fed cream sourcing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Q&A Item 2 */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-start gap-3">
                <span className="text-amber-700 font-mono text-sm uppercase pt-1">Q2:</span>
                <span>How does low overrun batch freezing prevent icy crystallization?</span>
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed pl-8">
                Industrial commercial ice cream incorporates up to 100% overrun—meaning half the pint is whipped air that melts instantly into water droplets. In our craft batch freezer, we maintain overrun between 20% and 25%. Combined with cryogenic scraped-surface heat exchangers, ice crystals stay below 20 microns, far smaller than the 35-micron threshold detectable by human sensory papillae.
              </p>
              <div className="pl-8 pt-1 text-xs">
                <a
                  href="/ice-cream-blog/artisan-ice-cream-churning-guide"
                  onClick={(e) => handleNav(e, '/ice-cream-blog/artisan-ice-cream-churning-guide')}
                  className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                >
                  <span>Review the thermodynamic physics of artisan ice cream churning and texture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Q&A Item 3 */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200 space-y-3">
              <h2 className="text-xl font-serif font-bold text-stone-900 flex items-start gap-3">
                <span className="text-amber-700 font-mono text-sm uppercase pt-1">Q3:</span>
                <span>How can ice cream pints be shipped nationwide while remaining frozen solid?</span>
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed pl-8">
                Every online shipment is nestled in compostable recycled-cotton insulated coolers packed with 5 lbs of solid dry ice pellets at -78.5°C (-109°F). This deep-freeze environment ensures that even during peak summer transit, pints arrive rock-solid and untouched by ambient temperature swings.
              </p>
              <div className="pl-8 pt-1 text-xs">
                <a
                  href="/frequently-asked-questions"
                  onClick={(e) => handleNav(e, '/frequently-asked-questions')}
                  className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                >
                  <span>Learn more about dry ice unboxing safety in our shipping FAQ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Highlights from the 10 Blog Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
              Culinary Journal &amp; Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              From the Creamery Churn Room
            </h2>
          </div>
          <a
            href="/ice-cream-blog"
            onClick={(e) => handleNav(e, '/ice-cream-blog')}
            className="text-sm font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Explore all 10 in-depth articles in our blog archive</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-52 bg-stone-100 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-stone-100 font-mono text-[10px] px-2 py-0.5 rounded">
                  {article.imageSizeKb} KB (WebP)
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    <a
                      href={article.url}
                      onClick={(e) => handleNav(e, article.url)}
                      className="hover:underline"
                    >
                      {article.seoTitle.split('–')[0].trim()}
                    </a>
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={article.url}
                    onClick={(e) => handleNav(e, article.url)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                  >
                    <span>Read full article: {article.mainKeyword}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
