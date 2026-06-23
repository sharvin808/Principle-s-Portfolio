const fs = require('fs');
const path = require('path');

const filePath = 'src/app/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all occurrences of #f0e7d5 (case-insensitive) with #dad7cd
const newContent = content.replace(/#f0e7d5/gi, '#dad7cd');

if (content !== newContent) {
  fs.writeFileSync(filePath, newContent);
  console.log('Updated card colors in globals.css');
} else {
  console.log('No changes made.');
}
