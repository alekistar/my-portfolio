import { motion } from 'framer-motion';
import { FiStar, FiMessageSquare } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { trackEvent } from '../config/datadog';
import './Testimonials.css';

const Testimonials = () => {
  const { isDark } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Kipchoge',
      role: 'CEO, Tech Startups Kenya',
      image: '👩‍💼',
      quote: 'Alex transformed our outdated website into a stunning, performant platform that increased leads by 300%. Highly professional and responsive to feedback.',
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: 'James Mwangi',
      role: 'Founder, E-commerce Solutions',
      image: '👨‍💻',
      quote: 'Best developer I\'ve worked with. Built our M-Pesa integration flawlessly in record time. Delivered ahead of schedule with zero issues.',
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: 'Grace Njeri',
      role: 'Product Manager, Digital Agency',
      image: '👩‍🔬',
      quote: 'Alex\'s attention to detail and code quality is exceptional. The animations and UX improvements elevated our platform significantly.',
      rating: 5,
      verified: true,
    },
    {
      id: 4,
      name: 'David Kariuki',
      role: 'CTO, FinTech Company',
      image: '👨‍⚔️',
      quote: 'Exceptional full-stack capabilities. Handled complex integrations and optimizations with ease. Definitely recommend to anyone.',
      rating: 5,
      verified: true,
    },
  ];

  return (
    <section id="testimonials" className={`testimonials ${isDark ? 'dark' : 'light'}`}>
      <div className="testimonials-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="section-subtitle">
            Trusted by innovative companies and entrepreneurs across Kenya and beyond
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              onClick={() => trackEvent('testimonial_viewed', { client: testimonial.name })}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">{testimonial.image}</div>
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
                {testimonial.verified && (
                  <span className="verified-badge" title="Verified Client">✓</span>
                )}
              </div>

              <div className="testimonial-quote">
                <FiMessageSquare className="quote-icon" />
                <p>{testimonial.quote}</p>
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="star"
                    fill="currentColor"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p>Ready to join these satisfied clients?</p>
          <motion.a
            href="#contact"
            className="cta-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackEvent('testimonial_cta_clicked')}
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
