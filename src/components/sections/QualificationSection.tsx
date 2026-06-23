'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { GraduationCap } from 'lucide-react';
import type { Qualification } from '@/lib/types';

interface QualificationSectionProps {
  qualification: Qualification[];
}

export default function QualificationSection({ qualification }: QualificationSectionProps) {
  if (!qualification.length) return null;

  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="Academic qualifications and scholarly foundation"
      theme="oxford"
    
      cutout="top-right"
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="timeline-line hidden md:block" />

        <div className="space-y-12">
          {qualification.map((edu, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card-premium">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--color-gold-muted)' }}
                      >
                        <GraduationCap size={20} style={{ color: 'var(--color-gold)' }} />
                      </div>
                      <span className="text-base font-medium text-gold">{edu.year}</span>
                    </div>
                    <h3
                      className="text-xl font-semibold text-heading mb-1"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-lg font-medium text-foreground/80">{edu.field}</p>
                    <p className="text-lg text-muted mt-1">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-lg text-foreground/60 mt-3 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div
                    className="w-4 h-4 rounded-full border-2 z-10"
                    style={{
                      background: 'var(--color-gold)',
                      borderColor: 'var(--background)',
                    }}
                  />
                </div>

                {/* Empty spacer */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
