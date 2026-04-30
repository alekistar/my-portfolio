import { motion } from 'framer-motion';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../config/datadog';
import './Contact.css';

const Contact = () => {
  const { isDark } = useTheme();
  // contact form removed — using direct contact buttons/links

  const socialLinks = [
    {
      name: 'Email',
      icon: <FiMail />,
      url: 'mailto:trailbecker.lexdechamp@gmail.com',
      color: '#667eea',
      hoverText: 'Send an email'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: "https://wa.me/254759447439?text=Hi%20Alex,%20I'm%20interested%20in%20your%20web%20development%20services",
      color: '#25D366',
      hoverText: 'Chat on WhatsApp'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/alex-odhiambo-5731b8341/',
      color: '#0077B5',
      hoverText: 'Connect on LinkedIn'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/its_official_lex_P',
      color: '#E4405F',
      hoverText: 'Follow on Instagram'
    }
  ];

  return (
    <section id="contact" className={`contact ${isDark ? 'dark' : 'light'}`}>
      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Ready to Digitise Your <span className="gradient-text">Business?</span>
          </h2>
          <p className="section-subtitle">
            Let's build something amazing together. Get in touch today!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-info-title">Get in Touch</h3>
            <p className="contact-info-text">
              Based in Nairobi, Kenya, and available for remote work globally. I'm always open to discussing 
              new projects, creative ideas, or opportunities to be part of your vision. Let's connect!
            </p>

            <div className="contact-methods">
              <motion.div
                className="contact-method"
                whileHover={{ x: 10 }}
              >
                <div className="method-icon" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>
                  <FiMapPin />
                </div>
                <div className="method-content">
                  <div className="method-label">Location</div>
                  <div className="method-value">Nairobi, Kenya (Available for Remote Work Globally)</div>
                </div>
              </motion.div>

              <motion.a
                href="mailto:trailbecker.lexdechamp@gmail.com"
                className="contact-method"
                whileHover={{ x: 10 }}
              >
                <div className="method-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <FiMail />
                </div>
                <div className="method-content">
                  <div className="method-label">Email</div>
                  <div className="method-value">trailbecker.lexdechamp@gmail.com</div>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/254759447439?text=Hi%20Alex,%20I'm%20interested%20in%20your%20web%20development%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
                whileHover={{ x: 10 }}
              >
                <div className="method-icon" style={{ background: 'linear-gradient(135deg, #25D366, #20BA61)' }}>
                  <FaWhatsapp />
                </div>
                <div className="method-content">
                  <div className="method-label">WhatsApp</div>
                  <div className="method-value">Chat with me directly</div>
                </div>
              </motion.a>
            </div>

          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="social-links">
              <h4 className="social-title">Contact on Social media</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackEvent('social_link_clicked', {
                      platform: social.name,
                      url: social.url,
                      timestamp: new Date().toISOString(),
                    })}
                  >
                    <div className="social-icon">
                      {social.icon}
                    </div>
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
