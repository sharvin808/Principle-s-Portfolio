const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/sections');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Split into lines, look for paragraph tags or description spans
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // If line has className and seems to be a description text (has text-base and some descriptive indicator)
    if (line.includes('className="') && line.includes('text-base')) {
      if (
        line.includes('leading-') || 
        line.includes('text-foreground/') || 
        line.includes('text-muted') || 
        line.includes('max-w-') || 
        line.includes('description') ||
        line.includes('italic')
      ) {
        // Exclude specific elements that shouldn't be large (like small badges)
        if (!line.includes('px-') && !line.includes('py-') && !line.includes('text-xs')) {
          lines[i] = line.replace(/\btext-base\b/, 'text-lg');
        }
      }
    }
  }
  
  content = lines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
