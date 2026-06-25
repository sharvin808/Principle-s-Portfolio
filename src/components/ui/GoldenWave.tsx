'use client';

import React from 'react';
import Particles from './Particles';

export default function GoldenWave() {
  return (
    <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden pointer-events-none z-0 rounded-t-[2rem] md:rounded-t-[3rem]">
      {/* Dark gradient fade for the background to make the gold pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent mix-blend-multiply" />
      
      {/* The glowing wave SVG */}
      <div className="absolute inset-0 opacity-90 mix-blend-screen">
        <svg viewBox="0 0 1440 320" className="absolute w-full h-full" preserveAspectRatio="none">
          <defs>
            <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Deep gold broad wave */}
          <path 
            fill="none" 
            stroke="#b8860b" 
            strokeWidth="12" 
            opacity="0.3"
            d="M0,180 C320,320 420,40 740,160 C1060,280 1280,140 1440,200"
            filter="url(#glow2)"
          />
          {/* Bright gold mid wave */}
          <path 
            fill="none" 
            stroke="#ffd700" 
            strokeWidth="4" 
            opacity="0.6"
            d="M0,160 C320,300 420,0 740,120 C1060,240 1280,100 1440,160"
            filter="url(#glow1)"
          />
          {/* White/Yellow hot core */}
          <path 
            fill="none" 
            stroke="#ffffe0" 
            strokeWidth="1.5" 
            opacity="0.9"
            d="M0,160 C320,280 420,20 740,140 C1060,260 1280,120 1440,180"
            filter="url(#glow1)"
          />
        </svg>
      </div>

      {/* Particles effect localized to this header area */}
      <div 
        className="absolute inset-0 opacity-80 mix-blend-screen" 
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)' 
        }}
      >
        <Particles />
      </div>
    </div>
  );
}
