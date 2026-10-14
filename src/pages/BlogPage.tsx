import React, { useState, useEffect, useMemo } from 'react';
import { articles } from '../data/articles';
import { Article } from '../types';
import { updatePageSeo } from '../utils/seo';
import { Search, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface BlogPageProps {
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    updatePageSeo({
      title: 'Ice Cream Blog – Churning Tips & Dessert Recipes | Crème Glacée',
      mainKeyword: 'Ice Cream Blog',
      relatedKeyword1: 'Churning Tips',
      relatedKeyword2: 'Dessert Recipes',
      description: 'Explore our ice cream blog filled with churning tips and dessert recipes. Master the science of butterfat, gelato traditions, and organic dairy sourcing!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/ice-cream-blog',
      ogImage: '/images/churning_guide.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Crème Glacée Ice Cream Culinary & Science Blog',
        description: 'Explore our ice cream blog filled with churning tips and dessert recipes.',
        url: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/ice-cream-blog',
        blogPost: articles.map((art) => ({
          '@type': 'BlogPosting',
          headline: art.seoTitle,
          url: `https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app${art.url}`,
          datePublished: art.publishDate,
          description: art.metaDescription,
        })),
      }
    });
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    articles.forEach((a) => {
      if (!cats.includes(a.category)) cats.push(a.category);
    });
    return cats;
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.seoTitle.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.mainKeyword.toLowerCase().includes(q) ||
        art.qaSections.some((qa) => qa.question.toLowerCase().includes(q) || qa.answer.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 font-sans">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
          The Churn Journal &amp; Science Archive
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Ice Cream Blog: Churning Guides, Dairy Science &amp; Heritage Recipes
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Welcome to our official creamery journal. Explore 10 comprehensive editorial articles featuring high-resolution photography under 100 KB, question-and-answer subheadings for search engine optimization, and verified butterfat chemistry.
        </p>

        {/* Search & Category Filter Controls */}
        <div className="pt-4 space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. overrun, pistachio, freezer burn, sugar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-stone-400 shadow-xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat === 'All' ? `All Articles (${articles.length})` : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid (10 Articles with Photos Under 100kb) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo Under 100kb */}
              <div className="relative h-56 bg-stone-100 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-stone-100 font-mono text-[10px] px-2 py-0.5 rounded">
                  {art.imageSizeKb} KB (WebP)
                </div>
                <div className="absolute bottom-3 left-3 bg-stone-900/90 text-stone-100 text-xs font-mono px-2 py-1 rounded">
                  {art.qaSections.length} Q&amp;A Headings
                </div>
              </div>

              {/* Card Meta & Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.publishDate}</span>
                </div>

                <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                  <a
                    href={art.url}
                    onClick={(e) => handleNav(e, art.url)}
                    className="hover:underline"
                  >
                    {art.seoTitle.split('–')[0].trim()}
                  </a>
                </h2>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>

                {/* Keywords Tag indicator */}
                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex flex-wrap gap-x-2 gap-y-1">
                  <span className="text-stone-400">Target Keywords:</span>
                  <span className="text-amber-900">{art.mainKeyword}</span>
                  <span>·</span>
                  <span>{art.relatedKeyword1}</span>
                </div>
              </div>
            </div>

            {/* Card Footer with Rich Anchor Text */}
            <div className="p-6 pt-0 border-t border-stone-100 mt-4">
              <a
                href={art.url}
                onClick={(e) => handleNav(e, art.url)}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read in-depth article: {art.mainKeyword}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-2">
          <p className="text-stone-700 font-serif text-lg">No articles match your search filter</p>
          <p className="text-xs text-stone-500">Try searching for &quot;churning&quot;, &quot;dairy&quot;, &quot;gelato&quot;, or reset filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 px-4 py-2 bg-stone-900 text-stone-50 text-xs rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
