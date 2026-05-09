import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductGrid from './components/ProductGrid';
import Lifestyle from './components/Lifestyle';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Lenis from 'lenis';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="bg-neutral-gray min-h-screen font-sans selection:bg-mango selection:text-white relative">
      {/* Noise Overlay for Texture */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-5 mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

      <Navbar />
      <Hero />
      <div className="relative z-10 bg-neutral-gray rounded-t-[3rem] -mt-10 pt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <About />
        <ProductGrid />
        <Lifestyle />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default App;
