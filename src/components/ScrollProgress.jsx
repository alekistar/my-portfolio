import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const { isDark } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, percent)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`scroll-progress-track ${isDark ? 'dark' : 'light'}`} aria-hidden="true">
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ScrollProgress;
