'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Briefcase, Building2, Calendar } from 'lucide-react';
import type { Consultancy } from '@/lib/types';

interface ConsultancySectionProps {
  consultancy: Consultancy[];
}

export default function ConsultancySection({ consultancy }: ConsultancySectionProps) {
  if (!consultancy || consultancy.length === 0) return null;

  return (
    <SectionWrapper
      id="consultancy"
      title="Consultancy"
      subtitle="Professional consulting and advisory roles"
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {consultancy.map((item, index) => {
          const isOngoing = item.status?.toLowerCase().includes('ongoing');

          return (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="card-premium h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`status-badge ${
                        isOngoing ? 'ongoing' : 'completed'
                      }`}
                    >
                      {item.status || 'Completed'}
                    </span>
                    <span className="text-xs font-semibold text-muted font-mono flex items-center gap-1">
                      <Calendar size={12} />
                      {item.year}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-heading leading-snug mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {item.title}
                  </h3>

                  {item.organization && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-alt border border-border/10 text-xs font-medium text-foreground/80 mb-4">
                      <Building2 size={12} className="text-gold" />
                      Organization: {item.organization}
                    </div>
                  )}

                  {item.description && (
                    <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
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
