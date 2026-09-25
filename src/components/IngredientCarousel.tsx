import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, FlaskConical } from 'lucide-react';
import { ingredients, type Ingredient } from '@/data/ingredients';
import ImageWithFallback from './ImageWithFallback';

const carouselNames = ['Aloe Vera', 'Shea Butter', 'Coconut Oil', 'Jojoba Oil', 'Rose Extract', 'Green Tea Extract', 'Turmeric Extract', 'Hyaluronic Acid'];
const carouselIngredients = carouselNames
  .map((name) => ingredients.find((ingredient) => ingredient.name === name))
  .filter((ingredient): ingredient is Ingredient => Boolean(ingredient));

function wrapIndex(index: number) {
  return (index + carouselIngredients.length) % carouselIngredients.length;
}

export default function IngredientCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const selectSlide = (index: number) => {
    setActiveIndex(wrapIndex(index));
  };

  const move = (direction: 1 | -1) => {
    setActiveIndex((current) => wrapIndex(current + direction));
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => wrapIndex(current + 1));
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Only track swipes for touch/pen input. Capturing the pointer for mouse
    // input redirects the subsequent click to this container instead of the
    // button/link the cursor is actually over, which silently breaks every
    // clickable element inside the carousel (buttons, dots) for mouse users.
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

  return (
    <div className="relative select-none touch-pan-y" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { startX.current = null; }} aria-label="Ingredient showcase carousel">
      <div className="absolute inset-8 rounded-full bg-brand-pink/50 blur-3xl" aria-hidden="true" />
      <div className="relative h-[360px] sm:h-[430px] lg:h-[500px] [perspective:1100px]">
        {[-1, 0, 1].map((offset) => {
          const ingredient = carouselIngredients[wrapIndex(activeIndex + offset)];
          const isActive = offset === 0;
          return (
            <div key={`${ingredient.slug}-${activeIndex}`} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `translate3d(${offset * (isActive ? 0 : 28)}%, ${isActive ? 0 : 5}%, ${isActive ? 0 : -100}px) rotateY(${offset * -12}deg) scale(${isActive ? 1 : 0.72})`, opacity: isActive ? 1 : 0.42, zIndex: isActive ? 2 : 1, transition: 'transform 700ms cubic-bezier(.22,.75,.2,1), opacity 700ms ease' }}>
              <div className={`relative h-[270px] w-[270px] sm:h-[340px] sm:w-[340px] lg:h-[390px] lg:w-[390px] overflow-hidden rounded-[46%_54%_48%_52%/52%_44%_56%_48%] border-8 border-white/70 shadow-[0_28px_55px_rgba(41,35,38,0.22)] ${isActive ? 'animate-float' : ''}`}>
                <ImageWithFallback src={ingredient.image} alt={`${ingredient.name} ingredient visual`} className="h-full w-full object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-charcoal/20 via-transparent to-white/25" />
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/60 bg-white/85 px-4 py-2 text-center shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-charcoal"><FlaskConical className="h-3.5 w-3.5 text-brand-pink-deep" /> {carouselIngredients[activeIndex].name}</div>
          <p className="mt-1 text-[11px] text-brand-text-secondary">{carouselIngredients[activeIndex].category}</p>
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center gap-4">
        <button type="button" onClick={() => move(-1)} className="h-10 w-10 rounded-full border border-brand-charcoal/15 bg-white/80 text-brand-charcoal shadow-sm hover:-translate-x-0.5 hover:border-brand-pink-deep" aria-label="Previous ingredient"><ArrowLeft className="mx-auto h-4 w-4" /></button>
        <div className="flex items-center gap-1.5" aria-label={`Slide ${activeIndex + 1} of ${carouselIngredients.length}`}>
          {carouselIngredients.map((ingredient, index) => <button type="button" key={ingredient.slug} onClick={() => selectSlide(index)} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-brand-pink-deep' : 'w-1.5 bg-brand-pink-deep/35'}`} aria-label={`Show ${ingredient.name}`} aria-current={index === activeIndex ? 'true' : undefined} />)}
        </div>
        <button type="button" onClick={() => move(1)} className="h-10 w-10 rounded-full border border-brand-charcoal/15 bg-white/80 text-brand-charcoal shadow-sm hover:translate-x-0.5 hover:border-brand-pink-deep" aria-label="Next ingredient"><ArrowRight className="mx-auto h-4 w-4" /></button>
      </div>
    </div>
  );
}