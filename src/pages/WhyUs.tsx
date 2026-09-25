import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';
import ScrollReveal from '@/components/ScrollReveal';
import { ShieldCheck, Truck, FileText, Headphones, FlaskConical, ClipboardList, ArrowRight, Sparkles } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

const features = [
  {
    icon: ShieldCheck,
    title: 'Quality-Assured Ingredients',
    description:
      'Ingredient sourcing focused on consistency and suitability for beauty formulations.',
  },
  {
    icon: Truck,
    title: 'Reliable Supply',
    description:
      'Designed to support businesses with recurring ingredient requirements.',
  },
  {
    icon: FileText,
    title: 'Technical Information',
    description:
      'Relevant product information can be provided based on ingredient requirements.',
  },
  {
    icon: Headphones,
    title: 'B2B Support',
    description: 'Dedicated enquiry flows for business requirements.',
  },
  {
    icon: FlaskConical,
    title: 'Sample Support',
    description:
      'Businesses can request ingredient samples for evaluation.',
  },
  {
    icon: ClipboardList,
    title: 'Documentation Support',
    description:
      'Businesses can request available technical and product documentation.',
  },
];

export default function WhyUs() {
  useSEO({
    title: 'Why Us | Saundarya Veda',
    description:
      'Why partner with Saundarya Veda for your beauty and cosmetic ingredient requirements.',
  });

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Why Partner with Saundarya Veda?"
        description="We focus on supporting beauty businesses with quality ingredients, reliable supply and dedicated B2B support."
        breadcrumb="Why Us"
      />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={(idx % 3) * 100}>
                  <div className="bg-brand-pink-light rounded-2xl p-7 border border-brand-pink/30 h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgba(232,175,192,0.15)]">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-brand-pink-deep" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-3">
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

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-4">A smarter sourcing process</p>
              <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-brand-charcoal mb-6 leading-tight">A supplier that understands beauty formulation operations.</h2>
              <p className="text-base leading-relaxed text-brand-text-secondary mb-6">
                Saundarya Veda is built for the realities of beauty and personal-care businesses: fast-moving development cycles, varied application needs, and the need for a more organised ingredient sourcing process.
              </p>

              <div className="space-y-4">
                {[
                  'Explore ingredients across categories relevant to skin, hair, body and cosmetic formulations.',
                  'Receive support for the next stage of evaluation, sample requests and product information.',
                  'Work with a partner that understands B2B formulation timelines and enquiry workflows.',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-brand-pink/30 bg-brand-pink-light p-4">
                    <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white">
                      <ArrowRight className="h-4 w-4 text-brand-pink-deep" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm leading-relaxed text-brand-charcoal">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-brand-pink/40 shadow-[0_20px_60px_rgba(41,35,38,0.08)]">
              <ImageWithFallback
                src="https://images.pexels.com/photos/5069408/pexels-photo-5069408.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Beauty product formulation and cosmetic ingredient research"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/55 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  ingredient sourcing
                </div>
                <p className="mt-4 text-lg font-medium">Helping teams move from ingredient interest to informed formulation decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">Typical formulation support</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal">What businesses often need from a supplier</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Application guidance', text: 'Support in matching ingredient types to skincare, haircare, body care or cosmetic objectives.' },
              { title: 'Catalog clarity', text: 'A structured ingredient view that makes it easier to compare categories and explore relevant options.' },
              { title: 'Quotations and next steps', text: 'A clear path to request quotations, samples and product information for evaluation.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-pink/40 bg-white p-6 h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light">
                  <FlaskConical className="h-5 w-5 text-brand-pink-deep" strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-text-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Source Better Ingredients?"
        description="Tell us about your formulation requirements and let Saundarya Veda help you find the right ingredients."
        primaryLabel="Become a B2B Partner"
        primaryLink="/become-a-partner"
        secondaryLabel="Request a Quote"
        secondaryLink="/request-quote"
        variant="pink"
      />
    </div>
  );
}
