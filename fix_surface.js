const fs = require('fs');
const path = require('path');

const filePath = 'src/app/globals.css';
let content = fs.readFileSync(filePath, 'utf8');

// card-premium
content = content.replace(
  /(\.card-premium\s*\{[\s\S]*?background-color:\s*#f0E7D5;)/,
  '$1\n  --surface: #f0E7D5;\n  --surface-alt: #e3dcc8;'
);

// bento-card
content = content.replace(
  /(\.bento-card\s*\{[\s\S]*?background-color:\s*#f0E7D5;)/,
  '$1\n  --surface: #f0E7D5;\n  --surface-alt: #e3dcc8;'
);

// ticket-stub
content = content.replace(
  /(\.ticket-stub\s*\{[\s\S]*?background-color:\s*#f0E7D5;)/,
  '$1\n  --surface: #f0E7D5;\n  --surface-alt: #e3dcc8;'
);

fs.writeFileSync(filePath, content);
console.log('Fixed var(--surface) in cards.');
