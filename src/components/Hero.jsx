import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBriefcase } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import AnimatedName from './AnimatedName';
import './Hero.css';

const Hero = () => {
  const { isDark } = useTheme();
  const words = ['Full-Stack Developer', 'Creative Builder', 'Innovative Thinker'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(wordInterval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`hero ${isDark ? 'dark' : 'light'}`}>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-dot"></span>
            Available for Freelance
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatedName name="Alex Opiyo Odhiambo" />
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            I'm a{' '}
            <motion.span
              className="rotating-word"
              key={currentWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {words[currentWord]}
            </motion.span>{' '}
            dedicated to creating exceptional digital experiences that help 
            businesses and individuals thrive in the modern web.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
            >
              <span>Hire Me</span>
              <FiArrowRight />
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('services')}
            >
              <FiBriefcase />
              <span>View Services</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="stat">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Projects Delivered</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-number">99%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="floating-card card-1">
            <div className="card-icon">💻</div>
            <div className="card-text">Full-Stack Dev</div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">🚀</div>
            <div className="card-text">Fast Deployment</div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🎨</div>
            <div className="card-text">Modern Design</div>
          </div>
          <div className="hero-circle circle-1"></div>
          <div className="hero-circle circle-2"></div>
          <div className="hero-circle circle-3"></div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;
