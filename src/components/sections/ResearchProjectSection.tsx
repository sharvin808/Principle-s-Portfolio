'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Briefcase, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import type { ResearchProject } from '@/lib/types';

interface ResearchProjectSectionProps {
  researchProject: ResearchProject[];
}

export default function ResearchProjectSection({ researchProject }: ResearchProjectSectionProps) {
  if (!researchProject || researchProject.length === 0) return null;

  return (
    <SectionWrapper
      id="research-project"
      title="Research & Academic Projects"
      subtitle="Sponsored research projects, institutional grants, and educational initiatives"
      dark
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {researchProject.map((proj, index) => {
          const isOngoing = proj.status?.toLowerCase().includes('ongoing');

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
                      {proj.status || 'Completed'}
                    </span>
                    <span className="text-xs font-semibold text-muted font-mono flex items-center gap-1">
                      <Calendar size={12} />
                      {proj.year}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-heading leading-snug mb-3"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {proj.title}
                  </h3>

                  {proj.fundingAgency && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-alt border border-border/10 text-xs font-medium text-foreground/80 mb-4">
                      <DollarSign size={12} className="text-gold" />
                      Grant / Agency: {proj.fundingAgency}
                    </div>
                  )}

                  {proj.description && (
                    <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                      {proj.description}
                    </p>
                  )}
                </div>

                {proj.link && (
                  <div className="pt-4 border-t border-border/10">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
                    >
                      Project Details / Website <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
