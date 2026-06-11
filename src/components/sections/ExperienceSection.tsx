'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Briefcase } from 'lucide-react';
import type { Experience } from '@/lib/types';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience.length) return null;

  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Professional journey and leadership roles in academia"
    >
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line on the left */}
        <div
          className="absolute left-5 top-0 bottom-0 w-0.5"
          style={{
            background: 'linear-gradient(to bottom, var(--color-gold), var(--color-gold-muted), transparent)',
          }}
        />

        <div className="space-y-10">
          {experience.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="relative pl-14">
                {/* Timeline dot */}
                <div
                  className="absolute left-3 top-2 w-5 h-5 rounded-full border-[3px] z-10"
                  style={{
                    background: 'var(--color-gold)',
                    borderColor: 'var(--background)',
                  }}
                />

                <div className="card-premium">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--color-gold-muted)' }}
                    >
                      <Briefcase size={18} style={{ color: 'var(--color-gold)' }} />
                    </div>
                    <span className="text-sm font-medium text-gold">
                      {exp.startYear}
                      {exp.endYear ? ` — ${exp.endYear}` : ' — Present'}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-semibold text-heading"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted mt-1">{exp.institution}</p>
                  {exp.description && (
                    <p className="text-sm text-foreground/60 mt-3 leading-relaxed">
                      {exp.description}
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
