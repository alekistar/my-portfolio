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
      proficiency: 95,
      skills: [
        { name: 'React', icon: '⚛️', level: 95 },
        { name: 'JavaScript', icon: '🟨', level: 95 },
        { name: 'TypeScript', icon: '🔵', level: 90 },
        { name: 'HTML5', icon: '📄', level: 100 },
        { name: 'CSS3', icon: '🎨', level: 95 },
        { name: 'Tailwind', icon: '💨', level: 92 },
        { name: 'Node.js', icon: '🟩', level: 90 },
        { name: 'Express', icon: '⚡', level: 88 },
        { name: 'Vite', icon: '⚡', level: 92 }
      ]
    },
    {
      category: 'Systems & Data',
      icon: <FiDatabase />,
      color: '#f093fb',
      proficiency: 82,
      skills: [
        { name: 'Python', icon: '🐍', level: 85 },
        { name: 'SQL', icon: '🗄️', level: 88 },
        { name: 'MongoDB', icon: '📦', level: 85 },
        { name: 'PostgreSQL', icon: '🐘', level: 80 },
        { name: 'REST APIs', icon: '🔗', level: 90 }
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: <FiCloud />,
      color: '#4facfe',
      proficiency: 80,
      skills: [
        { name: 'Git', icon: '🌳', level: 92 },
        { name: 'Linux', icon: '🐧', level: 85 },
        { name: 'Docker', icon: '🐳', level: 75 },
        { name: 'Postman', icon: '📮', level: 90 }
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
                <div className="category-info">
                  <h3 className="category-title">{category.category}</h3>
                  <div className="proficiency-bar">
                    <motion.div
                      className="proficiency-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${category.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.2, duration: 1.2 }}
                      style={{ background: `linear-gradient(90deg, ${category.color}, ${category.color}dd)` }}
                    />
                  </div>
                  <span className="proficiency-text">{category.proficiency}% Proficient</span>
                </div>
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
                    title={`${skill.name} - ${skill.level}% Proficiency`}
                  >
                    <span className="skill-tag-icon" style={{ color: category.color }}>
                      {skill.icon}
                    </span>
                    <span className="skill-tag-name">{skill.name}</span>
                    <div className="skill-level" style={{ width: `${skill.level}%`, background: category.color }} />
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
