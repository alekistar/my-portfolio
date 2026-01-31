import { motion } from 'framer-motion';
import { FiMusic, FiTarget, FiHeart } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './About.css';

const About = () => {
  const { isDark } = useTheme();

  const activities = [
    {
      icon: <FiTarget />,
      title: 'Sports',
      description: 'Hockey Player',
      color: '#667eea'
    },
    {
      icon: <FiMusic />,
      title: 'Music',
      description: 'Piano, Saxophone, Drums',
      color: '#f093fb'
    },
    {
      icon: <FiHeart />,
      title: 'Values',
      description: 'Discipline & Creativity',
      color: '#43e97b'
    }
  ];

  return (
    <section id="about" className={`about ${isDark ? 'dark' : 'light'}`}>
      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            More than just code - a blend of technology, creativity, and passion
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="about-paragraph">
              I'm a passionate <strong>Full-Stack Web Developer</strong> based in Nairobi, Kenya, dedicated to creating 
              exceptional digital experiences that drive results. With expertise spanning frontend 
              design to backend architecture, I transform ideas into powerful web solutions for local 
              and international clients.
            </p>

            <p className="about-paragraph">
              My approach combines <strong>technical excellence</strong> with creative problem-solving, 
              ensuring every project is not just functional, but exceptional. From sleek portfolios 
              to complex web applications, I deliver quality that exceeds expectations.
            </p>

            <p className="about-paragraph">
              Beyond coding, I bring discipline from <strong>hockey</strong>, creativity from playing 
              <strong> piano, saxophone, and drums</strong>, and a collaborative spirit developed through 
              years of teamwork in both sports and music. These experiences shape my approach to 
              development - structured, creative, and always focused on harmony.
            </p>

            <p className="about-paragraph">
              Whether you're a Kenyan startup looking to establish your online presence or a global business 
              seeking to scale, I'm here to help you succeed. Let's build something amazing together.
            </p>
          </motion.div>

          <motion.div
            className="about-activities"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="activity-icon"
                  style={{ background: `linear-gradient(135deg, ${activity.color}, ${activity.color}dd)` }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {activity.icon}
                </motion.div>
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-description">{activity.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="stat-item">
            <div className="stat-number">3+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Happy Clients</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
