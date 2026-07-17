'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { Building, Target, Compass, ChevronRight } from 'lucide-react';
import type { InternationalExposure } from '@/lib/types';
import { COUNTRIES_DATA } from '@/lib/countries';

interface InternationalExposureSectionProps {
  internationalExposure: InternationalExposure[];
}

// Comprehensive ISO 3166-1 alpha-2 country codes dictionary for Flag CDN
const COUNTRY_CODES: Record<string, string> = {
  'united states': 'us',
  'united states of america': 'us',
  'usa': 'us',
  'united kingdom': 'gb',
  'uk': 'gb',
  'great britain': 'gb',
  'belgium': 'be',
  'hong kong': 'hk',
  'australia': 'au',
  'india': 'in',
  'canada': 'ca',
  'germany': 'de',
  'france': 'fr',
  'japan': 'jp',
  'singapore': 'sg',
  'switzerland': 'ch',
  'netherlands': 'nl',
  'sweden': 'se',
  'finland': 'fi',
  'italy': 'it',
  'spain': 'es',
  'china': 'cn',
  'south korea': 'kr',
  'new zealand': 'nz',
  'ireland': 'ie',
  'norway': 'no',
  'denmark': 'dk',
  'austria': 'at',
  'malaysia': 'my',
  'south africa': 'za',
  'brazil': 'br',
  'mexico': 'mx',
};

// Custom coordinate mapping for the SVG abstract map view
const MAP_COORDINATES: Record<string, { x: number; y: number; labelOffset?: { x: number; y: number } }> = {
  us: { x: 155, y: 130, labelOffset: { x: -15, y: -15 } },
  gb: { x: 295, y: 110, labelOffset: { x: -20, y: -12 } },
  be: { x: 310, y: 122, labelOffset: { x: 20, y: -12 } },
  hk: { x: 508, y: 180, labelOffset: { x: 25, y: 5 } },
  au: { x: 556, y: 292, labelOffset: { x: 0, y: 20 } },
  in: { x: 446, y: 215, labelOffset: { x: 0, y: 18 } }, // Home base: Kochi
  ca: { x: 140, y: 110, labelOffset: { x: 0, y: -20 } },
  de: { x: 320, y: 115, labelOffset: { x: 20, y: -15 } },
  fr: { x: 308, y: 128, labelOffset: { x: -20, y: 20 } },
  ch: { x: 310, y: 125, labelOffset: { x: 0, y: 20 } },
  it: { x: 318, y: 132, labelOffset: { x: 20, y: 20 } },
  es: { x: 282, y: 135, labelOffset: { x: -20, y: 20 } },
  sg: { x: 495, y: 212, labelOffset: { x: 0, y: 20 } },
  jp: { x: 535, y: 145, labelOffset: { x: 20, y: -15 } },
  cn: { x: 490, y: 155, labelOffset: { x: 0, y: -20 } },
  za: { x: 345, y: 265, labelOffset: { x: 0, y: 20 } },
  br: { x: 220, y: 255, labelOffset: { x: 0, y: 20 } },
  nz: { x: 585, y: 310, labelOffset: { x: 0, y: 20 } },
};

function getCountryCode(country: string): string {
  const normalized = country.trim().toLowerCase();
  
  if (COUNTRY_CODES[normalized]) return COUNTRY_CODES[normalized];
  if (COUNTRIES_DATA[normalized]) return COUNTRIES_DATA[normalized].code;
  
  for (const [name, code] of Object.entries(COUNTRY_CODES)) {
    if (normalized.includes(name) || name.includes(normalized)) {
      return code;
    }
  }
  for (const [name, data] of Object.entries(COUNTRIES_DATA)) {
    if (normalized.includes(name) || name.includes(normalized)) {
      return data.code;
    }
  }
  return '';
}

function getFlagUrl(code: string): string {
  if (!code) return '';
  return `https://flagcdn.com/w160/${code.toLowerCase()}.png`;
}

