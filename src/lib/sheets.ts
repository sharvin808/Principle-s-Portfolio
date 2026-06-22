// =============================================================================
// Google Sheets Data Fetcher — CMS Layer
// Fetches data from a public Google Sheet via CSV export
// =============================================================================

import {
  type Profile,
  type AboutMe,
  type Qualification,
  type Experience,
  type ResearchProject,
  type Consultancy,
  type Publication,
  type AwardAchievement,
  type PaperPresentation,
  type ResearchInterest,
  type GalleryImage,
  type InternationalExposure,
  type Reviewer,
  type SheetData,
  type ContactMe,
} from './types';

import { fetchFromVisualizationAPI } from './googleSheets';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '';

// Sheet GIDs — these map to the tab positions in the Google Sheet
// Users must set these in .env.local after creating their sheet
const SHEET_GIDS: Record<string, string> = {
  profile: process.env.NEXT_PUBLIC_GID_PROFILE || '0',
  'about me': process.env.NEXT_PUBLIC_GID_ABOUT_ME || '',
  qualification: process.env.NEXT_PUBLIC_GID_QUALIFICATION || '',
  experience: process.env.NEXT_PUBLIC_GID_EXPERIENCE || '',
  'research project': process.env.NEXT_PUBLIC_GID_RESEARCH_PROJECT || '',
  consultancy: process.env.NEXT_PUBLIC_GID_CONSULTANCY || '',
  publications: process.env.NEXT_PUBLIC_GID_PUBLICATIONS || '',
  'awards & achievements': process.env.NEXT_PUBLIC_GID_AWARDS_ACHIEVEMENTS || '',
  'paper presentations': process.env.NEXT_PUBLIC_GID_PAPER_PRESENTATIONS || '',
  'research interests': process.env.NEXT_PUBLIC_GID_RESEARCH_INTERESTS || '',
  gallery: process.env.NEXT_PUBLIC_GID_GALLERY || '',
  'international exposure': process.env.NEXT_PUBLIC_GID_INTERNATIONAL_EXPOSURE || '',
  reviewer: process.env.NEXT_PUBLIC_GID_REVIEWER || '',
  'contact me': process.env.NEXT_PUBLIC_GID_CONTACT_ME || '',
  instagram: process.env.NEXT_PUBLIC_GID_INSTAGRAM || '',
};


async function fetchSheetTab(sheetName: string): Promise<string[][]> {
  const gid = SHEET_GIDS[sheetName];
  if (!gid && gid !== '0') {
    console.warn(`No GID configured for sheet: ${sheetName}`);
    return [];
  }

  return fetchFromVisualizationAPI(SHEET_ID, gid);
}

// Helper to transform Google Drive share links into direct image download links,
// and make sure any image URLs are clean.
function parseImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // Detect Google Drive sharing links
  if (trimmed.includes('drive.google.com')) {
    let fileId = '';
    
    // Pattern: /file/d/[FILE_ID]/view
    const fileDMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      fileId = fileDMatch[1];
    } else {
      // Pattern: ?id=[FILE_ID]
      const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idParamMatch && idParamMatch[1]) {
        fileId = idParamMatch[1];
      }
    }
    
    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }
  
  return trimmed;
}

function parseExternalUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

// ---------------------------------------------------------------------------
// Row-to-Object Mapper
// ---------------------------------------------------------------------------

function rowsToObjects<T>(rows: string[][]): T[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, ''));
  const dataRows = rows.slice(1);

  return dataRows
    .filter((row) => row.some((cell) => cell.trim() !== ''))
    .map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = row[i]?.trim() || '';
      });
      return obj as unknown as T;
    });
}

function objectsToTypedList<T>(list: any[]): T[] {
  return list as T[];
}

// ---------------------------------------------------------------------------
// Typed Data Fetchers
// ---------------------------------------------------------------------------

export async function getProfile(): Promise<Profile> {
  const rows = await fetchSheetTab('profile');
  const objects = rowsToObjects<any>(rows);
  const raw = objects[0] || {};
  
  // Support flexible header names for profile photo
  const rawPhotoUrl = raw.photourl || raw.photo || raw.image || raw.profilephoto || raw.picture || raw.photolink || raw.imageurl || '';
  
  // Support flexible header names for other honors
  const rawOtherHonors = raw.otherhonors || raw.other_honors || raw.honors || raw.otherhonours || raw.honours || '';

  return {
    name: raw.name || '',
    designation: raw.designation || '',
    institution: raw.institution || '',
    photoUrl: parseImageUrl(rawPhotoUrl),
    tagline: raw.tagline || '',
    otherHonors: rawOtherHonors || '',
  };
}

export async function getAboutMe(): Promise<AboutMe> {
  const rows = await fetchSheetTab('about me');
  const objects = rowsToObjects<any>(rows);
  const raw = objects[0] || {};
  return {
    biography: raw.biography || '',
    vision: raw.vision || '',
    introduction: raw.introduction || '',
  };
}

