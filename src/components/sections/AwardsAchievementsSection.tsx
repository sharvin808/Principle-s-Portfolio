'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Award as AwardIcon, Trophy } from 'lucide-react';
import type { AwardAchievement } from '@/lib/types';

interface AwardsAchievementsSectionProps {
  awardsAchievements: AwardAchievement[];
}

export default function AwardsAchievementsSection({ awardsAchievements }: AwardsAchievementsSectionProps) {
  if (!awardsAchievements || awardsAchievements.length === 0) return null;

  return (
    <SectionWrapper
      id="awards-achievements"
      title="Awards & Recognitions"
      subtitle="Honors, fellowships, and academic accolades received throughout the career"
    >
      <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div
          className="absolute left-5 top-0 bottom-0 w-0.5"
          style={{
            background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-muted), transparent)',
          }}
        />

        <div className="space-y-10">
          {awardsAchievements.map((award, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="relative pl-14">
                {/* Timeline Dot with Trophy/Medal icon */}
                <div
                  className="absolute left-1 top-1 w-9 h-9 rounded-full border-2 flex items-center justify-center z-10"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--color-gold)',
                  }}
                >
                  <Trophy size={14} style={{ color: 'var(--color-gold)' }} />
                </div>

                <div className="card-premium">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-gold font-mono bg-gold-muted px-2.5 py-1 rounded-md">
                      {award.year}
                    </span>
                    <span className="text-xs text-muted font-medium">
                      {award.organization}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-heading leading-snug mb-2"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {award.name}
                  </h3>

                  {award.description && (
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
