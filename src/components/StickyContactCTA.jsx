import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../config/datadog';
import './StickyContactCTA.css';

const StickyContactCTA = () => {
  const { isDark } = useTheme();

  const handleClick = () => {
    trackEvent('sticky_cta_clicked');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      className={`sticky-cta ${isDark ? 'dark' : 'light'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      title="Get in touch"
    >
      <motion.div
        className="cta-icon"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <FiMessageCircle />
      </motion.div>
      <motion.div
        className="cta-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};

export default StickyContactCTA;
