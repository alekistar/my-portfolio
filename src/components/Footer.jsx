import { motion } from 'framer-motion';
import { FiHeart, FiArrowUp } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaInstagram />, url: 'https://instagram.com/its_official_lex_P', name: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/alex-odhiambo-5731b8341/', name: 'LinkedIn' },
    { icon: <FaGithub />, url: 'https://github.com/alekistar', name: 'GitHub' }
  ];

  const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Skills', id: 'skills' },
    { name: 'About', id: 'about' },
    { name: 'Tools', id: 'tools' },
    { name: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={`footer ${isDark ? 'dark' : 'light'}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="logo-text">Alex Odhiambo</span>
              <span className="logo-dot">.</span>
            </div>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Made with <FiHeart className="heart-icon" /> by Alex
            </p>
            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Back to top"
            >
              <FiArrowUp />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
