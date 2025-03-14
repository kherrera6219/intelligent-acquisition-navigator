
const { exec } = require('child_process');

console.log('🚀 Executing cleanup scripts...');

exec('node cleanup-and-regenerate.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing cleanup scripts: ${error.message}`);
    console.error(stderr);
    return;
  }
  
  console.log(stdout);
  console.log('✨ Cleanup process completed successfully!');
});
