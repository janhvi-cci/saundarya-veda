import { Link } from 'react-router-dom';
import { Sparkles, Wind, Droplet, Flower2, ArrowRight } from 'lucide-react';
import { APPLICATIONS } from '@/data/ingredients';
import ScrollReveal from './ScrollReveal';
import ImageWithFallback from './ImageWithFallback';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Wind,
  Droplet,
  Flower2,
};

export default function ApplicationCards() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-brand-pink-light rounded-full mb-4">
            Applications
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">
            Ingredients for Every Beauty Application
          </h2>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            Explore ingredients suited for your specific formulation needs across skincare, haircare, body care and cosmetics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {APPLICATIONS.map((app, idx) => {
            const Icon = iconMap[app.icon] || Sparkles;
            return (
              <ScrollReveal key={app.name} delay={idx * 100}>
                <Link
                  to={`/ingredients?application=${encodeURIComponent(app.name)}`}
                  className="group block bg-white rounded-xl overflow-hidden border border-brand-pink/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(41,35,38,0.12)] hover:border-brand-pink-deep/40 h-full"
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <ImageWithFallback src={app.image} alt={`${app.name} formulation ingredients`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-pink-deep" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2">{app.name}</h3>
                    <p className="text-sm text-brand-text-secondary leading-relaxed mb-4">{app.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {app.items.map((item) => <span key={item} className="text-xs text-brand-text-secondary border border-brand-pink/50 rounded-full px-2.5 py-1">{item}</span>)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-pink-deep">View Ingredients <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
