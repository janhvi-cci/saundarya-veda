import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import IngredientGrid from '@/components/IngredientGrid';
import { ingredients, CATEGORIES } from '@/data/ingredients';

export default function Ingredients() {
  useSEO({
    title: 'Ingredients | Saundarya Veda',
    description:
      'Explore our catalogue of premium beauty and cosmetic ingredients. Search and filter by category and application.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const applicationParam = searchParams.get('application') || '';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [activeApplication, setActiveApplication] = useState(applicationParam);
  const [showFilters, setShowFilters] = useState(false);

  // Sync from URL
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setActiveApplication(applicationParam);
  }, [applicationParam]);

  const allApplications = useMemo(() => {
    const apps = new Set<string>();
    ingredients.forEach((i) => i.applications.forEach((a) => apps.add(a)));
    return Array.from(apps).sort();
  }, []);

  const filtered = useMemo(() => {
    return ingredients.filter((ingredient) => {
      const matchesSearch =
        search === '' ||
        ingredient.name.toLowerCase().includes(search.toLowerCase()) ||
        ingredient.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || ingredient.category === activeCategory;
      const matchesApplication =
        activeApplication === '' || ingredient.applications.includes(activeApplication);
      return matchesSearch && matchesCategory && matchesApplication;
    });
  }, [search, activeCategory, activeApplication]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    updateUrl(category, activeApplication);
  };

  const handleApplicationChange = (application: string) => {
    const newApp = activeApplication === application ? '' : application;
    setActiveApplication(newApp);
    updateUrl(activeCategory, newApp);
  };

  const updateUrl = (category: string, application: string) => {
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (application) params.set('application', application);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearch('');
    setActiveCategory('All');
    setActiveApplication('');
    setSearchParams({});
  };

  const hasActiveFilters = search || activeCategory !== 'All' || activeApplication;

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Ingredient Catalogue"
        description="Search and filter our premium beauty and cosmetic ingredients for your formulation needs."
        breadcrumb="Ingredients"
      />

      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ingredient name..."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-lg border border-brand-pink/50 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink-deep/20 focus:border-brand-pink-deep"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-brand-charcoal border border-brand-pink/50 rounded-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr] gap-8">
            {/* Sidebar / Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Category filter */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-charcoal mb-3">Category</h3>
                  <div className="flex lg:flex-col flex-wrap gap-2">
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className={`px-3 py-2 text-sm rounded-lg text-left transition-all ${
                        activeCategory === 'All'
                          ? 'bg-brand-pink-deep text-white'
                          : 'bg-brand-pink-light text-brand-charcoal hover:bg-brand-pink/50'
                      }`}
                    >
                      All
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-2 text-sm rounded-lg text-left transition-all ${
                          activeCategory === cat
                            ? 'bg-brand-pink-deep text-white'
                            : 'bg-brand-pink-light text-brand-charcoal hover:bg-brand-pink/50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Application filter */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-charcoal mb-3">Application</h3>
                  <div className="flex lg:flex-col flex-wrap gap-2">
                    {allApplications.map((app) => (
                      <button
                        key={app}
                        onClick={() => handleApplicationChange(app)}
                        className={`px-3 py-2 text-sm rounded-lg text-left transition-all ${
                          activeApplication === app
                            ? 'bg-brand-pink-deep text-white'
                            : 'bg-brand-pink-light text-brand-charcoal hover:bg-brand-pink/50'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 text-sm text-brand-pink-deep hover:underline"
                  >
                    <X className="w-3.5 h-3.5" />
                    Clear all filters
                  </button>
                )}
              </div>
            </aside>

            {/* Results */}
            <div>
              <p className="text-sm text-brand-text-secondary mb-5">
                Showing {filtered.length} ingredient{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
                {activeApplication && ` for ${activeApplication}`}
              </p>
              <IngredientGrid ingredients={filtered} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
