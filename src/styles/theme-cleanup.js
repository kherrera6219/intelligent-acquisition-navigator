
/**
 * This is a utility script to help clean up the old theme.css file 
 * after migrating to the new modular structure.
 * 
 * You can run this script locally to remove the old theme.css file
 * once you've verified the new theme structure is working properly.
 */

const fs = require('fs');
const path = require('path');

try {
  // Path to the old theme.css file
  const oldThemePath = path.join(__dirname, 'theme.css');
  
  // Check if the file exists
  if (fs.existsSync(oldThemePath)) {
    // Create a backup just in case
    const backupPath = path.join(__dirname, 'theme.css.bak');
    fs.copyFileSync(oldThemePath, backupPath);
    console.log(`Backup created at ${backupPath}`);
    
    // Remove the old file
    fs.unlinkSync(oldThemePath);
    console.log(`Removed old file: ${oldThemePath}`);
    
    console.log('Theme modularization complete!');
  } else {
    console.log('Old theme.css file not found. Modularization may already be complete.');
  }
} catch (error) {
  console.error('Error during cleanup:', error);
}
