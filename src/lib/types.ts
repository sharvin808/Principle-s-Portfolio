// =============================================================================
// Google Sheets CMS — TypeScript Data Models
// Each interface maps to a tab in the Google Sheet
// =============================================================================

export interface Profile {
  name: string;
  designation: string;
  department: string;
  institution: string;
  photoUrl: string;
  tagline: string;
}

export interface AboutMe {
  biography: string;
  vision: string;
  introduction: string;
}

export interface Qualification {
  degree: string;
  field: string;
  institution: string;
  year: string;
  description: string;
}

export interface Experience {
  role: string;
  institution: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ResearchProject {
  title: string;
  description: string;
  status: string;
  fundingAgency: string;
  year: string;
  link: string;
}

export interface Consultancy {
  title: string;
  organization: string;
  year: string;
  status: string;
  description: string;
}

export interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  link: string;
  type: string; // journal | conference | book-chapter
}

export interface AwardAchievement {
  name: string;
  organization: string;
  year: string;
  description: string;
}

export interface PaperPresentation {
  title: string;
  conference: string;
  location: string;
  date: string;
  description: string;
}

export interface ResearchInterest {
  topic: string;
  description: string;
}

export interface GalleryImage {
  imageUrl: string;
  caption: string;
  category: string;
}

export interface InternationalExposure {
  country: string;
  university: string;
  purpose: string;
  duration: string;
  year: string;
}

export interface Reviewer {
  journalName: string;
  publisher: string;
  year: string;
  role: string;
}

// Combined data type for the entire sheet
export interface SheetData {
  profile: Profile;
  aboutMe: AboutMe;
  qualification: Qualification[];
  experience: Experience[];
  researchProject: ResearchProject[];
  consultancy: Consultancy[];
  publications: Publication[];
  awardsAchievements: AwardAchievement[];
  paperPresentations: PaperPresentation[];
  researchInterests: ResearchInterest[];
  gallery: GalleryImage[];
  internationalExposure: InternationalExposure[];
  reviewer: Reviewer[];
}
