const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Replace case-insensitive colors
  newContent = newContent.replace(/#E8D6B6/gi, '#e8ce9e');
  newContent = newContent.replace(/#e8c88e/gi, '#e8ce9e');
  
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
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
      replaceInFile(filePath);
    }
  });
}

walkSync('src');
replaceInFile('tailwind.config.ts'); // just in case it exists now
replaceInFile('replace_colors.js'); // update the script itself
console.log('Replacement complete.');
