import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StackedSection = ({ children, index = 0 }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -90]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, -6]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.7, 1, 1]);

  return (
    <div ref={ref} className="stack-shell" style={{ zIndex: 20 + index }}>
      <motion.div
        className="stack-card"
        style={{ y, scale, rotateX, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackedSection;
