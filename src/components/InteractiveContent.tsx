'use client';

import QualificationSection from '@/components/sections/QualificationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ResearchProjectSection from '@/components/sections/ResearchProjectSection';
import ConsultancySection from '@/components/sections/ConsultancySection';
import PublicationsSection from '@/components/sections/PublicationsSection';
import AwardsAchievementsSection from '@/components/sections/AwardsAchievementsSection';
import PaperPresentationsSection from '@/components/sections/PaperPresentationsSection';
import ResearchInterestsSection from '@/components/sections/ResearchInterestsSection';
import GallerySection from '@/components/sections/GallerySection';
import InternationalExposureSection from '@/components/sections/InternationalExposureSection';
import ReviewerSection from '@/components/sections/ReviewerSection';
import ContactSection from '@/components/sections/ContactSection';

import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';

import { useState, useEffect } from 'react';
import Navbar, { EXTRA_ITEMS } from './Navbar';
import Footer from './Footer';

export default function InteractiveContent({ data }: { data: any }) {
  const [selectedExtraSection, setSelectedExtraSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const isExtra = EXTRA_ITEMS.some((item) => item.id === hash);
        if (isExtra) {
          setSelectedExtraSection(hash);
          setActiveSection(hash);
        } else {
          setSelectedExtraSection(null);
          setActiveSection(hash);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar managed inside InteractiveContent to share section states */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        selectedExtraSection={selectedExtraSection}
        setSelectedExtraSection={setSelectedExtraSection}
      />

      <main className="flex-grow">
        <div id="interactive-content" className="min-h-screen">
          {/* Hero section is always displayed at the top */}
          <HeroSection profile={data.profile} />

          {selectedExtraSection ? (
            /* Selected Extra Section Detail View */
            <div className="relative">
              {selectedExtraSection === 'research-project' && (
                <ResearchProjectSection researchProject={data.researchProject} />
              )}
              {selectedExtraSection === 'publications' && (
                <PublicationsSection publications={data.publications} />
              )}
              {selectedExtraSection === 'consultancy' && (
                <ConsultancySection consultancy={data.consultancy} />
              )}
              {selectedExtraSection === 'paper-presentations' && (
                <PaperPresentationsSection paperPresentations={data.paperPresentations} />
              )}
              {selectedExtraSection === 'reviewer' && (
                <ReviewerSection reviewer={data.reviewer} />
              )}

              {/* Back to main portfolio landing page button */}
              <div className="flex justify-center py-16 bg-oxford-theme border-t border-gold/10">
                <button
                  onClick={() => {
                    setSelectedExtraSection(null);
                    setActiveSection('about');
                    window.location.hash = 'about';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shadow-md text-sm border hover:border-gold hover:text-gold"
                  style={{
                    background: 'var(--color-gold-muted)',
                    color: 'var(--color-gold)',
                    borderColor: 'rgba(212, 201, 179, 0.3)',
                  }}
                >
                  <span>← Back to Portfolio Home</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Main Scrolling Portfolio Page Layout */
            <>
              {/* 2. About Me: Tan */}
              <AboutMeSection aboutMe={data.aboutMe} />

              {/* 3. Qualifications / Education: Oxford Blue */}
              <QualificationSection qualification={data.qualification} />

              {/* 4. Experience: Tan */}
              <ExperienceSection experience={data.experience} />

              {/* 5. Awards & Recognitions: Oxford Blue (Theme override) */}
              <AwardsAchievementsSection awardsAchievements={data.awardsAchievements} theme="oxford" />

              {/* 6. Gallery: Tan */}
              <GallerySection gallery={data.gallery} />

              {/* 7. Research Interests: Oxford Blue (Theme override) */}
              <ResearchInterestsSection researchInterests={data.researchInterests} theme="oxford" />

              {/* 8. International Exposure: Tan */}
              <InternationalExposureSection internationalExposure={data.internationalExposure} />

              {/* 9. Contact: Oxford Blue */}
              <ContactSection contactMe={data.contactMe} />
            </>
          )}
        </div>
      </main>

      {/* Footer managed inside InteractiveContent to complete the shell layout */}
      <Footer profile={data.profile} />
    </div>
  );
}
