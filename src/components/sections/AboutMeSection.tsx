'use client';

import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { BookOpen, Lightbulb, Target, ChevronDown, ChevronUp } from 'lucide-react';
import type { AboutMe } from '@/lib/types';

interface AboutMeSectionProps {
  aboutMe: AboutMe;
}

export default function AboutMeSection({ aboutMe }: AboutMeSectionProps) {
  const [isVisionExpanded, setIsVisionExpanded] = useState(false);

  return (
    <SectionWrapper
      id="about"
      title="About"
      subtitle="Dedicated to Excellence in Education & Research"
      theme="oxford"
      cutout="top-left"
      titleDecoration="bracket"
      className="!pb-12 lg:!pb-16"
    >
      <div className="relative flex flex-col lg:flex-row mt-4">
        {/* Left Side: Biography & Vision */}
        <div className="relative w-full lg:w-[60%] lg:pr-12 xl:pr-16 z-10 flex flex-col">
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-gold-muted)' }}
              >
                <BookOpen size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3
                className="text-2xl font-semibold text-heading"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Biography
              </h3>
            </div>
            
            <div className="text-lg text-foreground/80 leading-relaxed space-y-4 text-left xl:text-justify">
              {aboutMe.biography ? (
                aboutMe.biography
                  .replace(/2022\.\s+Prof\./g, '2022.\nProf.')
                  .split('\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
              ) : (
                <p className="text-muted italic">Biography will be loaded from Google Sheets.</p>
              )}
            </div>

            {/* Introduction */}
            {aboutMe.introduction && (
              <div className="mt-6 pt-6 mb-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-lg text-foreground/70 leading-relaxed text-left xl:text-justify">{aboutMe.introduction}</p>
              </div>
            )}
          </ScrollReveal>

          {/* Academic Vision - Placed in flow but extra wide to overlap the image */}
          <ScrollReveal delay={0.2} className="mt-4 lg:mt-4 relative z-20 w-full lg:w-full xl:w-full">
            <div 
              className="relative shadow-2xl group rounded-[2rem] md:rounded-[3rem] overflow-hidden"
              style={{
                background: 'rgba(24, 56, 95, 0.95)', // #18385F
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Top-Left Beige Cutout for the Heading */}
              <div className="relative bg-[#e8ce9e] w-fit rounded-br-[2rem] md:rounded-br-[3rem] px-6 py-4 md:px-8 md:py-6 pr-8 md:pr-12 pointer-events-auto">
                {/* Top-right inverted corner */}
                <svg className="absolute right-[-2rem] top-0 w-8 h-8 pointer-events-none" style={{ fill: '#e8ce9e' }} viewBox="0 0 32 32">
                  <path d="M 0 32 A 32 32 0 0 1 32 0 L 0 0 Z" />
                </svg>
                {/* Bottom-left inverted corner */}
                <svg className="absolute bottom-[-2rem] left-0 w-8 h-8 pointer-events-none" style={{ fill: '#e8ce9e' }} viewBox="0 0 32 32">
                  <path d="M 0 32 A 32 32 0 0 1 32 0 L 0 0 Z" />
                </svg>

                <button 
                  onClick={() => setIsVisionExpanded(!isVisionExpanded)}
                  className="flex items-center gap-4 cursor-pointer outline-none group/btn"
                >
                  <div className="flex items-center gap-3">
                    <Target size={20} className="text-[#071A35]" />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-[#071A35]">
                      Academic Vision
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#071A35]/10 group-hover/btn:bg-[#071A35] transition-colors">
                    {isVisionExpanded ? (
                      <ChevronUp size={20} className="text-[#071A35] group-hover/btn:text-[#e8ce9e]" />
                    ) : (
                      <ChevronDown size={20} className="text-[#071A35] group-hover/btn:text-[#e8ce9e]" />
                    )}
                  </div>
                </button>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out px-6 md:px-10 ${isVisionExpanded ? 'max-h-[1000px] opacity-100 py-6 md:py-8' : 'max-h-0 opacity-0 py-0'}`}
              >
                <p className="text-lg leading-relaxed text-[#e8ce9e]/90 text-left xl:text-justify">
                  {aboutMe.vision || (
                    <span className="italic">Vision statement from Google Sheets.</span>
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Image (Desktop Absolute, Mobile flow) */}
        <div className="w-full mt-12 lg:mt-0 lg:w-[40%] lg:absolute lg:right-0 lg:-top-6 lg:-bottom-24 z-0">
          <ScrollReveal delay={0.1} className="h-full">
            <div className="relative w-full h-[400px] lg:h-full shadow-2xl bg-[var(--surface)] lg:rounded-bl-3xl rounded-2xl border border-white/30">
              {aboutMe.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={aboutMe.imageUrl} 
                  alt="About me" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top lg:rounded-bl-3xl rounded-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/10 lg:rounded-bl-3xl rounded-2xl">
                  <span className="text-muted italic">Image from Google Sheets</span>
                </div>
              )}
              
              {/* Glass border inner shadow/glow overlay */}
              <div className="absolute inset-0 lg:rounded-bl-3xl rounded-2xl border-2 border-white/50 shadow-[inset_0_0_25px_rgba(255,255,255,0.5)] pointer-events-none mix-blend-overlay"></div>
              
              {/* Left flare */}
              <div className="absolute top-[15%] -left-[2px] w-[3px] h-[15%] bg-white rounded-full shadow-[0_0_20px_6px_rgba(255,255,255,0.9)] pointer-events-none"></div>
              
              {/* Right flare */}
              <div className="absolute bottom-[15%] -right-[2px] w-[3px] h-[15%] bg-white rounded-full shadow-[0_0_20px_6px_rgba(255,255,255,0.9)] pointer-events-none"></div>
              
              {/* Diagonal reflection */}
              <div className="absolute inset-0 lg:rounded-bl-3xl rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-transparent pointer-events-none"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
