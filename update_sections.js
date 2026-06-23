const fs = require('fs');
const path = require('path');

const dir = 'src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  if (file === 'HeroSection.tsx') continue;
  
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace theme="..." with theme="oxford"
  content = content.replace(/theme=(['"])tan['"]/g, 'theme="oxford"');
  
  // Add cutout="top-left" if not present
  if (content.includes('<SectionWrapper') && !content.includes('cutout=')) {
    content = content.replace(/(<SectionWrapper[^>]*?)(>)/, '$1\n      cutout="top-left"\n    $2');
  }

  fs.writeFileSync(filePath, content);
}
console.log('Done');
