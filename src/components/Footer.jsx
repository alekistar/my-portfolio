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
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo">
              <span className="logo-text">Portfolio</span>
              <span className="logo-dot">.</span>
            </div>
            <p className="footer-tagline">
              Building exceptional digital experiences that drive results.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => scrollToSection(link.id)}
                    className="footer-link"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="footer-contact-title">Get in Touch</h4>
            <div className="footer-contact-info">
              <a href="mailto:lexaura.lexp@gmail.com" className="footer-contact-link">
                lexaura.lexp@gmail.com
              </a>
              <p className="footer-contact-text">
                Available for freelance opportunities
              </p>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <motion.p
            className="footer-copyright"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            © {new Date().getFullYear()} Alex Opiyo Odhiambo. Made with <FiHeart className="heart-icon" /> by Alex Opiyo
          </motion.p>

          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
