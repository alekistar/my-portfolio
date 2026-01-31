import { useEffect } from 'react';
import { trackEvent } from '../config/datadog';

export const useTrackSectionView = (sectionName) => {
  useEffect(() => {
    // Create an Intersection Observer to track when sections come into view
    const section = document.getElementById(sectionName);
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent('section_viewed', {
            section_name: sectionName,
            timestamp: new Date().toISOString(),
            scroll_position: window.scrollY,
          });
          // Only track once per page load
          observer.unobserve(section);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [sectionName]);
};
