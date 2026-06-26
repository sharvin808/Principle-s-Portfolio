const fs = require('fs');
const file = '/home/sharvin/Projects/Principle-s-Portfolio/src/components/sections/InternationalExposureSection.tsx';
let content = fs.readFileSync(file, 'utf8');

const startStr = `        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: SVG Map Connection Graph (Desktop) / Tab selector (Mobile) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-beige-card border border-border/80 rounded-2xl p-6 shadow-xl overflow-hidden min-h-[400px] lg:min-h-[500px]">`;

const endStr = `          {/* Right Panel: Academic Log Panel */}`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find blocks");
    process.exit(1);
}

const mapBlock = content.slice(content.indexOf(`          <div className="lg:col-span-8`), endIndex).trim();

// Now we need to modify the SectionWrapper call.
const sectionWrapperStart = content.indexOf(`    <SectionWrapper`);
const sectionWrapperEnd = content.indexOf(`      cutout="top-right"
    >`);

if (sectionWrapperStart === -1 || sectionWrapperEnd === -1) {
    console.log("Could not find SectionWrapper");
    process.exit(1);
}

let newContent = content.slice(0, sectionWrapperEnd + 26) + `
      headerContent={
        <div className="w-full h-full lg:max-w-4xl p-4 lg:p-8 ml-0 lg:ml-8 mt-4 lg:mt-12 z-20 pointer-events-auto">
          ${mapBlock.replace(/lg:col-span-8/g, "w-full")}
        </div>
      }
    >` + content.slice(sectionWrapperEnd + 26);

// Now remove the map block from the grid
const gridStartStr = `        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">`;
const gridStartIndex = newContent.indexOf(gridStartStr);
const rightPanelIndex = newContent.indexOf(`          {/* Right Panel: Academic Log Panel */}`, gridStartIndex);

newContent = newContent.slice(0, gridStartIndex) + 
             `        <div className="w-full lg:w-2/3 max-w-4xl mx-auto">\n` + 
             newContent.slice(rightPanelIndex);

// Update right panel to take full width of container
newContent = newContent.replace(`          <div className="lg:col-span-4 flex">`, `          <div className="flex w-full">`);

fs.writeFileSync(file, newContent, 'utf8');
console.log("Done");
