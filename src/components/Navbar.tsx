import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-2xl sm:text-[1.65rem] font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
            aria-label="Crème Glacée home"
          >
            Crème Glacée
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <a
              href="/artisan-ice-cream-flavors"
              onClick={(e) => handleLinkClick(e, '/artisan-ice-cream-flavors')}
              className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
                currentPath === '/artisan-ice-cream-flavors'
                  ? 'border-amber-700 text-amber-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Artisan Flavors
            </a>
            <a
              href="/our-creamery-story"
              onClick={(e) => handleLinkClick(e, '/our-creamery-story')}
              className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
                currentPath === '/our-creamery-story'
                  ? 'border-amber-700 text-amber-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Our Story
            </a>
            <a
              href="/ice-cream-blog"
              onClick={(e) => handleLinkClick(e, '/ice-cream-blog')}
              className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
                currentPath.startsWith('/ice-cream-blog')
                  ? 'border-amber-700 text-amber-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Ice Cream Blog
            </a>
            <a
              href="/frequently-asked-questions"
              onClick={(e) => handleLinkClick(e, '/frequently-asked-questions')}
              className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
                currentPath === '/frequently-asked-questions'
                  ? 'border-amber-700 text-amber-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              FAQ & Nutrition
            </a>
            <a
              href="/creamery-locations"
              onClick={(e) => handleLinkClick(e, '/creamery-locations')}
              className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
                currentPath === '/creamery-locations'
                  ? 'border-amber-700 text-amber-900 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              Scoop Shops
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={`Shopping bag containing ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-stone-700" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="font-mono text-xs bg-amber-800 text-amber-50 px-1.5 py-0.2 rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-stone-800">
            <a
              href="/artisan-ice-cream-flavors"
              onClick={(e) => handleLinkClick(e, '/artisan-ice-cream-flavors')}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Artisan Flavors
            </a>
            <a
              href="/our-creamery-story"
              onClick={(e) => handleLinkClick(e, '/our-creamery-story')}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Our Story
            </a>
            <a
              href="/ice-cream-blog"
              onClick={(e) => handleLinkClick(e, '/ice-cream-blog')}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Ice Cream Blog (10 Guides)
            </a>
            <a
              href="/frequently-asked-questions"
              onClick={(e) => handleLinkClick(e, '/frequently-asked-questions')}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              FAQ & Nutrition
            </a>
            <a
              href="/creamery-locations"
              onClick={(e) => handleLinkClick(e, '/creamery-locations')}
              className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Scoop Shops
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
