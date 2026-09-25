import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('themechange', syncTheme);
    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    setIsDark(nextTheme === 'dark');
    localStorage.setItem('saundarya-theme', nextTheme);
    window.dispatchEvent(new CustomEvent('themechange', { detail: nextTheme }));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle inline-flex items-center justify-center gap-2 border border-brand-charcoal/15 text-brand-charcoal hover:border-brand-pink-deep hover:text-brand-pink-deep transition-all ${compact ? 'h-9 w-[58px] rounded-full' : 'px-3 py-2 rounded-full text-xs font-medium'}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {compact ? <span className="relative flex h-5 w-10 items-center rounded-full bg-brand-pink-light p-0.5"><span className={`flex h-4 w-4 items-center justify-center rounded-full bg-brand-pink-deep text-brand-charcoal shadow-sm transition-transform duration-300 ${isDark ? 'translate-x-5' : ''}`}>{isDark ? <Sun className="h-2.5 w-2.5" /> : <Moon className="h-2.5 w-2.5" />}</span></span> : <><span>{isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}</span><span>{isDark ? 'Light' : 'Dark'}</span></>}
    </button>
  );
}