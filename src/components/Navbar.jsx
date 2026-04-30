import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../config/datadog';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'services', 'portfolio', 'skills', 'about', 'testimonials', 'blog', 'tools', 'contact'];
    const observers = [];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.35,
          rootMargin: '-80px 0px -40% 0px',
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [location.pathname]);

  const navItems = ['Home', 'Services', 'Portfolio', 'Skills', 'About', 'Testimonials', 'Blog', 'Tools', 'Contact'];

  const scrollOrNavigate = (item) => {
    const targetId = item.toLowerCase();
    const onHome = location.pathname === '/';

    if (onHome) {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(targetId);
      } else {
        // Fallback to hash navigation
        window.location.hash = `#${targetId}`;
      }
      setIsOpen(false);
    } else {
      // Navigate via router and pass target id; App will scroll when loaded
      navigate('/', { state: { scrollTo: targetId } });
      setActiveSection(targetId);
      setIsOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isDark ? 'dark' : 'light'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogoClick}
        >
          <span className="logo-text">Alex Opiyo</span>
          <span className="logo-dot">.</span>
        </motion.div>

        <div className="nav-desktop">
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              onClick={() => scrollOrNavigate(item)}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
          <motion.button
            className="theme-toggle"
            onClick={() => {
              trackEvent('theme_toggled', {
                new_theme: isDark ? 'light' : 'dark',
                location: 'navbar_desktop',
                timestamp: new Date().toISOString(),
              });
              toggleTheme();
            }}
            whileHover={{ scale: 1.2, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </motion.button>
        </div>

        <div className="nav-mobile">
          <motion.button
            className="theme-toggle"
            onClick={() => {
              trackEvent('theme_toggled', {
                new_theme: isDark ? 'light' : 'dark',
                location: 'navbar_mobile',
                timestamp: new Date().toISOString(),
              });
              toggleTheme();
            }}
            whileHover={{ scale: 1.2, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </motion.button>
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {navItems.map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollOrNavigate(item)}
              className={`mobile-nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              whileHover={{ x: 10 }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