// Computes curved bezier paths for map connections
function getArcPath(x1: number, y1: number, x2: number, y2: number): string {
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - Math.abs(x1 - x2) * 0.18 - 30; // Adaptive arch height
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export default function InternationalExposureSection({ internationalExposure }: InternationalExposureSectionProps) {

  const [activeCountryCode, setActiveCountryCode] = useState<string>('');

  // Group and process exposure items by country code
  const { groupedExposure, countriesWithData } = useMemo(() => {
    const grouped: Record<string, InternationalExposure[]> = {};
    const codes: string[] = ['in']; // Include home base initially

    internationalExposure.forEach((item) => {
      const code = getCountryCode(item.country);
      if (code) {
        if (!grouped[code]) {
          grouped[code] = [];
          codes.push(code);
        }
        grouped[code].push(item);
      }
    });

    // Remove duplicates and keep list of codes
    const uniqueCodes = Array.from(new Set(codes));
    
    return {
      groupedExposure: grouped,
      countriesWithData: uniqueCodes
    };
  }, [internationalExposure]);

  // Set initial active country (first country in list, excluding home base 'in')
  useMemo(() => {
    const firstNonHome = countriesWithData.find(code => code !== 'in');
    if (firstNonHome && !activeCountryCode) {
      setActiveCountryCode(firstNonHome);
    }
  }, [countriesWithData, activeCountryCode]);

  if (!internationalExposure || internationalExposure.length === 0) return null;

  // Pre-calculate fallback coordinates for dynamic locations relative to home base in India
  const getDynamicCoords = (code: string, index: number) => {
    if (MAP_COORDINATES[code]) return MAP_COORDINATES[code];
    
    // Check our comprehensive dictionary
    const globalData = Object.values(COUNTRIES_DATA).find(c => c.code === code);
    if (globalData) {
      return { x: globalData.x, y: globalData.y, labelOffset: { x: 0, y: 20 } };
    }

    // Ultimate fallback if not found anywhere
    const angle = (index * 2 * Math.PI) / (countriesWithData.length || 1);
    return {
      x: 446 + Math.cos(angle) * 100,
      y: 215 + Math.sin(angle) * 60,
      labelOffset: { x: 0, y: 20 }
    };
  };

  const activeCountryData = groupedExposure[activeCountryCode] || [];
  const activeCountryName = activeCountryData[0]?.country || 'Select a country';

  return (
    <SectionWrapper
      id="international-exposure"
      title="International Exposure"
      //subtitle="Global academic collaborations, visiting roles, and research presentations"
      theme="oxford"
    
      cutout="top-left"
    >
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          stroke-dasharray: 6, 4;
          animation: dash 2s linear infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.65); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
      `}</style>

      {/* Header and Toggle Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <p className="text-base font-semibold tracking-wider uppercase font-mono text-gold bg-gold-muted px-3 py-1 rounded-full">
          🗺️ {internationalExposure.length} Collaboration{internationalExposure.length > 1 ? 's' : ''} Worldwide
        </p>


      </div>

      {/* Main Content Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: SVG Map Connection Graph (Desktop) / Tab selector (Mobile) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-beige-card border border-border/80 rounded-2xl p-6 shadow-xl overflow-hidden min-h-[400px] lg:min-h-[500px]">
            {/* Mobile Tabs */}
            <div className="flex lg:hidden flex-wrap pb-4 gap-2 mb-4">
              {countriesWithData.filter(c => c !== 'in').map((code) => {
                const isActive = activeCountryCode === code;
                const countryName = groupedExposure[code]?.[0]?.country || code;
                return (
                  <button
                    key={`tab-mobile-${code}`}
                    onClick={() => setActiveCountryCode(code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#102A4A] text-[#faf3e3] border-[#102A4A] shadow-md scale-95'
                        : 'bg-[#ede5d5] text-[#071A35] border-border hover:border-[#102A4A]/50 hover:bg-[#faf3e3]'
                    }`}
                  >
                    <img
                      src={getFlagUrl(code)}
                      alt={countryName}
                      className="w-5 h-3.5 object-cover rounded shadow-sm"
                    />
                    <span className="text-xs font-semibold">{countryName}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Map Canvas */}
            <div className="relative w-full h-auto aspect-[640/374] flex items-center justify-center bg-[#ede5d5] rounded-xl overflow-hidden border border-border/60 shadow-inner" style={{ aspectRatio: '640/374' }}>
              {/* Subtle radial shadow/glow at the edges to blend the map */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(218, 215, 205, 0) 60%, rgba(218, 215, 205, 0.4) 100%)',
                }}
              />

              {/* Realistic World Map Background from local server */}
              <img
                src="/textured-map.jpg"
                alt="World Map"
                className="w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Overlay SVG for pins and connections (shares the exact same coordinate system of textured-map.jpg) */}
              <svg
                viewBox="0 0 640 374"
                className="absolute inset-0 w-full h-full z-20 select-none"
              >
                {/* Lat/Long Gridlines */}
                <g stroke="rgba(47, 79, 79, 0.08)" strokeWidth="0.5" strokeDasharray="3 6" fill="none">
                  <line x1="10" y1="90" x2="630" y2="90" />
                  <line x1="10" y1="187" x2="630" y2="187" />
                  <line x1="10" y1="280" x2="630" y2="280" />
                  
                  <path d="M 160 10 Q 190 187 160 364" />
                  <path d="M 320 10 Q 320 187 320 364" />
                  <path d="M 480 10 Q 450 187 480 364" />
                </g>

                {/* Connection Arcs */}
                {countriesWithData.map((code, idx) => {
                  if (code === 'in') return null;
                  const start = MAP_COORDINATES['in'];
                  const end = getDynamicCoords(code, idx);
                  const pathD = getArcPath(start.x, start.y, end.x, end.y);
                  const isActive = activeCountryCode === code;

                  return (
                    <g key={`arc-${code}`} className="transition-all duration-300">
                      {/* High-contrast backing halo line to separate the path from the busy textured map */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="rgba(250, 247, 240, 0.9)"
                        strokeWidth={isActive ? 4.5 : 3}
                        className="transition-all duration-300"
                      />
                      {/* Main dotted animated path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="#102A4A"
                        strokeWidth={isActive ? 2.5 : 1.6}
                        className="animate-dash transition-all duration-300"
                        style={{
                          opacity: isActive ? 1 : 0.7,
                        }}
                      />
                    </g>
                  );
                })}

                {/* Interactive Country Pins */}
                {countriesWithData.map((code, idx) => {
                  const coord = getDynamicCoords(code, idx);
                  const isActive = activeCountryCode === code;
                  const isHome = code === 'in';

                  return (
                    <g
                      key={`pin-${code}`}
                      transform={`translate(${coord.x}, ${coord.y})`}
                      className="cursor-pointer group pointer-events-auto"
                      onClick={() => !isHome && setActiveCountryCode(code)}
                    >
                      {/* Pulse rings for active or home pin */}
                      {(isActive || isHome) && (
                        <circle
                          r="18"
                          fill="none"
                          stroke={isHome ? '#102A4A' : '#102A4A'}
                          strokeWidth="1.5"
                          className="animate-pulse-ring"
                          style={{ transformOrigin: '0px 0px' }}
                        />
                      )}

                      {/* Outer Ring */}
                      <circle
                        r={isHome ? 9 : 12}
                        fill={isHome ? '#faf3e3' : '#ffffff'}
                        stroke={isHome ? '#102A4A' : isActive ? '#102A4A' : 'rgba(47, 79, 79, 0.3)'}
                        strokeWidth={isActive || isHome ? 2.5 : 1.2}
                        className="transition-all duration-300 group-hover:scale-110 group-hover:stroke-[#102A4A]"
                        style={{ transformOrigin: '0px 0px' }}
                      />

                      {/* Flag Image / Home center dot */}
                      <foreignObject
                        x={isHome ? -9 : -10}
                        y={isHome ? -9 : -10}
                        width={isHome ? 18 : 20}
                        height={isHome ? 18 : 20}
                        className="rounded-full overflow-hidden pointer-events-none"
                      >
                        <div className="w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                          {isHome ? (
                            <div className="w-3 h-3 bg-[#102A4A] rounded-full shadow-inner animate-pulse" />
                          ) : (
                            <img
                              src={getFlagUrl(code)}
                              alt={code}
                              className="w-full h-full object-cover scale-110"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                      </foreignObject>

                      {/* Label Text */}
                      <text
                        x={coord.labelOffset?.x || 0}
                        y={coord.labelOffset?.y || (isHome ? 20 : 22)}
                        textAnchor="middle"
                        className={`text-[8.5px] font-mono font-bold tracking-wider uppercase transition-colors duration-300 pointer-events-none ${
                          isHome || isActive
                            ? 'fill-[#102A4A]'
                            : 'fill-[#6B7280]/80 group-hover:fill-[#102A4A]'
                        }`}
                      >
                        {isHome ? 'Base: India' : code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Desktop Inline Selectors */}
            <div className="hidden lg:flex flex-wrap gap-2.5 mt-4 pt-4 border-t border-border/60">
              {countriesWithData.filter(c => c !== 'in').map((code) => {
                const isActive = activeCountryCode === code;
                const countryName = groupedExposure[code]?.[0]?.country || code;
                return (
                  <button
                    key={`tab-desktop-${code}`}
                    onClick={() => setActiveCountryCode(code)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#102A4A] text-[#faf3e3] border-[#102A4A] shadow-sm'
                        : 'bg-[#ede5d5] text-[#071A35] border-border hover:text-[#102A4A] hover:border-[#102A4A]/50 hover:bg-[#faf3e3]'
                    }`}
                  >
                    <img
                      src={getFlagUrl(code)}
                      alt={countryName}
                      className="w-4 h-3 object-cover rounded-sm shadow-sm"
                    />
                    <span>{countryName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Academic Log Panel */}
          <div className="lg:col-span-4 flex">
            <div className="card-premium w-full flex flex-col relative overflow-hidden group min-h-[400px] lg:min-h-[500px]">
              {/* Compass Watermark Background Decoration */}
              <div className="absolute -bottom-12 -right-12 text-gold opacity-[0.03] group-hover:opacity-[0.05] pointer-events-none group-hover:rotate-45 transition-all duration-1000 ease-out">
                <Compass size={220} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCountryCode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col justify-between"
                >
                  <div>
                    {/* Country Header */}
                    <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={getFlagUrl(activeCountryCode)}
                          alt={activeCountryName}
                          className="w-12 h-8 object-cover rounded shadow-md border border-border/50"
                        />
                        <div>
                          <h3
                            className="text-xl font-bold text-heading leading-tight"
                            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                          >
                            {activeCountryName}
                          </h3>
                          <span className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                            Academic Collaborations
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Collaborations List */}
                    <div className="space-y-6">
                      {activeCountryData.map((item, index) => (
                        <div
                          key={`collab-${index}`}
                          className="relative pl-4 border-l-2 border-gold/45 hover:border-gold transition-colors duration-300"
                        >
                          {/* University */}
                          <h4 className="text-base font-bold text-heading flex items-start gap-2 mb-2.5">
                            <Building size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                            <span>{item.university}</span>
                          </h4>

                          {/* Details */}
                          <div className="space-y-2 text-lg text-foreground/80">
                            {item.purpose && (
                              <div className="flex items-start gap-2">
                                <Target size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                                <span><strong>Purpose:</strong> {item.purpose}</span>
                              </div>
                            )}

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stamp Graphic Decorator */}
                  <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-muted text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <Compass size={12} className="animate-spin-slow" />
                      COORD REF: {MAP_COORDINATES[activeCountryCode]?.x || 'N/A'},{MAP_COORDINATES[activeCountryCode]?.y || 'N/A'}
                    </span>
                    <span className="uppercase font-semibold text-gold bg-gold-muted/30 px-2 py-0.5 rounded">
                      OFFICIAL VISA
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

    </SectionWrapper>
  );
}

