'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Lightbulb } from 'lucide-react';
import type { ResearchInterest } from '@/lib/types';

interface ResearchInterestsSectionProps {
  researchInterests: ResearchInterest[];
}

export default function ResearchInterestsSection({ researchInterests }: ResearchInterestsSectionProps) {
  if (!researchInterests || researchInterests.length === 0) return null;

  return (
    <SectionWrapper
      id="research-interests"
      title="Research Interests"
      subtitle="Core areas of academic focus and ongoing research"
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchInterests.map((interest, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className="card-premium h-full">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-gold-muted)' }}
                >
                  <Lightbulb size={20} style={{ color: 'var(--color-gold)' }} />
                </div>
                <h3
                  className="text-lg font-semibold text-heading leading-tight"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {interest.topic}
                </h3>
              </div>
              {interest.description && (
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {interest.description}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
