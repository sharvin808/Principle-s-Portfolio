'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Globe2, Building, Calendar, Target } from 'lucide-react';
import type { InternationalExposure } from '@/lib/types';

interface InternationalExposureSectionProps {
  internationalExposure: InternationalExposure[];
}

export default function InternationalExposureSection({ internationalExposure }: InternationalExposureSectionProps) {
  if (!internationalExposure || internationalExposure.length === 0) return null;

  return (
    <SectionWrapper
      id="international-exposure"
      title="International Exposure"
      subtitle="Global academic collaborations and international visits"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {internationalExposure.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className="card-premium h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Globe2 size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-gold font-mono bg-gold-muted px-2.5 py-1 rounded-md">
                    {item.year}
                  </span>
                  <span className="text-sm font-medium text-heading flex items-center gap-1.5">
                    <Globe2 size={14} className="text-gold" />
                    {item.country}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-heading leading-snug mb-3 flex items-start gap-2"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  <Building size={16} className="mt-1 flex-shrink-0 text-gold" />
                  {item.university}
                </h3>

                <div className="space-y-2 mt-4">
                  {item.purpose && (
                    <div className="flex items-start gap-2 text-sm text-foreground/80">
                      <Target size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                      <span><strong>Purpose:</strong> {item.purpose}</span>
                    </div>
                  )}
                  {item.duration && (
                    <div className="flex items-start gap-2 text-sm text-foreground/80">
                      <Calendar size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                      <span><strong>Duration:</strong> {item.duration}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
