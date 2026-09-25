import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Ingredient } from '@/data/ingredients';
import IngredientCard from './IngredientCard';

interface IngredientGridProps {
  ingredients: Ingredient[];
  columns?: 'default' | 'wide';
}

export default function IngredientGrid({ ingredients, columns = 'default' }: IngredientGridProps) {
  if (ingredients.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-brand-text-secondary text-lg">
          No ingredients found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        columns === 'wide'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
      }
    >
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient.id} ingredient={ingredient} />
      ))}
    </div>
  );
}

export function FeaturedIngredientsSection({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-brand-pink-light rounded-full mb-4">
            Featured
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">
            Featured Ingredients
          </h2>
          <p className="text-brand-text-secondary max-w-2xl mx-auto">
            A selection of our premium beauty and cosmetic ingredients for modern formulations.
          </p>
        </div>

        <IngredientGrid ingredients={ingredients.slice(0, 8)} />

        <div className="text-center mt-12">
          <Link
            to="/ingredients"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all shadow-sm hover:shadow-md"
          >
            View All Ingredients
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
