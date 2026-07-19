const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  newContent = newContent.replace(/#5C1D24/gi, '#244B3A');
  newContent = newContent.replace(/#D4AF37/gi, '#DFE8D9');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath, filelist);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
      replaceInFile(filePath);
    }
  });
}

walkSync('src');
console.log('Replacement complete.');
