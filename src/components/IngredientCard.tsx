import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import type { Ingredient } from '@/data/ingredients';
import ImageWithFallback from './ImageWithFallback';

interface IngredientCardProps {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-brand-pink/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(41,35,38,0.12)] hover:border-brand-pink-deep/40">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-pink-light">
        <ImageWithFallback
          src={ingredient.image}
          alt={ingredient.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium text-brand-charcoal bg-white/90 backdrop-blur-sm rounded-full border border-white/70">
          {ingredient.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
          {ingredient.name}
        </h3>
        <p className="text-sm text-brand-text-secondary leading-relaxed mb-3 line-clamp-2">
          {ingredient.description}
        </p>

        {/* Application tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {ingredient.applications.map((app) => (
            <span
              key={app}
              className="px-2.5 py-1 text-xs font-medium text-brand-pink-deep bg-brand-pink-light rounded-full"
            >
              {app}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link
            to={`/ingredients/${ingredient.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-brand-charcoal border border-brand-charcoal/15 rounded-lg hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
          >
            View Ingredient
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to={`/request-quote?ingredient=${encodeURIComponent(ingredient.name)}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-brand-pink-deep rounded-lg hover:bg-brand-pink-deep/90 transition-all"
          >
            <Quote className="w-3.5 h-3.5" />
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
