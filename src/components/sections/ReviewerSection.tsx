'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import type { Reviewer } from '@/lib/types';

const COLOR_PAIRS = [
  { main: '#0070B8', dark: '#004A7C' }, // Blue
  { main: '#F39C12', dark: '#D35400' }, // Orange/Yellow
  { main: '#27AE60', dark: '#1E8449' }, // Green
  { main: '#E74C3C', dark: '#C0392B' }, // Red
];

interface ReviewerSectionProps {
  reviewer: Reviewer[];
}

export default function ReviewerSection({ reviewer }: ReviewerSectionProps) {
  if (!reviewer || reviewer.length === 0) return null;

  return (
    <SectionWrapper
      id="reviewer"
      title="Editorial & Reviewer Roles"
      subtitle="Contributions to academic journals and publications"
      theme="oxford"
      cutout="top-left"
      headerContent={
        <div className="flex flex-wrap items-center justify-end gap-6 pr-4 md:pr-8">
          <AnimatedCounter
            target={reviewer.length}
            label="Total Editorial Roles"
            suffix=""
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-x-14 md:gap-y-20 pt-12 px-4 md:px-8 max-w-7xl xl:max-w-[90rem] mx-auto">
        {reviewer.map((item, index) => {
          const pair = COLOR_PAIRS[index % COLOR_PAIRS.length];
          return (
            <ScrollReveal key={index} delay={index * 0.1} className="h-full">
              <div className="relative bg-[#e8ce9e] shadow-[0_15px_40px_rgba(0,0,0,0.12)] pt-10 pr-10 pb-12 pl-12 min-h-[220px] h-full flex flex-col z-10 rounded-sm">
                
                {/* --- Decorative Lines --- */}
                {/* Left Vertical Thick (Dark) */}
                <div className="absolute w-[5px] left-[24px] -top-[24px] -bottom-[24px] z-20 rounded-full" style={{ backgroundColor: pair.dark }} />
                
                {/* Bottom Horizontal Thick (Dark) */}
                <div className="absolute h-[5px] bottom-[24px] -left-[24px] right-[10%] z-20 rounded-full" style={{ backgroundColor: pair.dark }} />
                
                {/* Top Right Horizontal Thin (Dark) */}
                <div className="absolute h-[4px] w-[45%] top-[24px] -right-[24px] z-20 rounded-full" style={{ backgroundColor: pair.dark }} />
                {/* Top Right Vertical Thin (Main) */}
                <div className="absolute w-[4px] h-[40%] -top-[24px] right-[24px] z-20 rounded-full" style={{ backgroundColor: pair.main }} />
                {/* ------------------------ */}

                {/* Content */}
                <div className="relative z-30 flex flex-col h-full">
                  <div>
                    <span className="inline-block border-b-2 border-gray-200 pb-1.5 mb-5 text-gray-400 uppercase tracking-widest text-xs font-bold">
                      {item.role || 'Reviewer'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-snug" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {item.journalName}
                  </h3>
                  
                  {item.publisher && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed font-medium">
                      {item.publisher}
                    </p>
                  )}
                  
                  {item.year && (
                    <div className="mt-auto pt-5 flex items-center justify-between">
                      <span className="text-gray-400 text-sm font-mono font-bold tracking-wider">
                        {item.year}
                      </span>
                      <div className="h-[1px] flex-1 ml-4 bg-gray-200" />
                    </div>
                  )}
                </div>

              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