export async function getQualification(): Promise<Qualification[]> {
  const rows = await fetchSheetTab('qualification');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    degree: raw.degree || '',
    field: raw.field || '',
    institution: raw.institution || '',
    year: raw.year || '',
    description: raw.description || '',
  }));
}

export async function getExperience(): Promise<Experience[]> {
  const rows = await fetchSheetTab('experience');
  const dataRows = rows.slice(1);
  return dataRows.map((row) => ({
    id: row[0] || '',
    role: row[1] || '',
    institution: row[2] || '',
    startYear: row[3] || '',
    endYear: row[4] || '',
    description: row[5] || '',
  }));
}

export async function getResearchProject(): Promise<ResearchProject[]> {
  const rows = await fetchSheetTab('research project');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    title: raw.title || '',
    description: raw.description || '',
    status: raw.status || '',
    fundingAgency: raw.fundingagency || '',
    year: raw.year || '',
    link: raw.link || '',
  }));
}

export async function getConsultancy(): Promise<Consultancy[]> {
  const rows = await fetchSheetTab('consultancy');
  const dataRows = rows.slice(1);
  //const objects = rowsToObjects<any>(rows);
  return dataRows.map((row) => ({
    title: row[1] || '',
    organization: row[2] || '',
    year: row[3] || '',
    status: row[4] || '',
    description: row[5] || '',
  }));
}

export async function getPublications(): Promise<Publication[]> {
  const rows = await fetchSheetTab('publications');
  return objectsToTypedList<Publication>(rowsToObjects<any>(rows));
}

export async function getAwardsAchievements(): Promise<AwardAchievement[]> {
  const rows = await fetchSheetTab('awards & achievements');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    name: raw.name || '',
    organization: raw.organization || '',
    year: raw.year || '',
    description: raw.description || '',
  }));
}

export async function getPaperPresentations(): Promise<PaperPresentation[]> {
  const rows = await fetchSheetTab('paper presentations');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    title: raw.title || '',
    conference: raw.conference || '',
    location: raw.location || '',
    date: raw.date || '',
    description: raw.description || '',
  }));
}

export async function getResearchInterests(): Promise<ResearchInterest[]> {
  const rows = await fetchSheetTab('research interests');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    topic: raw.topic || '',
    description: raw.description || '',
  }));
}

export async function getGallery(): Promise<GalleryImage[]> {
  const rows = await fetchSheetTab('gallery');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => {
    // Support flexible header names for gallery images
    const rawImageUrl = raw.imageurl || raw.image || raw.url || raw.photo || raw.link || '';
    return {
      imageUrl: parseImageUrl(rawImageUrl),
      caption: raw.caption || '',
      category: raw.category || '',
    };
  });
}

export async function getInternationalExposure(): Promise<InternationalExposure[]> {
  const rows = await fetchSheetTab('international exposure');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    country: raw.country || '',
    university: raw.university || '',
    purpose: raw.purpose || '',
    duration: raw.duration || '',
    year: raw.year || '',
  }));
}

export async function getReviewer(): Promise<Reviewer[]> {
  const rows = await fetchSheetTab('reviewer');
  const objects = rowsToObjects<any>(rows);
  return objects.map((raw) => ({
    journalName: raw.journalname || '',
    publisher: raw.publisher || '',
    year: raw.year || '',
    role: raw.role || '',
  }));
}

export async function getContactme(): Promise<ContactMe> {
  const rows = await fetchSheetTab('contact me');
  const objects = rowsToObjects<any>(rows);
  const raw = objects[0] || {};

  let instagramUrl = raw.instagram || raw.instagramurl || '';

  // Defensively fetch from the separate Instagram tab if GID is provided
  if (process.env.NEXT_PUBLIC_GID_INSTAGRAM) {
    try {
      const instaRows = await fetchSheetTab('instagram');
      const instaObjects = rowsToObjects<any>(instaRows);
      const instaRaw = instaObjects[0] || {};
      instagramUrl = instaRaw.url || instaRaw.link || instaRaw.instagram || instagramUrl;
    } catch (error) {
      console.warn('Could not fetch separate Instagram tab:', error);
    }
  }

  return {
    officeLocation: raw.officelocation || raw.office || raw.location || '',
    emailId: raw.emailid || raw.email || raw.emailaddress || '',
    linkedin: parseExternalUrl(raw.linkedin || raw.linkedinurl || ''),
    instagram: parseExternalUrl(instagramUrl),
    twitter: parseExternalUrl(raw.twitter || raw.twitterurl || raw.x || raw.xurl || ''),
  };
}

// ---------------------------------------------------------------------------
// Fetch All Data at Once
// ---------------------------------------------------------------------------

export async function getAllData(): Promise<SheetData> {
  const [
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
    contactMe,
  ] = await Promise.all([
    getProfile(),
    getAboutMe(),
    getQualification(),
    getExperience(),
    getResearchProject(),
    getConsultancy(),
    getPublications(),
    getAwardsAchievements(),
    getPaperPresentations(),
    getResearchInterests(),
    getGallery(),
    getInternationalExposure(),
    getReviewer(),
    getContactme(),
  ]);

  return {
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
    contactMe,
  };
}

