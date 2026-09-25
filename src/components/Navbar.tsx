import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Flower2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import QuickActions from './QuickActions';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Ingredients', path: '/ingredients' },
  { label: 'Applications', path: '/applications' },
  { label: 'Why Us', path: '/why-us' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const syncTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('themechange', syncTheme);
    return () => window.removeEventListener('themechange', syncTheme);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleQuoteClick = () => {
    navigate('/request-quote');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isDark
          ? `${scrolled ? 'bg-[#211A1D]/95' : 'bg-[#171315]/85'} text-[#FFF7F9] border-[#F8DDE5]/15`
          : `${scrolled ? 'bg-white/95' : 'bg-white/80'} text-brand-charcoal border-brand-charcoal/10`
      } backdrop-blur-md shadow-[0_1px_12px_rgba(41,35,38,0.08)]`}> 
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Flower2 className="w-7 h-7 text-brand-pink-deep" strokeWidth={1.5} />
              <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight">
                Saundarya Veda
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive(link.path)
                      ? 'text-brand-pink-deep'
                      : 'hover:text-brand-pink-deep'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-pink-deep rounded-full" />
                  )}
                </Link>
              ))}
              <Link
                to="/become-a-partner"
                className="ml-2 px-4 py-2 text-sm font-medium border border-brand-pink-deep/30 rounded-full hover:border-brand-pink-deep hover:bg-brand-pink-light transition-all duration-200"
              >
                Become a Partner
              </Link>
              <button
                onClick={handleQuoteClick}
                className="ml-2 px-5 py-2 text-sm font-medium text-[#171315] bg-brand-pink-deep rounded-full hover:bg-brand-pink-deep/90 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Request a Quote
              </button>
              <QuickActions />
              <ThemeToggle compact />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-brand-charcoal/40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl animate-slide-in flex flex-col ${isDark ? 'bg-[#211A1D] text-[#FFF7F9]' : 'bg-white text-brand-charcoal'}`}>
            <div className="flex items-center justify-between h-16 px-5 border-b border-brand-pink/40">
              <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Flower2 className="w-6 h-6 text-brand-pink-deep" strokeWidth={1.5} />
                <span className="font-serif text-lg font-semibold">
                  Saundarya Veda
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-brand-pink-deep bg-brand-pink-light'
                      : 'hover:bg-brand-pink-light/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/become-a-partner"
                className="mt-2 px-4 py-3 text-base font-medium border border-brand-pink-deep/30 rounded-lg text-center"
              >
                Become a Partner
              </Link>
              <Link
                to="/request-quote"
                className="mt-2 px-4 py-3 text-base font-medium text-[#171315] bg-brand-pink-deep rounded-lg text-center"
              >
                Request a Quote
              </Link>
              <Link
                to="/request-sample"
                className="mt-2 px-4 py-3 text-base font-medium border border-brand-charcoal/15 rounded-lg text-center"
              >
                Request a Sample
              </Link>
              <div className="mt-5 flex items-center justify-between border-t border-brand-pink/30 pt-5">
                <span className="text-sm text-brand-text-secondary">Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
