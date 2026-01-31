import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Portfolio.css';

const Portfolio = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      title: 'Professional Portfolio Website',
      description: 'Modern, responsive portfolio built with React and Framer Motion. Features dark/light theme, smooth animations, and optimized performance.',
      image: '🌐',
      tags: ['React', 'Framer Motion', 'Vite', 'CSS'],
      liveUrl: 'https://alex-odhiambo.tech',
      githubUrl: 'https://github.com/alekistar/my-portfolio',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: true
    },
    {
      title: 'M-Pesa Payment Integration',
      description: 'Seamless Safaricom Daraja API integration for Kenyan businesses and e-commerce. Handles STK push, payment verification, and transaction webhooks for local merchants.',
      image: '💳',
      tags: ['Node.js', 'Express', 'M-Pesa API', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Full-featured admin dashboard with real-time analytics, inventory management, and order processing.',
      image: '📊',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task manager with real-time updates, team collaboration, and progress tracking.',
      image: '✅',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      title: 'Restaurant Website & Ordering System',
      description: 'Beautiful restaurant website with online ordering, menu management, and delivery tracking.',
      image: '🍽️',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      title: 'Personal Blog Platform',
      description: 'Custom CMS for bloggers with markdown support, SEO optimization, and analytics integration.',
      image: '✍️',
      tags: ['React', 'Express', 'MySQL', 'SEO'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    }
  ];

  return (
    <section id="portfolio" className={`portfolio ${isDark ? 'dark' : 'light'}`}>
      <div className="portfolio-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Web development projects for Kenyan businesses and international clients
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {project.featured && (
                <div className="project-badge">Featured</div>
              )}

              <div className="project-image" style={{ background: project.gradient }}>
                <span className="project-emoji">{project.image}</span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.liveUrl !== '#' && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                  {project.githubUrl !== '#' && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub />
                      <span>Code</span>
                    </motion.a>
                  )}
                  {project.liveUrl === '#' && project.githubUrl === '#' && (
                    <div className="project-link coming-soon">
                      <FiCode />
                      <span>In Development</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="portfolio-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="cta-text">Ready to bring your idea to life? Available for projects in Kenya and worldwide.</p>
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contact = document.getElementById('contact');
              contact?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
