import { Link } from 'react-router-dom';
import { ArrowRight, Beaker, Package, FileText, FlaskConical } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import ScrollReveal from '@/components/ScrollReveal';
import CategoryCards from '@/components/CategoryCards';
import ApplicationCards from '@/components/ApplicationCards';
import CTASection from '@/components/CTASection';
import { FeaturedIngredientsSection } from '@/components/IngredientGrid';
import IngredientCarousel from '@/components/IngredientCarousel';
import InsightsSection from '@/components/InsightsSection';
import { ingredients } from '@/data/ingredients';

const trustFeatures = [
  {
    icon: Beaker,
    title: 'B2B Focus',
    description: 'Designed around business and formulation requirements.',
  },
  {
    icon: FlaskConical,
    title: 'Ingredient Support',
    description: 'Explore ingredients across multiple beauty applications.',
  },
  {
    icon: Package,
    title: 'Sample Assistance',
    description: 'Businesses can request samples for evaluation.',
  },
  {
    icon: FileText,
    title: 'Product Information',
    description: 'Request available technical and product information.',
  },
];

const whyUsFeatures = [
  {
    title: 'Quality-Assured Ingredients',
    description:
      'Ingredient sourcing focused on consistency and suitability for beauty formulations.',
  },
  {
    title: 'Reliable Supply',
    description:
      'Designed to support businesses with recurring ingredient requirements.',
  },
  {
    title: 'Technical Information',
    description:
      'Relevant product information can be provided based on ingredient requirements.',
  },
  {
    title: 'B2B Support',
    description: 'Dedicated enquiry flows for business requirements.',
  },
  {
    title: 'Sample Support',
    description:
      'Businesses can request ingredient samples for evaluation.',
  },
  {
    title: 'Documentation Support',
    description:
      'Businesses can request available technical and product documentation.',
  },
];

export default function Home() {
  useSEO({
    title: 'Saundarya Veda | Premium Beauty & Cosmetic Ingredients',
    description:
      'Saundarya Veda supplies premium beauty and cosmetic ingredients for brands, manufacturers, formulators and personal-care businesses. Explore ingredients, request samples and get a quote.',
  });

  return (
    <div className="pt-16 lg:pt-18">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-pink-light to-white">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-brand-pink/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-white rounded-full mb-6 shadow-sm">
                B2B Beauty Ingredient Supplier
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-brand-charcoal leading-[1.15] mb-6">
                Premium Beauty Ingredients for Next-Generation Formulations
              </h1>
              <p className="text-base lg:text-lg text-brand-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                High-quality beauty and cosmetic ingredients for brands, manufacturers, formulators, and personal-care businesses.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center">
                <Link
                  to="/ingredients"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all shadow-sm hover:shadow-md"
                >
                  Explore Ingredients
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/request-quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-brand-charcoal bg-white border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
                >
                  Request a Quote
                </Link>
              </div>
              <p className="mt-6 text-sm text-brand-text-secondary">
                Ingredients designed for brands, manufacturers and formulators.
              </p>
            </div>

            {/* Ingredient showcase */}
            <IngredientCarousel />
          </div>
        </div>
      </section>

      {/* B2B TRUST SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">
              Built for Better Beauty Formulations
            </h2>
            <p className="text-brand-text-secondary max-w-2xl mx-auto leading-relaxed">
              From botanical extracts to functional cosmetic ingredients, Saundarya Veda helps beauty businesses source ingredients for modern formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={idx * 100}>
                  <div className="bg-brand-pink-light rounded-2xl p-6 border border-brand-pink/30 h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,175,192,0.15)]">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand-pink-deep" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* INGREDIENT CATEGORIES */}
      <CategoryCards />

      {/* FEATURED INGREDIENTS */}
      <FeaturedIngredientsSection ingredients={ingredients} />

      {/* APPLICATIONS */}
      <ApplicationCards />

      <InsightsSection />

      {/* WHY US */}
      <section className="py-16 lg:py-24 bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-white rounded-full mb-4">
              Why Us
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">
              Why Partner with Saundarya Veda?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsFeatures.map((feature, idx) => (
              <ScrollReveal key={feature.title} delay={(idx % 3) * 100}>
                <div className="bg-white rounded-2xl p-6 border border-brand-pink/30 h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,175,192,0.15)]">
                  <div className="w-10 h-10 rounded-lg bg-brand-pink-light flex items-center justify-center mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-pink-deep" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* B2B PARTNER CTA */}
      <CTASection
        heading="Looking for a Reliable Beauty Ingredient Partner?"
        description="Tell us about your business and ingredient requirements. Our team can help you explore suitable ingredients, samples, product information and quotation options."
        primaryLabel="Become a B2B Partner"
        primaryLink="/become-a-partner"
        secondaryLabel="Request a Quote"
        secondaryLink="/request-quote"
        variant="pink"
      />

      {/* FINAL CTA */}
      <CTASection
        heading="Let's Build Better Beauty Products"
        description="Have an ingredient requirement, formulation project or sourcing enquiry? Talk to Saundarya Veda."
        primaryLabel="Request a Quote"
        primaryLink="/request-quote"
        secondaryLabel="Request a Sample"
        secondaryLink="/request-sample"
        tertiaryLabel="Contact Us"
        tertiaryLink="/contact"
        variant="white"
      />
    </div>
  );
}
