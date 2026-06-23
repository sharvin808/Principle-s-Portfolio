'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { Lightbulb } from 'lucide-react';
import type { ResearchInterest } from '@/lib/types';

interface ResearchInterestsSectionProps {
  researchInterests: ResearchInterest[];
  theme?: 'oxford' | 'tan';
}

export default function ResearchInterestsSection({ 
  researchInterests,
  theme = 'tan'
}: ResearchInterestsSectionProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  if (!researchInterests || researchInterests.length === 0) return null;

  return (
    <SectionWrapper
      id="research-interests"
      title="Research Interests"
      subtitle="Core areas of academic focus and ongoing research"
      theme={theme}
    
      cutout="top-right"
    >
      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible"
      >
        {researchInterests.map((interest, index) => {
          const colIndex = index % 3;
          const isSpreadAnim = isLargeScreen && researchInterests.length >= 3;

          let initial: any = { opacity: 0, y: 40 };
          let animate: any = isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {};
          let transition: any = { duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] };
          let zClass = 'relative z-10';

          if (isSpreadAnim) {
            if (colIndex === 0) {
              // Left card: starts shifted right under the middle card (scale: 0.95 hides it behind middle card)
              initial = { opacity: 0, x: 'calc(100% + 24px)', y: 0, scale: 0.95 };
              animate = isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {};
              transition = {
                x: { duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15, delay: 0.25 }
              };
              zClass = 'relative z-0';
            } else if (colIndex === 1) {
              // Middle card: fades and slides up in place
              initial = { opacity: 0, x: 0, y: 40, scale: 1 };
              animate = isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {};
              transition = { duration: 0.7, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] };
              zClass = 'relative z-10';
            } else if (colIndex === 2) {
              // Right card: starts shifted left under the middle card (scale: 0.95 hides it behind middle card)
              initial = { opacity: 0, x: 'calc(-100% - 24px)', y: 0, scale: 0.95 };
              animate = isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {};
              transition = {
                x: { duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15, delay: 0.25 }
              };
              zClass = 'relative z-0';
            }
          }

          return (
            <motion.div
              key={index}
              initial={initial}
              animate={animate}
              transition={transition}
              className={zClass}
            >
              <div className="card-premium h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-gold-muted)' }}
                  >
                    <Lightbulb size={20} style={{ color: 'var(--color-gold)' }} />
                  </div>
                  <h3
                    className="text-xl font-semibold text-heading leading-tight"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {interest.topic}
                  </h3>
                </div>
                {interest.description && (
                  <p className="text-lg text-foreground/70 leading-relaxed">
                    {interest.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
