import React, { useEffect, useState } from 'react';
import { updatePageSeo } from '../utils/seo';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
  linkText?: string;
  linkUrl?: string;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs: FaqItem[] = [
    {
      category: 'Shipping & Delivery',
      question: 'How does dry ice nationwide delivery guarantee rock-solid frozen arrival?',
      answer: 'We pack every order in custom high-density compostable coolers packed with 5 lbs of industrial dry ice (-78.5°C). The sublimation curve is engineered to keep your pints below -20°C for up to 54 hours of continuous transit.',
      linkText: 'Review our step-by-step pint storage and freezer burn prevention guide',
      linkUrl: '/ice-cream-blog/how-to-store-ice-cream-prevent-freezer-burn',
    },
    {
      category: 'Shipping & Delivery',
      question: 'How should I safely unpack and dispose of the dry ice in my shipping cooler?',
      answer: 'Never touch dry ice pellets with bare hands, as extreme cold causes cryogenic skin burns. Use oven mitts or tongs to place the remaining dry ice block in a well-ventilated outdoor area or sink away from children and pets until it sublimates into gaseous carbon dioxide.',
    },
    {
      category: 'Ingredients & Nutrition',
      question: 'What is the butterfat percentage and why is it higher than supermarket ice cream?',
      answer: 'Standard supermarket brands hover at the legal federal minimum of 10% butterfat and inject 80-100% whipped air. Velvet Churn pints feature 14% to 16% pure pasture butterfat from grass-fed Jersey cows with only 22% overrun, yielding an extraordinarily rich mouthfeel.',
      linkText: 'Explore the thermodynamic butterfat chemistry in our churning guide',
      linkUrl: '/ice-cream-blog/artisan-ice-cream-churning-guide',
    },
    {
      category: 'Ingredients & Nutrition',
      question: 'Do any Velvet Churn ice cream flavors contain gluten, peanuts, or synthetic dyes?',
      answer: 'Our core dairy bases are naturally gluten-free with zero artificial colorants or chemical dyes. We explicitly label all tree nuts (such as our Bronte pistachios and roasted almond vegan pints). Flours are restricted strictly to house-baked waffle cone inclusion flavors.',
      linkText: 'Check the complete ingredients on our artisanal flavors menu',
      linkUrl: '/artisan-ice-cream-flavors',
    },
    {
      category: 'Tasting & Serving',
      question: 'What is the ideal tempering temperature and time before scooping artisanal ice cream?',
      answer: 'Because our ice cream contains zero chemical softeners, vegetable oils, or high-fructose corn syrup, it freezes very firm. Allow your pint to sit on the kitchen counter for 5 to 7 minutes before scooping, reaching an optimal tasting temperature of -12°C (10°F).',
      linkText: 'Read about freezing point depression science and soft scoop chemistry',
      linkUrl: '/ice-cream-blog/ice-cream-sugar-freezing-point-science',
    },
    {
      category: 'Plant-Based & Vegan',
      question: 'How are your plant-based gelato pints crafted without dairy or eggs?',
      answer: 'We blend raw organic cashew cream with virgin coconut butterfat and hydrolyzed oat solids. This bespoke lipid formula crystallizes identically to dairy milk fat, achieving a rich melt-in-mouth glide without coconut dominating the palate.',
      linkText: 'Discover how botanical fats mimic dairy in our vegan dessert report',
      linkUrl: '/ice-cream-blog/dairy-free-vegan-frozen-dessert-trends',
    }
  ];

  useEffect(() => {
    updatePageSeo({
      title: 'Ice Cream FAQ – Nutrition Facts & Allergen Ingredients | Velvet Churn',
      mainKeyword: 'Ice Cream FAQ',
      relatedKeyword1: 'Nutrition Facts',
      relatedKeyword2: 'Allergen Ingredients',
      description: 'Find answers to ice cream FAQ regarding nutrition facts and allergen ingredients. Learn about dry-ice shipping, butterfat levels, and dairy-free options!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/frequently-asked-questions',
      ogImage: '/src/assets/images/freezer_burn.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          }
        }))
      }
    });
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', 'Shipping & Delivery', 'Ingredients & Nutrition', 'Tasting & Serving', 'Plant-Based & Vegan'];

  const filteredFaqs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 font-sans">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
          Knowledge Base &amp; Consumer Guide
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Frequently Asked Questions: Artisanal Ice Cream &amp; Shipping
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Comprehensive answers formatted directly for search clarity. Learn how our dry-ice cold shipping operates, our 100% grass-fed dairy sourcing, allergen policies, and temperature tempering tips.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Q&A List in Question and Answer format */}
      <div className="space-y-6">
        {filteredFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <span>{faq.category}</span>
              <span>·</span>
              <span>Question #{idx + 1}</span>
            </div>

            {/* Subheading in Question Format */}
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              {faq.question}
            </h2>

            {/* Answer */}
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {faq.answer}
            </p>

            {/* Rich Anchor Text Cross-Link if applicable */}
            {faq.linkText && faq.linkUrl && (
              <div className="pt-2 text-xs">
                <a
                  href={faq.linkUrl}
                  onClick={(e) => handleNav(e, faq.linkUrl!)}
                  className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{faq.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact box */}
      <div className="p-8 bg-stone-100 rounded-3xl border border-stone-200 text-center space-y-3">
        <h3 className="text-2xl font-serif font-bold text-stone-900">
          Have an unlisted dietary or delivery question?
        </h3>
        <p className="text-sm text-stone-600 max-w-md mx-auto">
          Our creamery hospitality team in Portland answers questions regarding custom dietary flights and corporate catering.
        </p>
        <div className="pt-2">
          <a
            href="/creamery-locations"
            onClick={(e) => handleNav(e, '/creamery-locations')}
            className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Contact our scoop shop hospitality desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
