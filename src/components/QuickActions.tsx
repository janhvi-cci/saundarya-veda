import { useEffect, useState } from 'react';
import { BriefcaseBusiness, ChevronDown, FileText, FlaskConical, Handshake, Lightbulb, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { label: 'Request a Quote', description: 'Tell us what ingredients you need', path: '/request-quote', icon: FileText },
  { label: 'Request a Sample', description: 'Explore sample and documentation options', path: '/request-sample', icon: FlaskConical },
  { label: 'Become a B2B Partner', description: 'Start a business conversation', path: '/become-a-partner', icon: Handshake },
  { label: 'Explore Ingredients', description: 'Browse the ingredient catalogue', path: '/ingredients', icon: Search },
  { label: 'Ingredient Insights', description: 'Learn about beauty ingredients', path: '/#insights', icon: Lightbulb },
];

export default function QuickActions() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('[data-quick-actions]')) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <div className="relative" data-quick-actions>
      <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-brand-pink-deep/30 px-3 text-xs font-semibold hover:border-brand-pink-deep hover:bg-brand-pink-light" aria-expanded={open} aria-haspopup="menu"><BriefcaseBusiness className="h-3.5 w-3.5 text-brand-pink-deep" /> Business <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} /></button>
      {open && <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-brand-pink/40 bg-white p-2 text-brand-charcoal shadow-2xl" role="menu">
        <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-text-secondary">Quick actions</p>
        {actions.map(({ label, description, path, icon: Icon }) => <Link key={label} to={path} onClick={() => setOpen(false)} className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-brand-pink-light" role="menuitem"><span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-pink-light text-brand-pink-deep"><Icon className="h-4 w-4" /></span><span><span className="block text-sm font-semibold">{label}</span><span className="block text-xs leading-relaxed text-brand-text-secondary">{description}</span></span></Link>)}
      </div>}
    </div>
  );
}