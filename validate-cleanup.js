
const fs = require('fs');
const path = require('path');

// Files that should have been removed
const filesToCheck = [
  'src/components/ui/universal/EnhancedNetworkBanner.tsx',
  'src/hooks/useNetworkStatus.tsx',
  'src/components/ui/universal/NetworkErrorHandler.tsx',
];

// Files that should have been updated
const filesToVerify = [
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldPattern: "import { EnhancedNetworkBanner }",
    newPattern: "import { NetworkStatusBanner }",
    description: "NetworkMonitorProvider import statement"
  },
  {
    file: 'src/components/ui/universal/NetworkMonitorProvider.tsx',
    oldPattern: "<EnhancedNetworkBanner",
    newPattern: "<NetworkStatusBanner",
    description: "NetworkMonitorProvider component usage"
  },
  {
    file: 'src/styles/modules/accessibility/index.css',
    // This file should have been regenerated with imports
    verifyExists: true,
    description: "Regenerated CSS index file"
  }
];

// Function to check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(path.resolve(process.cwd(), filePath));
  } catch (error) {
    console.error(`Error checking if file exists: ${filePath}`, error);
    return false;
  }
}

// Function to check file content
function checkFileContent(filePath, oldPattern, newPattern) {
  try {
    const content = fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8');
    const hasOldPattern = content.includes(oldPattern);
    const hasNewPattern = content.includes(newPattern);
    
    return {
      hasOldPattern,
      hasNewPattern
    };
  } catch (error) {
    console.error(`Error checking file content: ${filePath}`, error);
    return { 
      hasOldPattern: false, 
      hasNewPattern: false,
      error: error.message
    };
  }
}

// Main validation function
function validateCleanup() {
  console.log('\n🔍 Validating Cleanup Process\n');
  
  // Check if removed files no longer exist
  console.log('Checking if duplicate files have been removed:');
  let allFilesRemoved = true;
  
  filesToCheck.forEach(file => {
    const exists = fileExists(file);
    if (exists) {
      console.log(`❌ File still exists: ${file}`);
      allFilesRemoved = false;
    } else {
      console.log(`✅ File successfully removed: ${file}`);
    }
  });
  
  // Verify file updates
  console.log('\nVerifying file updates:');
  let allUpdatesSuccessful = true;
  
  filesToVerify.forEach(item => {
    if (item.verifyExists) {
      // Just check if the file exists
      const exists = fileExists(item.file);
      if (exists) {
        console.log(`✅ ${item.description} exists as expected`);
      } else {
        console.log(`❌ ${item.description} doesn't exist`);
        allUpdatesSuccessful = false;
      }
    } else {
      // Check file content
      const exists = fileExists(item.file);
      
      if (!exists) {
        console.log(`❌ File not found: ${item.file}`);
        allUpdatesSuccessful = false;
      } else {
        const { hasOldPattern, hasNewPattern, error } = checkFileContent(item.file, item.oldPattern, item.newPattern);
        
        if (error) {
          console.log(`❌ Error checking ${item.description}: ${error}`);
          allUpdatesSuccessful = false;
        } else if (hasOldPattern) {
          console.log(`❌ ${item.description} still contains old pattern: "${item.oldPattern}"`);
          allUpdatesSuccessful = false;
        } else if (!hasNewPattern) {
          console.log(`❌ ${item.description} doesn't contain new pattern: "${item.newPattern}"`);
          allUpdatesSuccessful = false;
        } else {
          console.log(`✅ ${item.description} successfully updated`);
        }
      }
    }
  });
  
  // Generate overall summary
  console.log('\n----- Cleanup Validation Summary -----');
  
  if (allFilesRemoved && allUpdatesSuccessful) {
    console.log('✅ SUCCESS: All duplicate files have been removed and imports have been properly updated.');
  } else {
    console.log('❌ ISSUES FOUND: Some cleanup tasks were not completed successfully.');
    
    if (!allFilesRemoved) {
      console.log('  - Some duplicate files still exist in the project.');
    }
    
    if (!allUpdatesSuccessful) {
      console.log('  - Some file updates were not successfully applied.');
    }
  }
  
  console.log('\nFor detailed instructions on fixing any issues manually, refer to cleanup-README.md');
}

// Execute validation
validateCleanup();
