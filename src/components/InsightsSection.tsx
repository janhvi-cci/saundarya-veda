import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ingredients } from '@/data/ingredients';
import ImageWithFallback from './ImageWithFallback';

export default function InsightsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const totalSlides = ingredients.length;

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + totalSlides) % totalSlides);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Only track swipes for touch/pen input. Capturing the pointer for mouse
    // input redirects the subsequent click to this container instead of the
    // button/link under the cursor, which silently breaks "Explore
    // Ingredient" links and the nav buttons/dots for mouse users.
    if (event.pointerType === 'mouse') return;
    startX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, totalSlides]);

  return (
    <section id="insights" className="py-16 lg:py-24 bg-brand-pink-light scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-brand-pink-deep bg-white rounded-full mb-4"><BookOpen className="w-3.5 h-3.5" /> Ingredient Knowledge</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">Ingredient Insights &amp; Formulation Knowledge</h2>
            <p className="text-brand-text-secondary leading-relaxed">Swipe through practical notes on the ingredients in our catalogue, their categories and common beauty formulation applications.</p>
          </div>
          <span className="text-sm text-brand-text-secondary">{activeIndex + 1} of {totalSlides} ingredients</span>
        </div>

        <div
          className="overflow-hidden touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => { startX.current = null; }}
          aria-label="Ingredient knowledge carousel"
        >
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {ingredients.map((ingredient) => (
              <article key={ingredient.slug} className="min-w-full grid lg:grid-cols-[0.9fr_1.1fr] gap-0 overflow-hidden rounded-2xl border border-brand-pink/40 bg-white shadow-[0_16px_36px_rgba(41,35,38,0.08)]">
                <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[330px] overflow-hidden bg-brand-pink-light">
                  <ImageWithFallback src={ingredient.image} alt={`${ingredient.name} ingredient knowledge`} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-pink-deep mb-4"><FlaskConical className="h-4 w-4" /> {ingredient.category}</div>
                  <h3 className="font-serif text-3xl lg:text-4xl font-semibold text-brand-charcoal mb-4">{ingredient.name}</h3>
                  <p className="text-brand-text-secondary leading-relaxed mb-6">{ingredient.description}</p>
                  <div className="mb-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-text-secondary mb-3">Common applications</p>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.applications.map((application) => <span key={application} className="rounded-full border border-brand-pink/40 bg-brand-pink-light px-3 py-1.5 text-xs text-brand-charcoal">{application}</span>)}
                    </div>
                  </div>
                  <Link to={`/ingredients/${ingredient.slug}`} className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-pink-deep px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-pink-deep/90">Explore Ingredient <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button type="button" onClick={() => move(-1)} className="h-10 w-10 rounded-full border border-brand-charcoal/15 bg-white text-brand-charcoal shadow-sm hover:border-brand-pink-deep" aria-label="Previous ingredient insight"><ArrowLeft className="mx-auto h-4 w-4" /></button>
          <div className="flex max-w-[220px] flex-wrap justify-center gap-1.5" aria-label={`Ingredient ${activeIndex + 1} of ${totalSlides}`}>
            {ingredients.map((ingredient, index) => <button type="button" key={ingredient.slug} onClick={() => setActiveIndex(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-brand-pink-deep' : 'w-1.5 bg-brand-pink-deep/35'}`} aria-label={`Show ${ingredient.name} insight`} aria-current={index === activeIndex ? 'true' : undefined} />)}
          </div>
          <button type="button" onClick={() => move(1)} className="h-10 w-10 rounded-full border border-brand-charcoal/15 bg-white text-brand-charcoal shadow-sm hover:border-brand-pink-deep" aria-label="Next ingredient insight"><ArrowRight className="mx-auto h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}
