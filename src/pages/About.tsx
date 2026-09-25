import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import { Leaf, Beaker, FlaskConical, FileText, Headphones, Package, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import ImageWithFallback from '@/components/ImageWithFallback';

const highlights = [
  {
    icon: Leaf,
    title: 'Ingredient Sourcing',
    description: 'Sourcing beauty and cosmetic ingredients for business formulation needs.',
  },
  {
    icon: Headphones,
    title: 'B2B Support',
    description: 'Dedicated enquiry flows designed for business requirements.',
  },
  {
    icon: FlaskConical,
    title: 'Formulation Requirements',
    description: 'Supporting businesses with ingredients for their formulation projects.',
  },
  {
    icon: Package,
    title: 'Sample Support',
    description: 'Businesses can request ingredient samples for evaluation.',
  },
  {
    icon: FileText,
    title: 'Product Information',
    description: 'Available technical and product information on request.',
  },
  {
    icon: Beaker,
    title: 'Business Enquiries',
    description: 'Businesses can contact us for ingredient and sourcing enquiries.',
  },
];

export default function About() {
  useSEO({
    title: 'About | Saundarya Veda',
    description:
      'Saundarya Veda focuses on supplying beauty and cosmetic ingredients to businesses developing beauty and personal-care products.',
  });

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Powering Better Beauty Formulations"
        description="Saundarya Veda focuses on supplying beauty and cosmetic ingredients to businesses developing beauty and personal-care products."
        breadcrumb="About"
      />

      {/* Intro section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-brand-pink/40">
            <ImageWithFallback src="https://images.pexels.com/photos/7262997/pexels-photo-7262997.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Botanical ingredients prepared for beauty formulation research" loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border border-white/70 p-4 rounded-lg">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold">Ingredient intelligence</p>
              <p className="text-sm text-brand-charcoal mt-1">Sourcing support for thoughtful formulations.</p>
            </div>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-5">About Saundarya Veda</p>
            <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-brand-charcoal mb-6 leading-tight">A considered approach to ingredient sourcing.</h2>
            <p className="text-lg text-brand-text-secondary leading-relaxed mb-6">
              Saundarya Veda is a B2B supplier of beauty and cosmetic ingredients, serving businesses that manufacture, formulate or develop beauty and personal-care products.
            </p>
            <p className="text-base text-brand-text-secondary leading-relaxed mb-6">
              We work with beauty brands, cosmetic manufacturers, contract and private-label manufacturers, personal-care manufacturers, formulators, R&D companies, and ingredient distributors. Our focus is on helping businesses source ingredients suited for modern formulations across skincare, haircare, body care and cosmetics.
            </p>
            <p className="text-base text-brand-text-secondary leading-relaxed">
              From botanical extracts to functional cosmetic actives, we support businesses with ingredient enquiries, sample requests, product information and quotation options.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 lg:py-20 bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-brand-charcoal mb-10 text-center">
            What We Support
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={(idx % 3) * 100}>
                  <div className="bg-white rounded-2xl p-6 border border-brand-pink/30 h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,175,192,0.15)]">
                    <div className="w-12 h-12 rounded-xl bg-brand-pink-light flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand-pink-deep" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
            <div className="relative rounded-3xl overflow-hidden border border-brand-pink/40 shadow-[0_20px_60px_rgba(41,35,38,0.08)]">
              <ImageWithFallback
                src="https://images.pexels.com/photos/3735657/pexels-photo-3735657.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Beauty formulation ingredients and skincare preparation"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-pink-light mb-2">Support for formulators</p>
                <p className="text-lg font-medium">From concept to evaluation, we help teams explore meaningful ingredient options.</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-4">How we support businesses</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-6 leading-tight">Thoughtful sourcing for beauty and personal-care teams.</h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Ingredient discovery',
                    description: 'We help businesses shortlist ingredients that align with their application, product direction and formulation intent.',
                  },
                  {
                    title: 'Sample and information support',
                    description: 'Businesses can request available details, sample support and next-step guidance for evaluation and comparison.',
                  },
                  {
                    title: 'Practical B2B communication',
                    description: 'Our enquiry process is designed to help brands, manufacturers and formulators move efficiently from idea to conversation.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-2xl border border-brand-pink/40 bg-brand-pink-light p-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                      <Sparkles className="h-5 w-5 text-brand-pink-deep" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-1">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-brand-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">From ingredient idea to formulation brief</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal">A simple path for product teams</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              'Define the application or product category you are building.',
              'Explore relevant ingredients across botanical, active, hydration and oil categories.',
              'Request product information, sample support or quotation guidance.',
              'Move forward with a focused shortlist for your formulation process.',
            ].map((step, index) => (
              <div key={step} className="rounded-2xl border border-brand-pink/40 bg-white p-5 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink-light text-sm font-semibold text-brand-pink-deep">
                  0{index + 1}
                </div>
                <p className="text-sm leading-relaxed text-brand-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Let's Build Better Beauty Products"
        description="Have an ingredient requirement or sourcing enquiry? Talk to Saundarya Veda."
        primaryLabel="Contact Us"
        primaryLink="/contact"
        secondaryLabel="Become a Partner"
        secondaryLink="/become-a-partner"
        variant="white"
      />
    </div>
  );
}
