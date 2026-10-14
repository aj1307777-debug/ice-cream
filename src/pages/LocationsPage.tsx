import React, { useEffect } from 'react';
import { updatePageSeo } from '../utils/seo';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';

interface LocationsPageProps {
  onNavigate: (path: string) => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: 'Creamery Locations – Scoop Shop Parlors & Tasting Rooms | Crème Glacée',
      mainKeyword: 'Creamery Locations',
      relatedKeyword1: 'Scoop Shop Parlors',
      relatedKeyword2: 'Tasting Rooms',
      description: 'Visit Crème Glacée creamery locations across Portland and Seattle scoop shop parlors and tasting rooms. Taste fresh-churned waffle cones and flight boards today!',
      canonicalUrl: 'https://ais-dev-5p4uxx5jibrtwmllg6ke7r-75411372434.asia-east1.run.app/creamery-locations',
      ogImage: '/images/waffle_cone.webp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Crème Glacée Flagship Parlor',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '742 NW 23rd Avenue',
          addressLocality: 'Portland',
          addressRegion: 'OR',
          postalCode: '97210',
          addressCountry: 'US'
        },
        telephone: '+1-503-555-0194',
        openingHours: 'Mo-Su 12:00-22:30'
      }
    });
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const locations = [
    {
      name: 'Northwest Portland Flagship & Micro-Churnery',
      neighborhood: 'Nob Hill District',
      address: '742 NW 23rd Avenue, Portland, OR 97210',
      hours: 'Mon – Sun: 12:00 PM – 10:30 PM',
      phone: '(503) 555-0194',
      features: ['Visible Batch Churning Windows', 'Warm Waffle Rolling Station', 'Tasting Flight Boards', 'Curbside Pint Pickup'],
    },
    {
      name: 'Southeast Division Tasting Parlor',
      neighborhood: 'Richmond District',
      address: '3218 SE Division Street, Portland, OR 97202',
      hours: 'Sun – Thu: 1:00 PM – 10:00 PM | Fri – Sat: 1:00 PM – 11:00 PM',
      phone: '(503) 555-0283',
      features: ['Outdoor Heated Garden Patio', 'Specialty Affogato Bar', 'Seasonal Fruit Sundaes'],
    },
    {
      name: 'Capitol Hill Seattle Scoop Room',
      neighborhood: 'Pike-Pine Corridor',
      address: '1108 E Pike Street, Seattle, WA 98122',
      hours: 'Mon – Sun: 1:00 PM – 10:30 PM',
      phone: '(206) 555-0741',
      features: ['Single-Origin Espresso Affogatos', 'Dairy-Free Dedicated Dipper Wells', 'Pint Freezer Wall'],
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800">
          Parlor Visits &amp; Tasting Flights
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Creamery Locations &amp; Regional Scoop Shop Parlors
        </h1>
        <p className="text-base text-stone-600 leading-relaxed">
          Step into our scoop parlors where warm waffle cones are rolled fresh every 15 minutes and our churning dashers spin behind copper-framed glass observation counters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {locations.map((loc, i) => (
          <div
            key={i}
            className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono text-amber-800 uppercase tracking-wider">
                  {loc.neighborhood}
                </span>
                <h2 className="text-xl font-serif font-bold text-stone-900 mt-1">
                  {loc.name}
                </h2>
              </div>

              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{loc.hours}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <span>{loc.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-mono uppercase text-stone-400 block mb-1.5">
                  Parlor Features:
                </span>
                <ul className="space-y-1 text-xs text-stone-700">
                  {loc.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100">
              <a
                href="/artisan-ice-cream-flavors"
                onClick={(e) => handleNav(e, '/artisan-ice-cream-flavors')}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
              >
                <span>Preview parlor scoop flavors menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Q&A Subheadings for Parlor Experiences */}
      <section className="bg-stone-100/80 p-8 sm:p-10 rounded-3xl border border-stone-200 space-y-6">
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Visiting Our Scoop Parlors: Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Are tasting samples permitted before choosing a scoop?
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Yes! Our scoopers provide unlimited complimentary tastes using compostable silver spoons so you can discover your favorite butterfat blend and fruit infusion.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              Can I pick up pre-packed dry ice pint flights at the parlors?
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Every parlor maintains a deep-freeze pint wall kept at -25°C. You can pick up individual pints or request insulated travel bags packed for flights and long road trips.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
