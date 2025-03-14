
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to generate index.css files from directory contents
function generateIndexFile(directory, excludePattern = null) {
  const fullPath = path.resolve(process.cwd(), directory);
  const indexPath = path.join(fullPath, 'index.css');
  
  // Find all CSS files in the directory
  const cssFiles = glob.sync(path.join(fullPath, '*.css')).filter(file => {
    const basename = path.basename(file);
    return basename !== 'index.css' && (!excludePattern || !excludePattern.test(basename));
  });
  
  if (cssFiles.length === 0) {
    console.warn(`⚠️ No CSS files found in: ${directory}`);
    return;
  }
  
  // Generate import statements
  const imports = cssFiles.map(file => {
    const relativePath = './' + path.basename(file);
    return `@import '${relativePath}';`;
  }).join('\n');
  
  // Write index file
  try {
    fs.writeFileSync(indexPath, imports, 'utf8');
    console.log(`✅ Generated index file: ${indexPath}`);
  } catch (error) {
    console.error(`❌ Error generating index file for ${directory}:`, error.message);
  }
}

// Main execution
console.log('\n🔍 Regenerating CSS index files...\n');

// Update main CSS index files
generateIndexFile('src/styles/modules/accessibility');
generateIndexFile('src/styles/theme');

// Update global.css to remove duplications
try {
  const globalCssPath = path.resolve(process.cwd(), 'src/styles/global.css');
  let content = fs.readFileSync(globalCssPath, 'utf8');
  
  // Remove duplicate imports that are already in index.css
  content = content.replace(/@import '\.\/modules\/accessibility\/index\.css';/g, '');
  
  fs.writeFileSync(globalCssPath, content, 'utf8');
  console.log(`✅ Updated global.css to remove duplicate imports`);
} catch (error) {
  console.error(`❌ Error updating global.css:`, error.message);
}

console.log('\n✨ CSS index regeneration completed!\n');
