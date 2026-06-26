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
  titleDecoration?: 'none' | 'bracket';
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
  titleDecoration = 'bracket',
  headerContent,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const themeClass = theme === 'oxford'
    ? `bg-oxford-theme w-[96%] lg:w-[98%] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[3rem] my-6 md:my-10`
    : `bg-tan-theme w-[96%] lg:w-[98%] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[3rem] my-6 md:my-10`;

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-20 md:py-28 px-4 md:px-8 ${themeClass} ${className}`}
    >
      {/* Decorative Topographical Cutout on the Left */}
      <div className="hidden md:block absolute top-12 bottom-12 left-0 md:w-[250px] lg:w-[350px] xl:w-[450px] pointer-events-none z-0 overflow-hidden rounded-3xl">
        <svg viewBox="0 0 600 1200" className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id={`cutout-shadow-left-${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="6" dy="0" stdDeviation="8" floodColor="#000" floodOpacity={theme === 'oxford' ? "0.25" : "0.1"}/>
            </filter>
          </defs>
          <path d="M 0 0 C 350 100, 550 300, 550 600 C 550 900, 350 1100, 0 1200 Z" fill={theme === 'oxford' ? '#193B28' : '#cdcac0'} filter={`url(#cutout-shadow-left-${id})`} />
          <path d="M 0 0 C 250 150, 430 350, 430 600 C 430 850, 250 1050, 0 1200 Z" fill={theme === 'oxford' ? '#163524' : '#c0bdb3'} filter={`url(#cutout-shadow-left-${id})`} />
          <path d="M 0 0 C 150 200, 300 400, 300 600 C 300 800, 150 1000, 0 1200 Z" fill={theme === 'oxford' ? '#143020' : '#b3b0a6'} filter={`url(#cutout-shadow-left-${id})`} />
        </svg>
      </div>

      {/* Decorative Topographical Cutout on the Right */}
      <div className="hidden md:block absolute top-12 bottom-12 right-0 md:w-[250px] lg:w-[350px] xl:w-[450px] pointer-events-none z-0 overflow-hidden rounded-3xl">
        <svg viewBox="0 0 600 1200" className="absolute top-0 right-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id={`cutout-shadow-right-${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-6" dy="0" stdDeviation="8" floodColor="#000" floodOpacity={theme === 'oxford' ? "0.25" : "0.1"}/>
            </filter>
          </defs>
          <path d="M 600 0 C 250 100, 50 300, 50 600 C 50 900, 250 1100, 600 1200 Z" fill={theme === 'oxford' ? '#193B28' : '#cdcac0'} filter={`url(#cutout-shadow-right-${id})`} />
          <path d="M 600 0 C 350 150, 170 350, 170 600 C 170 850, 350 1050, 600 1200 Z" fill={theme === 'oxford' ? '#163524' : '#c0bdb3'} filter={`url(#cutout-shadow-right-${id})`} />
          <path d="M 600 0 C 450 200, 300 400, 300 600 C 300 800, 450 1000, 600 1200 Z" fill={theme === 'oxford' ? '#143020' : '#b3b0a6'} filter={`url(#cutout-shadow-right-${id})`} />
        </svg>
      </div>

      {cutout === 'top-right' && (
        <div className="relative md:absolute top-0 right-0 z-20 flex justify-end md:justify-start pointer-events-none -mt-20 md:mt-0 -mr-4 md:mr-0 md:w-auto">
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
                {titleDecoration === 'bracket' ? (
                  <div className="relative inline-block mb-2">
                    <div className="absolute -bottom-3 -left-3 w-12 md:w-16 h-12 md:h-16 border-b-[6px] border-l-[6px] border-[#1C422D] rounded-bl-2xl pointer-events-none" />
                    <h2
                      className="relative bg-[#1C422D] text-[#faf3e3] px-8 py-4 rounded-[1.5rem] text-3xl md:text-4xl lg:text-5xl font-bold z-10 shadow-lg"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {title}
                    </h2>
                  </div>
                ) : (
                  <h2
                    className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl ml-auto" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {cutout === 'top-center' && (
        <div className="relative md:absolute top-0 md:left-1/2 md:-translate-x-1/2 z-20 flex pointer-events-none w-[90%] md:w-[75%] lg:w-[60%] max-w-[900px] mx-auto md:mx-0 justify-center -mt-20 md:mt-0">
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
                {titleDecoration === 'bracket' ? (
                  <div className="relative inline-block mb-2">
                    <div className="absolute -bottom-3 -left-3 w-12 md:w-16 h-12 md:h-16 border-b-[6px] border-l-[6px] border-[#1C422D] rounded-bl-2xl pointer-events-none" />
                    <h2
                      className="relative bg-[#1C422D] text-[#faf3e3] px-8 py-4 rounded-[1.5rem] text-3xl md:text-4xl lg:text-5xl font-bold z-10 shadow-lg"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {title}
                    </h2>
                  </div>
                ) : (
                  <h2
                    className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {cutout === 'top-left' && (
        <div className="relative md:absolute top-0 left-0 z-20 flex pointer-events-none -mt-20 md:mt-0 -ml-4 md:ml-0 md:w-auto">
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
                {titleDecoration === 'bracket' ? (
                  <div className="relative inline-block mb-2">
                    {/* The thick border bracket */}
                    <div className="absolute -bottom-3 -left-3 w-12 md:w-16 h-12 md:h-16 border-b-[6px] border-l-[6px] border-[#1C422D] rounded-bl-2xl pointer-events-none" />
                    {/* The heading box */}
                    <h2
                      className="relative bg-[#1C422D] text-[#faf3e3] px-8 py-4 rounded-[1.5rem] text-3xl md:text-4xl lg:text-5xl font-bold z-10 shadow-lg"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {title}
                    </h2>
                  </div>
                ) : (
                  <h2
                    className="section-title text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: 'var(--page-heading)' }}
                  >
                    {title}
                  </h2>
                )}
                {subtitle && (
                  <p className="mt-4 text-lg max-w-2xl" style={{ color: 'var(--page-heading)', opacity: 0.7 }}>{subtitle}</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )}

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
              cutout === 'top-left' ? 'mt-8 md:mt-24 lg:mt-28 w-full' : 
              cutout === 'top-right' ? 'mt-8 md:mt-24 lg:mt-28 w-full' : 
              cutout === 'top-center' ? 'mt-8 md:mt-20 lg:mt-0 lg:absolute lg:top-0 lg:left-0 md:w-[60%] lg:w-[25%]' : ''
            }`}>
              {headerContent}
            </div>
          )}
          <div className={`relative z-10 ${
            !headerContent && (cutout === 'top-left' || cutout === 'top-right' || cutout === 'top-center') ? 'mt-8 md:mt-40 lg:mt-48' : 
            headerContent && cutout === 'top-center' ? 'mt-4 md:mt-12 lg:mt-56' : ''
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

    </section>
  );
}
