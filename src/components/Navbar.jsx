import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../config/datadog';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Services', 'Portfolio', 'Skills', 'About', 'Testimonials', 'Blog', 'Tools', 'Contact'];

  const scrollOrNavigate = (item) => {
    const targetId = item.toLowerCase();
    const onHome = location.pathname === '/';

    if (onHome) {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Fallback to hash navigation
        window.location.hash = `#${targetId}`;
      }
      setIsOpen(false);
    } else {
      // Navigate to home with hash so GH Pages SPA works
      window.location.href = `/#${targetId}`;
    }
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
        >
          <span className="logo-text">Alex Opiyo</span>
          <span className="logo-dot">.</span>
        </motion.div>

        <div className="nav-desktop">
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              onClick={() => scrollOrNavigate(item)}
              className="nav-link"
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
              className="mobile-nav-link"
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
