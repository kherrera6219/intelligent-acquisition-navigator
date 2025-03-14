
const { exec } = require('child_process');

console.log('🚀 Running cleanup validation...');

exec('node validate-cleanup.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing validation script: ${error.message}`);
    console.error(stderr);
    return;
  }
  
  console.log(stdout);
});
