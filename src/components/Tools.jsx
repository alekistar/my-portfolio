import { motion } from 'framer-motion';
import { SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiReact, SiNodedotjs, SiGithub, SiVercel, SiMongodb, SiPostgresql, SiPython, SiFigma, SiGo, SiRust, SiTauri } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';
import './Tools.css';

const Tools = () => {
  const { isDark } = useTheme();

  const toolCategories = [
    {
      category: 'Frontend',
      tools: [
        { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
        { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
        { name: 'CSS3', icon: <SiCss3 />, color: '#1572b6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4' },
        { name: 'React', icon: <SiReact />, color: '#61dafb' },
        { name: 'Tauri', icon: <SiTauri />, color: '#ffc131' }
      ]
    },
    {
      category: 'Backend & Database',
      tools: [
        { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
        { name: 'Python', icon: <SiPython />, color: '#3776ab' },
        { name: 'Go', icon: <SiGo />, color: '#00add8' },
        { name: 'Rust', icon: <SiRust />, color: '#ce422b' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169e1' }
      ]
    },
    {
      category: 'Tools & Deployment',
      tools: [
        { name: 'GitHub', icon: <SiGithub />, color: '#181717' },
        { name: 'Vercel', icon: <SiVercel />, color: '#000000' },
        { name: 'Figma', icon: <SiFigma />, color: '#f24e1e' }
      ]
    }
  ];

  return (
    <section id="tools" className={`tools ${isDark ? 'dark' : 'light'}`}>
      <div className="tools-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Tools & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Modern tech stack for building powerful applications
          </p>
        </motion.div>

        <div className="tools-categories">
          {toolCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="tool-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2, duration: 0.6 }}
            >
              <h3 className="category-title">{category.category}</h3>
              <div className="tools-grid">
                {category.tools.map((tool, index) => (
                  <motion.div
                    key={index}
                    className="tool-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.2 + index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="tool-icon"
                      style={{ color: isDark ? tool.color : tool.color }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {tool.icon}
                    </motion.div>
                    <span className="tool-name">{tool.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tools-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className="tools-footer-text">
            Always learning and adapting to new technologies to deliver the best solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tools;
