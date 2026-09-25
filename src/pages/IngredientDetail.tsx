import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Quote, FlaskConical, FileText } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { getIngredientBySlug, ingredients } from '@/data/ingredients';
import IngredientCard from '@/components/IngredientCard';
import CTASection from '@/components/CTASection';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function IngredientDetail() {
  const { slug } = useParams<{ slug: string }>();
  const ingredient = slug ? getIngredientBySlug(slug) : undefined;

  useSEO({
    title: ingredient
      ? `${ingredient.name} | Saundarya Veda`
      : 'Ingredient Not Found | Saundarya Veda',
    description: ingredient?.description,
  });

  if (!ingredient) {
    return (
      <div className="pt-16 lg:pt-18 min-h-screen flex items-center justify-center bg-brand-pink-light">
        <div className="text-center px-4">
          <h1 className="font-serif text-3xl font-semibold text-brand-charcoal mb-4">
            Ingredient Not Found
          </h1>
          <p className="text-brand-text-secondary mb-6">
            The ingredient you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/ingredients"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Ingredients
          </Link>
        </div>
      </div>
    );
  }

  const relatedIngredients = ingredient.detail.relatedSlugs
    .map((relatedSlug) => ingredients.find((item) => item.slug === relatedSlug))
    .filter((item): item is typeof ingredient => Boolean(item));

  const infoItems = [
    { label: 'Ingredient Category', value: ingredient.category },
    { label: 'Common Name', value: ingredient.commonName },
    { label: 'INCI Name', value: ingredient.inciName },
    { label: 'Form', value: ingredient.form },
    { label: 'Origin', value: ingredient.origin },
    { label: 'Typical Applications', value: ingredient.applications.join(', ') },
    { label: 'Recommended Usage', value: ingredient.recommendedUsage },
    { label: 'Packaging', value: ingredient.packaging },
    { label: 'MOQ', value: ingredient.moq },
  ];

  return (
    <div className="pt-16 lg:pt-18">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-8 lg:pt-12 pb-10 lg:pb-14 bg-brand-pink-light">
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full border border-brand-pink-deep/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/ingredients"
            className="inline-flex items-center gap-1.5 text-sm text-brand-text-secondary hover:text-brand-pink-deep transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ingredients
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] border border-brand-pink/40">
              <ImageWithFallback
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="lg:pt-5">
              <span className="inline-block px-3 py-1 text-xs font-medium text-brand-pink-deep bg-white rounded-full mb-4">
                {ingredient.category}
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-brand-charcoal mb-4 leading-tight">
                {ingredient.name}
              </h1>
              <p className="text-base text-brand-text-secondary leading-relaxed mb-6">
                {ingredient.description}
              </p>

              {/* Applications */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-brand-charcoal mb-2">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 text-xs font-medium text-brand-pink-deep bg-white rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/request-quote?ingredient=${encodeURIComponent(ingredient.name)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all"
                >
                  <Quote className="w-4 h-4" />
                  Request Quote
                </Link>
                <Link
                  to={`/request-sample?ingredient=${encodeURIComponent(ingredient.name)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-brand-charcoal border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
                >
                  <FlaskConical className="w-4 h-4" />
                  Request Sample
                </Link>
                <Link
                  to={`/request-sample?ingredient=${encodeURIComponent(ingredient.name)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-brand-charcoal border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
                >
                  <FileText className="w-4 h-4" />
                  Technical Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulation guide */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-3">About {ingredient.name}</h2>
                <p className="text-brand-text-secondary leading-relaxed">{ingredient.detail.overview}</p>
              </div>
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-3">Why is it used in beauty products?</h2>
                <p className="text-brand-text-secondary leading-relaxed">{ingredient.detail.whyUsed}</p>
              </div>
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-3">How it is commonly used</h2>
                <p className="text-brand-text-secondary leading-relaxed">{ingredient.detail.howUsed}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-brand-pink/30 bg-brand-pink-light p-6">
                <h2 className="font-serif text-xl font-semibold text-brand-charcoal mb-4">Key cosmetic benefits</h2>
                <ul className="space-y-2 text-sm text-brand-text-secondary">{ingredient.detail.benefits.map((benefit) => <li key={benefit} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink-deep" />{benefit}</li>)}</ul>
              </div>
              <div className="rounded-xl border border-brand-pink/30 bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-brand-charcoal mb-4">Skin types & suitability</h2>
                <div className="flex flex-wrap gap-2">{ingredient.detail.skinTypes.map((type) => <span key={type} className="rounded-full bg-brand-pink-light px-3 py-1.5 text-xs font-medium text-brand-pink-deep">{type}</span>)}</div>
                <p className="mt-4 text-xs leading-relaxed text-brand-text-secondary">Suitability can vary with the complete formulation and individual sensitivity.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-brand-pink/30 p-6">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal mb-4">Common product formats</h2>
              <div className="flex flex-wrap gap-2">{ingredient.detail.productFormats.map((format) => <span key={format} className="rounded-full border border-brand-pink/50 px-3 py-1.5 text-xs text-brand-charcoal">{format}</span>)}</div>
            </div>
            <div className="rounded-xl border border-brand-pink/30 p-6">
              <h2 className="font-serif text-xl font-semibold text-brand-charcoal mb-3">Potential considerations</h2>
              <p className="text-sm leading-relaxed text-brand-text-secondary">{ingredient.detail.considerations}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-8">
            Key Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-px bg-brand-pink/30 rounded-xl overflow-hidden border border-brand-pink/30">
            {infoItems.map((item) => (
              <div key={item.label} className="bg-white p-5">
                <p className="text-xs font-medium text-brand-text-secondary uppercase tracking-wide mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-brand-charcoal font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-brand-pink-light rounded-xl border border-brand-pink/30">
            <p className="text-sm text-brand-text-secondary leading-relaxed">
              Please contact our team for current specifications, availability and documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Related ingredients */}
      {relatedIngredients.length > 0 && (
        <section className="py-12 lg:py-16 bg-brand-pink-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-8">
              Related Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedIngredients.map((ri) => (
                <IngredientCard key={ri.id} ingredient={ri} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading="Need More Information?"
        description="Request a quote, sample or technical documentation for this ingredient."
        primaryLabel="Request a Quote"
        primaryLink={`/request-quote?ingredient=${encodeURIComponent(ingredient.name)}`}
        secondaryLabel="Request a Sample"
        secondaryLink={`/request-sample?ingredient=${encodeURIComponent(ingredient.name)}`}
        variant="white"
      />
    </div>
  );
}
