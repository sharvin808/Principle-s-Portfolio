'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Mic, MapPin, Calendar, Users } from 'lucide-react';
import type { PaperPresentation } from '@/lib/types';

interface PaperPresentationsSectionProps {
  paperPresentations: PaperPresentation[];
}

export default function PaperPresentationsSection({ paperPresentations }: PaperPresentationsSectionProps) {
  if (!paperPresentations || paperPresentations.length === 0) return null;

  return (
    <SectionWrapper
      id="paper-presentations"
      title="Paper Presentations"
      subtitle="Presentations at national and international conferences"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {paperPresentations.map((paper, index) => (
          <ScrollReveal key={index} delay={index * 0.05} direction="up">
            <div className="card-premium flex flex-col md:flex-row gap-6 items-start">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: 'var(--color-gold-muted)' }}
              >
                <Mic size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              
              <div className="flex-grow">
                <h3
                  className="text-xl font-bold text-heading mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {paper.title}
                </h3>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3 text-sm font-medium text-foreground/70">
                  {paper.conference && (
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-gold" />
                      {paper.conference}
                    </span>
                  )}
                  {paper.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gold" />
                      {paper.date}
                    </span>
                  )}
                  {paper.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-gold" />
                      {paper.location}
                    </span>
                  )}
                </div>

                {paper.description && (
                  <p className="text-sm text-foreground/60 leading-relaxed">
                    {paper.description}
                  </p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
