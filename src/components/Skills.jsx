import { motion } from 'framer-motion';
import { FiCode, FiServer, FiCpu, FiEdit, FiVideo, FiImage, FiShare2 } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Skills.css';

const Skills = () => {
  const { isDark } = useTheme();

  const skills = [
    {
      icon: <FiCode />,
      title: 'Web Development',
      subtitle: 'Frontend & Backend',
      level: 95,
      color: '#667eea'
    },
    {
      icon: <FiServer />,
      title: 'Hosting & Deployment',
      subtitle: 'Cloud Infrastructure',
      level: 90,
      color: '#f093fb'
    },
    {
      icon: <FiCpu />,
      title: 'AI & Machine Learning',
      subtitle: 'Modern AI Solutions',
      level: 85,
      color: '#4facfe'
    },
    {
      icon: <FiEdit />,
      title: 'Writing & Content',
      subtitle: 'Professional Content',
      level: 88,
      color: '#43e97b'
    },
    {
      icon: <FiVideo />,
      title: 'Video Editing',
      subtitle: 'Creative Production',
      level: 82,
      color: '#fa709a'
    },
    {
      icon: <FiImage />,
      title: 'Graphic Design',
      subtitle: 'Visual Design',
      level: 87,
      color: '#fee140'
    },
    {
      icon: <FiShare2 />,
      title: 'Social Media Management',
      subtitle: 'Digital Marketing',
      level: 90,
      color: '#30cfd0'
    }
  ];

  return (
    <section id="skills" className={`skills ${isDark ? 'dark' : 'light'}`}>
      <div className="skills-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            A diverse skill set to bring your projects to life
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="skill-icon"
                style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)` }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {skill.icon}
              </motion.div>

              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-subtitle">{skill.subtitle}</p>

              <div className="skill-bar-container">
                <motion.div
                  className="skill-bar"
                  style={{ background: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                >
                  <span className="skill-percentage">{skill.level}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
