'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? 'in' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
