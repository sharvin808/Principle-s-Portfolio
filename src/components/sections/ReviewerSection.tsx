'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { BookMarked, UserCheck } from 'lucide-react';
import type { Reviewer } from '@/lib/types';

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
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewer.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className="card-premium h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--color-gold-muted)' }}
                >
                  <BookMarked size={20} style={{ color: 'var(--color-gold)' }} />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold text-heading leading-tight"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {item.journalName}
                  </h3>
                  {item.publisher && (
                    <p className="text-sm text-muted mt-0.5">{item.publisher}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border/10 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-lg font-medium text-foreground/80">
                  <UserCheck size={14} className="text-gold" />
                  {item.role || 'Reviewer'}
                </span>
                {item.year && (
                  <span className="text-sm font-mono text-muted">
                    {item.year}
                  </span>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
