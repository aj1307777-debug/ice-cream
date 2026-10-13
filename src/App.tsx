import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SeoInspector } from './components/SeoInspector';
import { HomePage } from './pages/HomePage';
import { FlavorsPage } from './pages/FlavorsPage';
import { StoryPage } from './pages/StoryPage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { FaqPage } from './pages/FaqPage';
import { LocationsPage } from './pages/LocationsPage';
import { flavors } from './data/flavors';
import { articles } from './data/articles';
import { Flavor, CartItem } from './types';
import { SeoPageConfig } from './utils/seo';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (flavor: Flavor) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.flavor.id === flavor.id);
      if (existing) {
        return prev.map((item) =>
          item.flavor.id === flavor.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { flavor, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (flavorId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(flavorId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.flavor.id === flavorId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (flavorId: string) => {
    setCartItems((prev) => prev.filter((item) => item.flavor.id !== flavorId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Determine current active page & SEO metadata
  let activeComponent: React.ReactNode = null;
  let currentSeoConfig: SeoPageConfig = {
    title: 'Artisan Ice Cream – Organic Gelato & Gourmet Pints | Velvet Churn',
    mainKeyword: 'Artisan Ice Cream',
    relatedKeyword1: 'Organic Gelato',
    relatedKeyword2: 'Gourmet Pints',
    description: 'Taste award-winning artisan ice cream and organic gelato churned in small batches with grass-fed dairy. Order fresh gourmet pints online with dry-ice delivery!',
    canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/',
  };
  let imagesOnPage: { name: string; sizeKb: number }[] = [];
  let qaHeadingsCount = 0;

  // Article routing: check if path is /ice-cream-blog/:slug
  if (currentPath.startsWith('/ice-cream-blog/')) {
    const slug = currentPath.replace('/ice-cream-blog/', '').replace(/\/$/, '');
    const matchedArticle = articles.find((a) => a.slug === slug);
    if (matchedArticle) {
      activeComponent = <ArticlePage article={matchedArticle} onNavigate={navigate} />;
      currentSeoConfig = {
        title: matchedArticle.seoTitle,
        mainKeyword: matchedArticle.mainKeyword,
        relatedKeyword1: matchedArticle.relatedKeyword1,
        relatedKeyword2: matchedArticle.relatedKeyword2,
        description: matchedArticle.metaDescription,
        canonicalUrl: `https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app${matchedArticle.url}`,
        ogImage: matchedArticle.image,
      };
      imagesOnPage = [
        { name: matchedArticle.image.split('/').pop() || 'article-photo.webp', sizeKb: matchedArticle.imageSizeKb }
      ];
      qaHeadingsCount = matchedArticle.qaSections.length;
    } else {
      // Fallback to Blog Hub if slug not found
      activeComponent = <BlogPage onNavigate={navigate} />;
    }
  } else if (currentPath === '/ice-cream-blog') {
    activeComponent = <BlogPage onNavigate={navigate} />;
    currentSeoConfig = {
      title: 'Ice Cream Blog – Churning Tips & Dessert Recipes | Velvet Churn',
      mainKeyword: 'Ice Cream Blog',
      relatedKeyword1: 'Churning Tips',
      relatedKeyword2: 'Dessert Recipes',
      description: 'Explore our ice cream blog filled with churning tips and dessert recipes. Master the science of butterfat, gelato traditions, and organic dairy sourcing!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/ice-cream-blog',
      ogImage: '/src/assets/images/churning_guide.webp',
    };
    imagesOnPage = articles.map((a) => ({
      name: a.image.split('/').pop() || 'photo.webp',
      sizeKb: a.imageSizeKb,
    }));
    qaHeadingsCount = articles.reduce((acc, a) => acc + a.qaSections.length, 0);
  } else if (currentPath === '/artisan-ice-cream-flavors') {
    activeComponent = (
      <FlavorsPage
        flavors={flavors}
        onAddToCart={handleAddToCart}
        onNavigate={navigate}
      />
    );
    currentSeoConfig = {
      title: 'Ice Cream Flavors – Handcrafted Gelato & Dairy-Free Pints | Velvet Churn',
      mainKeyword: 'Ice Cream Flavors',
      relatedKeyword1: 'Handcrafted Gelato',
      relatedKeyword2: 'Dairy-Free Pints',
      description: 'Explore all 8 artisanal ice cream flavors including handcrafted gelato and dairy-free pints. Order small-batch micro-creams delivered cold in dry ice today!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/artisan-ice-cream-flavors',
      ogImage: '/src/assets/images/pistachio_gelato.webp',
    };
    imagesOnPage = flavors.map((f) => ({
      name: f.image.split('/').pop() || 'flavor.webp',
      sizeKb: f.imageSizeKb,
    }));
    qaHeadingsCount = 2;
  } else if (currentPath === '/our-creamery-story') {
    activeComponent = <StoryPage onNavigate={navigate} />;
    currentSeoConfig = {
      title: 'Our Creamery Story – Grass-Fed Dairy & Small Batch Churning | Velvet Churn',
      mainKeyword: 'Our Creamery Story',
      relatedKeyword1: 'Grass-Fed Dairy',
      relatedKeyword2: 'Small Batch Churning',
      description: 'Read our creamery story and commitment to grass-fed dairy and small batch churning. Discover how pasture-raised cows create richer, unadulterated ice cream pints!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/our-creamery-story',
      ogImage: '/src/assets/images/dairy_pasture.webp',
    };
    imagesOnPage = [
      { name: 'dairy_pasture.webp', sizeKb: 70 },
    ];
    qaHeadingsCount = 3;
  } else if (currentPath === '/frequently-asked-questions') {
    activeComponent = <FaqPage onNavigate={navigate} />;
    currentSeoConfig = {
      title: 'Ice Cream FAQ – Nutrition Facts & Allergen Ingredients | Velvet Churn',
      mainKeyword: 'Ice Cream FAQ',
      relatedKeyword1: 'Nutrition Facts',
      relatedKeyword2: 'Allergen Ingredients',
      description: 'Find answers to ice cream FAQ regarding nutrition facts and allergen ingredients. Learn about dry-ice shipping, butterfat levels, and dairy-free options!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/frequently-asked-questions',
      ogImage: '/src/assets/images/freezer_burn.webp',
    };
    imagesOnPage = [
      { name: 'freezer_burn.webp', sizeKb: 52 },
    ];
    qaHeadingsCount = 6;
  } else if (currentPath === '/creamery-locations') {
    activeComponent = <LocationsPage onNavigate={navigate} />;
    currentSeoConfig = {
      title: 'Creamery Locations – Scoop Shop Parlors & Tasting Rooms | Velvet Churn',
      mainKeyword: 'Creamery Locations',
      relatedKeyword1: 'Scoop Shop Parlors',
      relatedKeyword2: 'Tasting Rooms',
      description: 'Visit Velvet Churn creamery locations across Portland and Seattle scoop shop parlors and tasting rooms. Taste fresh-churned waffle cones and flight boards today!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/creamery-locations',
      ogImage: '/src/assets/images/waffle_cone.webp',
    };
    imagesOnPage = [
      { name: 'waffle_cone.webp', sizeKb: 46 }
    ];
    qaHeadingsCount = 2;
  } else {
    // Default Home
    activeComponent = (
      <HomePage
        onNavigate={navigate}
        featuredFlavors={flavors.slice(0, 4)}
        onAddToCart={handleAddToCart}
      />
    );
    currentSeoConfig = {
      title: 'Artisan Ice Cream – Organic Gelato & Gourmet Pints | Velvet Churn',
      mainKeyword: 'Artisan Ice Cream',
      relatedKeyword1: 'Organic Gelato',
      relatedKeyword2: 'Gourmet Pints',
      description: 'Taste award-winning artisan ice cream and organic gelato churned in small batches with grass-fed dairy. Order fresh gourmet pints online with dry-ice delivery!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/',
      ogImage: '/src/assets/images/hero_artisanal_churn.webp',
    };
    imagesOnPage = [
      { name: 'hero_artisanal_churn.webp', sizeKb: 77 },
      { name: 'bourbon_vanilla.webp', sizeKb: 57 },
      { name: 'pistachio_gelato.webp', sizeKb: 46 },
      { name: 'summer_berry.webp', sizeKb: 76 },
      { name: 'waffle_cone.webp', sizeKb: 46 },
    ];
    qaHeadingsCount = 3;
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 3-Zone Top Bar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {activeComponent}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={navigate} />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Live Interactive SEO Inspector */}
      <SeoInspector
        currentPath={currentPath}
        config={currentSeoConfig}
        imagesOnPage={imagesOnPage}
        qaHeadingsCount={qaHeadingsCount}
      />
    </div>
  );
}
