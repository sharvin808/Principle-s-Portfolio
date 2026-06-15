'use client';

import { useState, useEffect } from 'react';
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

import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';

export default function InteractiveContent({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== 'about') {
        setActiveTab(hash);
      } else {
        setActiveTab('about'); // Default to about (which includes hero)
      }
    };

    // Initialize on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!activeTab) return null;

  const isDefaultView = activeTab === 'about';

  return (
    <div id="interactive-content" className="min-h-screen">
      <HeroSection profile={data.profile} />
      
      {activeTab === 'about' && <AboutMeSection aboutMe={data.aboutMe} />}
      
      {activeTab === 'education' && <QualificationSection qualification={data.qualification} />}
      {activeTab === 'experience' && <ExperienceSection experience={data.experience} />}
      {activeTab === 'research-project' && <ResearchProjectSection researchProject={data.researchProject} />}
      {activeTab === 'consultancy' && <ConsultancySection consultancy={data.consultancy} />}
      {activeTab === 'publications' && <PublicationsSection publications={data.publications} />}
      {activeTab === 'awards-achievements' && <AwardsAchievementsSection awardsAchievements={data.awardsAchievements} />}
      {activeTab === 'paper-presentations' && <PaperPresentationsSection paperPresentations={data.paperPresentations} />}
      {activeTab === 'research-interests' && <ResearchInterestsSection researchInterests={data.researchInterests} />}
      {activeTab === 'gallery' && <GallerySection gallery={data.gallery} />}
      {activeTab === 'international-exposure' && <InternationalExposureSection internationalExposure={data.internationalExposure} />}
      {activeTab === 'reviewer' && <ReviewerSection reviewer={data.reviewer} />}
    </div>
  );
}
