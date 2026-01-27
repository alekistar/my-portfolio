import { motion } from 'framer-motion';
import './AnimatedName.css';

const AnimatedName = ({ name = 'Alex Opiyo Odhiambo' }) => {
  // Split name into words
  const words = name.split(' ');

  // Character animation variants
  const characterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: 90,
      scale: 0.8
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    hover: {
      y: -5,
      color: '#f59e0b',
      textShadow: '0 0 20px rgba(245, 158, 11, 0.8)',
      transition: { duration: 0.2 }
    }
  };

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.3
      }
    }
  };

  let charIndex = 0;

  return (
    <motion.div 
      className="animated-name"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIdx) => (
        <motion.span 
          key={wordIdx} 
          className="name-word"
          whileHover={{ scale: 1.05 }}
        >
          {word.split('').map((char, charIdx) => {
            const currentIndex = charIndex++;
            return (
              <motion.span
                key={`${wordIdx}-${charIdx}`}
                custom={currentIndex}
                variants={characterVariants}
                animate={{
                  y: [-5, 0, -5],
                  color: [
                    `hsl(${200 + currentIndex * 15}, 100%, 50%)`,
                    '#f59e0b',
                    `hsl(${200 + currentIndex * 15}, 100%, 50%)`
                  ],
                  textShadow: [
                    '0 0 10px rgba(102, 126, 234, 0.3)',
                    '0 0 20px rgba(245, 158, 11, 0.8)',
                    '0 0 10px rgba(102, 126, 234, 0.3)'
                  ]
                }}
                transition={{
                  delay: currentIndex * 0.1,
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                whileHover="hover"
                className="name-char"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(${200 + currentIndex * 15}, 100%, 50%), 
                    hsl(${250 + currentIndex * 15}, 100%, 60%))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIdx < words.length - 1 && <span className="space">&nbsp;</span>}
        </motion.span>
      ))}
      
      {/* Animated cursor */}
      <motion.span 
        className="animated-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default AnimatedName;
