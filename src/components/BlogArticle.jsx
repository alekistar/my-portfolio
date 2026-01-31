import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiUser, FiClock, FiShare2 } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import './BlogArticle.css';

const BlogArticle = ({ article, onBack }) => {
  const { isDark } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}#blog/${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = `${window.location.origin}#blog/${article.slug}`;
    const text = `Check out this article by Alex Opiyo: ${article.title}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  return (
    <motion.div
      className={`blog-article-view ${isDark ? 'dark' : 'light'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="article-container">
        {/* Back Button */}
        <motion.button
          className="back-button"
          onClick={onBack}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Articles
        </motion.button>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-hero" style={{ background: article.gradient }}>
            <span className="hero-emoji">{article.image}</span>
          </div>

          <motion.div
            className="article-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="header-meta">
              <span className="category-large">{article.category}</span>
            </div>

            <h1 className="article-main-title">{article.title}</h1>

            <div className="article-metadata">
              <div className="meta-item">
                <FiUser className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Author</span>
                  <span className="meta-value">{article.author}</span>
                </div>
              </div>

              <div className="meta-item">
                <FiCalendar className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Published</span>
                  <span className="meta-value">{article.date}</span>
                </div>
              </div>

              <div className="meta-item">
                <FiClock className="meta-icon" />
                <div className="meta-content">
                  <span className="meta-label">Read Time</span>
                  <span className="meta-value">{article.readTime}</span>
                </div>
              </div>
            </div>

            {article.position && (
              <p className="author-position">{article.position}</p>
            )}

            <div className="article-tags-full">
              {article.tags.map((tag, idx) => (
                <span key={idx} className="tag-full">{tag}</span>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Article Content */}
        <motion.article
          className="article-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: formatMarkdown(article.content) }}
          />
        </motion.article>

        {/* Share Section */}
        <motion.div
          className="article-share"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h4 className="share-title">
            <FiShare2 /> Share This Article
          </h4>
          <div className="share-buttons">
            <motion.button
              className="share-btn linkedin"
              onClick={() => handleShare('linkedin')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on LinkedIn"
            >
              <FaLinkedin />
            </motion.button>
            <motion.button
              className="share-btn twitter"
              onClick={() => handleShare('twitter')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on Twitter"
            >
              <FaTwitter />
            </motion.button>
            <motion.button
              className="share-btn facebook"
              onClick={() => handleShare('facebook')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Share on Facebook"
            >
              <FaFacebook />
            </motion.button>
            <motion.button
              className={`share-btn copy ${copied ? 'copied' : ''}`}
              onClick={handleCopyLink}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Copy link"
            >
              {copied ? '✓ Copied' : 'Link'}
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="article-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Ready to implement M-Pesa integration?</h3>
          <p>Let's discuss how I can build a custom payment system for your Kenyan business.</p>
          <motion.a
            href="https://wa.me/254759447439?text=Hi%20Alex,%20I%20read%20your%20blog%20on%20M-Pesa%20integration%20and%20I'm%20interested%20in%20working%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chat on WhatsApp →
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Simple markdown formatter
function formatMarkdown(markdown) {
  let html = markdown
    // Headers
    .replace(/### (.*?)\n/g, '<h3>$1</h3>')
    .replace(/## (.*?)\n/g, '<h2>$1</h2>')
    .replace(/# (.*?)\n/g, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Lists
    .replace(/^- (.*?)$/gm, '<li>$1</li>')
    // Checkmarks
    .replace(/✅/g, '<span class="checkmark">✅</span>')
    // Line breaks for paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/---\n/g, '<hr />')
    .replace(/\n/g, '<br />');

  html = `<p>${html}</p>`;
  return html;
}

export default BlogArticle;
