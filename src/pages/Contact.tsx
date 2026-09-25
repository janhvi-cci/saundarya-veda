import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import PageHeader from '@/components/PageHeader';
import CTASection from '@/components/CTASection';

export default function Contact() {
  useSEO({
    title: 'Contact | Saundarya Veda',
    description:
      'Get in touch with Saundarya Veda for ingredient enquiries, samples, quotations and B2B collaboration.',
  });

  const contactItems = [
    { icon: MapPin, label: 'Address', content: <span>13, Institutional Area,<br />Lodhi Road,<br />New Delhi- 110003</span> },
    { icon: Phone, label: 'Phone', content: <span><a href="tel:9910196123" className="hover:text-brand-pink-deep">9910196123</a><br /><a href="tel:9650560277" className="hover:text-brand-pink-deep">9650560277</a></span> },
    { icon: Mail, label: 'Email', content: <a href="mailto:globalexpressgroup@gmail.com" className="break-all hover:text-brand-pink-deep">globalexpressgroup@gmail.com</a> },
  ];

  return (
    <div className="pt-16 lg:pt-18">
      <PageHeader
        title="Let's Build Better Beauty Products"
        description="Have an ingredient requirement, formulation project or sourcing enquiry? Talk to Saundarya Veda."
        breadcrumb="Contact"
      />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-4">Start a conversation</p>
            <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-brand-charcoal mb-5 leading-tight">Ingredient sourcing, with clarity.</h2>
            <p className="text-brand-text-secondary leading-relaxed">Tell us what you are developing, what you need to evaluate, or where your supply requirements are headed. We will help you choose the right enquiry path.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-brand-pink-light rounded-2xl p-6 border border-brand-pink/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-pink-deep" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-brand-text-secondary uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      <p className="text-sm text-brand-charcoal font-medium">{item.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enquiry CTAs */}
          <div className="sm:col-span-2 bg-brand-pink-light rounded-xl p-8 lg:p-10 border border-brand-pink/30 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center mb-5">
              <MessageCircle className="w-7 h-7 text-brand-pink-deep" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-brand-charcoal mb-3">
              Send an Enquiry
            </h2>
            <p className="text-sm text-brand-text-secondary mb-6 max-w-md mx-auto">
              Choose the option that best fits your needs and we'll get back to you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/become-a-partner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all"
              >
                Become a Partner
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/request-quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-brand-charcoal bg-white border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
              >
                Request a Quote
              </Link>
              <Link
                to="/request-sample"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-brand-charcoal bg-white border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
              >
                Request a Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-brand-pink-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-[0.18em] text-brand-pink-deep font-semibold mb-3">Common enquiry types</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal">We can help with the next step in your sourcing journey.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Ingredient portfolio questions',
                text: 'Ask about relevant ingredient categories, skincare or haircare applications and business-ready sourcing options.',
              },
              {
                title: 'Sample and information requests',
                text: 'Request product information, sample support or next-step guidance for ingredient evaluation.',
              },
              {
                title: 'Quotation and collaboration enquiries',
                text: 'Share your business requirements and let our team guide you through the most suitable enquiry path.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-pink/40 bg-white p-6 h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink-light">
                  <MessageCircle className="h-5 w-5 text-brand-pink-deep" strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-brand-text-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Looking for a Reliable Beauty Ingredient Partner?"
        description="Tell us about your business and ingredient requirements."
        primaryLabel="Become a B2B Partner"
        primaryLink="/become-a-partner"
        secondaryLabel="Request a Quote"
        secondaryLink="/request-quote"
        variant="pink"
      />
    </div>
  );
}
