import { lazy, Suspense, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickyContactCTA from './components/StickyContactCTA';
import ScrollProgress from './components/ScrollProgress';
import StackedSection from './components/StackedSection';
import './App.css';

const Services = lazy(() => import('./components/Services'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Skills = lazy(() => import('./components/Skills'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const Tools = lazy(() => import('./components/Tools'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionFallback = () => <div className="section-fallback" aria-hidden="true" />;

function AppContent() {
  const { isDark } = useTheme();
  const location = useLocation();
  const [loadDeferredSections, setLoadDeferredSections] = useState(false);

  useEffect(() => {
    if (loadDeferredSections) return;

    let timeoutId;
    const idleCallback = window.requestIdleCallback
      ? window.requestIdleCallback(() => setLoadDeferredSections(true), { timeout: 1000 })
      : null;

    if (!window.requestIdleCallback) {
      timeoutId = window.setTimeout(() => setLoadDeferredSections(true), 220);
    }

    return () => {
      if (window.cancelIdleCallback && idleCallback) {
        window.cancelIdleCallback(idleCallback);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [loadDeferredSections]);

  // Scroll to section if a hash or navigation state requests it
  useEffect(() => {
    const hash = location.hash || `#${location.state?.scrollTo || ''}`;
    if (hash && hash !== '#') {
      const id = hash.replace('#', '');
      if (id !== 'home' && !loadDeferredSections) {
        setLoadDeferredSections(true);
      }

      let attempts = 0;
      const maxAttempts = 20;
      const scrollWhenReady = () => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(scrollWhenReady, 50);
        }
      };

      window.setTimeout(scrollWhenReady, 50);
    }
  }, [location, loadDeferredSections]);

  return (
    <div className={`App ${isDark ? 'dark' : 'light'}`}>
      <ScrollProgress />
      <Navbar />
      <StickyContactCTA />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            {loadDeferredSections && (
              <Suspense fallback={<SectionFallback />}>
                  <div className="stack-layout">
                    <StackedSection index={1}>
                      <Services />
                    </StackedSection>
                    <StackedSection index={2}>
                      <Portfolio />
                    </StackedSection>
                    <StackedSection index={3}>
                      <Skills />
                    </StackedSection>
                    <StackedSection index={4}>
                      <About />
                    </StackedSection>
                    <StackedSection index={5}>
                      <Testimonials />
                    </StackedSection>
                    <StackedSection index={6}>
                      <Blog />
                    </StackedSection>
                    <StackedSection index={7}>
                      <Tools />
                    </StackedSection>
                    <StackedSection index={8}>
                      <Contact />
                    </StackedSection>
                  </div>
              </Suspense>
            )}
          </>
        } />
        <Route
          path="/blog/:slug"
          element={(
            <Suspense fallback={<SectionFallback />}>
              <BlogPost />
            </Suspense>
          )}
        />
      </Routes>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
