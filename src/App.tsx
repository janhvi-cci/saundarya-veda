import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Ingredients from '@/pages/Ingredients';
import IngredientDetail from '@/pages/IngredientDetail';
import Applications from '@/pages/Applications';
import WhyUs from '@/pages/WhyUs';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import BecomePartner from '@/pages/BecomePartner';
import RequestQuote from '@/pages/RequestQuote';
import RequestSample from '@/pages/RequestSample';
import Chatbot from '@/components/Chatbot';

function initializeTheme() {
  const savedTheme = localStorage.getItem('saundarya-theme');
  const theme = savedTheme === 'dark' ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-brand-charcoal transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:slug" element={<IngredientDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/become-a-partner" element={<BecomePartner />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/request-sample" element={<RequestSample />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
