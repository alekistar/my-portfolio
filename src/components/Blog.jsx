import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Blog.css';

const Blog = () => {
  const { isDark } = useTheme();

  const articles = [
    {
      id: 1,
      title: 'How I Integrated M-Pesa STK Push with Python in 15 Minutes',
      excerpt: 'A step-by-step guide to implementing Safaricom\'s Daraja API for seamless mobile payment integration. Perfect for Kenyan businesses looking to accept payments from customers.',
      date: 'Jan 30, 2026',
      author: 'Alex Opiyo',
      readTime: '8 min read',
      category: 'Tutorial',
      tags: ['M-Pesa', 'Python', 'API', 'Payments', 'Kenya'],
      image: '💳',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      slug: 'mpesa-stk-push-python'
    },
    {
      id: 2,
      title: 'Applying IB Math HL Calculus to Optimize Algorithms',
      excerpt: 'Discover how advanced mathematics from the IB curriculum can be applied to solve real-world algorithmic problems. Learn optimization techniques that improve application performance.',
      date: 'Jan 25, 2026',
      author: 'Alex Opiyo',
      readTime: '12 min read',
      category: 'Tech Deep Dive',
      tags: ['Algorithms', 'Calculus', 'Optimization', 'Performance'],
      image: '📊',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      slug: 'ib-math-algorithms'
    },
    {
      id: 3,
      title: 'Why Kenyan SMEs Need Custom Websites, Not Just Facebook Pages',
      excerpt: 'A business case for why small and medium enterprises in Kenya should invest in professional websites. Learn how a custom website can increase revenue and build credibility.',
      date: 'Jan 20, 2026',
      author: 'Alex Opiyo',
      readTime: '6 min read',
      category: 'Business',
      tags: ['Kenya', 'SME', 'Website', 'Business Growth', 'Digital'],
      image: '🚀',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      slug: 'kenyan-smes-custom-websites'
    }
  ];

  return (
    <section id="blog" className={`blog ${isDark ? 'dark' : 'light'}`}>
      <div className="blog-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="section-subtitle">
            Technical tutorials, business insights, and expert advice for Kenyan entrepreneurs
          </p>
        </motion.div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="article-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="article-image" style={{ background: article.gradient }}>
                <span className="article-emoji">{article.image}</span>
              </div>

              <div className="article-content">
                <div className="article-meta">
                  <span className="category-badge" style={{ background: article.gradient }}>
                    {article.category}
                  </span>
                  <span className="read-time">{article.readTime}</span>
                </div>

                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-tags">
                  {article.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="article-tag">{tag}</span>
                  ))}
                </div>

                <div className="article-footer">
                  <div className="article-author">
                    <FiUser className="icon" />
                    <span>{article.author}</span>
                  </div>
                  <div className="article-date">
                    <FiCalendar className="icon" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <motion.button
                  className="read-more-btn"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Article
                  <FiArrowRight />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="blog-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>Want to learn more about web development for Kenyan businesses?</p>
          <p className="cta-subtext">Subscribe to get new insights delivered to your inbox.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
