import React, { useEffect } from 'react';
import { updatePageSeo } from '../utils/seo';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface StoryPageProps {
  onNavigate: (path: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Our Creamery Story – Grass-Fed Dairy & Small Batch Churning | Velvet Churn',
      mainKeyword: 'Our Creamery Story',
      relatedKeyword1: 'Grass-Fed Dairy',
      relatedKeyword2: 'Small Batch Churning',
      description: 'Read our creamery story and commitment to grass-fed dairy and small batch churning. Discover how pasture-raised cows create richer, unadulterated ice cream pints!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/our-creamery-story',
      ogImage: '/src/assets/images/dairy_pasture.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Our Creamery Story – Velvet Churn',
        description: 'Read our creamery story and commitment to grass-fed dairy and small batch churning.',
        publisher: {
          '@type': 'Organization',
          name: 'Velvet Churn Creamery',
        }
      }
    });
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
          Heritage &amp; Agricultural Mission
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
          Our Creamery Story: From Regenerative Pastures to the Ice Cream Churn
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Velvet Churn began in 2018 with a radical thesis: ice cream cannot be judged by sweet toppings alone. True greatness is dictated by the soil biology, the grass variety, and the integrity of the raw butterfat.
        </p>
      </div>

      {/* Hero Visual Asset */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200">
        <img
          src="/src/assets/images/dairy_pasture.webp"
          alt="Jersey dairy cows grazing on lush green organic pasture at sunrise"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-stone-900/85 backdrop-blur-md px-4 py-2 rounded-xl text-stone-100 text-xs font-mono flex items-center gap-3">
          <span>Oatfield Valley Cooperative Dairy Farm</span>
          <span>·</span>
          <span className="text-emerald-400">70 KB (WebP)</span>
        </div>
      </div>

      {/* Philosophy Body */}
      <div className="prose prose-stone max-w-none text-stone-700 space-y-6 text-base leading-relaxed">
        <p>
          Most supermarket ice cream brands operate as mass-scale chemical blenders. They buy ultra-pasteurized industrial cream powder, mix it with corn syrups and emulsifying gums, whip it with 100% ambient air, and rely on artificial vanilla extract to mask flat flavors.
        </p>
        <p>
          We rejected that shortcut. We formed long-term partnerships with independent regenerative dairy farmers who let heritage Jersey cows graze freely for at least 240 days a year on pesticide-free pastures. Jersey cows produce smaller milk yields, but their cream possesses an extraordinarily dense 5% raw butterfat rich in natural carotenoids and fat-soluble vitamins.
        </p>
      </div>

      {/* Q&A Subheadings Format Section */}
      <section className="bg-stone-100/80 p-8 sm:p-10 rounded-3xl border border-stone-200 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
            Creamery Heritage &amp; Science
          </span>
          <h2 className="text-3xl font-serif font-bold text-stone-900">
            Frequently Asked Questions About Our Artisanal Process
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-2">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Why do we enforce low-temperature vat pasteurization instead of industrial UHT?
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Ultra-high temperature pasteurization (UHT) blasts milk to 140°C for 3 seconds. While it extends shelf-life indefinitely, it denatures fragile whey proteins and imparts an indelible cooked, burnt sulfur note. Our vat pasteurization holds the cream gently at 63°C for 30 minutes, destroying bacteria while safeguarding clean floral and grassy undertones.
            </p>
            <div className="pt-2 text-xs">
              <a
                href="/ice-cream-blog/organic-dairy-sourcing-grass-fed-cream"
                onClick={(e) => handleNav(e, '/ice-cream-blog/organic-dairy-sourcing-grass-fed-cream')}
                className="text-amber-800 hover:text-amber-950 font-medium inline-flex items-center gap-1"
              >
                <span>Read our detailed farm report on organic dairy sourcing standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-2">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              What role does slow batch freezing play in Velvet Churn texture?
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Our continuous horizontal batch freezers spin slowly at controlled dasher revolutions. This gentle scraping action limits air overrun to just 22%—ensuring every spoonful has the weight and density of authentic European gelato while honoring the high-butterfat decadence of American ice cream.
            </p>
            <div className="pt-2 text-xs">
              <a
                href="/ice-cream-blog/artisan-ice-cream-churning-guide"
                onClick={(e) => handleNav(e, '/ice-cream-blog/artisan-ice-cream-churning-guide')}
                className="text-amber-800 hover:text-amber-950 font-medium inline-flex items-center gap-1"
              >
                <span>Explore our comprehensive ice cream churning guide with butterfat science</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-2">
            <h3 className="text-xl font-serif font-bold text-stone-900">
              How do we source botanicals like Bronte pistachios and Bourbon vanilla?
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              We never purchase pre-made flavor syrups or extracts. We import whole cured Vanilla planifolia pods directly from the Sava region in Madagascar, and 100% certified PDO pistachios harvested biennially from volcanic orchards near Mount Etna in Sicily.
            </p>
            <div className="pt-2 text-xs">
              <a
                href="/ice-cream-blog/sicilian-pistachio-ice-cream-history"
                onClick={(e) => handleNav(e, '/ice-cream-blog/sicilian-pistachio-ice-cream-history')}
                className="text-amber-800 hover:text-amber-950 font-medium inline-flex items-center gap-1"
              >
                <span>Discover the history of Bronte green pistachios and Sicilian gelato</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <div className="text-center pt-8 space-y-4">
        <h3 className="text-2xl font-serif font-bold text-stone-900">
          Experience the Difference of Fresh Churned Cream
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Order our curated 4-pint tasting flight or select individual pints shipped cold directly to your doorstep.
        </p>
        <div className="pt-2">
          <a
            href="/artisan-ice-cream-flavors"
            onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
            className="px-6 py-3.5 bg-stone-900 text-stone-50 hover:bg-stone-800 text-sm font-semibold rounded-xl inline-flex items-center gap-2 transition-colors"
          >
            <span>Browse all handcrafted ice cream flavors</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
