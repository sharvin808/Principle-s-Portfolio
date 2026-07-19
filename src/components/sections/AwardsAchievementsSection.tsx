'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Award as AwardIcon, Trophy } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import type { AwardAchievement } from '@/lib/types';

interface AwardsAchievementsSectionProps {
  awardsAchievements: AwardAchievement[];
  theme?: 'oxford' | 'tan';
}

export default function AwardsAchievementsSection({ 
  awardsAchievements, 
  theme = 'tan' 
}: AwardsAchievementsSectionProps) {
  if (!awardsAchievements || awardsAchievements.length === 0) return null;

  return (
    <SectionWrapper
      id="awards-achievements"
      title="Awards & Recognitions"
      //subtitle="Honors, fellowships, and academic accolades received throughout the career"
      theme={theme}
      cutout="top-center"
      headerContent={
        <div className="flex flex-wrap items-center justify-start gap-6 mt-4 pl-4 md:pl-8">
          <AnimatedCounter
            target={awardsAchievements.length}
            label="Total Awards & Honors"
            suffix=""
          />
        </div>
      }
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Background Watermark Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05] z-0">
          <Trophy className="w-[150%] h-[150%] max-w-[1200px] max-h-[1200px] min-w-0 md:min-w-[800px] min-h-0 md:min-h-[800px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10">
          {awardsAchievements.map((award, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="relative h-full bg-transparent rounded-[1.5rem] p-8 flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Thick Custom Borders */}
                <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 border-t-[6px] border-r-[6px] border-[#DFE8D9] rounded-tr-[1.5rem] transition-colors duration-300 group-hover:border-white pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-16 md:w-24 h-16 md:h-24 border-b-[6px] border-l-[6px] border-[#DFE8D9] rounded-bl-[1.5rem] transition-colors duration-300 group-hover:border-white pointer-events-none" />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(218, 215, 205, 0.15)' }}
                  >
                    <Trophy size={20} style={{ color: '#DFE8D9' }} />
                  </div>
                  <div className="flex-1 flex flex-wrap items-center justify-between gap-2">
                    {award.year && (
                      <span className="text-sm font-semibold text-[#DFE8D9] font-mono bg-[#DFE8D9]/10 px-2.5 py-1 rounded-md">
                        {award.year}
                      </span>
                    )}
                    {award.organization && (
                      <span className="text-sm text-[#DFE8D9]/80 font-medium text-right">
                        {award.organization}
                      </span>
                    )}
                  </div>
                </div>

                <h3
                  className="text-xl font-bold text-[#DFE8D9] leading-snug mb-3"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {award.name}
                </h3>

                {award.description && (
                  <p className="text-lg text-[#DFE8D9]/70 leading-relaxed mt-auto">
                    {award.description}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
