const fs = require('fs');
const path = require('path');

const dir = 'src/components/sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  if (file === 'HeroSection.tsx') continue;
  
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace cutout="top-left" with cutout="top-right"
  content = content.replace(/cutout="top-left"/g, 'cutout="top-right"');
  
  fs.writeFileSync(filePath, content);
}
console.log('Done');
