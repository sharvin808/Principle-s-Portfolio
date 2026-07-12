'use client';

import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { 
  Mic, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Lightbulb, 
  TrendingUp, 
  Rocket, 
  Target 
} from 'lucide-react';
import type { PaperPresentation } from '@/lib/types';

const ICONS = [Search, Lightbulb, TrendingUp, Rocket, Target];
const COLORS = ['#D49A36']; // Duller gold matching user request

interface PaperPresentationsSectionProps {
  paperPresentations: PaperPresentation[];
}

export default function PaperPresentationsSection({ paperPresentations }: PaperPresentationsSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'presentations' | 'conferences'>('all');

  if (!paperPresentations || paperPresentations.length === 0) return null;

  const isConferenceItem = (p: PaperPresentation) =>
    p.conference.toLowerCase().includes('conference');

  const presentationsCount = paperPresentations.filter((p) => !isConferenceItem(p)).length;
  const conferencesCount = paperPresentations.filter((p) => isConferenceItem(p)).length;

  const filteredPresentations = paperPresentations.filter((paper) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'presentations') return !isConferenceItem(paper);
    if (activeTab === 'conferences') return isConferenceItem(paper);
    return true;
  });

  const handleTabClick = (tab: 'presentations' | 'conferences') => {
    setActiveTab(activeTab === tab ? 'all' : tab);
  };

  return (
    <SectionWrapper
      id="paper-presentations"
      title="Paper Presentations"
      subtitle="Presentations at national and international conferences"
      theme="oxford"
      className="noise-texture"
      cutout="top-left"
      headerContent={
        <div className="flex flex-wrap items-center justify-end gap-4 w-full">
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
      }
    >
      <div className="mt-16 max-w-5xl mx-auto flex flex-col gap-12 md:gap-16 px-4 md:px-28">
        {filteredPresentations.length === 0 ? (
          <div className="py-12 text-center text-muted italic bg-surface/50 border border-border/10 rounded-2xl">
            No presentations found matching this filter.
          </div>
        ) : (
          filteredPresentations.map((paper, index) => {
            const isEven = index % 2 === 1; // visual #2 is even
            const color = COLORS[index % COLORS.length];
            const Icon = ICONS[index % ICONS.length];

            return (
              <ScrollReveal key={index} delay={0.1} direction={isEven ? 'right' : 'left'}>
                <div className="flex w-full justify-center relative">
                  
                  {/* Container for the pill assembly */}
                  <div className="relative w-full max-w-full md:max-w-3xl lg:max-w-5xl flex items-stretch">
                    
                    {/* Colored Number Block (Absolute to not affect centering of white cards) */}
                    <div 
                      className={`hidden md:flex absolute top-0 bottom-0 z-0 items-center justify-center shadow-lg md:w-40 ${
                        isEven 
                          ? 'md:-left-20 md:rounded-l-full pr-20'
                          : 'md:-right-20 md:rounded-r-full pl-20'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                       <span className="text-white font-black md:text-5xl">{index + 1}</span>
                    </div>

                    {/* White Content Pill */}
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center bg-[#D4AF37] border border-white/40 rounded-3xl md:rounded-full p-6 md:px-10 md:py-6 shadow-[0_15px_35px_rgba(0,0,0,0.2)] w-full">
                      
                      {/* Mobile Number Badge */}
                      <div 
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg mb-4 shadow-md"
                        style={{ backgroundColor: color }}
                      >
                        {index + 1}
                      </div>

                      {/* Icon for ODD (Left side) */}
                      {!isEven && (
                        <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 rounded-full bg-white/60 border border-white/40 mr-8">
                          <Icon size={28} style={{ color }} />
                        </div>
                      )}

                      {/* Text Content */}
                      <div className="flex-1 flex flex-col justify-center text-left w-full">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                          {paper.conference && (
                            <span className="font-semibold" style={{ color }}>
                              {paper.conference}
                            </span>
                          )}
                          {paper.location && (
                            <span className="flex items-center gap-1"><MapPin size={14}/> {paper.location}</span>
                          )}
                          {paper.date && (
                            <span className="flex items-center gap-1"><Calendar size={14}/> {paper.date}</span>
                          )}
                        </div>
                        {paper.description && (
                          <p className="text-sm md:text-base text-gray-700 mt-2 line-clamp-2 md:line-clamp-none">
                            {paper.description}
                          </p>
                        )}
                      </div>

                      {/* Icon for EVEN (Right side) */}
                      {isEven && (
                        <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 rounded-full bg-white/60 border border-white/40 ml-8">
                          <Icon size={28} style={{ color }} />
                        </div>
                      )}

                    </div>
                  </div>
                  
                  {/* Decorative dashed line underneath */}
                  <div 
                    className={`hidden md:block absolute -bottom-6 md:-bottom-8 h-[2px] border-b-[2px] border-dashed ${isEven ? 'right-[20%] w-[30%]' : 'left-[20%] w-[30%]'}`}
                    style={{ borderColor: color, opacity: 0.4 }}
                  />

                </div>
              </ScrollReveal>
            );
          })
        )}
      </div>
    </SectionWrapper>
  );
}
