const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Replace orange rgb with beige rgb
  newContent = newContent.replace(/255, 127, 0/g, '218, 215, 205');
  
  // In Consultancy and ResearchProject, replace the hardcoded invisible '#2F4F4F' badge with 'var(--muted)'
  if (filePath.includes('ConsultancySection.tsx') || filePath.includes('ResearchProjectSection.tsx')) {
    newContent = newContent.replace(/'#2F4F4F'/g, "'var(--muted)'");
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function walkSync(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
      replaceInFile(filePath);
    }
  });
}

walkSync('src');
console.log('Fix complete.');
