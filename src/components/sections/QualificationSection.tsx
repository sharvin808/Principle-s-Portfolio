'use client';

import { useState, useEffect } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { GraduationCap, Globe } from 'lucide-react';
import type { Qualification } from '@/lib/types';

interface QualificationSectionProps {
  qualification: Qualification[];
}

export default function QualificationSection({ qualification }: QualificationSectionProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!qualification.length) return null;

function QualificationCard({ edu, index }: { edu: Qualification; index: number }) {

  return (
    <div className="relative flex items-center w-full">
      <div 
        className="relative w-full bg-[#071A35] rounded-l-[40px] rounded-r-2xl md:rounded-l-full md:rounded-r-md flex items-center p-3 md:p-2 md:pr-6 shadow-xl border border-white/10 group hover:border-white/20 transition-colors"
      >
        {/* Arrow Tip */}
        <div 
          className="absolute top-0 right-[-20px] w-[21px] h-full bg-[#071A35]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)' }}
        />
        
        {/* Circular Icon */}
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#EFE0CD] flex items-center justify-center flex-shrink-0 shadow-inner z-10 transition-transform duration-300 group-hover:scale-105">
          <GraduationCap size={32} className="text-[#071A35]" />
        </div>
        
        {/* Content */}
        <div className="ml-4 md:ml-6 flex-1 py-4 md:py-6 relative min-h-[120px] flex items-center">
          
          <div className="flex-1 pr-2 overflow-hidden flex flex-col md:flex-row gap-4 transition-all duration-300">
            
            {/* Left Column (Degree & Institution) */}
            <div className="flex flex-col gap-3 min-w-0 md:min-w-[200px] flex-1">
              <div>
                <h3 className="text-white font-bold text-xl md:text-2xl uppercase tracking-wider mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[#EFE0CD] text-sm md:text-base font-medium">
                  {edu.field}
                </p>
              </div>
              
              <div className="border-t border-white/20 pt-3">
                <p className="text-white/90 text-lg md:text-xl font-semibold mb-1">
                  {edu.institution}
                </p>
                <p className="text-[#EFE0CD] text-sm md:text-base font-medium">
                  {edu.year}
                </p>
              </div>
            </div>
            
            {/* Right Column (Description) */}
            {edu.description && (
              <div className="animate-in slide-in-from-left-4 fade-in duration-300 border-t md:border-t-0 md:border-l border-white/20 pt-3 md:pt-0 md:pl-6 flex-1 min-w-0 md:min-w-[250px] flex items-center">
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {edu.description}
                </p>
              </div>
            )}
            
          </div>
          
        </div>
        
        {/* Number Badge */}
        <div className="absolute -top-3 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#102A4A] border-[2px] border-white flex items-center justify-center text-white text-sm md:text-base font-bold shadow-lg z-10">
          {(index + 1).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}

  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="Academic qualifications and scholarly foundation"
      theme="oxford"
      cutout="top-center"
    >
      {/* Background Watermark for the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03] overflow-hidden">
        <GraduationCap className="w-[120vw] h-[120vw] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] text-white" strokeWidth={0.5} />
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="relative z-10 2xl:hidden space-y-8 mt-8 px-4 md:px-8 lg:px-16 max-w-5xl mx-auto">
        {qualification.map((edu, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <QualificationCard edu={edu} index={index} />
          </ScrollReveal>
        ))}
      </div>

      {/* Desktop Radial Infographic Layout */}
      {mounted && (
        <div className="hidden 2xl:flex relative z-10 w-full h-[1200px] mt-12 items-center justify-center overflow-visible">
          
          {/* Center container to hold the circle and arc */}
          <div className="absolute left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 w-0 h-0">
            
            {/* The Arc */}
            <div 
              className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border-[2px] border-white/30 rounded-full pointer-events-none"
              style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
            />
            
            {/* The Center Circle Node */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#EFE0CD] shadow-2xl flex flex-col items-center justify-center z-20 border-[8px] border-[#071A35]">
              
              <div className="relative z-10 flex flex-col items-center">
                <Globe size={48} className="text-[#071A35] mb-4" />
                <h2 className="text-[#071A35] font-black text-xl text-center px-8 uppercase tracking-widest leading-tight">
                  Academic<br/>Qualifications
                </h2>
              </div>
            </div>

            {/* The Qualification Nodes */}
            {qualification.map((edu, index) => {
              const N = qualification.length;
              const radius = 425; // Half of 850px
              const startAngle = -45;
              const endAngle = 45;
              
              // If only 1 item, put it at 0. Otherwise distribute evenly.
              const angle = N === 1 
                ? 0 
                : startAngle + (index * (endAngle - startAngle) / (N - 1));
              
              const rad = angle * (Math.PI / 180);
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);

              return (
                <div 
                  key={index}
                  className="absolute"
                  style={{ left: x, top: y }}
                >
                  <ScrollReveal delay={index * 0.1}>
                    <div className="relative flex items-center w-full" style={{ transform: 'translateY(-50%)' }}>
                      {/* Node Dot on the Arc */}
                      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" />
                      
                      {/* Connecting Line to Card */}
                      <div className="h-[2px] bg-white/40 w-16 2xl:w-24 shrink-0" />
                      
                      {/* The Card */}
                      <div className="min-w-[380px] lg:min-w-[450px] max-w-[800px] transition-all duration-300">
                        <QualificationCard edu={edu} index={index} />
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
