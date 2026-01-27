import { motion } from 'framer-motion';
import { FiMail, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useForm, ValidationError } from '@formspree/react';
import './Contact.css';

const Contact = () => {
  const { isDark } = useTheme();
  const [state, handleSubmit] = useForm("xwvorzbe");

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: 'https://instagram.com/its_official_lex_P',
      color: '#E4405F',
      hoverText: 'Follow on Instagram'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/alex-odhiambo-5731b8341/',
      color: '#0077B5',
      hoverText: 'Connect on LinkedIn'
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/alekistar',
      color: '#181717',
      hoverText: 'View on GitHub'
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
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's create something amazing!
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
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your vision. Let's connect!
            </p>

            <div className="contact-methods">
              <motion.a
                href="mailto:lexaura.lexp@gmail.com"
                className="contact-method"
                whileHover={{ x: 10 }}
              >
                <div className="method-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <FiMail />
                </div>
                <div className="method-content">
                  <div className="method-label">Email</div>
                  <div className="method-value">lexaura.lexp@gmail.com</div>
                </div>
              </motion.a>
            </div>

            <div className="social-links">
              <h4 className="social-title">Connect on Social Media</h4>
              <div className="social-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--social-color': social.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
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

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {state.succeeded ? (
              <motion.div
                className="form-status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ Message sent! I'll get back to you soon.
              </motion.div>
            ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <FiUser />
                  <span>Your Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <FiMail />
                  <span>Your Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <FiMessageSquare />
                  <span>Your Message</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={state.submitting}
              >
                <span>{state.submitting ? 'Sending...' : 'Send Message'}</span>
                <FiSend />
              </motion.button>
            </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
