import { motion } from 'framer-motion';
import { FiCheckCircle, FiSearch, FiLayers, FiCode, FiSend } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Testimonials.css';

const Testimonials = () => {
  const { isDark } = useTheme();

  const processSteps = [
    {
      step: 1,
      title: 'Discovery',
      description: 'I learn about your business goals, target audience, and requirements to create a tailored solution.',
      icon: <FiSearch />,
      color: '#667eea'
    },
    {
      step: 2,
      title: 'Strategy',
      description: 'I plan the architecture, design system, and technology stack to build a scalable foundation.',
      icon: <FiLayers />,
      color: '#f093fb'
    },
    {
      step: 3,
      title: 'Development',
      description: 'I build using clean, modern code following best practices and ensuring responsive design.',
      icon: <FiCode />,
      color: '#4facfe'
    },
    {
      step: 4,
      title: 'Launch',
      description: 'Deployment, testing, SEO optimization, and ongoing support to ensure your success.',
      icon: <FiSend />,
      color: '#43e97b'
    }
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
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="section-subtitle">
            How I transform your vision into a working product
          </p>
        </motion.div>

        <div className="process-grid">
          {processSteps.map((item, index) => (
            <motion.div
              key={index}
              className="process-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="process-number" style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}>
                {item.step}
              </div>

              <motion.div
                className="process-icon"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)` }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>

              <h3 className="process-title">{item.title}</h3>
              <p className="process-description">{item.description}</p>

              {index < processSteps.length - 1 && (
                <div className="process-arrow">
                  <FiCheckCircle />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="process-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>Ready to get started? Let's begin your project journey.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
