import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDollarSign, FiZap } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Services.css';

const Services = () => {
  const { isDark } = useTheme();

  const services = [
    {
      icon: <FiCode />,
      title: 'Static Website Development',
      price: '$150',
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
      price: '$400',
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
      icon: <FiZap />,
      title: 'Deployment & Hosting',
      price: 'From $8/month',
      description: 'Professional hosting and management services for your websites.',
      features: [
        'Static Sites: $8/month',
        'Dynamic Sites: $15/month',
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
            Professional web development solutions tailored to your needs
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
                {!service.price.includes('month') && <span className="price-label">one-time</span>}
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
                <FiDollarSign />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
