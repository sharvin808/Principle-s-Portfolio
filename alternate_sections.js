const fs = require('fs');
const path = require('path');

const sections = [
  { file: 'QualificationSection.tsx', cutout: 'top-right' },
  { file: 'ExperienceSection.tsx', cutout: 'top-left' },
  { file: 'AwardsAchievementsSection.tsx', cutout: 'top-right' },
  { file: 'GallerySection.tsx', cutout: 'top-left' },
  { file: 'ResearchInterestsSection.tsx', cutout: 'top-right' },
  { file: 'InternationalExposureSection.tsx', cutout: 'top-left' },
  { file: 'ContactSection.tsx', cutout: 'top-right' }
];

sections.forEach(sec => {
  const filePath = path.join('src/components/sections', sec.file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/cutout="top-left"/g, `cutout="${sec.cutout}"`);
  content = content.replace(/cutout="top-right"/g, `cutout="${sec.cutout}"`); // Ensures no double replacements
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${sec.file} to ${sec.cutout}`);
});

console.log('Alternating sections complete.');
