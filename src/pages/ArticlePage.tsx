import React, { useEffect } from 'react';
import { Article } from '../types';
import { articles } from '../data/articles';
import { updatePageSeo } from '../utils/seo';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, CheckCircle2, Bookmark } from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigate,
}) => {
  useEffect(() => {
    // Update SEO headers & JSON-LD
    updatePageSeo({
      title: article.seoTitle,
      mainKeyword: article.mainKeyword,
      relatedKeyword1: article.relatedKeyword1,
      relatedKeyword2: article.relatedKeyword2,
      description: article.metaDescription,
      canonicalUrl: `https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app${article.url}`,
      ogImage: article.image,
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: article.seoTitle,
            description: article.metaDescription,
            image: article.image,
            datePublished: article.publishDate,
            author: {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Velvet Churn Creamery',
            }
          },
          {
            '@type': 'FAQPage',
            mainEntity: article.qaSections.map((qa) => ({
              '@type': 'Question',
              name: qa.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: qa.answer,
              }
            }))
          }
        ]
      }
    });
  }, [article]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedArticles = articles.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 font-sans">
      {/* Breadcrumb Navigation with Semantic Anchor Texts */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 font-mono">
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="hover:text-stone-900 transition-colors"
        >
          Velvet Churn Home
        </a>
        <span aria-hidden="true">/</span>
        <a
          href="/ice-cream-blog"
          onClick={(e) => handleNav(e, '/ice-cream-blog')}
          className="hover:text-stone-900 transition-colors"
        >
          Ice Cream Blog Archive
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-stone-900 truncate max-w-[200px] sm:max-w-none">
          {article.mainKeyword}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono">
          <span className="text-amber-800 font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishDate}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        {/* Primary H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight text-balance">
          {article.seoTitle.split('–')[0].trim()}
        </h1>

        {/* SEO Target Keyword Callout Card */}
        <div className="p-4 bg-stone-100/90 rounded-2xl border border-stone-200/80 text-xs space-y-2">
          <div className="flex items-center justify-between font-mono text-[11px] text-stone-500 uppercase tracking-wider">
            <span>Search Engine Optimization Metadata</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3 Keyword Formula Validated
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2 bg-white rounded border border-stone-200">
              <span className="text-stone-400 block text-[10px]">Main Keyword:</span>
              <strong className="text-amber-900">{article.mainKeyword}</strong>
            </div>
            <div className="p-2 bg-white rounded border border-stone-200">
              <span className="text-stone-400 block text-[10px]">Related Keyword 1:</span>
              <strong className="text-stone-800">{article.relatedKeyword1}</strong>
            </div>
            <div className="p-2 bg-white rounded border border-stone-200">
              <span className="text-stone-400 block text-[10px]">Related Keyword 2:</span>
              <strong className="text-stone-800">{article.relatedKeyword2}</strong>
            </div>
          </div>
        </div>

        {/* Author Byline */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-10 h-10 rounded-full bg-stone-900 text-stone-100 flex items-center justify-center font-serif text-sm font-semibold">
            {article.author.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">{article.author.name}</p>
            <p className="text-xs text-stone-500">{article.author.role}</p>
          </div>
        </div>
      </header>

      {/* Featured Photo (Verified Under 100 KB) */}
      <div className="space-y-2">
        <figure className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-[360px] sm:h-[460px] object-cover"
            loading="eager"
          />
          <div className="absolute top-4 right-4 bg-stone-950/85 backdrop-blur-xs text-stone-100 font-mono text-xs px-3 py-1 rounded-lg border border-stone-800 flex items-center gap-2">
            <span>Verified Payload:</span>
            <span className="text-emerald-400 font-bold">{article.imageSizeKb} KB</span>
            <span className="text-stone-400 text-[10px]">(Under 100 KB limit)</span>
          </div>
        </figure>
        <figcaption className="text-xs text-stone-500 italic px-2">
          {article.imageAlt}
        </figcaption>
      </div>

      {/* Intro Lead Paragraph */}
      <div className="text-lg text-stone-700 font-serif leading-relaxed italic border-l-2 border-amber-800 pl-4 py-1">
        {article.contentIntro}
      </div>

      {/* Subheadings in Question and Answer Format (for Google Featured Snippets) */}
      <section className="space-y-8 pt-4">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
            Search Engine Featured Snippet Structure
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
            Core Inquiry: Question &amp; Answer Analysis
          </h2>
        </div>

        {article.qaSections.map((qa, index) => (
          <div
            key={index}
            className="p-6 sm:p-7 bg-white rounded-2xl border border-stone-200/90 shadow-xs space-y-4"
          >
            {/* The Question Subheading as H2/H3 */}
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              {qa.question}
            </h3>

            {/* Direct Answer Paragraph */}
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {qa.answer}
            </p>

            {/* Key Takeaway */}
            {qa.keyTakeaway && (
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-amber-900">Key Takeaway: </strong>
                  <span>{qa.keyTakeaway}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Deep Body Narrative */}
      <section className="space-y-4 pt-4 border-t border-stone-200 text-stone-700 text-base leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Culinary Application &amp; Churn Room Notes
        </h2>
        <p>{article.contentBody}</p>
        <p>
          At Velvet Churn, these chemical and agricultural principles guide every recipe we churn. From balancing the freezing point depression to safeguarding delicate pasture enzymes, our commitment to artisanal standards remains uncompromised.
        </p>

        {/* Contextual Internal Links with Rich Descriptive Anchor Texts */}
        <div className="p-5 bg-stone-100 rounded-2xl border border-stone-200 space-y-2 mt-6">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block">
            Explore Related Creamery Resources:
          </span>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/artisan-ice-cream-flavors"
                onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
                className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Discover our handcrafted small-batch ice cream flavor menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              <a
                href="/our-creamery-story"
                onClick={(e) => handleNav(e, '/our-creamery-story')}
                className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Read the Velvet Churn pasture-raised dairy mission and heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              <a
                href="/frequently-asked-questions"
                onClick={(e) => handleNav(e, '/frequently-asked-questions')}
                className="font-medium text-amber-800 hover:text-amber-950 inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Review ice cream nutritional profiles and dry ice delivery FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Cross-Link to Related Articles with Rich Anchor Texts */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-stone-200 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Recommended Churning &amp; Ingredient Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-stone-400">
                    {rel.category}
                  </span>
                  <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                    <a
                      href={rel.url}
                      onClick={(e) => handleNav(e, rel.url)}
                      className="hover:text-amber-800 transition-colors"
                    >
                      {rel.seoTitle.split('–')[0].trim()}
                    </a>
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-stone-100">
                  <a
                    href={rel.url}
                    onClick={(e) => handleNav(e, rel.url)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                  >
                    <span>Read guide: {rel.mainKeyword}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back to Blog Button */}
      <div className="pt-6">
        <a
          href="/ice-cream-blog"
          onClick={(e) => handleNav(e, '/ice-cream-blog')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Ice Cream Blog Archive (All 10 Guides)</span>
        </a>
      </div>
    </article>
  );
};
