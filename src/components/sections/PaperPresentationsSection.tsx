'use client';

import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Mic, MapPin, Calendar, Users } from 'lucide-react';
import type { PaperPresentation } from '@/lib/types';

interface PaperPresentationsSectionProps {
  paperPresentations: PaperPresentation[];
}
export default function PaperPresentationsSection({ paperPresentations }: PaperPresentationsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'presentations' | 'conferences'>('all');

  if (!paperPresentations || paperPresentations.length === 0) return null;

  // Differentiate between Conferences and general Academic Presentations
  const isConferenceItem = (p: PaperPresentation) =>
    p.conference.toLowerCase().includes('conference');

  const presentationsCount = paperPresentations.filter((p) => !isConferenceItem(p)).length;
  const conferencesCount = paperPresentations.filter((p) => isConferenceItem(p)).length;

  const filteredPresentations = paperPresentations.filter((paper) => {
    if (activeTab === 'all') {
      return true;
    }
    if (activeTab === 'presentations') {
      return !isConferenceItem(paper);
    }
    if (activeTab === 'conferences') {
      return isConferenceItem(paper);
    }
    return true;
  });

  const handleTabClick = (tab: 'presentations' | 'conferences') => {
    if (activeTab === tab) {
      setActiveTab('all');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <SectionWrapper
      id="paper-presentations"
      title="Paper Presentations"
      subtitle="Presentations at national and international conferences"
      theme="oxford"
      className="noise-texture"
    
      cutout="top-left"
    >
      {/* Stats ribbon / interactive tabs */}
      <ScrollReveal>
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => handleTabClick('presentations')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={
              activeTab === 'all' || activeTab === 'presentations'
                ? {
                    background: 'var(--surface)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-gold)',
                    boxShadow: '0 0 0 1px var(--color-gold)',
                  }
                : {
                    background: 'var(--surface)',
                    color: 'var(--muted)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'none',
                  }
            }
          >
            <Mic size={13} />
            {presentationsCount} Presentations
          </button>
          <button
            onClick={() => handleTabClick('conferences')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={
              activeTab === 'all' || activeTab === 'conferences'
                ? {
                    background: 'var(--surface)',
                    color: 'var(--color-gold)',
                    border: '1px solid var(--color-gold)',
                    boxShadow: '0 0 0 1px var(--color-gold)',
                  }
                : {
                    background: 'var(--surface)',
                    color: 'var(--muted)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'none',
                  }
            }
          >
            <Users size={13} />
            {conferencesCount} Conferences
          </button>
        </div>
      </ScrollReveal>

      {/* Ticket Grid */}
      <div className="ticket-grid">
        {filteredPresentations.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted italic bg-surface/50 border border-border/10 rounded-2xl">
            No presentations found matching this filter.
          </div>
        ) : (
          filteredPresentations.map((paper, index) => (
            <ScrollReveal key={index} delay={index * 0.06} direction="left">
              <div className="ticket-stub">
                {/* Perforated left edge */}
                <div className="ticket-perforation">
                  <Mic
                    size={14}
                    style={{ color: 'var(--color-gold)', opacity: 0.5 }}
                  />
                </div>

                {/* Ticket body */}
                <div className="ticket-body">
                  {/* Conference band */}
                  {paper.conference && (
                    <div className="ticket-conference-band">
                      {paper.conference}
                    </div>
                  )}

                  {/* Paper title */}
                  <h3
                    className="text-lg md:text-xl font-bold text-heading leading-snug"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                    }}
                  >
                    {paper.title}
                  </h3>

                  {/* Metadata stamps */}
                  <div className="ticket-meta">
                    {paper.date && (
                      <span className="ticket-meta-item">
                        <Calendar size={12} />
                        {paper.date}
                      </span>
                    )}
                    {paper.location && (
                      <span className="ticket-meta-item">
                        <MapPin size={12} />
                        {paper.location}
                      </span>
                    )}
                  </div>

                  {/* Description — revealed on hover */}
                  {paper.description && (
                    <div className="ticket-description">
                      {paper.description}
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}
