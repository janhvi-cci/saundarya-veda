import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb: string;
}

export default function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  return (
    <section className="pt-24 lg:pt-28 pb-12 lg:pb-16 bg-brand-pink-light border-b border-brand-pink/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-brand-text-secondary mb-4">
          <Link to="/" className="hover:text-brand-pink-deep transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-charcoal font-medium">{breadcrumb}</span>
        </nav>

        <p className="text-xs uppercase tracking-[0.22em] text-brand-pink-deep font-semibold mb-4">Saundarya Veda / {breadcrumb}</p>
        <h1 className="font-serif text-4xl lg:text-6xl font-semibold text-brand-charcoal mb-4 leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-base lg:text-lg text-brand-text-secondary max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
