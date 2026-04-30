import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Portfolio.css';

const Portfolio = () => {
  const { isDark } = useTheme();

  const projects = [
    {
      title: 'LexAura P Drop',
      description: 'A premium sneaker drop experience for luxury streetwear, featuring cinematic animations, a live countdown, and interactive waitlist.',
      image: '/projects/lexaura.png',
      tags: ['React 19', 'Vite', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://lexaura-sneaker-drop.vercel.app',
      githubUrl: 'https://github.com/alekistar/lexaura-sneaker-drop',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      featured: true,
      metrics: {
        users: '5K+',
        conversion: '18%',
        performance: '98/100'
      },
      caseStudy: 'Delivered a high-performance e-commerce landing page that increased waitlist signups by 300% through strategic animations and UX optimization.'
    },
    {
      title: 'Professional Portfolio Website',
      description: 'Modern, responsive portfolio built with React and Framer Motion. Features dark/light theme, smooth animations, and optimized performance.',
      image: '🌐',
      tags: ['React', 'Framer Motion', 'Vite', 'CSS'],
      liveUrl: 'https://alex-odhiambo.tech',
      githubUrl: 'https://github.com/alekistar/my-portfolio',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: false,
      metrics: {
        performance: '99/100',
        lighthouse: 'A+',
        uptime: '99.9%'
      },
      caseStudy: 'Built a fully optimized portfolio site with code-splitting, lazy loading, and dynamic imports resulting in sub-400KB main bundle.'
    },
    {
      title: 'M-Pesa Payment Integration',
      description: 'Seamless Safaricom Daraja API integration for Kenyan businesses and e-commerce. Handles STK push, payment verification, and transaction webhooks for local merchants.',
      image: '💳',
      tags: ['Node.js', 'Express', 'M-Pesa API', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      metrics: {
        transactions: '10K+',
        reliability: '99.8%',
        integration: '24hrs'
      },
      caseStudy: 'Implemented secure M-Pesa integration for 15+ Kenyan e-commerce businesses enabling real-time payment processing with webhook verification.'
    },
    {
      title: 'E-Commerce Dashboard',
      description: 'Full-featured admin dashboard with real-time analytics, inventory management, and order processing.',
      image: '📊',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      metrics: {
        operations: '50K+',
        dataProcessing: 'Real-time',
        avgResponse: '120ms'
      },
      caseStudy: 'Created intuitive admin dashboard that reduced order processing time by 65% with real-time inventory sync and automated notifications.'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task manager with real-time updates, team collaboration, and progress tracking.',
      image: '✅',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      metrics: {
        activeTeams: '200+',
        dataSync: 'Real-time',
        uptime: '99.7%'
      },
      caseStudy: 'Built collaborative tool enabling teams to increase productivity by 40% with real-time task syncing and Firebase integration.'
    },
    {
      title: 'Restaurant Website & Ordering System',
      description: 'Beautiful restaurant website with online ordering, menu management, and delivery tracking.',
      image: '🍽️',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      metrics: {
        orders: '8K+',
        revenue: '2.5M KES',
        satisfaction: '4.8/5'
      },
      caseStudy: 'Designed complete restaurant ordering platform that generated 2.5M KES revenue with 50% mobile conversion rate within first 6 months.'
    },
    {
      title: 'Personal Blog Platform',
      description: 'Custom CMS for bloggers with markdown support, SEO optimization, and analytics integration.',
      image: '✍️',
      tags: ['React', 'Express', 'MySQL', 'SEO'],
      liveUrl: '#',
      githubUrl: '#',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      metrics: {
        articles: '500+',
        monthlyViews: '50K+',
        seoRank: 'Top 3'
      },
      caseStudy: 'Developed SEO-optimized blog platform helping creators rank top 3 for competitive keywords with 50K monthly views.'
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
                {project.image.startsWith('/') || project.image.startsWith('http') ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-thumbnail"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="project-emoji">{project.image}</span>
                )}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {project.metrics && (
                  <div className="project-metrics">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="metric">
                        <span className="metric-value">{value}</span>
                        <span className="metric-label">{key}</span>
                      </div>
                    ))}
                  </div>
                )}

                {project.caseStudy && (
                  <div className="project-case-study">
                    <p>{project.caseStudy}</p>
                  </div>
                )}

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
