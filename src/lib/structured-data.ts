import type { Profile, AboutMe, Publication, Qualification, Experience, ResearchInterest } from './types';

export function getPersonSchema(
  profile: Profile,
  aboutMe: AboutMe,
  qualification: Qualification[],
  experience: Experience[],
  researchInterests: ResearchInterest[]
) {
  const alumniOf = qualification.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  }));

  const worksFor = experience.length > 0 ? {
    '@type': 'EducationalOrganization',
    name: experience[0].institution,
  } : {
    '@type': 'EducationalOrganization',
    name: profile.institution,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.designation,
    worksFor: worksFor,
    description: aboutMe.biography || profile.tagline,
    alumniOf: alumniOf,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    image: profile.photoUrl,
    knowsAbout: researchInterests.map((ri) => ri.topic) || [],
  };
}

export function getPublicationsSchema(publications: Publication[], authorName: string) {
  return publications.map((pub) => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    author: pub.authors ? pub.authors.split(',').map((a) => ({
      '@type': 'Person',
      name: a.trim(),
    })) : [
      {
        '@type': 'Person',
        name: authorName,
      },
    ],
    isPartOf: {
      '@type': 'Periodical',
      name: pub.journal,
    },
    datePublished: pub.year,
    identifier: pub.doi,
    url: pub.link || (pub.doi ? `https://doi.org/${pub.doi}` : undefined),
  }));
}
