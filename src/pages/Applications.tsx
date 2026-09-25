import { Link } from 'react-router-dom';
import { Sparkles, Wind, Droplet, Flower2, ArrowRight, Check } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import { APPLICATIONS, ingredients } from '@/data/ingredients';
import ImageWithFallback from '@/components/ImageWithFallback';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Wind,
  Droplet,
  Flower2,
};

export default function Applications() {
  useSEO({
    title: 'Applications | Saundarya Veda',
    description:
      'Explore beauty and cosmetic ingredient applications across skincare, haircare, body care and cosmetics.',
  });

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Ingredients for Every Beauty Application"
        description="Discover ingredients suited for your specific formulation needs across skincare, haircare, body care and cosmetics."
        breadcrumb="Applications"
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 lg:space-y-14">
          {APPLICATIONS.map((app, idx) => {
            const Icon = iconMap[app.icon] || Sparkles;
            const isAlt = idx % 2 === 1;
            const relatedIngredients = ingredients.filter((ingredient) => ingredient.applications.includes(app.name)).slice(0, 4);
            return (
              <div
                key={app.name}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isAlt ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={isAlt ? 'lg:col-start-2' : ''}>
                  <div className="w-14 h-14 rounded-2xl bg-brand-pink-light flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-brand-pink-deep" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-4">
                    {app.name}
                  </h2>
                  <p className="text-brand-text-secondary leading-relaxed mb-5">
                    {app.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {app.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm font-medium text-brand-pink-deep bg-brand-pink-light rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/ingredients?application=${encodeURIComponent(app.name)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all"
                  >
                    View {app.name} Ingredients
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Visual block */}
                <div className={isAlt ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="overflow-hidden rounded-xl border border-brand-pink/40 bg-brand-pink-light shadow-[0_16px_36px_rgba(41,35,38,0.08)]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <ImageWithFallback src={app.image} alt={`${app.name} beauty formulation environment`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 flex items-center gap-3 text-white"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-brand-pink-deep"><Icon className="h-5 w-5" /></span><span className="font-serif text-2xl">{app.name}</span></div>
                    </div>
                    <div className="p-6">
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-pink-deep">Commonly explored ingredients</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {relatedIngredients.map((ingredient) => <Link key={ingredient.slug} to={`/ingredients/${ingredient.slug}`} className="flex items-center gap-2 rounded-lg border border-brand-pink/30 bg-white px-3 py-2 text-sm text-brand-charcoal hover:border-brand-pink-deep"><Check className="h-3.5 w-3.5 text-brand-pink-deep" />{ingredient.name}</Link>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
