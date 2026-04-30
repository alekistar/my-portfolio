import React, { useEffect, useRef } from 'react';
import './StackedDeck.css';

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const StackedDeck = ({ children }) => {
  const containerRef = useRef(null);
  const slotRefs = useRef([]);
  const count = React.Children.count(children);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ensure slotRefs length
    slotRefs.current = slotRefs.current.slice(0, count);

    let ticking = false;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      for (let i = 0; i < count; i++) {
        const start = containerTop + i * vh;
        // progress goes from 0 -> 1 as the viewport covers the slot
        const progress = clamp((scrollY + vh - start) / vh, 0, 1);
        const el = slotRefs.current[i];
        if (el) {
          el.style.setProperty('--p', progress.toFixed(3));
          el.style.setProperty('--i', String(i));
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // initial update
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [count]);

  return (
    <div className="stack-scroller" ref={containerRef} style={{ height: `${count * 100}vh` }}>
      <div className="stack-deck" aria-hidden="false">
        {React.Children.map(children, (child, i) => (
          <div
            className="deck-slot"
            ref={(el) => (slotRefs.current[i] = el)}
            style={{ zIndex: 200 - i }}
          >
            <div className="deck-inner">
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedDeck;
