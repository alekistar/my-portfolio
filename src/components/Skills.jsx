import { motion } from 'framer-motion';
import { FiDatabase, FiCloud, FiCode } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Skills.css';

const Skills = () => {
  const { isDark } = useTheme();

  const skillCategories = [
    {
      category: 'Web Development',
      icon: <FiCode />,
      color: '#667eea',
      skills: [
        { name: 'React', icon: '⚛️' },
        { name: 'JavaScript', icon: '🟨' },
        { name: 'TypeScript', icon: '🔵' },
        { name: 'HTML5', icon: '📄' },
        { name: 'CSS3', icon: '🎨' },
        { name: 'Tailwind', icon: '💨' },
        { name: 'Node.js', icon: '🟩' },
        { name: 'Express', icon: '⚡' },
        { name: 'Vite', icon: '⚡' }
      ]
    },
    {
      category: 'Systems & Data',
      icon: <FiDatabase />,
      color: '#f093fb',
      skills: [
        { name: 'Python', icon: '🐍' },
        { name: 'SQL', icon: '🗄️' },
        { name: 'MongoDB', icon: '📦' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'REST APIs', icon: '🔗' }
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: <FiCloud />,
      color: '#4facfe',
      skills: [
        { name: 'Git', icon: '🌳' },
        { name: 'Linux', icon: '🐧' },
        { name: 'Docker', icon: '🐳' },
        { name: 'Postman', icon: '📮' }
      ]
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Modern technologies and tools I use to build exceptional products
          </p>
        </motion.div>

        <div className="skills-categories">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
            >
              <div className="category-header">
                <motion.div
                  className="category-icon"
                  style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="category-title">{category.category}</h3>
              </div>

              <div className="skills-tags">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <span className="skill-tag-icon" style={{ color: category.color }}>
                      {skill.icon}
                    </span>
                    <span className="skill-tag-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
