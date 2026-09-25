import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  heading: string;
  description: string;
  primaryLabel?: string;
  primaryLink?: string;
  secondaryLabel?: string;
  secondaryLink?: string;
  tertiaryLabel?: string;
  tertiaryLink?: string;
  variant?: 'pink' | 'white';
}

export default function CTASection({
  heading,
  description,
  primaryLabel = 'Request a Quote',
  primaryLink = '/request-quote',
  secondaryLabel,
  secondaryLink,
  tertiaryLabel,
  tertiaryLink,
  variant = 'pink',
}: CTASectionProps) {
  const isPink = variant === 'pink';

  return (
    <section className={`overflow-hidden py-16 lg:py-24 ${isPink ? 'bg-brand-pink' : 'bg-brand-pink-light'}`}>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-brand-pink-deep/20 pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-72 h-72 rounded-full border border-brand-pink-deep/20 pointer-events-none" />
        <h2 className={`font-serif text-3xl lg:text-4xl font-semibold mb-4 ${isPink ? 'text-brand-charcoal' : 'text-brand-charcoal'}`}>
          {heading}
        </h2>
        <p className={`text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${isPink ? 'text-brand-charcoal/70' : 'text-brand-text-secondary'}`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={primaryLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all shadow-sm hover:shadow-md"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </Link>
          {secondaryLabel && secondaryLink && (
            <Link
              to={secondaryLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-brand-charcoal bg-white border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
            >
              {secondaryLabel}
            </Link>
          )}
          {tertiaryLabel && tertiaryLink && (
            <Link
              to={tertiaryLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-brand-charcoal border border-brand-charcoal/15 rounded-full hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all"
            >
              {tertiaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
