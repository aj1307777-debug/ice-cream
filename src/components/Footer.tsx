import React from 'react';
import { articles } from '../data/articles';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-stone-100 tracking-tight">
              Velvet Churn
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              Small-batch artisanal ice cream and Italian-style gelato churned from 100% pasture-raised, grass-fed Jersey cow cream. Never homogenized, zero synthetic gums.
            </p>
            <div className="pt-2 text-xs text-stone-500 space-y-1 font-mono">
              <p>Certified Organic Creamery #4812</p>
              <p>Small-Batch Churned in Portland, OR</p>
            </div>
          </div>

          {/* Quick Links with Rich Anchor Texts */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 font-mono">
              The Creamery
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/artisan-ice-cream-flavors"
                  onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Browse all 8 handcrafted ice cream pints
                </a>
              </li>
              <li>
                <a
                  href="/our-creamery-story"
                  onClick={(e) => handleNav(e, '/our-creamery-story')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Read our grass-fed dairy sourcing philosophy
                </a>
              </li>
              <li>
                <a
                  href="/ice-cream-blog"
                  onClick={(e) => handleNav(e, '/ice-cream-blog')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Explore our ice cream culinary blog archive
                </a>
              </li>
              <li>
                <a
                  href="/frequently-asked-questions"
                  onClick={(e) => handleNav(e, '/frequently-asked-questions')}
                  className="hover:text-amber-300 transition-colors"
                >
                  View nutrition facts and dry ice shipping FAQ
                </a>
              </li>
              <li>
                <a
                  href="/creamery-locations"
                  onClick={(e) => handleNav(e, '/creamery-locations')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Visit our regional scoop shop parlors
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Editorial Articles with Rich Anchor Texts */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 font-mono">
              Popular Articles & Churning Guides
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {articles.slice(0, 6).map((art) => (
                <div key={art.id}>
                  <a
                    href={art.url}
                    onClick={(e) => handleNav(e, art.url)}
                    className="hover:text-amber-300 transition-colors block text-stone-300 truncate"
                    title={art.seoTitle}
                  >
                    {art.seoTitle.split('–')[0].trim()}
                  </a>
                </div>
              ))}
              {articles.slice(6, 10).map((art) => (
                <div key={art.id}>
                  <a
                    href={art.url}
                    onClick={(e) => handleNav(e, art.url)}
                    className="hover:text-amber-300 transition-colors block text-stone-300 truncate"
                    title={art.seoTitle}
                  >
                    {art.seoTitle.split('–')[0].trim()}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Velvet Churn Creamery LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Verified 100% WebP Images under 100 KB</span>
            <span>·</span>
            <span>SEO Validated URL Architecture</span>
            <span>·</span>
            <span>Q&amp;A Search Snippets</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
