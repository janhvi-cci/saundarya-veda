import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, CATEGORY_DESCRIPTIONS, CATEGORY_IMAGES, CATEGORY_SLUGS, ingredients } from '@/data/ingredients';
import ScrollReveal from './ScrollReveal';
import ImageWithFallback from './ImageWithFallback';

export default function CategoryCards() {
  const examplesByCategory = CATEGORIES.reduce<Record<string, string[]>>((result, category) => {
    result[category] = ingredients.filter((ingredient) => ingredient.category === category).slice(0, 4).map((ingredient) => ingredient.name);
    return result;
  }, {});

  return (
    <section className="py-16 lg:py-24 bg-brand-pink-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-white rounded-full mb-4">
            Categories
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">
            Explore Our Ingredient Categories
          </h2>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            Discover ingredients organized by type, from natural botanicals to functional cosmetic actives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, idx) => (
            <ScrollReveal key={category} delay={idx * 100}>
              <Link
                to={`/ingredients?category=${encodeURIComponent(category)}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-brand-pink/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,175,192,0.2)] hover:border-brand-pink-deep/40 h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={CATEGORY_IMAGES[category]}
                    alt={category}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed mb-3">
                    {CATEGORY_DESCRIPTIONS[category]}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {examplesByCategory[category].map((example) => (
                      <span key={example} className="px-2.5 py-1 text-xs text-brand-charcoal bg-brand-pink-light border border-brand-pink/40 rounded-full">
                        {example}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-pink-deep">
                    Explore Ingredients
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { CATEGORY_SLUGS };
