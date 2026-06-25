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
  cutout?: 'top-left' | 'top-right' | 'bottom-right' | 'top-center' | 'none';
  headerContent?: ReactNode;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = '',
  theme = 'oxford',
  cutout = 'none',
  headerContent,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const themeClass = theme === 'oxford'
    ? `bg-oxford-theme w-[96%] lg:w-[98%] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[3rem] my-6 md:my-10 ${cutout !== 'none' ? 'overflow-hidden' : ''}`
    : `bg-tan-theme w-[96%] lg:w-[98%] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[3rem] my-6 md:my-10 ${cutout !== 'none' ? 'overflow-hidden' : ''}`;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-28 px-4 md:px-8 ${themeClass} ${className}`}
    >


      <div className="max-w-[1800px] mx-auto relative z-10">
        {title && cutout !== 'top-left' && cutout !== 'top-right' && cutout !== 'top-center' && (
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
          className="relative z-10 w-full"
        >
          {headerContent && (
            <div className={`flex flex-col justify-center min-h-[140px] md:min-h-[180px] mb-8 ${
              cutout === 'top-left' ? 'md:pl-[35%] lg:pl-[40%]' : 
              cutout === 'top-right' ? 'md:pr-[35%] lg:pr-[40%]' : 
              cutout === 'top-center' ? 'mt-32 md:mt-0 md:absolute md:top-0 md:left-0 md:w-[20%] lg:w-[25%]' : ''
            }`}>
              {headerContent}
            </div>
          )}
          <div className={`relative z-10 ${
            !headerContent && (cutout === 'top-left' || cutout === 'top-right' || cutout === 'top-center') ? 'mt-32 md:mt-40 lg:mt-48' : 
            headerContent && cutout === 'top-center' ? 'md:mt-32 lg:mt-40' : ''
          }`}>
            {children}
          </div>
        </motion.div>
      </div>

      {cutout === 'bottom-right' && (
        <div className="absolute bottom-0 right-0 z-0 flex pointer-events-none">
          <div className="relative rounded-tl-[2rem] md:rounded-tl-[3rem] p-8 md:p-12" style={{ backgroundColor: 'var(--page-background)' }}>
            <svg className="absolute right-0 top-[-2rem] w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 32 A 32 32 0 0 0 32 0 L 32 32 Z" />
            </svg>
            <svg className="absolute bottom-0 left-[-2rem] w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 32 A 32 32 0 0 0 32 0 L 32 32 Z" />
            </svg>
          </div>
        </div>
      )}

      {cutout === 'top-right' && (
        <div className="absolute top-0 right-0 z-20 flex pointer-events-none">
          <div className="relative rounded-bl-[2rem] md:rounded-bl-[3rem] px-6 py-6 md:px-12 md:py-10 pl-12 md:pl-16 pb-8 md:pb-12 pointer-events-auto text-right" style={{ backgroundColor: 'var(--page-background)' }}>
            {/* Top-left inverted corner */}
            <svg className="absolute left-[-2rem] top-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 0 L 32 0 L 32 32 A 32 32 0 0 0 0 0 Z" />
            </svg>
            {/* Bottom-right inverted corner */}
            <svg className="absolute bottom-[-2rem] right-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 0 L 32 0 L 32 32 A 32 32 0 0 0 0 0 Z" />
            </svg>

            {title && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2
                  className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl ml-auto" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {cutout === 'top-center' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex pointer-events-none w-[90%] md:w-[75%] lg:w-[60%] max-w-[900px] justify-center">
          <div className="relative rounded-bl-[2rem] rounded-br-[2rem] md:rounded-bl-[3rem] md:rounded-br-[3rem] px-6 py-6 md:px-16 md:py-10 pb-8 md:pb-12 pointer-events-auto text-center w-full" style={{ backgroundColor: 'var(--page-background)' }}>
            {/* Top-left inverted corner */}
            <svg className="absolute left-[-2rem] top-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 0 L 32 0 L 32 32 A 32 32 0 0 0 0 0 Z" />
            </svg>
            {/* Top-right inverted corner */}
            <svg className="absolute right-[-2rem] top-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 32 A 32 32 0 0 1 32 0 L 0 0 Z" />
            </svg>

            {title && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2
                  className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {cutout === 'top-left' && (
        <div className="absolute top-0 left-0 z-20 flex pointer-events-none">
          <div className="relative rounded-br-[2rem] md:rounded-br-[3rem] px-6 py-6 md:px-12 md:py-10 pr-12 md:pr-16 pb-8 md:pb-12 pointer-events-auto" style={{ backgroundColor: 'var(--page-background)' }}>
            {/* Top-right inverted corner */}
            <svg className="absolute right-[-2rem] top-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 32 A 32 32 0 0 1 32 0 L 0 0 Z" />
            </svg>
            {/* Bottom-left inverted corner */}
            <svg className="absolute bottom-[-2rem] left-0 w-8 h-8 pointer-events-none" style={{ fill: 'var(--page-background)' }} viewBox="0 0 32 32">
              <path d="M 0 32 A 32 32 0 0 1 32 0 L 0 0 Z" />
            </svg>

            {title && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h2
                  className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
