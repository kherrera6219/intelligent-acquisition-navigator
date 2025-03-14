
const { exec } = require('child_process');

console.log('🧹 Starting project cleanup process...');

// Install glob if not already installed (needed for regenerate-css-indexes.js)
exec('npm install glob --no-save', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing dependencies: ${error.message}`);
    return;
  }
  
  console.log('Dependencies installed successfully.');
  
  // Run the cleanup scripts
  console.log('\n--- Running duplicate file cleanup ---');
  exec('node cleanup-duplicates.js', (err1, stdout1, stderr1) => {
    if (err1) {
      console.error(`Error in cleanup-duplicates.js: ${err1.message}`);
      console.error(stderr1);
    } else {
      console.log(stdout1);
      
      console.log('\n--- Regenerating CSS index files ---');
      exec('node regenerate-css-indexes.js', (err2, stdout2, stderr2) => {
        if (err2) {
          console.error(`Error in regenerate-css-indexes.js: ${err2.message}`);
          console.error(stderr2);
        } else {
          console.log(stdout2);
          console.log('\n🎉 All cleanup processes completed successfully!');
        }
      });
    }
  });
});
