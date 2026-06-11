import type { Metadata } from 'next';
import { getAllData } from '@/lib/sheets';
import { getPersonSchema, getPublicationsSchema } from '@/lib/structured-data';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/ui/BackToTop';

// Sections
import HeroSection from '@/components/sections/HeroSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
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

// Enable dynamic rendering
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getAllData();
    const name = data.profile?.name || 'Academic Portfolio';
    const designation = data.profile?.designation || 'Academic Professional';
    const institution = data.profile?.institution || '';
    
    return {
      title: `${name} | ${designation}`,
      description: data.aboutMe?.biography || `Academic portfolio of ${name}, ${designation} at ${institution}.`,
      openGraph: {
        title: `${name} | ${designation}`,
        description: data.aboutMe?.biography || `Research portfolio & publications of ${name}`,
        type: 'profile',
        images: data.profile?.photoUrl ? [{ url: data.profile.photoUrl }] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Academic Portfolio',
      description: 'Premium academic portfolio and research showcase',
    };
  }
}

export default async function Home() {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;

  if (!sheetId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy p-6 text-white text-center">
        <div className="max-w-md card-premium border-gold/30 bg-midnight-light/50">
          <h1 className="text-2xl font-serif text-gold font-bold mb-4">Configuration Required</h1>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Please add the environment variable <code>NEXT_PUBLIC_GOOGLE_SHEET_ID</code> to your <code>.env.local</code> file and populate it with your Google Sheet ID.
          </p>
          <div className="text-left bg-black/40 p-4 rounded text-xs font-mono select-all overflow-x-auto">
            NEXT_PUBLIC_GOOGLE_SHEET_ID=your_sheet_id
          </div>
        </div>
      </div>
    );
  }

  // Fetch all CMS data from Google Sheets
  const data = await getAllData();
  const {
    profile,
    aboutMe,
    qualification,
    experience,
    researchProject,
    consultancy,
    publications,
    awardsAchievements,
    paperPresentations,
    researchInterests,
    gallery,
    internationalExposure,
    reviewer,
  } = data;

  // Generate structured schemas for SEO
  const personSchema = getPersonSchema(profile, aboutMe, qualification, experience, researchInterests);
  const publicationsSchema = getPublicationsSchema(publications, profile.name);

  return (
    <div className="flex flex-col min-h-screen">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationsSchema) }}
      />

      {/* Sticky Navigation (displays after hero scroll) */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <HeroSection profile={profile} />
        <AboutMeSection aboutMe={aboutMe} />
        <QualificationSection qualification={qualification} />
        <ExperienceSection experience={experience} />
        <ResearchProjectSection researchProject={researchProject} />
        <ConsultancySection consultancy={consultancy} />
        <PublicationsSection publications={publications} />
        <AwardsAchievementsSection awardsAchievements={awardsAchievements} />
        <PaperPresentationsSection paperPresentations={paperPresentations} />
        <ResearchInterestsSection researchInterests={researchInterests} />
        <GallerySection gallery={gallery} />
        <InternationalExposureSection internationalExposure={internationalExposure} />
        <ReviewerSection reviewer={reviewer} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Back to top button */}
      <BackToTop />
    </div>
  );
}
