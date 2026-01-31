import { motion } from 'framer-motion';
import { FiCode, FiServer, FiArrowRight, FiZap, FiDollarSign } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Services.css';

const Services = () => {
  const { isDark } = useTheme();

  const services = [
    {
      icon: <FiCode />,
      title: 'Static Website Development',
      price: 'KES 15,000 / $120',
      priceLabel: 'starting',
      description: 'Perfect for portfolios, landing pages, and business websites. Fast, secure, and SEO-optimized.',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Fast Loading Speed',
        'Contact Forms',
        'Social Integration'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    {
      icon: <FiServer />,
      title: 'Dynamic Website Development',
      price: 'Custom Quote',
      priceLabel: null,
      description: 'Full-featured web applications with databases, user authentication, and complex functionality.',
      features: [
        'Custom Backend',
        'Database Integration',
        'User Authentication',
        'Admin Dashboard',
        'API Development'
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f5576c',
      featured: true
    },
    {
      icon: <FiDollarSign />,
      title: 'M-Pesa & API Integration',
      price: 'Starting KES 20,000',
      priceLabel: 'starting',
      description: 'Seamless payment integration (Daraja API) and custom automated workflows for businesses.',
      features: [
        'M-Pesa Daraja API',
        'Payment Processing',
        'Transaction Webhooks',
        'Custom Workflows',
        'Full Documentation'
      ],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#43e97b',
      badge: 'For Kenya'
    },
    {
      icon: <FiZap />,
      title: 'Deployment & Hosting',
      price: 'From KES 800/month',
      priceLabel: 'monthly',
      description: 'Professional hosting and management services for your websites.',
      features: [
        'Static Sites: KES 800/mo',
        'Dynamic Sites: KES 1,500/mo',
        'SSL Certificate',
        'Daily Backups',
        '24/7 Monitoring'
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe'
    }
  ];

  return (
    <section id="services" className={`services ${isDark ? 'dark' : 'light'}`}>
      <div className="services-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Professional web development for Kenyan startups and global teams
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-card ${service.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {service.featured && (
                <div className="featured-badge">Most Popular</div>
              )}
              {service.badge && (
                <div className="service-badge" style={{ background: 'linear-gradient(135deg, #43e97b, #38f9d7)' }}>{service.badge}</div>
              )}

              <motion.div
                className="service-icon"
                style={{ background: service.gradient }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="service-title">{service.title}</h3>
              
              <div className="service-price">
                <span className="price-amount">{service.price}</span>
                {service.priceLabel && <span className="price-label">{service.priceLabel}</span>}
              </div>

              <p className="service-description">{service.description}</p>

              <ul className="service-features">
                {service.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                  >
                    <span className="check-icon" style={{ color: service.color }}>✓</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className="service-btn"
                style={{ background: service.gradient }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contact = document.getElementById('contact');
                  contact?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Get Started</span>
                <FiArrowRight />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
