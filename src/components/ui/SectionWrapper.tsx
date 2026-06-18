'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  theme?: 'oxford' | 'tan';
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = '',
  theme = 'oxford',
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const themeClass = theme === 'oxford' ? 'bg-oxford-theme' : 'bg-tan-theme';

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 px-4 md:px-8 ${themeClass} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <h2
              className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-heading"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-muted text-lg max-w-2xl">{subtitle}</p>
            )}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
